import { useEffect, useRef } from 'react';
import { Leaf, Award, Factory, Users, ArrowRight, Star, CheckCircle, Zap } from 'lucide-react';
import gsap from 'gsap';

function Aintro() {
  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero heading fade/slide in
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    // Feature pills stagger
    gsap.fromTo(
      pillsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, delay: 0.5, ease: 'power2.out' }
    );
    // Stats bar fade/slide in
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-200/30 to-amber-200/30 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-100/20 to-orange-100/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="flex-1 space-y-8" ref={heroRef}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full border border-amber-200 shadow animate-fade-in">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-sm font-medium text-amber-700">India's Premium Jaggery Brand</span>
            </div>
            <h2 className="text-lg font-semibold text-amber-600 animate-fade-in-delay-1">Nature's Sweetness Perfected</h2>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-delay-2">
              Pure <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Handcrafted</span> Jaggery
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-delay-3 max-w-xl">
              Anand Agro Industry crafts premium jaggery using traditional methods passed down through generations. Our chemical-free process preserves natural nutrients while supporting sustainable farming.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-delay-4">
              {[{ icon: CheckCircle, text: "100% Organic" }, { icon: Zap, text: "Chemical Free" }, { icon: Award, text: "Premium Quality" }].map((item, idx) => (
                <div
                  key={idx}
                  ref={el => { if (el) pillsRef.current[idx] = el; }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full border border-amber-100 shadow-sm hover:shadow-md transition-all"
                >
                  <item.icon className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-2 animate-fade-in-delay-5">
              <button className="group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-105">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 bg-white/90 text-gray-700 border border-gray-200 rounded-xl font-medium text-lg shadow hover:shadow-lg transition hover:bg-white">
                Learn Process
              </button>
            </div>
          </div>
          {/* Right: Visual Card */}
          <div className="flex-1 flex flex-col items-center relative animate-slide-up-delay">
            <div className="relative bg-white/90 rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-md hover:scale-105 transition-transform duration-700">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Anand Agro</h3>
                <p className="text-amber-600 font-medium">Premium Jaggery</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg animate-bounce-slow">
                <Award className="w-6 h-6" />
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg mt-6">
                Certified Organic
              </div>
            </div>
            {/* Floating Feature Cards */}
            <div className="absolute -left-8 top-16 bg-white/95 p-4 rounded-2xl shadow-xl border border-white/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">100% Natural</p>
                  <p className="text-xs text-gray-600">No chemicals</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 bottom-32 bg-white/95 p-4 rounded-2xl shadow-xl border border-white/20 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Factory className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Modern Processing</p>
                  <p className="text-xs text-gray-600">Hygienic facility</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 bottom-8 bg-white/95 p-4 rounded-2xl shadow-xl border border-white/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Fair Trade</p>
                  <p className="text-xs text-gray-600">Supporting farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="relative z-20 max-w-5xl mx-auto mt-16 mb-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white/90 rounded-2xl shadow-lg py-6 px-4 border border-amber-100">
            {[
              { value: "25+", label: "Years Experience" },
              { value: "500+", label: "Partner Farmers" },
              { value: "99%", label: "Purity Rate" },
              { value: "10k+", label: "Happy Customers" }
            ].map((stat, idx) => (
              <div
                key={idx}
                ref={el => { if (el) statsRef.current[idx] = el; }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-amber-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Jaggery?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of tradition and innovation in every block of our premium jaggery
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Natural & Organic",
                description: "Chemical-free jaggery made from pure sugarcane juice using traditional methods",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Hygienic processing with FDA-approved facilities ensuring highest standards",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Factory,
                title: "Sustainable Farming",
                description: "Supporting eco-friendly agricultural practices and sustainable development",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Users,
                title: "Community Focused",
                description: "Direct farmer partnerships ensuring fair prices and community development",
                color: "from-amber-500 to-orange-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white/90 p-8 rounded-3xl shadow-lg border border-white/20 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aintro;