import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const normalizedCode = code.trim().toUpperCase();

    const [results] = await db.execute(
      'SELECT * FROM coupons WHERE code = ?',
      [normalizedCode]
    );

    const coupon = results[0];

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon' },
        { status: 404 }
      );
    }

    if (coupon.is_used) {
      return NextResponse.json(
        { success: false, message: 'This coupon has already been used' },
        { status: 400 }
      );
    }

    if (coupon.type !== 'flat') {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon type' },
        { status: 400 }
      );
    }

    // Mark coupon as used (optional, or you can do this after payment)
    await db.execute(
      'UPDATE coupons SET is_used = 1 WHERE id = ?',
      [coupon.id]
    );

    return NextResponse.json({
      success: true,
      discountType: coupon.type,
      discountValue: parseFloat(coupon.discount_value),
      message: 'Coupon verified successfully',
    });
  } catch (error) {
    console.error('❌ Verify Coupon Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error verifying coupon' },
      { status: 500 }
    );
  }
}
