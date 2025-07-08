// pages/api/srishti.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import db from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const sanitizeFilename = (filename) => {
  return filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
};

const compressImage = async (inputPath, outputPath) => {
  const tempPath = outputPath + '.compressed.jpg';

  await sharp(inputPath)
    .resize({ width: 1500, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(tempPath);

  fs.unlinkSync(inputPath);
  fs.renameSync(tempPath, outputPath);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM srishti ORDER BY id DESC');
      return res.status(200).json(rows);
    } catch (err) {
      console.error('❌ DB GET Error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
  }

  if (req.method === 'POST') {
    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => `${Date.now()}-${sanitizeFilename(part.originalFilename)}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('❌ Form parse error:', err);
        return res.status(500).json({ error: 'Form parse error' });
      }

      const name = fields.name?.[0] || '';
      const description = fields.description?.[0] || '';
      const category = fields.category?.[0] || '';
      const sizes = fields.sizes?.[0] || null;

      let price = '';
      let newsize = '';
      if (sizes) {
        try {
          const parsedSizes = JSON.parse(sizes);
          if (Array.isArray(parsedSizes) && parsedSizes.length > 0) {
            price = parsedSizes[0].price || '';
            newsize = parsedSizes[0].size || '';
          }
        } catch {}
      }

      const imageFields = ['thumbnail', 'image1', 'image2', 'image3'];
      const finalFilenames = {};

      for (const field of imageFields) {
        const file = files[field]?.[0];
        if (file) {
          const originalPath = file.filepath;
          const finalPath = path.join(uploadDir, file.newFilename);
          await compressImage(originalPath, finalPath);
          finalFilenames[field] = file.newFilename;
        } else {
          finalFilenames[field] = '';
        }
      }

      try {
        await db.query(
          `INSERT INTO srishti (name, price, newsize, description, category, sizes, thumbnail, image1, image2, image3)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            price,
            newsize,
            description,
            category,
            sizes,
            finalFilenames.thumbnail,
            finalFilenames.image1,
            finalFilenames.image2,
            finalFilenames.image3,
          ]
        );

        return res.status(200).json({ message: '✅ Product added to Srishti' });
      } catch (err) {
        console.error('❌ DB Insert Error:', err);
        return res.status(500).json({ error: 'DB insert failed' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
