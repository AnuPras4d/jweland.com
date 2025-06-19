// components/HeroSectionSrishti.jsx
import React from 'react';
import Link from 'next/link';

const HeroSectionSrishti = () => {
  return (
    <section className="relative h-[380px] sm:h-[420px] md:h-[480px] lg:h-[550px] overflow-hidden">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-widest mb-4 drop-shadow">
            WELCOME TO SRISHTI
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-semibold mb-4 tracking-wide text-[#f8f5ef] drop-shadow-sm">
            PURE SILVER ORNAMENTS
          </p>
          <p className="text-xs sm:text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed text-gray-200 opacity-95">
            Gracefully simple yet eternally radiant, a pure silver necklace is not just jewelry — it’s a whisper of elegance forged in timeless light.
          </p>

          {/* Contact Button */}
          <Link href="#contact" passHref>
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
