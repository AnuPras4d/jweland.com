// components/HeroSection.jsx
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden">
      {/* Background Image */}
      <img 
        src='/hero.jpg'
        alt="Beautiful jewelry"   
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Navy gradient overlay with lighter blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f44]/85 to-[#0a1d37]/65 backdrop-blur-[1px]" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-10">
        <div className="text-center text-white max-w-3xl animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-widest mb-4 drop-shadow-sm">
            SRISHTI
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-semibold mb-4 tracking-wide text-[#f8f5ef] drop-shadow">
            Pure Silver Collections 
          </p>
          <p className="text-xs sm:text-sm md:text-base mb-6 mx-auto max-w-xl leading-relaxed text-gray-200 opacity-95">
           Srishti Pure Silver Collections offers 999 pure silver, handcrafted Kerala-style jewellery with spiritual beads—authentic, custom-made pieces rooted in tradition and devotion.

          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6">
            <Link href="/srishti">
              <button className="bg-white text-[#0a1d37] hover:bg-[#f3f3f3] px-8 py-3 text-sm tracking-wide font-semibold rounded-full shadow-md transition duration-300 hover:shadow-lg">
                Explore Srishti
              </button>
            </Link>

           <Link href="https://wa.me/919072969697">
              <button className="bg-transparent border border-white text-white hover:bg-white hover:text-[#0a1d37] px-4 py-2 text-xs sm:text-sm rounded-full transition duration-300 text-center whitespace-nowrap">
                Customized Jewellery Products Available — Contact Directly!
              </button>
           </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
