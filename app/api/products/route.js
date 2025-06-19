// app/api/products/route.js
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import db from '@/lib/db';

// ❗ Important: this config is ignored in app router, but required for formidable to work properly
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

// Sanitize uploaded filenames
const sanitizeFilename = (filename) => {
  return filename
    .replace(/\s+/g, '-')             // Replace spaces with dashes
    .replace(/[^a-zA-Z0-9.-]/g, '');  // Remove special characters
};

// Initialize formidable
const form = formidable({
  multiples: true,
  uploadDir,
  keepExtensions: true,
  filename: (name, ext, part) =>
    `${Date.now()}-${sanitizeFilename(part.originalFilename)}`,
});

// ✅ GET: Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');

    if (!Array.isArray(rows)) {
      console.warn('⚠️ Unexpected MySQL response, returning empty array.');
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('❌ DB GET Error:', err.message);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

// ✅ POST: Add new product
export async function POST(req) {
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
    const price = fields.price?.[0] || '';
    const description = fields.description?.[0] || '';
    const category = fields.category?.[0] || '';
    const sizes = fields.sizes?.[0] || null;
    const thumbnail = files.thumbnail?.[0]?.newFilename || '';
    const image1 = files.image1?.[0]?.newFilename || '';
    const image2 = files.image2?.[0]?.newFilename || '';
    const image3 = files.image3?.[0]?.newFilename || '';

    // Validate required fields
    if (!name || !price || !thumbnail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Insert into database
    await db.query(
      'INSERT INTO products (name, price, description, category, sizes, thumbnail, image1, image2, image3, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, price, description, category, sizes, thumbnail, image1, image2, image3, true]
    );

    return NextResponse.json({ message: '✅ Product added successfully' });
  } catch (err) {
    console.error('❌ Upload Error:', err.message);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
