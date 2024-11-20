import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWriteContract } from 'wagmi';
import { FlexiscrowContract } from '../../Constant';

const NewEscrow = () => {
  const [formData, setFormData] = useState({
    invoiceId: '',
    buyer: '',
    seller: '',
    completionDuration: '',
    releaseTimeout: '',
    contractData: ''
  });

  const {
    data: createData,
    isSuccess,
    writeContract: createEscrow,
    isLoading: creating,
    error: createError,
  } = useWriteContract();

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

  // Add success effect
  useEffect(() => {
    if (isSuccess) {
      toast.success('Escrow created successfully!');
      // Reset form after successful creation
      setFormData({
        invoiceId: '',
        seller: '',
        completionDuration: '',
        releaseTimeout: '',
        contractData: ''
      });
    }
  }, [isSuccess]);

  // Add error effect
  useEffect(() => {
    if (createError) {
      toast.error(createError.message || 'Failed to create escrow');
    }
  }, [createError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const completionTimestamp = Math.floor(new Date(formData.completionDuration).getTime() / 1000);
      const releaseTimestamp = Math.floor(new Date(formData.releaseTimeout).getTime() / 1000);
      
      
      if (releaseTimestamp <= completionTimestamp) {
        toast.error('Release timeout must be after completion duration');
        return;
      }


      if (!formData.seller.match(/^0x[a-fA-F0-9]{40}$/)) {
        toast.error('Invalid seller address format');
        return;
      }

      createEscrow({
        address: FlexiscrowContract.address,
        abi: FlexiscrowContract.abi,
        functionName: "createEscrow",
        args: [
          formData.invoiceId,
          formData.seller,
          BigInt(completionTimestamp),
          BigInt(releaseTimestamp)
        ]
      });
      toast.success("Escrow Transaction initiated! Waiting for confirmation...");
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the escrow');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      <ToastContainer position="top-right" autoClose={5000} />
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
          </div>
        <button
          type="submit"
          disabled={creating}
          className={`w-full mt-8 bg-pink-500 text-white py-3 px-4 rounded-lg transition duration-200 font-medium
            ${creating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'}`}
        >
          {creating ? 'Creating Escrow...' : 'Create Escrow'}
        </button>
      </form>
    </div>
  );
};

export default NewEscrow;