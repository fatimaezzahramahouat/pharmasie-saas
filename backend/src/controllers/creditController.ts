import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Get credits (carnet) for the pharmacy
export const getCredits = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    const credits = await prisma.credit.findMany({
      where: { 
        pharmacyId: user.pharmacyId,
        status: { not: 'PAID' }
      },
      include: {
        client: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Add a new debt for a client
export const addCredit = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    const { clientId, amount, note } = req.body;

    const credit = await prisma.credit.create({
      data: {
        amount: parseFloat(amount),
        note,
        clientId,
        pharmacyId: user.pharmacyId
      }
    });

    res.status(201).json(credit);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Pay part or all of a debt
export const payCredit = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    const id = req.params.id as string;
    const { amount } = req.body;

    const credit = await prisma.credit.findUnique({ where: { id } });
    if (!credit) {
      res.status(404).json({ message: "Credit introuvable" });
      return;
    }

    const newPaidAmount = credit.paidAmount + parseFloat(amount);
    let newStatus = credit.status;

    if (newPaidAmount >= credit.amount) {
      newStatus = 'PAID';
    } else if (newPaidAmount > 0) {
      newStatus = 'PARTIALLY_PAID';
    }

    const updatedCredit = await prisma.credit.update({
      where: { id },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus
      }
    });

    res.json(updatedCredit);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
