'use client';
import { useState } from 'react';

export default function QuantityControl({ qty, onChange }) {
  const [quantity, setQuantity] = useState(qty);

  const handleChange = (val) => {
    const newQty = Math.max(1, quantity + val);
    setQuantity(newQty);
    onChange(newQty);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleChange(-1)}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        -
      </button>
      <span className="px-3">{quantity}</span>
      <button
        onClick={() => handleChange(1)}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
