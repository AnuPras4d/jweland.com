'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from '@/components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductDetailClient({ product, images }) {
  const [current, setCurrent] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const sliderSettings = {
    slidesToShow: images.length >= 4 ? 4 : images.length,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    infinite: true,
    centerMode: false,
    afterChange: idx => setCurrent(idx),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: selectedSize?.price || product.price,
      size: selectedSize?.size || null,
      thumbnail: product.thumbnail,
      qty: 1,
    };
    addToCart(item);
    alert(`${product.name} added to cart`);
    return true;
  };

  const handleAddBuynow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: selectedSize?.price || product.price,
      size: selectedSize?.size || null,
      thumbnail: product.thumbnail,
      qty: 1,
    };
    addToCart(item);
    return true;
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Home</span>
              <span>/</span>
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="text-[#0a1d37] font-medium truncate">{product.name}</span>
            </div>
          </nav>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Section - Enhanced */}
              <div className="lg:col-span-7 p-6 lg:p-8">
                {/* Main Image */}
                <div className="relative mb-6">
                  <div className="aspect-square w-full max-w-lg mx-auto bg-gray-50 rounded-xl overflow-hidden group">
                    <img
                      src={`/upload/${images[current]}`}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Image Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2 rounded-full shadow-md transition-all ${
                        isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-[#0a1d37] transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {current + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnail Slider */}
                <div className="max-w-lg mx-auto">
                  <Slider {...sliderSettings} className="thumbnail-slider">
                    {images.map((img, idx) => (
                      <div key={idx} className="px-1">
                        <button
                          onClick={() => setCurrent(idx)}
                          className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            current === idx 
                              ? 'border-[#0a1d37] shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={`/upload/${img}`}
                            alt={`View ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>

              {/* Product Info Section - Enhanced */}
              <div className="lg:col-span-5 p-6 lg:p-8 bg-gray-50">
                <div className="sticky top-8">
                  {/* Product Header */}
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#0a1d37] text-white text-xs font-medium rounded-full uppercase tracking-wide">
                        {product.category}
                      </span>
                      
                    </div>
                    
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#0a1d37] mb-4 leading-tight">
                      {product.name}
                    </h1>

                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-[#0a1d37]">
                        ₹{selectedSize?.price || product.price}
                      </span>
                      {selectedSize && selectedSize.price !== product.price && (
                        <span className="text-xl text-gray-400 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Selection - Enhanced */}
                  {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#0a1d37] mb-3">
                        Select Size
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {product.sizes.map((size, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSize(size)}
                            className={`p-3 border-2 rounded-lg text-center transition-all ${
                              selectedSize?.size === size.size
                                ? 'border-[#0a1d37] bg-[#0a1d37] text-white'
                                : 'border-gray-200 hover:border-[#0a1d37] bg-white'
                            }`}
                          >
                            <div className="font-medium">{size.size}</div>
                            <div className="text-xs opacity-75">₹{size.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Enhanced */}
                  <div className="space-y-3 mb-8">
                    <button
                      onClick={async () => {
                        const result = await handleAddBuynow();
                        if (result) {
                          window.location.href = '/cart';
                        }
                      }}
                      className="w-full bg-[#0a1d37] text-white hover:bg-[#132b4d] transition-colors px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Buy Now
                    </button>
                    
                    <button
                      onClick={handleAdd}
                      className="w-full border-2 border-[#0a1d37] bg-white text-[#0a1d37] hover:bg-gray-50 transition-colors px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>

                  {/* Description */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-[#0a1d37] mb-3">
                      Product Details
                    </h3>
                    <div className="prose prose-sm text-gray-700 leading-relaxed">
                      <p className="whitespace-pre-line">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}