import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { order_id, status, shipping_company, tracking_id } = await req.json();

    // Validate input
    if (!order_id) {
      return NextResponse.json(
        { success: false, message: 'order_id is required.' },
        { status: 400 }
      );
    }

    // Debug log
    console.log('Updating Order:', {
      order_id,
      status,
      shipping_company,
      tracking_id
    });

    // Execute update
    await db.execute(
      `UPDATE orderdetails 
       SET status = ?, shipping_company = ?, tracking_id = ? 
       WHERE razorpay_order_id = ?`,
      [status || 'Pending', shipping_company || '', tracking_id || '', order_id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
