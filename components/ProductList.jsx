'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All',
    'CHAINS',
    'BRACELETS',
    'RINGS',
    'ANKLETS',
    'NECKLACES',
    'BANGLES',
    'TOE RINGS',
    'EAR RINGS',
    'NOSEPINS',
    'PENDENTS',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/paginated?page=${page}`);
        const data = await res.json();

        if (Array.isArray(data.products)) {
          let filteredData = data.products;

          if (category !== 'All') {
            filteredData = filteredData.filter((p) =>
              p.category?.toLowerCase().includes(category.toLowerCase())
            );
          }

          // If filtered results are empty and we're not on page 1, reset to page 1
          if (filteredData.length === 0 && page !== 1) {
            setPage(1); // This will trigger useEffect again
          } else {
            setProducts(data.products);
            setTotalPages(data.totalPages || 1);
            setFiltered(filteredData);
          }
        } else {
          console.error('❌ Unexpected response:', data);
          setProducts([]);
          setFiltered([]);
        }
      } catch (err) {
        console.error('❌ Fetch failed:', err);
        setProducts([]);
        setFiltered([]);
      }
    };

    fetchProducts();
  }, [page, category]);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
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

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Category Filters */}
      <div className="mb-8">
        {/* Mobile Filter */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span className="font-medium text-gray-700">Category: <span className="text-gray-900 font-semibold">{category}</span></span>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filter Pills */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block transition-all duration-200`}>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  handleCategory(cat);
                  setShowFilters(false);
                }}
                className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  category === cat
                    ? 'bg-[#0a1d37] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
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
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider">
                      Out of Stock
                    </span>
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
                  <p className="text-base sm:text-lg font-bold text-[#0a1d37] mb-2 sm:mb-3">
                    ₹{product.price}
                  </p>
                  {product.in_stock ? (
                    <AddToCartButton
                      product={product}
                      style="mt-4 w-full flex items-center justify-center gap-2 bg-[#0a1d37] text-white px-5 py-3 rounded-lg font-medium text-sm shadow hover:bg-[#132b4d] active:scale-[0.98] transition-all duration-200"
                    />
                  ) : (
                    <button
                      disabled
                      className="mt-4 w-full bg-gray-300 px-5 py-3 rounded-lg font-medium text-sm cursor-not-allowed"
                    >
                      <span className="text-red-500">Out of Stock</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-gray-400">We couldn't find anything in <span className="font-semibold">{category}</span> category.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {filtered.length > 0 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}