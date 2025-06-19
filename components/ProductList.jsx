'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFiltered(data);
        } else {
          console.error('❌ Unexpected response from /api/products:', data);
          setProducts([]);
          setFiltered([]);
        }
      })
      .catch((err) => {
        console.error('❌ Failed to fetch products:', err);
        setProducts([]);
        setFiltered([]);
      });
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.category?.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }
  };

  const categories = ['All', 'Ring', 'Necklace', 'Bracelet', 'Earrings'];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              category === cat
                ? 'bg-[#0a1d37] text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.isArray(filtered) && filtered.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {product.in_stock ? (
              <Link href={`/products/${product.id}`} className="block mb-2 sm:mb-3">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`/upload/${product.thumbnail}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 opacity-50 cursor-not-allowed mb-2 sm:mb-3">
                <img
                  src={`/upload/${product.thumbnail}`}
                  alt={`${product.name} (Out of Stock)`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                  Out of Stock
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div className="mt-2">
                <h3 className="text-sm sm:text-md font-medium text-gray-800 group-hover:text-[#0a1d37] transition line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs uppercase text-gray-400 mt-1 tracking-wider">
                  {product.category}
                </p>
              </div>

              <div className="mt-3 sm:mt-4">
                <p className="text-base sm:text-lg font-bold text-[#0a1d37] mb-2 sm:mb-3">₹{product.price}</p>
                {product.in_stock ? (
                  <AddToCartButton
                    product={product}
                    style="mt-4 w-full flex items-center justify-center gap-2 bg-[#0a1d37] text-white px-5 py-3 rounded-lg font-medium text-sm shadow hover:bg-[#132b4d] active:scale-[0.98] transition-all duration-200"
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
