import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { in_stock } = body;

    // Validate input
    if (typeof in_stock !== 'number' || (in_stock !== 0 && in_stock !== 1)) {
      return NextResponse.json({ error: 'Invalid in_stock value' }, { status: 400 });
    }

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce',
    });

    await db.query('UPDATE srishti SET in_stock = ? WHERE id = ?', [in_stock, id]);
    await db.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating stock:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
