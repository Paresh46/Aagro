import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from  "../../Store/CartSlice";
import { 
  FaShoppingCart, 
  FaStar, 
  FaRegStar, 
  FaStarHalfAlt,
  FaPlus,
  FaMinus,
  FaLeaf,
  FaRecycle,
  FaHeart,
  FaShieldAlt,
  FaChevronRight,
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Product1 from "../Assets/ced9c4ba-0d49-41ed-9ca5-e072740eb95a.jfif";
import Product2 from "../Assets/istockphoto-2150007871-612x612.webp";
import Product3 from "../Assets/istockphoto-2150007871-612x612.webp";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  benefits?: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: 'Liquid Jaggery',
    image: Product1,
    price: 120,
    rating: 4.8,
    reviews: 156,
    description: 'Pure liquid jaggery made from fresh sugarcane juice.',
    benefits: ['Rich in iron', 'Better digestion', 'Natural sweetener']
  },
  {
    id: 2,
    name: 'Jaggery Blocks',
    image: Product2,
    price: 80,
    rating: 4.9,
    reviews: 203,
    description: 'Traditional solid jaggery blocks rich in flavor.',
    benefits: ['Long shelf life', 'Traditional recipe', 'No additives']
  },
  {
    id: 3,
    name: 'Jaggery Powder',
    image: Product3,
    price: 150,
    rating: 4.7,
    reviews: 98,
    description: 'Finely ground powder for easy cooking and baking.',
    benefits: ['Easy to dissolve', 'Perfect for baking', 'Consistent texture']
  }
];

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'quality' | 'reviews'>('products');
  const navigate = useNavigate();

  const incrementQuantity = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQuantity = (id: number) => {
    if (quantities[id] > 1) {
      setQuantities(prev => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: quantities[product.id],
      })
    );

    toast.success(
      <div className="flex items-start">
        <FaShoppingCart className="text-amber-600 mt-0.5 mr-3 flex-shrink-0 text-xl" />
        <div>
          <p className="font-semibold">Added to cart!</p>
          <p className="text-sm">{quantities[product.id]} × {product.name}</p>
        </div>
      </div>,
      {
        autoClose: 2000,
        className: 'border-l-4 border-amber-500 bg-white text-gray-800 shadow-lg',
        progressClassName: 'bg-amber-500',
      }
    );
  };

  const handleCheckoutClick = () => {
    setShowModal(true);
  };

  const handleAccountChoice = (hasAccount: boolean) => {
    setShowModal(false);
    if (!hasAccount) {
      navigate('/signup');
    } else {
      navigate('/login');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (starValue <= Math.floor(rating)) {
        return <FaStar key={i} className="text-amber-500 text-xs" />;
      }
      if (starValue === Math.ceil(rating) && rating % 1 >= 0.5) {
        return <FaStarHalfAlt key={i} className="text-amber-500 text-xs" />;
      }
      return <FaRegStar key={i} className="text-amber-500 text-xs" />;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4 sm:px-6">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="max-w-6xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-amber-100 mb-4">
            <FaLeaf className="text-amber-600 mr-2" />
            <span className="text-amber-700 font-medium text-sm uppercase tracking-wide">Pure & Natural</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Premium <span className="text-amber-600">Organic Jaggery</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Handcrafted using traditional methods for the perfect natural sweetness
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex border border-gray-100">
            {[
              { id: 'products', label: 'Products' },
              { id: 'quality', label: 'Quality' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white shadow'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Professional Cards */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x400?text=Jaggery+Image";
                      e.currentTarget.className = "w-full h-full object-contain bg-amber-50 p-4";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow text-xs border border-gray-100">
                    <span className="text-amber-700 font-medium mr-1">{product.rating}</span>
                    <FaStar className="text-amber-500" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                    <div className="text-lg font-bold text-amber-600">₹{product.price}</div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Benefits List */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {product.benefits?.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <FaCheckCircle className="text-amber-500 mr-2 text-xs flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Quantity Selector and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => decrementQuantity(product.id)}
                        disabled={quantities[product.id] <= 1}
                        className={`px-2 py-1 text-gray-600 transition-colors ${
                          quantities[product.id] > 1 
                            ? 'hover:bg-gray-100' 
                            : 'opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-1 font-medium text-gray-800 bg-white w-8 text-center text-sm">
                        {quantities[product.id]}
                      </span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-sm flex items-center"
                    >
                      <FaShoppingCart className="mr-2 text-amber-100 text-xs" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quality Section */}
        {activeTab === 'quality' && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">Our Quality Commitment</h2>
                <p className="max-w-2xl mx-auto opacity-95">
                  We are dedicated to providing the highest quality jaggery products while supporting sustainable farming practices
                </p>
              </div>
              
              {/* Quality Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                {[
                  { icon: FaLeaf, title: '100% Organic', desc: 'Our jaggery is made from organically grown sugarcane without any chemical additives.' },
                  { icon: FaRecycle, title: 'Eco-Friendly Packaging', desc: 'We use biodegradable and recyclable materials to minimize environmental impact.' },
                  { icon: FaHeart, title: 'Health Benefits', desc: 'Rich in minerals and antioxidants, our jaggery is a healthier alternative to refined sugar.' },
                  { icon: FaShieldAlt, title: 'Quality Assurance', desc: 'Each batch undergoes rigorous testing to ensure purity and quality standards.' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <item.icon className="text-amber-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Process Section */}
              <div className="p-8 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Traditional Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: 'Harvesting', desc: 'Carefully selected organic sugarcane' },
                    { step: 'Extraction', desc: 'Cold-pressed juice extraction' },
                    { step: 'Evaporation', desc: 'Slow cooking in traditional vessels' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.step}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial Section */}
        {activeTab === 'reviews' && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Customer <span className="text-amber-600">Feedback</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    text: "The liquid jaggery has transformed my morning tea! It has a rich, caramel-like flavor without being overly sweet. I'll never go back to sugar.", 
                    author: "Priya S.",
                    rating: 4.8,
                    location: "Mumbai"
                  },
                  { 
                    text: "Organic jaggery blocks are a staple in our household. We use them in traditional sweets and even in our coffee. The quality is consistently excellent.", 
                    author: "Rajesh K.", 
                    rating: 5.0,
                    location: "Delhi"
                  },
                  { 
                    text: "The powder is so convenient for baking. It dissolves easily and gives my cakes a wonderful depth of flavor. My kids love it!", 
                    author: "Anjali M.", 
                    rating: 4.7,
                    location: "Bangalore"
                  },
                  { 
                    text: "As a nutritionist, I recommend this jaggery to my clients. It's minimally processed and retains its natural minerals. The taste is authentic.", 
                    author: "Dr. Vikram P.", 
                    rating: 4.9,
                    location: "Chennai"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-5 border border-gray-100"
                  >
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 text-sm mb-4 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <FaUser className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">{testimonial.author}</p>
                        <div className="flex items-center text-gray-500 text-xs">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Nature's Sweetness?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of satisfied customers who have made the switch to healthier, natural sweeteners.
          </p>
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center"
            onClick={handleCheckoutClick}
          >
            <span>Start Shopping</span>
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingCart className="text-amber-600 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to checkout?</h2>
            <p className="text-gray-600 mb-6">Do you have an account with us?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => handleAccountChoice(true)}
              >
                Yes, I have an account
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => handleAccountChoice(false)}
              >
                No, I'm new
              </button>
            </div>
            <button 
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              Continue shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;