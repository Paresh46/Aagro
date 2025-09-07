import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "farmer" | "buyer" | "distributor";
  agreeToTerms: boolean;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Create Your Agro Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-green-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-green-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Must include uppercase, lowercase, and number",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-green-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-green-300"
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am a: <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["farmer", "buyer", "distributor"].map((type) => (
              <div key={type}>
                <input
                  type="radio"
                  id={`userType-${type}`}
                  value={type}
                  {...register("userType", { required: "Please select your role" })}
                  className="hidden peer"
                />
                <label
                  htmlFor={`userType-${type}`}
                  className="flex justify-center items-center p-3 border rounded-lg cursor-pointer transition-all peer-checked:bg-green-50 peer-checked:border-green-500"
                >
                  <span className="capitalize text-sm">{type}</span>
                </label>
              </div>
            ))}
          </div>
          {errors.userType && (
            <p className="mt-1 text-red-500 text-sm">{errors.userType.message}</p>
          )}
        </div>

        {/* Agree to Terms */}
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register("agreeToTerms", {
              required: "You must agree to terms and conditions",
            })}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-green-600 hover:underline font-medium">
              Terms and Conditions
            </a>
            <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-medium shadow-md transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-green-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
