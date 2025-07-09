// components/HeroSectionSrishti.jsx
import React from 'react';
import Link from 'next/link';

const HeroSectionSrishti = () => {
  return (
    <section className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] overflow-hidden">
      {/* Background Image with Better Contrast */}
      <div className="absolute inset-0">
        <img 
          src="/banner.jpg" 
          alt="Exquisite handcrafted silver jewelry" 
          className="w-full h-full object-cover object-center brightness-75 contrast-110"
        />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center text-white max-w-4xl mx-auto">
          
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-[0.15em] mb-3 text-shadow-lg">
              Welcome To
              <span className="block font-bold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Srishti
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base font-medium tracking-widest text-gray-200 mb-0">
              PURE SILVER COLLECTIONS
            </p>
            
            {/* Decorative Line */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4" />
          </div>

          {/* Description */}
          <div className="mb-6 animate-fade-in-up animation-delay-200">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-100 max-w-2xl mx-auto font-light">
              Handcrafted 999 pure silver jewelry rooted in Kerala's goldsmith heritage
            </p>
            <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-300 max-w-xl mx-auto">
              Featuring certified spiritual beads like Rudraksha and Karungali, each piece blends tradition, purity, and devotion
            </p>
          </div>

          {/* Call to Action */}
          <div className="animate-fade-in-up animation-delay-400">
            <Link href="https://wa.me/919072969697" passHref>
              <span className="group relative inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-semibold text-gray-900 bg-white rounded-full shadow-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl hover:scale-105 cursor-pointer">
                <span className="relative z-10">
                  Customized Jewelry Available
                </span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ⛔ Scroll Indicator Removed */}
    </section>
  );
};

export default HeroSectionSrishti;
