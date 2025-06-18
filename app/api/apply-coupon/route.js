import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req) {
  let connection;

  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code format' },
        { status: 400 }
      );
    }

    connection = await db.getConnection();
    const normalizedCode = code.trim().toUpperCase();

    console.log('🔍 Applying coupon:', normalizedCode);

    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT id, code, is_used, discount_value, type 
       FROM coupons 
       WHERE code = ? 
       FOR UPDATE`,
      [normalizedCode]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    const coupon = rows[0];

    if (coupon.is_used === 1) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: 'This coupon has already been used' },
        { status: 400 }
      );
    }

    if (coupon.type !== 'flat') {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: 'Invalid coupon type' },
        { status: 400 }
      );
    }

    const [updateResult] = await connection.execute(
      `UPDATE coupons 
       SET is_used = 1 
       WHERE id = ? AND is_used = 0`,
      [coupon.id]
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: 'Coupon already used' },
        { status: 409 }
      );
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      discount_value: parseFloat(coupon.discount_value),
      discount_type: coupon.type,
      message: 'Coupon applied successfully',
    });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('❌ Error in apply-coupon route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
