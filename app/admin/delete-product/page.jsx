'use client';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      console.log("Fetched data from API:", data);

      if (Array.isArray(data)) {
        setProducts(data);
        setPreview(data);
      } else {
        console.error("Unexpected API response (not an array):", data);
        setProducts([]);
        setPreview([]);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
      setPreview([]);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(p =>
      p?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setPreview(filtered);
    if (filtered.length === 0) {
      alert('No matching products found');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;

    await fetch(`/api/products/${id}`, { method: 'DELETE' });

    setProducts(prev => prev.filter(p => p.id !== id));
    setPreview(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Delete Products</h1>
          <p className="text-lg text-gray-600">Manage your product inventory</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a1d37] transition duration-200"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#0a1d37] text-white px-8 py-3 rounded-xl hover:bg-[#132b4d] focus:ring-2 focus:ring-offset-2 shadow font-medium transition transform hover:-translate-y-0.5"
            >
              Search Products
            </button>
          </div>
        </div>

        {/* Products */}
        {!Array.isArray(preview) || preview.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or add some products first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {preview.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 flex lg:flex-col min-h-[120px] lg:min-h-0 items-center lg:items-stretch">
                <div className="relative overflow-hidden w-1/3 lg:w-full flex-shrink-0">
                  <img
                    src={`/upload/${p.thumbnail || 'default.jpg'}`}
                    alt={p.name || 'Product Image'}
                    className="h-24 sm:h-32 lg:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{p.name}</h2>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-[#0a1d37]">₹{p.price}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize font-medium">{p.category}</span>
                  </div>

                  <label className="flex items-center gap-2 text-sm mb-3">
                    <input
                      type="checkbox"
                      checked={p.in_stock === false}
                      onChange={async () => {
                        const updatedStock = p.in_stock ? 0 : 1;
                        const res = await fetch(`/api/products/${p.id}/stock`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ in_stock: updatedStock }),
                        });

                        if (res.ok) {
                          setProducts(prev =>
                            prev.map(prod =>
                              prod.id === p.id ? { ...prod, in_stock: !!updatedStock } : prod
                            )
                          );
                          setPreview(prev =>
                            prev.map(prod =>
                              prod.id === p.id ? { ...prod, in_stock: !!updatedStock } : prod
                            )
                          );
                        } else {
                          alert("❌ Failed to update stock status");
                        }
                      }}
                    />
                    Mark as <span className="font-medium text-red-600">Out of Stock</span>
                  </label>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{p.description}</p>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
