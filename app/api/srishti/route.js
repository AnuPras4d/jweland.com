import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import db from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure upload folder exists
const uploadDir = path.join(process.cwd(), 'public', 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// GET: Fetch all srishti products
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM srishti ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (err) {
    console.error('DB GET Error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

// POST: Add new srishti product
export async function POST(req) {
  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => `${Date.now()}-${part.originalFilename}`,
  });

  const stream = Readable.fromWeb(req.body);
  const nodeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: '',
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

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
      } catch {
        // Invalid JSON – keep default empty values
      }
    }

    const thumbnail = files.thumbnail?.[0]?.newFilename || '';
    const image1 = files.image1?.[0]?.newFilename || '';
    const image2 = files.image2?.[0]?.newFilename || '';
    const image3 = files.image3?.[0]?.newFilename || '';

    await db.query(
      `INSERT INTO srishti
        (name, price, newsize, description, category, sizes, thumbnail, image1, image2, image3)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        price,
        newsize,
        description,
        category,
        sizes,
        thumbnail,
        image1,
        image2,
        image3,
      ]
    );

    return NextResponse.json({ message: '✅ Product added to Srishti' });
  } catch (err) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
