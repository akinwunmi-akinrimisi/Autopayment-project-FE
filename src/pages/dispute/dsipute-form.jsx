import React, { useState } from "react";
import Input from "../../components/ui/input/input";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function DisputeForm() {
    const location = useLocation(); // Get the location object
    const { invoiceId } = location.state || {}; // Access the invoice ID from state
  console.log(invoiceId)
  const [formData, setFormData] = useState({
    invoiceId: invoiceId || "",
    title: "",
    description: "",
    attachmentUrls: [],
  });

  const [file, setFile] = useState(null); // To store the file for upload
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (file) => {
    if (file) {
      setFile(file); // Set the file state to the selected file
    } else {
      setFile(null); // Reset file state if no file is selected
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.invoiceId.trim()) {
      newErrors.invoiceId = "Invoice ID is required.";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!file) {
      newErrors.file = "A document or image must be uploaded."; // Ensure this error is set if no file is selected
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const uploadFile = async () => {
    if (!file) return null;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET); // Your Cloudinary preset
    uploadData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadData
      );

      return response.data.secure_url; // Cloudinary URL
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const fileUrl = await uploadFile();

      if (!fileUrl) {
        setErrors({ file: "Failed to upload file. Please try again." });
        setIsSubmitting(false);
        return;
      }

      // Submit dispute form with the uploaded file URL
      await axios.post(`${import.meta.env.VITE_BASE_URL}/disputes`, {
        invoiceId: formData.invoiceId,
        status: "open", // Assuming 'open' is the default status
        title: formData.title,
        description: formData.description,
        attachmentUrls: [fileUrl],
        resolutionDetails: "Awaiting response from billing department.",
      });
      toast.success("Dispute submitted successfully!");
      setResponseMessage("Dispute submitted successfully!");
      setFormData({
        invoiceId: "",
        title: "",
        description: "",
        attachmentUrls: [],
      });
      setFile(null);
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
      toast.error(`Error: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Submit a Dispute
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="invoiceId"
          name="invoiceId"
          label="Invoice ID"
          placeholder="Enter Invoice ID"
          value={formData.invoiceId}
          onChange={handleChange}
          error={errors.invoiceId}
        //   readOnly={!!invoiceId}
        />
        <Input
          id="title"
          name="title"
          label="Title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          id="description"
          name="description"
          isTextArea
          label="Description"
          placeholder="Enter description of your dispute"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />

        {/* File Upload */}
        <Input
          id="file"
          name="file"
          type="file"
          label="Upload Document/Image"
          onChange={handleFileChange}
          error={errors.file}
        />

        <button
          type="submit"
          className="w-full bg-btn_bg text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/* {responseMessage && (
        <p
          className={`mt-4 text-center ${
            responseMessage.startsWith("Error")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {responseMessage}
        </p>
      )} */}
    </div>
  );
}

export default DisputeForm;