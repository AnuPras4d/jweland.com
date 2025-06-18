'use client';
import { useState } from 'react';

export default function CouponMaker() {
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [createdCode, setCreatedCode] = useState('');

  const generateCoupon = async () => {
    if (!code || !discountValue) {
      setMessage('⚠️ Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');
    setCopied(false);
    setCreatedCode('');

    try {
      const res = await fetch('/api/create-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          discount_value: parseFloat(discountValue),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(`❌ ${data.message || 'Failed to create coupon'}`);
      } else {
        setMessage('✅ Coupon created!');
        setCreatedCode(code.trim());
        setCode('');
        setDiscountValue('');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Network or server error');
    } finally {
      setLoading(false);
    }
  };

 const handleCopy = () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(createdCode);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = createdCode;
      textarea.style.position = "fixed";  // Avoid scrolling to bottom on iOS
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (error) {
    console.error("Copy failed", error);
    setMessage("❌ Failed to copy");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#0a1d37]">🎟️ Create Flat Coupon</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SUMMER2025"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1d37]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="e.g. 50"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1d37]"
            />
          </div>

          <button
            onClick={generateCoupon}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0a1d37] hover:bg-[#0c2547]'
            }`}
          >
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>

          {message && (
            <div
              className={`text-center text-sm font-medium px-4 py-2 rounded-xl ${
                message.startsWith('✅')
                  ? 'text-green-600 bg-green-100'
                  : message.startsWith('⚠️')
                  ? 'text-yellow-600 bg-yellow-100'
                  : 'text-red-600 bg-red-100'
              }`}
            >
              {message}
            </div>
          )}

          {createdCode && (
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl border border-gray-300">
              <span className="font-mono text-sm text-gray-800">{createdCode}</span>
              <button
                onClick={handleCopy}
                className="ml-2 text-sm text-blue-600 font-medium hover:underline"
              >
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
