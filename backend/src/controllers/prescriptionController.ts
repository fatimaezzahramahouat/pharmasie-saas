import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const uploadPrescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const fileUrl = (req as any).fileUrl; // Attached by our Supabase middleware

    if (!fileUrl) {
      res.status(400).json({ message: "Le fichier n'a pas pu être téléchargé." });
      return;
    }

    // Usually, we'd need a client ID for the prescription to save it to DB.
    // For now, if the user is a CLIENT, we fetch their Client profile:
    let clientRecord = await prisma.client.findUnique({ where: { userId: user.id } });
    
    // If they don't have a record yet, create an empty one (just an example handling, depends on your auth flow)
    if (!clientRecord) {
      clientRecord = await prisma.client.create({ data: { userId: user.id } });
    }

    const prescription = await prisma.prescription.create({
      data: {
        imageUrl: fileUrl,
        clientId: clientRecord.id
      }
    });

    res.status(201).json({
      message: "Ordonnance téléchargée avec succès !",
      prescription
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la sauvegarde de l'ordonnance.", error });
  }
};
