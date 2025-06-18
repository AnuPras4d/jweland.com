import { NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE /api/products/[id]
export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ message: '✅ Deleted' });
  } catch (err) {
    console.error('Delete Error:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req, { params }) {
  const id = params.id;
  try {
    const body = await req.json();

    const {
      name,
      description,
      category,
      thumbnail,
      image1,
      image2,
      image3,
      sizes,
    } = body;

    // Ensure sizes is parsed correctly (JSON string or object)
    let parsedSizes = [];
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (err) {
        parsedSizes = [];
      }
    } else if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    }

    const price = parsedSizes.length > 0 ? parsedSizes[0].price : '';
    const newsize = parsedSizes.length > 0 ? parsedSizes[0].size : '';

    await db.query(
      `UPDATE products
       SET name = ?, price = ?, newsize = ?, description = ?, category = ?,
           thumbnail = ?, image1 = ?, image2 = ?, image3 = ?, sizes = ?
       WHERE id = ?`,
      [
        name,
        price,
        newsize,
        description,
        category,
        thumbnail,
        image1,
        image2,
        image3,
        JSON.stringify(parsedSizes),
        id,
      ]
    );

    return NextResponse.json({ message: '✅ Product updated' });
  } catch (err) {
    console.error('Update Error:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
