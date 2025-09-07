// src/components/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../Store/Store';
import { removeItem } from '../../Store/CartSlice';
import { 
  FaLock, FaArrowLeft, FaCreditCard, FaGooglePay, FaPhone, FaHome, 
  FaMapMarkerAlt, FaTruck, FaLeaf, FaCheckCircle, FaTrash, FaQuestionCircle, 
  FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaRupeeSign
} from 'react-icons/fa';
import { BsShieldLock, BsInfoCircle } from 'react-icons/bs';
import { RiSecurePaymentLine, RiBankLine } from 'react-icons/ri';
import { SiPhonepe } from 'react-icons/si';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'India'
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = deliveryOption === 'express' ? 99 : 49;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingFee + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const simulateRazorpayPayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
      
      setTimeout(() => {
        window.location.href = '/order-confirmation';
      }, 3000);
    }, 3000);
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    simulateRazorpayPayment();
  };
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };
  
  const handleRemoveItem = (id: number) => {
    if (showRemoveConfirm === id.toString()) {
      dispatch(removeItem(id));
      setShowRemoveConfirm(null);
    } else {
      setShowRemoveConfirm(id.toString());
      setTimeout(() => setShowRemoveConfirm(null), 5000);
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };
  
  useEffect(() => {
    if (isPaymentSuccess) {
      window.scrollTo(0, 0);
    }
  }, [isPaymentSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-700 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
              <FaLeaf className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-green-900 ml-3 font-sans">
              Anand <span className="text-green-700">Agro</span>
            </span>
          </div>
          <div className="flex items-center bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
            <BsShieldLock className="text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Secure Checkout</span>
          </div>
        </div>
      </header>
      
      {/* Payment Success Banner */}
      {isPaymentSuccess && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <FaCheckCircle className="text-green-600 text-2xl mr-3 animate-pulse" />
            <div>
              <h3 className="font-bold text-green-800">Payment Successful!</h3>
              <p className="text-green-700">Your order is confirmed. Redirecting to order details...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 -z-10 rounded-full">
            <div className="h-full bg-green-600 rounded-full w-3/4"></div>
          </div>
          {['cart', 'information', 'shipping', 'payment'].map((step, index) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                index < 3 ? 'bg-green-600 text-white' : 'bg-white border-2 border-green-600'
              }`}>
                {index < 3 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <span className="text-green-600 font-bold text-lg">4</span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium capitalize text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-green-700 hover:text-green-900 font-medium bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to cart
          </button>
          <h1 className="text-3xl font-bold text-amber-900 ml-6">Secure Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmitOrder}>
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <FaPhone className="text-green-600" />
                  </div>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <FaHome className="text-green-600" />
                  </div>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Street and house number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">State</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Maharashtra"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Postal Code</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="400001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Country</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Shipping Method */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <FaTruck className="text-green-600" />
                  </div>
                  Shipping Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all flex items-center ${
                      deliveryOption === 'standard' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setDeliveryOption('standard')}
                  >
                    <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                      deliveryOption === 'standard' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                    }`}>
                      {deliveryOption === 'standard' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">Standard Delivery</h3>
                      <p className="text-sm text-gray-600">4-7 business days</p>
                    </div>
                    <span className="font-medium">₹49.00</span>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all flex items-center ${
                      deliveryOption === 'express' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setDeliveryOption('express')}
                  >
                    <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                      deliveryOption === 'express' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                    }`}>
                      {deliveryOption === 'express' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">Express Delivery</h3>
                      <p className="text-sm text-gray-600">2-3 business days</p>
                    </div>
                    <span className="font-medium">₹99.00</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <RiSecurePaymentLine className="text-green-600 text-xl" />
                  </div>
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="flex space-x-2 mt-2">
                          <FaCcVisa className="text-blue-900 text-xl" />
                          <FaCcMastercard className="text-red-600 text-xl" />
                          <FaCcAmex className="text-blue-500 text-xl" />
                          <FaPaypal className="text-blue-700 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                        paymentMethod === 'upi' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'upi' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">UPI</div>
                        <div className="flex space-x-2 mt-2">
                          <FaGooglePay className="text-blue-500 text-xl" />
                          <SiPhonepe className="text-purple-600 text-xl" />
                          <div className="text-xs bg-gray-100 px-2 py-1 rounded">BHIM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'netbanking' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                        paymentMethod === 'netbanking' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'netbanking' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Net Banking</div>
                        <div className="flex items-center mt-2">
                          <RiBankLine className="text-gray-700 mr-2" />
                          <span className="text-sm">All Indian Banks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 hover:border-green-300'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'cod' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600 mt-1">Pay when you receive</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="bg-gradient-to-br from-amber-50 to-green-50 p-6 rounded-xl border border-amber-200">
                    <h3 className="font-bold text-gray-700 mb-4">Enter Card Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2 font-medium flex items-center">
                          Card Number
                          <span className="ml-1 text-green-600" title="16-digit number on your card">
                            <BsInfoCircle />
                          </span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="cardNumber"
                            value={formatCardNumber(cardDetails.cardNumber)}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              setCardDetails({...cardDetails, cardNumber: formatted.replace(/\s/g, '')});
                            }}
                            maxLength={19}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="0000 0000 0000 0000"
                            required
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaCreditCard className="text-xl" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Expiry Date</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium flex items-center">
                          CVV
                          <span className="ml-1 text-green-600" title="3-digit code on the back of your card">
                            <BsInfoCircle />
                          </span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2 font-medium">Cardholder Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardChange}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="John Doe"
                            required
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <BsShieldLock className="text-green-600 mr-2" />
                        <span className="text-sm text-gray-600">Your payment details are securely encrypted</span>
                      </div>
                      <div className="flex space-x-2">
                        <FaCcVisa className="text-blue-900 text-2xl" />
                        <FaCcMastercard className="text-red-600 text-2xl" />
                        <FaRupeeSign className="text-gray-700 text-2xl" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Payment Button */}
                <button 
                  type="submit"
                  disabled={isProcessing || isPaymentSuccess || cartItems.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center mt-6 transition-all shadow-lg transform hover:scale-[1.01] ${
                    isProcessing || isPaymentSuccess
                      ? 'bg-amber-500 cursor-not-allowed' 
                      : cartItems.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 via-green-600 to-green-700 hover:from-amber-700 hover:via-green-700 hover:to-green-800'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : isPaymentSuccess ? (
                    <>
                      <FaCheckCircle className="mr-3 animate-pulse" />
                      Payment Successful
                    </>
                  ) : cartItems.length === 0 ? (
                    "Cart is Empty"
                  ) : (
                    <>
                      <FaLock className="mr-3" />
                      Pay Securely ₹{total.toFixed(2)}
                    </>
                  )}
                </button>
                
                <div className="mt-4 text-xs text-center text-gray-500">
                  <p>Your personal data will be used to process your order and support your experience throughout this website.</p>
                </div>
              </div>
            </form>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6 border border-gray-100">
              <h2 className="text-xl font-bold text-amber-900 mb-6 flex justify-between items-center">
                <span>Order Summary</span>
                <span className="text-sm font-normal text-gray-500">{cartItems.length} items</span>
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 relative group">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-16 h-16 bg-amber-100 rounded-xl mr-4 flex items-center justify-center overflow-hidden border border-amber-200">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-800 truncate" title={item.title}>{item.title}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-green-700">₹{item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className={`mt-1 transition-colors p-1 rounded-lg ${
                          showRemoveConfirm === item.id.toString() 
                            ? 'bg-red-100 text-red-600' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title="Remove item"
                      >
                        {showRemoveConfirm === item.id.toString() ? (
                          <span className="text-xs font-medium px-2">Confirm?</span>
                        ) : (
                          <FaTrash className="text-sm" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                
                {cartItems.length === 0 && (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaQuestionCircle className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <a 
                      href="/products" 
                      className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors shadow-md"
                    >
                      Continue Shopping
                    </a>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-amber-900">Total</span>
                  <span className="text-lg font-bold text-amber-900">₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-6 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-green-600 mr-2" />
                  <span>Delivering to: {formData.city}, {formData.state} {formData.postalCode}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaTruck className="text-green-600 mr-2" />
                  <span>
                    {deliveryOption === 'standard' 
                      ? 'Standard Delivery (4-7 days)' 
                      : 'Express Delivery (2-3 days)'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-6">
                <div className="flex items-start">
                  <BsShieldLock className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Secure Payment:</span> Your payment details are encrypted and securely processed by Razorpay.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <FaCcVisa className="text-blue-900 text-2xl" />
                <FaCcMastercard className="text-red-600 text-2xl" />
                <FaRupeeSign className="text-gray-700 text-2xl" />
                <FaGooglePay className="text-blue-500 text-2xl" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6 border border-gray-100">
              <h3 className="font-bold text-amber-900 mb-3">Why shop with Anand Agro?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">100% natural and organic products</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure payment options</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Easy returns within 14 days</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Supporting local farmers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-700 to-green-600 w-10 h-10 rounded-xl flex items-center justify-center mr-3">
                  <FaLeaf className="text-white" />
                </div>
                <span className="text-xl font-bold text-green-900">
                  Anand <span className="text-green-700">Agro</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                India's trusted source for organic agricultural products since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-amber-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/" className="hover:text-green-600 transition-colors">Home</a></li>
                <li><a href="/products" className="hover:text-green-600 transition-colors">Products</a></li>
                <li><a href="/about" className="hover:text-green-600 transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-green-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-amber-900 mb-3">Customer Service</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/faq" className="hover:text-green-600 transition-colors">FAQ</a></li>
                <li><a href="/shipping" className="hover:text-green-600 transition-colors">Shipping Policy</a></li>
                <li><a href="/returns" className="hover:text-green-600 transition-colors">Return Policy</a></li>
                <li><a href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-amber-900 mb-3">Contact Info</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span>123 Farm Road, Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-green-600 mr-2" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@anandagro.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2023 Anand Agro. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <BsShieldLock className="text-green-600" />
              <span>Secure checkout with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;