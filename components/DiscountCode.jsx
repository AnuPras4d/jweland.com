'use client';
import { useState } from 'react';

export default function DiscountCode({ onApply }) {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (code.trim() === '') return alert('Enter a discount code');
    onApply(code);
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Enter discount code"
        className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleApply}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Apply
      </button>
    </div>
  );
}
