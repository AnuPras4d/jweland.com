'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTotal } from '@/context/TotalContext';

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const isPaid = localStorage.getItem('payment_done');
    if (isPaid === 'true') {
      router.replace('/');
    }
  }, []);

  const [form, setForm] = useState({
    name: '', building: '', pincode: '',
    phone: '', locality: '', landmark: '',
    state: '', city: ''
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const { cartItems, clearCart, discount, couponCode } = useCart();
  const { total, giftNote } = useTotal();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    const formData = { ...form, number: form.phone };

    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: 'Jweland',
      description: 'Order Payment',
      order_id: data.id,
      handler: async function (response) {
        const orderData = {
          ...formData,
          products: cartItems,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount: total,
          coupon: couponCode || null,
          giftNote,
          status: 'Pending'
        };

        const save = await fetch('/api/save-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        const result = await save.json();
        clearCart();
        localStorage.setItem('payment_done', 'true');
        router.push(`/order/${response.razorpay_order_id}`);
      },
      prefill: {
        name: form.name,
        contact: form.phone
      },
      notes: {
        address: form.locality
      },
      theme: {
        color: '#0a1d37'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#f5faff] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#d6e4f0] rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#0a1d37]">Delivery Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(form).map(([key, value]) => {
                  if (key === "state") {
                    return (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-[#0a1d37] capitalize">State</label>
                        <select
                          name={key}
                          value={value}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl text-gray-800 focus:ring-2 focus:ring-[#0a1d37]"
                        >
                          <option value="">Select State</option>
                          {indianStates.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium text-[#0a1d37] capitalize">
                        {{
                          name: 'Name',
                          building: 'Building No/Name',
                          phone: 'Phone Number',
                          locality: 'Area, Street, Town',
                          landmark: 'Landmark',
                          pincode: 'PIN Code',
                          city: 'City'
                        }[key]}
                      </label>
                      <input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required
                        type={key === 'phone' ? 'tel' : key === 'pincode' ? 'number' : 'text'}
                        placeholder={`Enter ${key}`}
                        className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#0a1d37]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#d6e4f0] rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0a1d37]">Order Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0a1d37]">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-[#0a1d37]">₹{cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Coupon "{couponCode}"</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[#0a1d37]">Total</span>
                      <span className="text-xl font-bold text-[#0a1d37]">₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-[#0a1d37] hover:bg-[#08152f] text-white font-semibold py-4 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Proceed to Pay ₹{total}</span>
                </div>
              </button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                <span>Secured by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
