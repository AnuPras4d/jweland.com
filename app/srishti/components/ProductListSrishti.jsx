'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductListSrishti() {
  const [srishti, setSrishti] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/srishti')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSrishti(data);
          setFiltered(filterByCategory(data, category));
        } else {
          console.error('❌ Unexpected response from /api/srishti:', data);
          setSrishti([]);
          setFiltered([]);
        }
      })
      .catch((err) => {
        console.error('❌ Failed to fetch srishti items:', err);
        setSrishti([]);
        setFiltered([]);
      });
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    setFiltered(filterByCategory(srishti, cat));
  };

  const filterByCategory = (items, cat) => {
    if (cat === 'All') return items;
    return items.filter((item) =>
      item.category?.toLowerCase().includes(cat.toLowerCase())
    );
  };

  const getDisplayPrice = (item) => {
    if (item.sizes) {
      try {
        const parsed = JSON.parse(item.sizes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sorted = parsed.sort((a, b) => a.price - b.price);
          return `${sorted[0].price} onwards`;
        }
      } catch {
        // Ignore malformed JSON
      }
    }
    return item.price;
  };

  const categories = ['All', 'Ring', 'Necklace', 'Bracelet', 'Earrings'];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white text-[#013220]">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              category === cat
                ? 'bg-[#014034] text-white shadow'
                : 'bg-[#edf5f0] text-[#014034] hover:bg-[#d4ede1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Srishti Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white rounded-xl border border-[#d4ede1] p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {item.in_stock ? (
              <Link href={`/srishtiproducts/${item.id}`} className="block mb-2 sm:mb-3">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-[#f0f7f3]">
                  <img
                    src={`/upload/${item.thumbnail}`}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-[#f0f7f3] opacity-50 cursor-not-allowed mb-2 sm:mb-3">
                <img
                  src={`/upload/${item.thumbnail}`}
                  alt={`${item.name} (Out of Stock)`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                  Out of Stock
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div className="mt-2">
                <h3 className="text-sm sm:text-md font-medium text-[#014034] group-hover:text-[#01291d] transition line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs uppercase text-[#5f8f78] mt-1 tracking-wider">
                  {item.category}
                </p>
              </div>

              <div className="mt-3 sm:mt-4">
                <p className="text-base sm:text-lg font-bold text-[#014034] mb-2 sm:mb-3">
                  ₹{getDisplayPrice(item)}
                </p>
                {item.in_stock ? (
                  <AddToCartButton
                    product={item}
                    style="mt-4 w-full flex items-center justify-center gap-2 bg-[#014034] text-white px-5 py-3 rounded-lg font-medium text-sm shadow hover:bg-[#01291d] active:scale-[0.98] transition-all duration-200"
                  />
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full bg-gray-300 text-gray-600 px-5 py-3 rounded-lg font-medium text-sm cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
