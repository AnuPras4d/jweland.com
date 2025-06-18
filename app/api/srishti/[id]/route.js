import { NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE /api/srishti/[id]
export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    await db.query('DELETE FROM srishti WHERE id = ?', [id]);
    return NextResponse.json({ message: '✅ Deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

// PUT /api/srishti/[id]
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

    const parsedSizes = JSON.parse(sizes || '[]');
    const price = parsedSizes.length > 0 ? parsedSizes[0].price : '';
    const newsize = parsedSizes.length > 0 ? parsedSizes[0].size : '';

    await db.query(
      `UPDATE srishti
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
        sizes,
        id,
      ]
    );

    return NextResponse.json({ message: '✅ Product updated' });
  } catch (err) {
    console.error('Update Error:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
