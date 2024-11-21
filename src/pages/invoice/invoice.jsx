import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    dueDate: new Date(),
  });

  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'price') {
      const basePrice = parseFloat(value) || 0;
      const fee = basePrice * 0.015;
      setServiceFee(fee);
      setTotal(basePrice + fee);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tokenString = localStorage.getItem("flexi_session");
    const token = JSON.parse(tokenString);

    if (!token) {
      setError("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }

    console.log("token", token);

    const apiData = {
      ...formData,
      price: total,
      dueDate: formData.dueDate.toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/invoice/web3`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      console.log("Invoice created:", response.data);
      // Reset form after successful submission
      setFormData({
        productName: "",
        description: "",
        price: "",
        customerFirstName: "",
        customerLastName: "",
        customerEmail: "",
        dueDate: new Date(),
      });

      // Replace alert with toast
      toast.success("Invoice created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/admin/escrow');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        // Optionally redirect to login page or trigger logout
        // window.location.href = '/login';
      } else {
        toast.error(err.response?.data?.message || "Failed to create invoice");
      }
      console.error("Error creating invoice:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Invoice</h1>
        <p className="text-gray-600 mb-8">
          Fill the forms below to raise an invoice for your customer.
        </p>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₦)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Price"
              />
            </div>

            {formData.price && (
              <div className="col-span-2">
                <div className="text-sm text-gray-600">
                  <p>Service Fee (1.5%): ₦{serviceFee.toFixed(2)}</p>
                  <p className="font-semibold">Total Amount: ₦{total.toFixed(2)}</p>
                  <p className="text-xs mt-1">
                    A 1.5% service fee is added to cover transaction processing and platform maintenance.
                  </p>
                </div>
              </div>
            )}

            {/* Customer First Name - Replace Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer First Name
              </label>
              <input
                type="text"
                name="customerFirstName"
                value={formData.customerFirstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter First Name"
              />
            </div>

            {/* Customer Last Name - New Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Last Name
              </label>
              <input
                type="text"
                name="customerLastName"
                value={formData.customerLastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Last Name"
              />
            </div>

            {/* Customer Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Email
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Email"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <DatePicker
                selected={formData.dueDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholderText="Select due date"
                dateFormat="MM/dd/yyyy"
              />
            </div>

            {/* Description - New Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter Description"
                rows="3"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-8 bg-pink-500 text-white py-3 px-4 rounded-lg transition duration-200 font-medium
              ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
              }`}
          >
            {loading ? "Creating Invoice..." : "Raise Invoice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
