import React, { useState } from 'react';
import logo from "../assets/logo.svg";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isOrganization: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex mt-10">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-b bg-[#0D4A9F] p-8 hidden md:flex flex-col justify-center items-center">
        <div className="w-48 pb-20">
          
          <div className="flex flex-col items-center">
            <div className="max:w-full w-full h-[170px]">
              <img src={logo} w-50 h-50 pb-5></img>
            </div>
          </div>
        </div>
      </div>

     
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-8">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Phone Number"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isOrganization"
                name="isOrganization"
                checked={formData.isOrganization}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isOrganization" className="ml-2 block text-sm text-gray-700">
                Are you signing up as an organization?
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition duration-200 font-medium"
            >
              Connect Wallet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;