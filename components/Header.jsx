"use client"
import React, { useState } from 'react';
import {  ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center ">
              <a href="/">
              <img 
                src="/logo.svg" 
                alt="JWELAND Logo" 
                className="w-32 h-32 object-contain"
              /></a>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                {/* <span className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">JWELAND</span>
                <span className="text-xs text-gray-500 hidden sm:block">PRECIOUS METALS</span> */}
              </div>
            </div>
          </div>

          {/* Navigation - Desktop 
          <nav className="hidden md:flex space-x-6 lg:space-x-10">
            <a href="#" className="text-[#0a1f44] font-semibold tracking-wide hover:underline underline-offset-4 decoration-2 decoration-[#0a1f44] transition duration-200">
              HOME
            </a>
            <a href="#" className="text-[#001233] font-medium tracking-wide hover:underline underline-offset-4 decoration-2 decoration-[#0a1f44] transition duration-200">
              ABOUT
            </a>
            <a href="#" className="text-[#001233] font-medium tracking-wide hover:underline underline-offset-4 decoration-2 decoration-[#0a1f44] transition duration-200">
              CONTACTS
            </a>
          </nav> */}

          {/* Right side icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="relative">
              <a href='/cart'>
                  <ShoppingCart  className="w-6 h-6 text-[#001233] hover:text-[#0a1f44] cursor-pointer transition duration-200" />
              </a>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 items-center justify-center hidden">
                0
              </span>
            </div>

            {/* Mobile menu button 
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden w-6 h-6 text-[#001233] hover:text-[#0a1f44] transition duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button> */}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden absolute left-0 right-0 top-20 bg-white shadow-xl rounded-b-xl border-t border-gray-200 z-50
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-5'
          }
        `}>
          <nav className="px-6 py-4 space-y-4">
            <a 
              href="#" 
              className="block text-[#0a1f44] font-semibold tracking-wide hover:bg-[#f0f4ff] px-3 py-2 rounded-md transition duration-200"
              onClick={closeMobileMenu}
            >
              HOME
            </a>
            <a 
              href="#" 
              className="block text-[#001233] tracking-wide hover:bg-[#f0f4ff] px-3 py-2 rounded-md transition duration-200"
              onClick={closeMobileMenu}
            >
              ABOUT
            </a>
            <a 
              href="#" 
              className="block text-[#001233] tracking-wide hover:bg-[#f0f4ff] px-3 py-2 rounded-md transition duration-200"
              onClick={closeMobileMenu}
            >
              SHOP
            </a>
            <a 
              href="#" 
              className="block text-[#001233] tracking-wide hover:bg-[#f0f4ff] px-3 py-2 rounded-md transition duration-200"
              onClick={closeMobileMenu}
            >
              CONTACTS
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
