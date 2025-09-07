import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaLeaf,
  FaCertificate,
  FaSeedling,
  FaHandHoldingHeart,
  FaStar
} from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const qualityBadgesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    columnsRef.current.forEach((col, i) => {
      if (col) {
        gsap.fromTo(
          col,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: col,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    qualityBadgesRef.current.forEach((badge, i) => {
      if (badge) {
        gsap.to(badge, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      }
    });

    if (copyrightRef.current) {
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom-=150',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    'Home', 'About', 'Products', 'Cart',
    'Checkout', 'Contact', 'Complaint'
  ];

  const socialIcons = [
    { icon: <FaFacebookF />, label: 'Facebook' },
    { icon: <FaInstagram />, label: 'Instagram' },
    { icon: <FaTwitter />, label: 'Twitter' },
    { icon: <FaWhatsapp />, label: 'WhatsApp' }
  ];

  const qualityBadges = [
    { icon: <FaLeaf className="text-xl" />, title: '100% Organic', color: 'bg-green-600' },
    { icon: <FaCertificate className="text-xl" />, title: 'FSSAI Certified', color: 'bg-blue-600' },
    { icon: <FaSeedling className="text-xl" />, title: 'Natural Process', color: 'bg-amber-600' },
    { icon: <FaHandHoldingHeart className="text-xl" />, title: 'Fair Trade', color: 'bg-red-600' }
  ];

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-amber-50">
      <div className="absolute w-full h-20 -mt-20 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-600/30"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div ref={el => columnsRef.current[0] = el} className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="relative">
                <FaLeaf className="text-3xl text-amber-300 mr-2 z-10 relative" />
                <div className="absolute -inset-3 bg-amber-800/40 rounded-full blur-sm"></div>
              </div>
              <span className="text-2xl font-bold font-serif tracking-wide">
                Anand <span className="text-amber-400">Agro</span>
              </span>
            </div>
            <p className="text-amber-200 leading-relaxed max-w-xs mx-auto md:mx-0 mb-4">
              Pure, Organic Jaggery Products since 2023. Handcrafted with traditional methods and modern quality standards.
            </p>
            <div className="flex space-x-1 mt-4 justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400" />
              ))}
            </div>
          </div>

          <div ref={el => columnsRef.current[1] = el} className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-amber-200 mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              {navigationLinks.map((link, index) => (
                <span key={index} className="text-amber-100 hover:text-amber-300 transition duration-300 group cursor-pointer">
                  <span className="group-hover:pl-2 transition-all duration-300 flex items-center justify-center md:justify-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div ref={el => columnsRef.current[2] = el} className="text-center">
            <h3 className="text-lg font-semibold text-amber-200 mb-4">Our Quality Promise</h3>
            <div className="grid grid-cols-2 gap-4">
              {qualityBadges.map((badge, index) => (
                <div 
                  key={index}
                  ref={el => qualityBadgesRef.current[index] = el}
                  className={`${badge.color} rounded-lg p-3 flex flex-col items-center justify-center shadow-lg`}
                >
                  <div className="text-amber-50 mb-1">
                    {badge.icon}
                  </div>
                  <span className="text-xs font-medium text-amber-100">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={el => columnsRef.current[3] = el} className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-amber-200 mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="bg-amber-700 hover:bg-amber-600 text-amber-100 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 shadow-lg hover:shadow-amber-900/30"
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-800/40 rounded-lg border border-amber-700/50">
              <h4 className="font-medium text-amber-100 mb-2">Customer Care</h4>
              <p className="text-amber-200 text-sm">+91 98765 43210</p>
              <p className="text-amber-200 text-sm">care@anandagro.com</p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-amber-700/50">
          <p ref={copyrightRef} className="text-center text-amber-300/80 text-sm">
            © {currentYear} Anand Agro Industry. All rights reserved.
            <span className="block mt-1 text-xs">
              Organic Certified • FSSAI Approved • Sustainable Farming • ISO 22000 Certified
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
