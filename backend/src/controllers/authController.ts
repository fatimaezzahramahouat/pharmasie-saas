import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerPharmacy = async (req: Request, res: Response) => {
  const { email, password, name, licenseNum, address, city, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: { 
          email, 
          password: hashedPassword, 
          role: 'ADMIN_PHARMA' 
        }
      });

      // 2. Create Pharmacy
      const pharmacy = await tx.pharmacy.create({
        data: { 
          name, 
          licenseNum, 
          address, 
          city, 
          phone 
        }
      });

      // 3. Create Staff Profile (Admin)
      await tx.staff.create({
        data: { 
          userId: user.id, 
          pharmacyId: pharmacy.id, 
          isOwner: true, 
          position: "Pharmacien Titulaire" 
        }
      });

      return { user, pharmacy };
    });

    res.status(201).json({ message: "Pharmacie créée avec succès", data: result });
  } catch (error: any) {
    res.status(400).json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { staffProfile: true, clientProfile: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Token JWT avec les infos essentielles
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role, 
        pharmacyId: user.staffProfile?.pharmacyId || null 
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        pharmacyId: user.staffProfile?.pharmacyId || null
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
