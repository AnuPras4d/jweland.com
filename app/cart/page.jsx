'use client';
import { useCart } from '@/context/CartContext';
import { useTotal } from '@/context/TotalContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  useEffect(() => {
    localStorage.removeItem('payment_done');
  }, []);

  const { cartItems, removeFromCart, clearCart } = useCart();
  const { setTotal, setGiftNote } = useTotal();
  const router = useRouter();

  const [isGift, setIsGift] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('');
  const [message, setMessage] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  const total = Math.max(subtotal - discount + (isGift ? 50 : 0), 0);

  const handleOrder = () => {
    if (isGift) setGiftNote('for gift');
    else setGiftNote('');

    const trimmed = coupon.trim();
    router.push(`/payment${trimmed ? `?coupon=${encodeURIComponent(trimmed)}` : ''}`);
  };

  const applyCoupon = async () => {
    if (couponApplied) return setMessage('❌ Coupon already applied');
    if (!cartItems.length) return setMessage('❌ Your cart is empty');

    const trimmedCode = coupon.trim();
    if (!trimmedCode) return setMessage('❌ Please enter a coupon code');

    try {
      const res = await fetch('/api/verify-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmedCode }),
      });
      const data = await res.json();

      if (!res.ok) return setMessage(`❌ ${data.message || 'Failed to apply coupon'}`);
      if (data.discountType !== 'flat') return setMessage('❌ Unsupported coupon type');

      const flatDiscount = Math.min(data.discountValue, subtotal);
      setDiscount(flatDiscount);
      setCouponApplied(true);
      setDiscountType('flat');
      setMessage(`✅ Coupon applied: ₹${flatDiscount.toFixed(2)} off`);
    } catch (err) {
      console.error('Coupon Error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#0a1d37]">Shopping Cart</h1>
            <p className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <div className="w-16 h-16 bg-[#0a1d37] rounded-full flex items-center justify-center shadow-md">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5h12.2M6 21a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 rounded-2xl text-center shadow-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5h12.2M6 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#0a1d37]">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add items to start your order.</p>
            <a href="/#productlist" className="inline-block bg-[#0a1d37] hover:bg-[#08152d] text-white font-medium px-6 py-3 rounded-xl transition-all duration-200">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-3 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-xl overflow-hidden">
                      <img src={`/upload/${item.thumbnail}`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#0a1d37] mb-1">{item.name}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{item.category}</span>
                            <span>Qty: {item.qty}</span>
                          </div>
                          <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#0a1d37]">₹{item.price}</p>
                            <p className="text-sm text-gray-400">per item</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md sticky top-6">
                <h2 className="text-2xl font-bold text-[#0a1d37] mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm text-[#0a1d37]">
                  <div className="flex justify-between border-b pb-2">Items <span>{cartItems.length}</span></div>
                  <div className="flex justify-between border-b pb-2">Subtotal <span>₹{subtotal}</span></div>
                  <div className="flex justify-between border-b pb-2 text-green-600">Discount <span>- ₹{discount.toFixed(2)}</span></div>
                  <div className="flex items-center gap-2 mt-3 bg-[#e6f5ec] p-3 rounded-xl">
                    <input type="checkbox" id="giftOption" checked={isGift} onChange={(e) => setIsGift(e.target.checked)} className="accent-green-600" />
                    <label htmlFor="giftOption" className="text-sm">Add Gift Wrap (+₹50)</label>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold pt-4 border-t">
                    Total <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1d37]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="w-full mt-2 bg-[#0a1d37] hover:bg-[#08152d] text-white py-2 rounded-lg transition"
                  >
                    Apply Coupon
                  </button>
                  {message && <p className={`text-sm mt-2 ${discount ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleOrder}
                    className="w-full bg-gradient-to-r from-[#0a1d37] to-[#0a1d37] hover:from-[#08152d] hover:to-[#08152d] text-white font-semibold py-3 rounded-xl transition-all hover:scale-105 shadow"
                  >
                    Place Order
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-[#0a1d37] font-medium py-3 rounded-xl border border-gray-200 transition"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t text-sm text-gray-500 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
