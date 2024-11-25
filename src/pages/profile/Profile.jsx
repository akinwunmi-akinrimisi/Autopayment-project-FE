import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"; 

// assets
import add_photo from "../../assets/profile/add_photo.svg";
import { toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({
    isProfileUpdated: true, 
    phone: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    website: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
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

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/profile`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      });

      if (response.data) {
        // Handle success - maybe show a toast notification
        toast.success('Profile updated successfully')
        console.log('Profile updated successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("Uploaded files:", acceptedFiles);
      // Add image upload logic here if needed
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {error && (
        <div className="px-8 mb-4 text-red-600">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="px-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600">
          Fill the forms below to update your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-[40px]">
          <div className="w-[400px] h-[400px] bg-[#FFFFFF] rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
            <div
              {...getRootProps()}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "2px dashed #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <input {...getInputProps()} />
              <div
                style={{ textAlign: "center" }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <img src={add_photo} alt="add_photo" />
                <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
                  Upload photo
                </p>
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[14px] text-[#888] text-center">
                Allowed format
              </p>
              <p className="text-[14px] text-[#888] text-center">
                JPEG, PNG, and JPG
              </p>
            </div>

            <div className="mt-9">
              <p className="text-[14px] text-[#888] text-center">Max file size</p>
              <p className="text-[14px] text-[#888] text-center">2MB</p>
            </div>
          </div>

          <div className="w-[724px] min-h-[400px] p-8 bg-[#FFFFFF] rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter First Name"
                //   required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter Last Name"
                //   required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter Phone Number"
                //   required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter Organization Name"
                //   required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter Website URL"
                //   required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="submit"
                disabled={loading}
                className={`bg-pink-500 text-white px-4 py-2 rounded-lg transition duration-200 font-medium hover:bg-pink-600 
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
