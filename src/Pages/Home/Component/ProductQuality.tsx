import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaLeaf, 
  FaAppleAlt, 
  FaShieldAlt, 
  FaBox, 
  FaCalendarAlt,
  FaCertificate
} from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProductQuality: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const qualityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whyChooseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP animations
    if (qualityRefs.current.length && whyChooseRef.current) {
      // Animate quality cards
      qualityRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
              },
              delay: i * 0.15
            }
          );
        }
      });

      // Animate why choose section
      gsap.fromTo(whyChooseRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: whyChooseRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  const qualityParameters = [
    { 
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: '100% Natural & Chemical-Free',
      desc: 'Pure jaggery without additives or preservatives'
    },
    { 
      icon: <FaAppleAlt className="text-3xl text-red-500" />,
      title: 'Rich in Iron and Minerals',
      desc: 'Natural source of essential nutrients for better health'
    },
    { 
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
      title: 'Hygienically Processed',
      desc: 'Manufactured in FDA-approved facilities'
    },
    { 
      icon: <FaBox className="text-3xl text-amber-800" />,
      title: 'Traditional Taste with Modern Packaging',
      desc: 'Authentic flavor with airtight preservation'
    },
    { 
      icon: <FaCalendarAlt className="text-3xl text-purple-500" />,
      title: 'Long Shelf Life',
      desc: 'Stays fresh for up to 18 months'
    },
    { 
      icon: <FaCertificate className="text-3xl text-yellow-600" />,
      title: 'Certified Quality (FSSAI)',
      desc: 'Meets all food safety standards and regulations'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 md:px-8 bg-yellow-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-amber-900">
          Premium Jaggery Quality
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Quality Parameters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualityParameters.map((item, index) => (
              <div 
                key={index}
                ref={el => qualityRefs.current[index] = el}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="font-bold text-lg mt-4 mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Section */}
          <div 
            ref={whyChooseRef}
            className="bg-amber-800 text-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-200">
              Why Choose Anand Agro Product?
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-2">✓</span>
                <div>
                  <strong className="text-yellow-100">Trusted by Farmers:</strong>
                  <p className="mt-1">Direct sourcing from local sugarcane farmers ensuring fair trade</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-2">✓</span>
                <div>
                  <strong className="text-yellow-100">Modern Processing:</strong>
                  <p className="mt-1">State-of-the-art manufacturing with temperature-controlled crystallization</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-2">✓</span>
                <div>
                  <strong className="text-yellow-100">Export Quality Standards:</strong>
                  <p className="mt-1">Compliance with international food safety and packaging regulations</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-2">✓</span>
                <div>
                  <strong className="text-yellow-100">Purity Guarantee:</strong>
                  <p className="mt-1">Triple-filtered syrup for crystal-clear jaggery with authentic sweetness</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-2">✓</span>
                <div>
                  <strong className="text-yellow-100">Sustainable Production:</strong>
                  <p className="mt-1">Zero-waste process utilizing byproducts for biofuel generation</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-amber-900/50 rounded-lg">
              <p className="italic text-yellow-100">
                "Our jaggery preserves 98% of sugarcane's natural micronutrients through our patented low-heat processing technique"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductQuality;