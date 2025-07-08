'use client';
import { useEffect, useState } from 'react';

export default function UpdateOrderPage() {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [shippingMap, setShippingMap] = useState({});
  const [trackingMap, setTrackingMap] = useState({});
  const [disabledMap, setDisabledMap] = useState({});
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      const res = await fetch('/api/get-all-orders');
const data = await res.json();

if (!Array.isArray(data)) {
  console.error('Expected array but got:', data);
  return;
}

setOrders(data);

const status = {};
const shipping = {};
const tracking = {};
const disabled = {};

data.forEach(order => {
  status[order.razorpay_order_id] = order.status || 'Pending';
  shipping[order.razorpay_order_id] = order.shipping_company || '';
  tracking[order.razorpay_order_id] = order.tracking_id || '';
  disabled[order.razorpay_order_id] = true;
});

setStatusMap(status);
setShippingMap(shipping);
setTrackingMap(tracking);
setDisabledMap(disabled);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    // Set up real-time polling every 30 seconds
    const interval = setInterval(fetchOrders, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (order_id) => {
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/update-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id,
          status: statusMap[order_id],
          shipping_company: shippingMap[order_id],
          tracking_id: trackingMap[order_id]
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('✅ Order updated successfully!');
        setDisabledMap(prev => ({
          ...prev,
          [order_id]: true
        }));
        
        // Refresh orders data immediately after successful update
        await refreshOrders();
      } else {
        alert('❌ Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('❌ Failed to update order');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshOrders = async () => {
    try {
       const res = await fetch('/api/get-all-orders');
    const data = await res.json();

if (!Array.isArray(data)) {
  console.error('Expected array in refreshOrders but got:', data);
  alert("⚠️ Something went wrong while loading orders. Please try again later.");
  return;
}

setOrders(data);

const status = {};
const shipping = {};
const tracking = {};

data.forEach(order => {
  status[order.razorpay_order_id] = order.status || 'Pending';
  shipping[order.razorpay_order_id] = order.shipping_company || '';
  tracking[order.razorpay_order_id] = order.tracking_id || '';
});

setStatusMap(status);
setShippingMap(shipping);
setTrackingMap(tracking);

    } catch (error) {
      console.error('Error refreshing orders:', error);
    }
  };

  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipping': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Shipping': return '🚚';
      case 'Completed': return '✅';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📋</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Order Management
            </h1>
            {isLoading && (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <p className="text-gray-600 text-lg">Streamline your order tracking and management</p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📊</span>
              <span>Total Orders: {orders.length}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {['All', 'Pending', 'Shipping', 'Completed'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === type
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  {type !== 'All' && <span>{getStatusIcon(type)}</span>}
                  {type}
                  {type !== 'All' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      filter === type ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {orders.filter(order => order.status === type).length}
                    </span>
                  )}
                  {type === 'All' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      filter === type ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {orders.length}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Section */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">No orders match the {filter} status filter</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.razorpay_order_id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                
                {/* Enhanced Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-lg">
                            Order #{order.razorpay_order_id}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(statusMap[order.razorpay_order_id])}`}>
                            {getStatusIcon(statusMap[order.razorpay_order_id])} {statusMap[order.razorpay_order_id]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.products?.length || 0} items • {order.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ₹{order.amount}
                      </div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Enhanced Customer & Address Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-600">👤</span>
                        <h4 className="font-semibold text-gray-900">Customer Information</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="font-medium text-gray-900">{order.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="font-medium text-gray-900">{order.phone}</span>
                        </div>
                      </div>
                    </div>
                    
<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-green-600">📍</span>
    <h4 className="font-semibold text-gray-900">Delivery Address</h4>
  </div>
  <div className="text-sm text-gray-700 leading-relaxed space-y-1">
    <p><span className="font-medium text-gray-800">Building:</span> {order.building}</p>
    <p><span className="font-medium text-gray-800">Locality:</span> {order.locality}</p>
    <p><span className="font-medium text-gray-800">Landmark:</span> {order.landmark}</p>
    <p><span className="font-medium text-gray-800">City:</span> {order.city}</p>
    <p><span className="font-medium text-gray-800">State:</span> {order.state}</p>
    <p><span className="font-medium text-gray-800">PIN Code:</span> {order.pincode}</p>

    {order.gift_note && (
      <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-700">
        <span className="font-medium">Gift Note:</span> {order.gift_note}
      </div>
    )}
  </div>
</div>

                  </div>

                  {/* Enhanced Products Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-purple-600">🛍️</span>
                      <h4 className="font-semibold text-gray-900">
                        Products ({order.products?.length || 0} items)
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.products?.map((product, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow">
                          {product.image && (
                            <div className="relative mb-3">
                              <img
                                src={`/upload/${product.image}`}
                                alt={product.product_name}
                                className="w-full h-32 object-contain bg-white rounded-lg shadow-sm"
                              />
                              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                                <span className="text-xs">🏷️</span>
                              </div>
                            </div>
                          )}
                          <h5 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                            {product.product_name}
                          </h5>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Size:</span>
                              <span className="font-medium bg-gray-100 px-2 py-0.5 rounded">{product.size || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quantity:</span>
                              <span className="font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{product.qty}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">₹{product.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Update Section */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-orange-600">⚡</span>
                      <h4 className="font-semibold text-gray-900">Update Order Status</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                          <select
                            disabled={disabledMap[order.razorpay_order_id]}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white disabled:opacity-60 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={statusMap[order.razorpay_order_id]}
                            onChange={(e) =>
                              setStatusMap(prev => ({
                                ...prev,
                                [order.razorpay_order_id]: e.target.value
                              }))
                            }
                          >
                            <option value="Pending">⏳ Pending</option>
                            <option value="Shipping">🚚 Shipping</option>
                            <option value="Completed">✅ Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Courier Service</label>
                          <select
                            disabled={disabledMap[order.razorpay_order_id]}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white disabled:opacity-60 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={shippingMap[order.razorpay_order_id]}
                            onChange={(e) =>
                              setShippingMap(prev => ({
                                ...prev,
                                [order.razorpay_order_id]: e.target.value
                              }))
                            }
                          >
                            <option value="">Select Courier</option>
                            <option value="DTDC">📦 DTDC</option>
                            <option value="Delhivery">🚛 Delhivery</option>
                            <option value="Indian Post">📮 Indian Post</option>
                            <option value="Xpress Beee">⚡ Xpress Beee</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tracking ID</label>
                        <input
                          disabled={disabledMap[order.razorpay_order_id]}
                          type="text"
                          placeholder="Enter tracking ID for shipment"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl disabled:opacity-60 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={trackingMap[order.razorpay_order_id]}
                          onChange={(e) =>
                            setTrackingMap(prev => ({
                              ...prev,
                              [order.razorpay_order_id]: e.target.value
                            }))
                          }
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          disabled={disabledMap[order.razorpay_order_id] || isLoading}
                          onClick={() => handleUpdate(order.razorpay_order_id)}
                          className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                            disabledMap[order.razorpay_order_id] || isLoading
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25'
                          }`}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Saving...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              💾 Save Changes
                            </span>
                          )}
                        </button>

                        {disabledMap[order.razorpay_order_id] && (
                          <button
                            onClick={() =>
                              setDisabledMap(prev => ({
                                ...prev,
                                [order.razorpay_order_id]: false
                              }))
                            }
                            className="flex-1 px-6 py-3 rounded-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium transition-all duration-300 transform hover:scale-[1.02]"
                          >
                            <span className="flex items-center justify-center gap-2">
                              ✏️ Edit Order
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}