// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../Pages/Store/Store';
import { FaShoppingCart, FaLeaf } from 'react-icons/fa';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-amber-800 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <div className="bg-amber-600 p-2 rounded-lg mr-3">
            <FaLeaf className="inline-block mr-2" />
          </div>
          Anand Agro
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-amber-200 transition">Home</Link>
          <Link to="/products" className="hover:text-amber-200 transition">Products</Link>
          <Link to="/about" className="hover:text-amber-200 transition">About</Link>
          <Link to="/contact" className="hover:text-amber-200 transition">Contact</Link>
        </nav>
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingCart className="text-2xl" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;