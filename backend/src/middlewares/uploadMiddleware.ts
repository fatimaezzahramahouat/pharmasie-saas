import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

// Store file in memory to upload to Supabase directly
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToSupabase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Veuillez fournir un fichier." });
      return;
    }

    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
    const filePath = `prescriptions/${fileName}`; // Storing inside a "prescriptions" folder in the bucket

    const { data, error } = await supabase.storage
      .from('files') // Name of the bucket specified by the user
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      res.status(500).json({ message: "Erreur lors du téléchargement vers Supabase." });
      return;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    (req as any).fileUrl = publicUrlData.publicUrl;
    
    // Proceed to the actual controller logic which saves the DB record
    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
