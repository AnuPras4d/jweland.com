// app/page.jsx
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ProductListPage from '@/components/ProductList';
import ImageSlider from '@/components/ImageSlider';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Header />
      <HeroSection />
      <ImageSlider />
      
      
      {/* Add an ID here to scroll into this section */}
      <section id="productlist"  >
        <ProductListPage />
      </section>
      
      <Footer />
    </div>
  );
}
