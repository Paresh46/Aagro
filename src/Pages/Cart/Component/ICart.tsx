import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../Store/Store';
import { removeItem } from '../../Store/CartSlice'; // ✅ Updated import
import { updateQuantity, clearCart } from '../../Store/CartSlice'; // ✅ Keep others as-is
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeItem(id)); // ✅ Using updated action
    toast.error('Item removed from cart!');
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      handleRemove(id);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error('Cart cleared!');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-amber-500 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-amber-800 mb-2">Your cart is empty</h2>
            <p className="text-amber-600 mb-6">Add some delicious jaggery products to your cart!</p>
            <a
              href="/products"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-amber-100">
              {cartItems.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0"
                  />
                  <div className="flex-1 sm:ml-6">
                    <h3 className="text-xl font-semibold text-amber-900">{item.title}</h3>
                    <p className="text-amber-600 mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-2 bg-amber-100 text-amber-700 rounded-l-lg hover:bg-amber-200"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-2 bg-amber-50">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-2 bg-amber-100 text-amber-700 rounded-r-lg hover:bg-amber-200"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="ml-6 flex items-center">
                    <p className="text-lg font-semibold text-amber-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-amber-50 border-t border-amber-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-amber-900">Total Amount</h3>
                <p className="text-2xl font-bold text-amber-800">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={handleClearCart}
                  className="px-6 py-3 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-100"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
