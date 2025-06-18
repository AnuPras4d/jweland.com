import mysql from 'mysql2/promise';

export async function GET(req) {
  try {
    // 1. Create DB connection
    const db = await mysql.createConnection({
      host: 'sql12.freesqldatabase.com',
      user: 'sql12785563',
      password: 'gRtChFK6j4',
      database: 'sql12785563',
    });

    // 2. Get all orders
    const [orders] = await db.query(`SELECT * FROM orderdetails ORDER BY id DESC`);

    // 3. Get all order products
    const [products] = await db.query(`SELECT * FROM orderproducts`);

    // 4. Group products by razorpay_order_id
    const orderMap = {};
    for (const order of orders) {
      order.products = [];
      orderMap[order.razorpay_order_id] = order;
    }

    for (const product of products) {
      const order = orderMap[product.razorpay_order_id];
      if (order) {
        order.products.push(product);
      }
    }

    // 5. Return orders with their products
    return Response.json(Object.values(orderMap));
  } catch (error) {
    console.error('Error loading orders:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
