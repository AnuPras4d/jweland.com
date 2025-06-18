import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body;

    // ✅ Debug log to check incoming amount
    console.log("Received amount from frontend:", amount);

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    // ✅ Correct secret key from .env.local
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // ✅ Multiply amount by 100 to convert to paise
    const payment = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
