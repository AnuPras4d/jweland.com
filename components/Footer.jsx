'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{title}</h4>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const contactInfo = [
    'jewelandcty@gmail.com',
    '+91 9072969697',
    'Jeweland Precious Metals, Door No: 13/655, Kalathil Building, Near Faihas Wedding Mall, Main Road, Cheruthuruthy',
  ];

  return (
    <footer className="bg-[#0a1d37] text-white pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Logo & About (Left) */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="/footerlogo.svg"
              alt="JWELAND Logo"
              width={300}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            More than adornment, our silver jewelry is a reflection of light, love, and legacy — designed to celebrate your unique journey with elegance and purity that lasts forever.
          </p>
        </div>

        {/* Empty space or future column */}
        <div></div>
        <div></div>

        {/* Contact Info (Right) */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {contactInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700">
        <div className="bg-[#0f2444] rounded-lg p-6 mb-6">
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Payment & Privacy Notice</h4>
          <div className="text-xs text-gray-400 leading-relaxed space-y-2">
            <p>
              <strong className="text-gray-300">Payment Security:</strong> We use Razorpay for secure payment processing. Your payment information is encrypted and processed securely by Razorpay's PCI DSS compliant systems. We do not store your complete card details on our servers.
            </p>
            <p>
              <strong className="text-gray-300">Data Protection:</strong> We collect and process personal information including name, email, phone number, and shipping address to fulfill your orders. Your data is protected under applicable privacy laws and is never shared with unauthorized third parties.
            </p>
            <p>
              <strong className="text-gray-300">Third-Party Services:</strong> We use Razorpay (payment processing), shipping partners (order delivery), and analytics tools to improve our services. These partners have their own privacy policies and security measures.
            </p>
            <p>
              <strong className="text-gray-300">Your Rights:</strong>You have the right to access, update, or delete your personal information. Contact us at jewelandcty@gmail.com for any privacy-related queries or to exercise your data rights.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div>
            © 2025 <span className="font-semibold text-white">JWELAND PRECIOUS METAL</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span>Secured by</span>
            <span className="bg-blue-600 px-2 py-1 rounded text-white font-medium">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
