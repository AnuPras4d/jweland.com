import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const params = await context.params; // ✅ Must await
  const { orderid } = params;

  try {
    // 1️⃣ Get order details
    const [orderResult] = await db.execute(
      'SELECT * FROM orderdetails WHERE razorpay_order_id = ?',
      [orderid]
    );

    const order = orderResult[0];

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 2️⃣ Get ordered products
    const [productResult] = await db.execute(
      'SELECT * FROM orderproducts WHERE razorpay_order_id = ?',
      [orderid]
    );

    return NextResponse.json({
      order,
      products: productResult,
    });
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
