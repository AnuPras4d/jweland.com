// components/HeroSectionSrishti.jsx
import React from 'react';
import Link from 'next/link';

const HeroSectionSrishti = () => {
  return (
    <section className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] overflow-hidden">
      {/* Background Image */}
      <img 
        src="/banner.jpg" 
        alt="Beautiful jewelry" 
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-90"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-10 text-center text-white max-w-3xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-widest mb-3 drop-shadow">
            Welcome To Srishti
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-semibold mb-3 tracking-wide text-[#f8f5ef] drop-shadow-sm">
            "Srishti Pure Silver Collections"
          </p>
          <p className="text-xs sm:text-sm md:text-base mb-4 max-w-xl mx-auto leading-relaxed text-gray-200 opacity-95">
            Srishti Pure Silver Collections offers 999 pure silver, handcrafted jewellery rooted in Kerala’s goldsmith heritage. Featuring certified spiritual beads like Rudraksha and Karungali, each piece blends tradition, purity, and devotion—perfect for poojas, festivals, gifting, or everyday elegance.
          </p>

          {/* Contact Button */}
          <Link href="https://wa.me/919072969697" passHref>
            <span className="inline-block bg-white text-black font-semibold text-xs sm:text-sm md:text-base px-6 py-2 rounded-full shadow-md hover:bg-[#d3cfc5] transition-all duration-300 cursor-pointer">
              Customized Jewelry Products Available — Contact Directly!
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSrishti;
