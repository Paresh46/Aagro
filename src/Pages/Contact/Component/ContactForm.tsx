import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck } from "react-icons/fi";
import axios from "axios";

// Define form data types
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:5000/api/contact", {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      alert(error.response?.data?.message || "Message failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Contact Our Team</h2>

      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-md flex items-center">
          <FiCheck className="text-green-600 mr-2" />
          <span className="text-green-800">Your message has been sent successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid"
                  }
                })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:outline-none"
                {...register("phone", {
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                    message: "Invalid phone number"
                  }
                })}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject must be at least 5 characters"
                }
              })}
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message *</label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              rows={4}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 20,
                  message: "Message must be at least 20 characters"
                },
                maxLength: {
                  value: 1000,
                  message: "Message cannot exceed 1000 characters"
                }
              })}
            ></textarea>
          </div>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg transition ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="w-full sm:w-auto px-6 py-3 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
