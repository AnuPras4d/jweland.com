import { NextResponse } from 'next/server';
import db from '@/lib/db';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      razorpay_order_id = '',
      razorpay_payment_id = '',
      razorpay_signature = '',
      name = '',
      address = '',
      building = '',
      number = '',
      pincode = '',
      phone = '',
      locality = '',
      landmark = '',
      state = '',
      city = '',
      status = 'Pending',
      amount = 0,
      size = null,
      products = [],
      coupon = null,
      giftNote = '',
    } = data;

    // ✅ Debug log for signature check
    console.log('Incoming Order:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      products,
    });

    // ✅ Check if required data is present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !products.length || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing required order fields' },
        { status: 400 }
      );
    }

    // ✅ Razorpay signature verification
    const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET) // ✅ correct

      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn('Signature mismatch:', expectedSignature, '!=', razorpay_signature);
      return NextResponse.json(
        { success: false, message: 'Invalid Razorpay Signature' },
        { status: 400 }
      );
    }

    // ✅ Save to orderdetails
    const orderQuery = `
      INSERT INTO orderdetails 
      (razorpay_order_id, razorpay_payment_id, razorpay_signature, name, address, building, number, pincode, phone, locality, landmark, state, city, status, amount, size, coupon, gift_note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [orderResult] = await db.execute(orderQuery, [
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      address,
      building,
      number,
      pincode,
      phone,
      locality,
      landmark,
      state,
      city,
      status,
      parseInt(amount), // ensure it's stored correctly
      size,
      coupon,
      giftNote,
    ]);

    const orderid = orderResult.insertId;

    // ✅ Save ordered products
    const productQuery = `
      INSERT INTO orderproducts 
      (razorpay_order_id, product_name, size, price, qty, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const product of products) {
      const imageFilename = product.thumbnail?.split('/').pop() || '';
      await db.execute(productQuery, [
        razorpay_order_id,
        product.name || '',
        product.size || size || null,
        product.price || 0,
        product.qty || 1,
        imageFilename
      ]);
    }

    return NextResponse.json({ success: true, orderid });

  } catch (error) {
    console.error('Save order error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
