import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Correct Swiper CSS Imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { ArrowDown, MapPin, Calendar, Leaf, Award, Heart, Star } from 'lucide-react';

import Logo from '../Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png';
import Product1 from '../Assets/istockphoto-2150007871-612x612.webp';
import Product2 from '../Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png';
import Product3 from '../Assets/2035c611-a155-4fec-8af9-17473e85f2b0.jfif';
import Product4 from '../Assets/2035c611-a155-4fec-8af9-17473e85f2b0.jfif';

interface Product {
  name: string;
  description: string;
  image: string;
}

const Intro: React.FC = () => {
  const products: Product[] = [
    {
      name: 'Jaggery Blocks',
      description: 'Traditional solid jaggery blocks made from pure sugarcane',
      image: Product1,
    },
    {
      name: 'Jaggery Powder',
      description: 'Fine powdered jaggery perfect for cooking and baking',
      image: Product2,
    },
    {
      name: 'Coconut Jaggery Cubes',
      description: 'Delicious jaggery cubes infused with natural coconut flavor',
      image: Product3,
    },
    {
      name: 'Elaichi Jaggery Cubes',
      description: 'Aromatic cardamom-flavored jaggery cubes for a premium taste',
      image: Product1,
    },
    {
      name: 'Badishep Jaggery Cubes',
      description: 'Unique fennel-flavored jaggery cubes with digestive benefits',
      image: Product4,
    },
  ];

  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typewriter effect for hero description
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Bringing back the tradition of healthy sweetness with organic, chemical-free jaggery products since 2023";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-white to-[#f0f8f0]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0iI2U0ZjdlMyIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#e8f5e9]/40 blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-20 w-24 h-24 rounded-full bg-[#f5f0e6]/40 blur-xl animate-float animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-[#e8f5e9]/40 blur-xl animate-float animation-delay-3000"></div>
      
      {/* Hero Section */}
      <section className={`flex-1 flex items-center justify-center px-4 py-12 relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] inline-block p-1 rounded-lg mb-4 transform transition-all duration-300 hover:scale-105">
              <div className="bg-white backdrop-blur px-4 py-2 rounded-md text-[#1b5e20] font-medium flex items-center gap-2">
                <Leaf className="w-5 h-5" /> 100% Organic & Natural
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b5e20] leading-tight">
              Anand Agro
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#5d4037]">
                Industry
              </span>
            </h1>

            <div className="h-24">
              <p className="text-lg text-[#2e7d32] max-w-2xl">
                {typedText}
                <span className="ml-1 inline-block w-1 h-6 bg-[#2e7d32] align-middle animate-pulse"></span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white backdrop-blur-sm rounded-xl border border-[#e8f5e9] shadow-sm transform transition-all duration-300 hover:-translate-y-1">
                <div className="bg-[#e8f5e9] p-3 rounded-lg">
                  <Award className="w-6 h-6 text-[#2e7d32]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1b5e20]">Traditional Methods</h3>
                  <p className="text-[#2e7d32] text-sm mt-1">Preserving authentic techniques for superior quality</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white backdrop-blur-sm rounded-xl border border-[#e8f5e9] shadow-sm transform transition-all duration-300 hover:-translate-y-1">
                <div className="bg-[#e8f5e9] p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#2e7d32]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1b5e20]">Est. 2023</h3>
                  <p className="text-[#2e7d32] text-sm mt-1">Committed to purity and sustainability</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToNextSection}
                className="group relative overflow-hidden bg-gradient-to-r from-[#8d6e63] to-[#5d4037] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Products
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6d4c41] to-[#4e342e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <a
                href="https://maps.app.goo.gl/tdQdTsaQmgrtfCws7?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white backdrop-blur rounded-full border border-[#e8f5e9] hover:shadow-md hover:scale-105 transition-all duration-300 animate-float shadow-sm"
              >
                <MapPin className="w-5 h-5 text-[#2e7d32]" />
                <span className="text-[#1b5e20] font-medium">Nashik, Maharashtra</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl transform transition-all duration-700 hover:scale-[1.02] group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b5e20]/5 to-[#5d4037]/10 z-10 rounded-3xl transition-all duration-700 group-hover:opacity-70"></div>
              <img
                src={Logo}
                alt="Natural Jaggery Products"
                className="w-full object-cover aspect-square transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b5e20]/10 to-transparent"></div>
              
              {/* Organic badge */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#f5f0e6] rounded-full flex items-center justify-center border-2 border-white shadow-md transform transition-all duration-300 group-hover:rotate-12">
                <Leaf className="w-8 h-8 text-[#8d6e63]" />
              </div>
              
              {/* Floating rating */}
              <div className="absolute bottom-6 left-6 bg-white backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-[#e8f5e9] transform transition-all duration-300 group-hover:-translate-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#2e7d32]">Since</span>
                    <span className="font-bold text-[#1b5e20]">15 Aug 2023</span>
                  </div>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffb300] text-[#ffb300]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements around image */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-[#f5f0e6]/40 blur-md animate-float animation-delay-1000 z-0"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#e8f5e9]/40 blur-md animate-float animation-delay-1500 z-0"></div>
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section ref={nextSectionRef} className="py-16 bg-gradient-to-b from-white to-[#f0f8f0] relative z-10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#e8f5e9]/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#f5f0e6]/20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e20] relative inline-block">
              Our Premium <span className="text-[#5d4037]">Jaggery Products</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#2e7d32] to-[#8d6e63] rounded-full"></div>
            </h2>
            <p className="mt-4 text-[#2e7d32] max-w-2xl mx-auto">
              Handcrafted with care using traditional methods for authentic flavor and purity
            </p>
          </div>

          <Swiper
            effect={'coverflow'}
            grabCursor
            centeredSlides
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 5,
              stretch: -30,
              depth: 120,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ 
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'custom-bullet',
              bulletActiveClass: 'custom-bullet-active'
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper pb-16"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="max-w-xs bg-gradient-to-b from-white to-[#f8faf8] rounded-2xl shadow-md overflow-hidden border border-[#e8f5e9] transition-all duration-500 hover:shadow-xl hover:z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1b5e20]/5 to-[#5d4037]/5 rounded-2xl transition-opacity duration-500 group-hover:opacity-30"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#1b5e20]">{product.name}</h3>
                      <button className="text-[#8d6e63] hover:text-[#5d4037] transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[#2e7d32] mb-4">{product.description}</p>
                    <button className="w-full bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] hover:from-[#1b5e20] hover:to-[#0d3e13] text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                      View Details
                      <ArrowDown className="w-4 h-4 transform rotate-90" />
                    </button>
                  </div>
                  
                  {/* Organic badge */}
                  <div className="absolute top-3 left-3 bg-[#2e7d32] text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Organic
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom navigation */}
            <div className="custom-navigation flex justify-center gap-4 mt-8">
              <button className="custom-prev w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors">
                <ArrowDown className="w-6 h-6 transform rotate-90" />
              </button>
              <div className="custom-pagination flex items-center gap-2"></div>
              <button className="custom-next w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors">
                <ArrowDown className="w-6 h-6 transform -rotate-90" />
              </button>
            </div>
          </Swiper>
          
          {/* Organic certification badge */}
          <div className="mt-12 flex justify-center">
            <div className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] rounded-full py-3 px-6 inline-flex items-center gap-3 shadow-md transform transition-all duration-300 hover:scale-105">
              <Leaf className="w-6 h-6 text-[#f5f0e6] animate-pulse" />
              <span className="text-[#f5f0e6] font-medium">Certified Organic Jaggery</span>
              <Leaf className="w-6 h-6 text-[#f5f0e6] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        /* Custom pagination styles */
        .custom-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e0e0e0;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          width: 30px;
          border-radius: 5px;
          background: linear-gradient(to right, #2e7d32, #8d6e63);
        }
      `}</style>
    </div>
  );
};

export default Intro;