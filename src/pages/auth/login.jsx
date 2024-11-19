import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        formData
      );
      
      // Store the response data in localStorage properly
      localStorage.setItem('flexi_session', JSON.stringify(response.data.data.session));
    //   localStorage.setItem('flexi_user', JSON.stringify(response.data.data.user));
      
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/3 bg-[#0D4A9F] p-5 hidden md:flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-10 space-y-5">
          <div className="w-full flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[170px] h-[170px] object-contain"
            />
          </div>

          <div className="text-center">
            <h1 className="text-white text-3xl font-bold whitespace-nowrap">
              Welcome back to the future
            </h1>
            <h1 className="text-white text-3xl font-bold">of trading.</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-8">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition duration-200 font-medium disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Please wait..." : "Login"}
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/authentication" className="text-pink-500 hover:text-pink-600 font-medium">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 