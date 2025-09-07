// File: src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import {
  FaHome,
  FaInfoCircle,
  FaSeedling,
  FaShoppingCart,
  FaCashRegister,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaUserPlus
} from 'react-icons/fa';
import { NavLink, useLocation, Link } from 'react-router-dom';
import Logo from "../Component/Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png";

interface NavItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Products', path: '/products', icon: <FaSeedling /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> },
    { name: 'Checkout', path: '/checkout', icon: <FaCashRegister /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMenuOpen(false), [location]);

  // Simulated login/logout
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-amber-50 shadow-md py-2'
          : 'bg-amber-50 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with Image */}
          <NavLink to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <img 
                src={Logo} 
                alt="Anand Agro Logo" 
                className="h-20 w-auto transition-all duration-300 group-hover:scale-105" 
              />
              <span className="sr-only">Anand Agro</span>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                aria-label={item.name}
                className={({ isActive }) =>
                  `flex flex-col items-center p-3 w-24 rounded-lg text-base font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-amber-900 bg-amber-100 border-b-2 border-amber-700'
                      : 'text-amber-800 hover:text-amber-900 hover:bg-amber-100/60'
                  }`
                }
              >
                <span className="text-xl mb-1 transition-colors">
                  {item.icon}
                </span>
                {item.name !== 'Cart' && (
                  <span className="text-sm mt-0.5 font-semibold">{item.name}</span>
                )}
              </NavLink>
            ))}
            
            {/* User Actions */}
            <div className="ml-4 flex items-center border-l border-amber-300 pl-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/account"
                    className="flex flex-col items-center p-3 w-24 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60 transition-colors group"
                  >
                    <span className="text-xl mb-1 transition-colors">
                      <FaUser />
                    </span>
                    <span className="text-sm mt-0.5 font-semibold">Account</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center p-3 w-24 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60 transition-colors group"
                  >
                    <span className="text-xl mb-1 transition-colors">
                      <FaSignOutAlt />
                    </span>
                    <span className="text-sm mt-0.5 font-semibold">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex flex-col items-center p-3 w-24 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60 transition-colors group"
                  >
                    <span className="text-xl mb-1 transition-colors">
                      <FaUser />
                    </span>
                    <span className="text-sm mt-0.5 font-semibold">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex flex-col items-center p-3 w-24 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60 transition-colors group"
                  >
                    <span className="text-xl mb-1 transition-colors">
                      <FaUserPlus />
                    </span>
                    <span className="text-sm mt-0.5 font-semibold">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-800 focus:outline-none p-3 hover:text-amber-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-50 shadow-lg px-4 pb-4 space-y-1">
          <div className="grid grid-cols-3 gap-2 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 rounded-lg text-base font-medium transition ${
                    isActive
                      ? 'text-amber-900 bg-amber-100 border-b-2 border-amber-700'
                      : 'text-amber-800 hover:text-amber-900 hover:bg-amber-100/60'
                  }`
                }
                aria-label={item.name}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                {item.name !== 'Cart' && (
                  <span className="text-sm font-semibold">{item.name}</span>
                )}
              </NavLink>
            ))}
          </div>
          
          {/* Auth Actions */}
          <div className="pt-3 border-t border-amber-300">
            <div className="grid grid-cols-2 gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center py-3 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60"
                  >
                    <span className="text-xl mb-1">
                      <FaUser />
                    </span>
                    <span className="text-sm font-semibold">Account</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex flex-col items-center py-3 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60"
                  >
                    <span className="text-xl mb-1">
                      <FaSignOutAlt />
                    </span>
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center py-3 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60"
                  >
                    <span className="text-xl mb-1">
                      <FaUser />
                    </span>
                    <span className="text-sm font-semibold">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center py-3 rounded-lg text-base font-medium text-amber-800 hover:text-amber-900 hover:bg-amber-100/60"
                  >
                    <span className="text-xl mb-1">
                      <FaUserPlus />
                    </span>
                    <span className="text-sm font-semibold">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;