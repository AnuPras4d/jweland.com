// components/HeroSection.jsx
import React from 'react';

const HeroSectionSrishti = () => {
  return (
    <section className="relative h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
     {/* Background Image */}
<img 
  src="/banner.jpg" 
  alt="Beautiful jewelry" 
  className="absolute inset-0 w-full h-full object-cover blur-sm brightness-90"
/>


      {/* Navy green gradient overlay with lighter blur */}
<div className="absolute" />


      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-3xl animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-widest mb-4 drop-shadow-sm text-white">
            WELCOME TO SRISHTI
          </h1>
          <p className="text-base md:text-lg font-semibold mb-5 tracking-wide text-[#f8f5ef] drop-shadow">
            PURE SILVER ORNAMENTS
          </p>
          <p className="text-xs md:text-sm mb-8 max-w-lg mx-auto leading-relaxed text-gray-200 opacity-95">
            Gracefully simple yet eternally radiant, a pure silver necklace is not just jewelry — it’s a whisper of elegance forged in timeless light.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSrishti;
