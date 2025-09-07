import { useState, FormEvent } from 'react';

type ProductType = 'liquid-jaggery' | 'jaggery-block' | 'granulated-jaggery' | '';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  product: ProductType;
  quantity: string;
  message: string;
}

 function JaggeryQueryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: '',
        quantity: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-amber-800 mb-2 text-center">
        Jaggery Product Inquiry
      </h2>
      <p className="text-amber-600 mb-8 text-center">
        Contact Anad Agro Industry for premium jaggery products
      </p>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Thank you! Your query has been submitted. We'll contact you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-amber-800 font-medium mb-2">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-amber-800 font-medium mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-amber-800 font-medium mb-2">
              Phone*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-amber-800 font-medium mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="product" className="block text-amber-800 font-medium mb-2">
              Product of Interest*
            </label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Select a product</option>
              <option value="liquid-jaggery">Liquid Jaggery</option>
              <option value="jaggery-block">Jaggery Block</option>
              <option value="granulated-jaggery">Granulated Jaggery</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-amber-800 font-medium mb-2">
              Estimated Quantity (kg/month)
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., 500 kg"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-amber-800 font-medium mb-2">
            Your Inquiry*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Please provide details about your requirements"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
}


export default  JaggeryQueryForm