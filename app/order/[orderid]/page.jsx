'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function OrderPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderUrl, setOrderUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!params?.orderid) return;

      try {
        const res = await fetch(`/api/order/${params.orderid}`);
        const data = await res.json();

        setOrder(data.order);
        setProducts(data.products);
        const url = `${window.location.origin}/order/${params.orderid}`;
        setOrderUrl(url);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    fetchOrder();
  }, [params]);

 const copyToClipboard = async () => {
  try {
    // Try using the Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(orderUrl);
    } else {
      // Fallback for insecure or unsupported environments
      const textarea = document.createElement("textarea");
      textarea.value = orderUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  } catch (err) {
    console.error("Failed to copy:", err);
    alert("Copy failed. Please try manually.");
  }
};

  const getTrackingLink = () => {
    const { shipping_company, tracking_id } = order || {};
    if (!shipping_company || !tracking_id) return null;

    switch (shipping_company) {
      case 'DTDC':
        return `https://www.dtdc.in/tracking/tracking_results.asp?strCnno=${tracking_id}`;
      case 'Delhivery':
        return `https://www.delhivery.com/track/package/${tracking_id}`;
      case 'Indian Post':
        return `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/TrackConsignment.aspx`;
      case 'Xpress Beee':
        return `https://www.xpressbees.com/track?awb=${tracking_id}`;
      default:
        return null;
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <p className="text-gray-600 text-center mt-4 text-sm">Loading order details...</p>
        </div>
      </div>
    );
  }

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const discountedTotal = order.amount || total;
  const discount = total - discountedTotal;
  const trackingLink = getTrackingLink();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-700 bg-green-50 border-green-200';
      case 'shipped': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'processing': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'pending': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 rounded-t-lg">
          <div className="px-6 py-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmation</h1>
            <p className="text-gray-600">Thank you for your order. Your purchase has been confirmed.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white border-l border-r border-gray-200">
          <div className="grid lg:grid-cols-3 gap-0">
            
            {/* Left Column - Order Information */}
            <div className="lg:col-span-2 border-r border-gray-200">
              
              {/* Order Details Section */}
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Order ID</label>
                      <p className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                        {order.razorpay_order_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Payment ID</label>
                      <p className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                        {order.razorpay_payment_id || 'Payment Pending'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Order Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                <div className="text-sm text-gray-700 space-y-1 bg-gray-50 p-4 rounded border">
                  <p className="font-medium text-gray-900">{order.name}</p>
                  <p>{order.phone}</p>
                  <p>{order.building}, {order.locality}</p>
                  <p>{order.city}, {order.state} - {order.pincode}</p>
                  {order.landmark && <p>Landmark: {order.landmark}</p>}
                </div>
              </div>

              {/* Shipping & Tracking Section */}
              {order.shipping_company && (
                <div className="px-6 py-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Courier Service</label>
                      <p className="text-sm text-gray-900">{order.shipping_company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Tracking Number</label>
                      <p className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                        {order.tracking_id}
                      </p>
                    </div>
                  </div>
                  {trackingLink && (
                    <a
                      href={trackingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Track Package
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="px-6 py-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                {/* Products List */}
                <div className="space-y-4 mb-6">
                  {products.map((product, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <img
                        src={`/upload/${product.image}`}
                        alt={product.product_name}
                        className="w-16 h-16 rounded border object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">{product.product_name}</p>
                        <p className="text-sm text-gray-600">Qty: {product.qty}</p>
                        <p className="text-sm text-gray-600">₹{product.price} each</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">₹{product.price * product.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{total}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{discountedTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Order Link Section */}
        <div className="bg-white border border-gray-200 rounded-b-lg">
          <div className="px-6 py-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Order Reference Link</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save this link to access your order details and tracking information at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={orderUrl}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Please retain this link for your records. It provides access to your order status and tracking information.
              </p>
            </div>
          </div>
        </div>
        {/* Google Review Section */}
<div className="bg-white border-t border-gray-200 px-6 py-8 rounded-b-lg mt-6">
  <h3 className="text-base font-medium text-gray-900 mb-3">Enjoyed Your Experience?</h3>
  <p className="text-sm text-gray-600 mb-4">
    We’d love to hear your feedback! Your reviews help us improve and grow.
  </p>
  <a
    href="https://www.google.com/search?client=ms-android-oppo-rev1&sca_esv=f96236a721133e6f&sxsrf=AE3TifPky-XdM2eFi6TvzkHEYCKaqAD5dg:1750341513745&kgmid=/g/11trhz_n_r&q=Jeweland+Precious+Metals&shndl=30&shem=lstuoc2&source=sh/x/loc/act/m1/2&kgs=fd0f634b475edf83" // Replace with actual Google review link if available
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
  >
    ⭐ Leave a Google Review
  </a>
</div>

      </div>
    </div>
  );
}