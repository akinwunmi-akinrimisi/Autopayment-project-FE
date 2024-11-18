import { useState, useEffect } from 'react';

const NewEscrow = () => {
  const [formData, setFormData] = useState({
    invoiceId: '',
    buyer: '',
    seller: '',
    completionDuration: '',
    releaseTimeout: '',
    contractData: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (formData.invoiceId && formData.buyer && formData.seller && 
        formData.completionDuration && formData.releaseTimeout) {
      const completionTimestamp = new Date(formData.completionDuration).getTime() / 1000;
      const releaseTimestamp = new Date(formData.releaseTimeout).getTime() / 1000;
      
      const contractData = `0xe4154edf${formData.invoiceId}${formData.buyer.slice(2)}${formData.seller.slice(2)}${completionTimestamp.toString(16)}${releaseTimestamp.toString(16)}`;
      
      setFormData(prev => ({
        ...prev,
        contractData
      }));
    }
  }, [formData.invoiceId, formData.buyer, formData.seller, formData.completionDuration, formData.releaseTimeout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting escrow with data:', formData);
    } catch (error) {
      console.error('Error creating escrow:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      <p className="text-2xl font-bold mb-2">New Escrow</p>
      <p className="text-gray-600 mb-8">
        Fill the forms below to create a new escrow for your customer.
      </p>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice ID
            </label>
            <input
              type="text"
              name="invoiceId"
              value={formData.invoiceId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter Invoice ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buyer Address
            </label>
            <input
              type="text"
              name="buyer"
              value={formData.buyer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter Buyer's Ethereum Address"
              pattern="^0x[a-fA-F0-9]{40}$"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller Address
            </label>
            <input
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter Seller's Ethereum Address"
              pattern="^0x[a-fA-F0-9]{40}$"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Completion Duration
            </label>
            <input
              type="date"
              name="completionDuration"
              value={formData.completionDuration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Timeout
            </label>
            <input
              type="date"
              name="releaseTimeout"
              value={formData.releaseTimeout}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contract Write Data (0xe4154edf)
            </label>
            <textarea
              name="contractData"
              value={formData.contractData}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Contract interaction data will be generated here"
              readOnly
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition duration-200 font-medium"
        >
          Create Escrow
        </button>
      </form>
    </div>
  );
};

export default NewEscrow;
