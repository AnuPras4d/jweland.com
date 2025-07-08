"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Truck, RotateCcw, CreditCard } from 'lucide-react';

const PoliciesPage = () => {
  const [activePolicy, setActivePolicy] = useState('razorpay');

  const policies = {
    razorpay: {
      title: 'Payment Policy',
      icon: <CreditCard className="w-6 h-6" />,
      content: {
        overview: "We use Razorpay as our secure payment gateway to ensure safe and reliable transactions for all our customers.",
        sections: [
          {
            title: "Accepted Payment Methods",
            content: [
              "Credit Cards (Visa, MasterCard, American Express, Diners Club)",
              "Debit Cards",
              "Net Banking from all major banks",
              "UPI (Google Pay, PhonePe, Paytm, BHIM)",
              "Digital Wallets (Paytm, Mobikwik, Freecharge)",
              "EMI options available for eligible purchases"
            ]
          },
          {
            title: "Payment Security",
            content: [
              "All payments are processed through Razorpay's PCI DSS compliant platform",
              "SSL encryption protects your payment information",
              "We do not store your card details on our servers",
              "Two-factor authentication for enhanced security",
              "Real-time fraud detection and prevention"
            ]
          },
          {
            title: "Payment Process",
            content: [
              "Select your preferred payment method at checkout",
              "Enter your payment details on Razorpay's secure page",
              "Complete the transaction with OTP verification if required",
              "Receive instant payment confirmation via email and SMS",
              "Order processing begins immediately after successful payment"
            ]
          },
          {
            title: "Failed Payments",
            content: [
              "If payment fails, you can retry with the same or different payment method",
              "Failed payment amounts are automatically refunded within 5-7 business days",
              "Contact our support team if you face recurring payment issues",
              "Check your bank's daily transaction limits if payment is declined"
            ]
          }
        ]
      }
    },
    shipping: {
      title: 'Shipping Policy',
      icon: <Truck className="w-6 h-6" />,
      content: {
        overview: "Our shipping policy aims to get your purchase delivered as quickly and securely as possible. Below are the key details:",
        sections: [
          {
            title: "Shipping Methods & Timeline",
            content: [
              "Standard Shipping: Orders are shipped within 3-5 business days via tracked courier delivery",
              "Delivery Timeline: 5-7 business days within India",
              "All shipments are processed through reliable courier partners for secure delivery"
            ]
          },
          {
            title: "Tracking & Communication",
            content: [
              "All orders are shipped with a tracking number for online tracking",
              "Tracking details are sent to customers via WhatsApp once the order is shipped",
              "Monitor your shipment progress in real-time with the provided tracking number"
            ]
          },
          {
            title: "Damages or Losses",
            content: [
              "Contact us immediately if you receive a damaged package",
              "Open box video is required to claim refund for damaged items",
              "We provide replacement or refund for damaged shipments upon verification",
              "Our team will assist you promptly with any shipping issues"
            ]
          },
          {
            title: "Contact & Support",
            content: [
              "For shipping queries: jewelandcty@gmail.com",
              "WhatsApp support: +91 9072969697",
              "We strive for timely and secure deliveries",
              "Delays may occur due to reasons beyond our control - thank you for your understanding"
            ]
          }
        ]
      }
    },
    return: {
      title: 'Return Policy',
      icon: <RotateCcw className="w-6 h-6" />,
      content: {
        overview: "We aim to ensure you are completely satisfied with your purchase. Please follow the guidelines below:",
        sections: [
          {
            title: "Return Eligibility & Requirements",
            content: [
              "Returns accepted only for: size issues, product damaged during shipment, or wrong product sent",
              "Unboxing video is required to initiate the return process",
              "All returns must be made within 7 days of receipt of delivery",
              "Items must be in their original packaging",
              "Return shipping costs are the responsibility of the customer"
            ]
          },
          {
            title: "Return Process",
            content: [
              "Notify us by email at jewelandcty@gmail.com or WhatsApp +91 9072969697",
              "Provide unboxing video and order details for verification",
              "Once return is accepted, send the product with your order number",
              "Use our provided return address for shipping the item back"
            ]
          },
          {
            title: "Return Address",
            content: [
              "Jeweland Precious Metals",
              "Door No 13/655, Kalathil Building",
              "Near Faihas Wedding Mall, Main Road Cheruthuruthy",
              "Thrissur, Kerala - 679531",
              "Phone: 9072969697"
            ]
          },
          {
            title: "Refund Process",
            content: [
              "Refunds provided through GPay/PhonePe after item inspection",
              "Processing time: 3-5 business days after we receive the returned item",
              "Allow up to 10 business days for complete processing of returns/refunds",
              "We aim to resolve any issues promptly and keep you informed throughout the process"
            ]
          }
        ]
      }
    }
  };

  const PolicySection = ({ section }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-navy-800 mb-4 border-b-2 border-navy-200 pb-2">
        {section.title}
      </h3>
      <ul className="space-y-2">
        {section.content.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="w-2 h-2 bg-navy-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-navy-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Policies</h1>
            <p className="text-xl text-navy-200 max-w-2xl mx-auto">
              Transparent policies designed with your trust and satisfaction in mind
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Policy Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(policies).map(([key, policy]) => (
            <button
              key={key}
              onClick={() => setActivePolicy(key)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activePolicy === key
                  ? 'bg-navy-800 text-white shadow-lg transform scale-105'
                  : 'bg-white text-navy-800 border border-navy-200 hover:bg-navy-50 hover:border-navy-400'
              }`}
            >
              {policy.icon}
              <span className="ml-2">{policy.title}</span>
            </button>
          ))}
        </div>

        {/* Active Policy Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-100 rounded-full mb-4">
              <div className="text-navy-800">
                {policies[activePolicy].icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              {policies[activePolicy].title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {policies[activePolicy].content.overview}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {policies[activePolicy].content.sections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <PolicySection section={section} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-navy-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-navy-200 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions about our policies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:jewelandcty@gmail.com" className="bg-white text-navy-800 px-6 py-3 rounded-lg font-medium hover:bg-navy-50 transition-colors">
              Email Us
            </a>
            <a href="https://wa.me/919072969697" target="_blank" rel="noopener noreferrer" className="border border-navy-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors">
              WhatsApp Support
            </a>
          </div>
          <div className="mt-4 text-navy-200">
            <p>Email: jewelandcty@gmail.com</p>
            <p>WhatsApp: +91 9072969697</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-navy-50 { color: #f8fafc; }
        .text-navy-200 { color: #cbd5e1; }
        .text-navy-600 { color: #475569; }
        .text-navy-800 { color: #1e293b; }
        .text-navy-900 { color: #0f172a; }
        .bg-navy-50 { background-color: #f8fafc; }
        .bg-navy-100 { background-color: #f1f5f9; }
        .bg-navy-200 { background-color: #e2e8f0; }
        .bg-navy-400 { background-color: #94a3b8; }
        .bg-navy-700 { background-color: #334155; }
        .bg-navy-800 { background-color: #1e293b; }
        .bg-navy-900 { background-color: #0f172a; }
        .border-navy-200 { border-color: #e2e8f0; }
        .border-navy-400 { border-color: #94a3b8; }
        .hover\\:bg-navy-50:hover { background-color: #f8fafc; }
        .hover\\:bg-navy-700:hover { background-color: #334155; }
        .hover\\:border-navy-400:hover { border-color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default PoliciesPage;