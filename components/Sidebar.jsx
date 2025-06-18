"use client"
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 lg:hidden bg-white text-slate-700 p-2.5 rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 hover:shadow-xl transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          w-80 sm:w-64 lg:w-64
          bg-white
          border-r border-slate-200
          text-slate-800
          py-6 px-0
          min-h-screen
          z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          overflow-y-auto
          shadow-xl lg:shadow-none
        `}
      >
        <div className="px-6">
          <a href="/admin" className="block">
            <div className="border-b border-slate-100 pb-6 mb-8 mt-8 lg:mt-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Admin Dashboard
              </h2>
              <p className="text-sm text-slate-500 mt-1">Management Console</p>
            </div>
          </a>
        </div>

        <nav className="space-y-8">
          {/* Jweland Products */}
          <div>
            <div className="px-6 mb-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Jweland Products
              </h3>
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/add-product"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-blue-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 rounded-lg mr-3 group-hover:bg-blue-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-medium">Add Product</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/delete-product"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-red-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-lg mr-3 group-hover:bg-red-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="font-medium">Delete Product</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Srishti Products */}
          <div>
            <div className="px-6 mb-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Srishti Products
              </h3>
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/add-srishti"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-green-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-green-50 text-green-600 rounded-lg mr-3 group-hover:bg-green-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-medium">Add Product</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/delete-srishti"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-red-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-lg mr-3 group-hover:bg-red-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="font-medium">Delete Product</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Management */}
          <div>
            <div className="px-6 mb-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Management
              </h3>
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-purple-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-50 text-purple-600 rounded-lg mr-3 group-hover:bg-purple-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="font-medium">Order Management</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/create-coupon"
                  className="flex items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 border-l-4 border-transparent hover:border-amber-500 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-amber-50 text-amber-600 rounded-lg mr-3 group-hover:bg-amber-100 transition-colors duration-150">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span className="font-medium">Create Coupon</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="px-6 pt-6 border-t border-slate-100">
            <LogoutButton />
          </div>
        </nav>
      </aside>
    </>
  );
}