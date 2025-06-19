import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // ✅ Use the connection pool

// ✅ App Router API format: context.params is async
export async function PUT(req, context) {
  const params = await context.params; // ✅ Await the params object
  const { id } = params;

  try {
    const body = await req.json();
    const { in_stock } = body;

    // ✅ Validate input
    if (typeof in_stock !== 'number' || ![0, 1].includes(in_stock)) {
      return NextResponse.json(
        { success: false, error: 'Invalid in_stock value (must be 0 or 1)' },
        { status: 400 }
      );
    }

    // ✅ Use pool to execute query
    const [result] = await pool.execute(
      'UPDATE products SET in_stock = ? WHERE id = ?',
      [in_stock, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Stock updated' });
  } catch (error) {
    console.error('❌ Error updating stock:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
