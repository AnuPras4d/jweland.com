// pages/api/products.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import db from '@/lib/db';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Clean filename
const sanitizeFilename = (filename) => {
  return filename
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '');
};

// Compress image using Sharp
const compressImage = async (inputPath, outputPath) => {
  const tempPath = outputPath + '.compressed.jpg';

  await sharp(inputPath)
    .resize({ width: 1500, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(tempPath);

  fs.unlinkSync(inputPath);
  fs.renameSync(tempPath, outputPath);
};

// Formidable setup
const form = formidable({
  multiples: true,
  uploadDir,
  keepExtensions: true,
  filename: (name, ext, part) =>
    `${Date.now()}-${sanitizeFilename(part.originalFilename)}`,
});

// 📦 POST handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
      return res.status(200).json(Array.isArray(rows) ? rows : []);
    } catch (err) {
      console.error('❌ DB GET Error:', err.message);
      return res.status(500).json({ error: 'DB error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const name = fields.name?.[0] || '';
      const price = fields.price?.[0] || '';
      const description = fields.description?.[0] || '';
      const category = fields.category?.[0] || '';
      const sizes = fields.sizes?.[0] || null;

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

      if (!name || !price || !finalFilenames.thumbnail) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      await db.query(
        'INSERT INTO products (name, price, description, category, sizes, thumbnail, image1, image2, image3, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          name,
          price,
          description,
          category,
          sizes,
          finalFilenames.thumbnail,
          finalFilenames.image1,
          finalFilenames.image2,
          finalFilenames.image3,
          true,
        ]
      );

      return res.status(200).json({ message: '✅ Product added successfully' });
    } catch (err) {
      console.error('❌ Upload Error:', err.message);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  // ⛔ Unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
