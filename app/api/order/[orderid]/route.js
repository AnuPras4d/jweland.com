import db from '@/lib/db';

export async function GET(request, context) {
  const { params } = context;
  const { orderid } = params;

  try {
    // 1️⃣ Get order details from orderdetails table
    const [orderResult] = await db.execute(
      'SELECT * FROM orderdetails WHERE razorpay_order_id = ?',
      [orderid]
    );

    const order = orderResult[0];

    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    // 2️⃣ Get ordered products from orderproducts using razorpay_order_id
    const [productResult] = await db.execute(
      'SELECT * FROM orderproducts WHERE razorpay_order_id = ?',
      [orderid]
    );

    return Response.json({
      order,
      products: productResult
    });

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
