import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Pages/Store/Store';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Header from '../src/Component/Header';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import ProductPage from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import Contact from './Pages/Contact/Contact';
import Complaint from './Pages/Complaint/Complaint';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/complaint" element={<Complaint />} />
                <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

          </Routes>
        </main>

        
      </div>
    </Provider>
  );
};

export default App;