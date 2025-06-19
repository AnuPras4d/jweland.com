import pool from '@/lib/db'; // Use the shared connection pool
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if the pool exists and is usable
    if (!pool) {
      throw new Error('Database pool not initialized.');
    }

    const conn = await pool.getConnection();

    try {
      const [orders] = await conn.query(`SELECT * FROM orderdetails ORDER BY id DESC`);
      const [products] = await conn.query(`SELECT * FROM orderproducts`);

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

      return NextResponse.json(Object.values(orderMap));
    } finally {
      conn.release(); // Always release the connection
    }
  } catch (error) {
    console.error('❌ Error loading orders:', error.message);
    return NextResponse.json(
      { error: 'Failed to load orders', details: error.message },
      { status: 500 }
    );
  }
}
