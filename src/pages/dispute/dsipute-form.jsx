import React, { useState } from "react";
import Input from "../../components/ui/input/input";

function DisputeForm() {
  const [formData, setFormData] = useState({
    invoiceId: "",
    title: "",
    description: "",
    image: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (files) => {
    setFormData((prevData) => ({ ...prevData, image: files[0] }));
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
    if (!formData.image) {
      newErrors.image = "A document or image must be uploaded.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitting form data:", formData);
    }
  };

  return (
    <div className="max-w-lg p-6 ">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Submit a Dispute
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Invoice ID */}
        <Input
          id="invoiceId"
          name="invoiceId"
          label="Invoice ID"
          placeholder="Enter Invoice ID"
          value={formData.invoiceId}
          onChange={handleChange}
          error={errors.invoiceId}
        />

        {/* Title */}
        <Input
          id="title"
          name="title"
          label="Title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        {/* Description */}
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
          id="image"
          name="image"
          type="file"
          label="Upload Document/Image"
          onChange={(e) => handleFileChange(e.target.files)}
          error={errors.image}
        />
       

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-btn_bg text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DisputeForm;
