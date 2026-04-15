import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Get all products for the pharmacy
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    const products = await prisma.product.findMany({
      where: { pharmacyId: user.pharmacyId },
      orderBy: { name: 'asc' }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    const { name, brand, description, price, stock, minStock, expiryDate, category } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        minStock: parseInt(minStock),
        expiryDate: new Date(expiryDate),
        category,
        pharmacyId: user.pharmacyId
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Get low stock alerts
export const getAlerts = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user.pharmacyId) {
      res.status(403).json({ message: "Veuillez vous rattacher à une pharmacie." });
      return;
    }

    // Logic: stock <= minStock
    const lowStockProducts = await prisma.product.findMany({
      where: {
        pharmacyId: user.pharmacyId,
        stock: { lte: prisma.product.fields.minStock } // Direct comparison if Prisma supports it, or use raw/filter
      }
    });

    // Alternatively, fetch all and filter if minStock logic is tricky in Prisma direct comparison:
    const allProducts = await prisma.product.findMany({ where: { pharmacyId: user.pharmacyId } });
    const alerts = allProducts.filter(p => p.stock <= p.minStock);

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
