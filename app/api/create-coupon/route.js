import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req) {
  try {
    const { code, discount_value } = await req.json();

    // Normalize and validate coupon code
    const normalizedCode = code?.trim().toUpperCase();
    const numericDiscount = Number(discount_value);
    const type = 'flat'; // Currently supporting only flat type

    // Validate inputs
    if (!normalizedCode || isNaN(numericDiscount) || numericDiscount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid input: Code or discount value is incorrect' },
        { status: 400 }
      );
    }

    // Insert the coupon into the database
    await db.execute(
      'INSERT INTO coupons (code, discount_value, type, is_used) VALUES (?, ?, ?, ?)',
      [normalizedCode, numericDiscount, type, 0]
    );

    return NextResponse.json({
      success: true,
      message: '✅ Coupon created successfully',
    });
  } catch (error) {
    console.error('❌ Create Coupon Error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
