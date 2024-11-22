import React, { useState, useEffect } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from "ethers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FlexiscrowContract } from "../../Constant/index";

import axiosInstance from '../../utils/axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const ADMIN_ADDRESS = "0x9Ee124A9A260aa68843F9d11B9529589c5cb83fC";
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [escrowDetails, setEscrowDetails] = useState({
    invoiceId: '',
    seller: '',
    completionDuration: '',
    releaseTimeout: ''
  });

  const _sellerAddress = localStorage.getItem("flexi_user");
  const sellerAddress = JSON.parse(_sellerAddress);

  console.log("seller", sellerAddress.address);
  

  const [newFees, setNewFees] = useState({
    flatFee: '0.01',
    bps: '100',
  });

  const [ escrows, setEscrows] = useState([]);
  const [isLoadingEscrows, setIsLoadingEscrows] = useState(false);

  const { writeContract: updateFees, data: updateData, isSuccess, isLoading: updating, error: updateError } = useWriteContract({});

  const { writeContract: createEscrow, isLoading: creatingEscrow } = useWriteContract();

  const { data: escrowData, isError: isReadError, isLoading: isReadLoading, refetch } = useReadContract({
    address: FlexiscrowContract.address,
    abi: FlexiscrowContract.abi,
    functionName: 'getEscrowDetails',
    args: selectedInvoiceId ? [selectedInvoiceId] : undefined,
    enabled: !!selectedInvoiceId,
  });

  const connectedAddress = JSON.parse(localStorage.getItem('flexi_user') || 'null');
  const isConnected = !!connectedAddress;

  console.log("connectedAddress object:", connectedAddress);
  console.log("address:", connectedAddress?.address);
  console.log("role:", connectedAddress?.role);

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedEscrow, setSelectedEscrow] = useState(null);
  

  console.log("this is esc", selectedEscrow);
  

  useEffect(() => {
    if (escrowData && selectedInvoiceId) {
      const [escrowAddress, buyer, seller, createdAt] = escrowData;
      setEscrowDetails(prev => ({
        ...prev,
        [selectedInvoiceId]: {
          escrowAddress,
          buyer,
          seller,
          createdAt: new Date(Number(createdAt) * 1000).toLocaleDateString(),
        }
      }));
    }
  }, [escrowData, selectedInvoiceId]);

  useEffect(() => {
    const fetchEscrows = async () => {
      if (!connectedAddress?.address) return;
      
      setIsLoadingEscrows(true);
      try {
        const response = await axiosInstance.get(`/invoice/get-invoices?address=${connectedAddress.address}&role=${connectedAddress.role}`);
        const transformedEscrows = response.data.map(escrow => ({
          invoiceId: escrow.id,
          seller: escrow.seller.id,
          completionDuration: calculateDuration(new Date(), new Date(escrow.dueDate)),
          releaseTimeout: 2 * 24 * 60 * 60,
          createdAt: new Date(escrow.createdAt).toLocaleDateString(),
          status: escrow.status.charAt(0).toUpperCase() + escrow.status.slice(1),
          isApproved: escrow.status !== 'pending',
          price: escrow.price,
          productName: escrow.productName,
          description: escrow.description
        }));

        setEscrows(transformedEscrows);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch escrows');
        console.error('Error fetching escrows:', error);
      } finally {
        setIsLoadingEscrows(false);
      }
    };

    fetchEscrows();
  }, []);

  const calculateDuration = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / 1000);
  };

  const handleViewDetails = async (invoiceId) => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }
    setSelectedInvoiceId(invoiceId);
    try {
      await refetch();
    } catch (error) {
      toast.error('Failed to fetch escrow details');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Fees updated successfully!');
      setNewFees({
        flatFee: '0.01',
        bps: '100',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.message || 'Failed to update fees');
    }
  }, [updateError]);

  const handleUpdateFees = async (e) => {
    e.preventDefault();

    if (!connectedAddress?.address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (connectedAddress?.address.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
      toast.error('Unauthorized: Only admin can update fees');
      return;
    }

    try {
      
      if (newFees.flatFee === '' || isNaN(newFees.flatFee) || parseFloat(newFees.flatFee) < 0) {
        toast.error('Please enter a valid flat fee');
        return;
      }

      if (
        newFees.bps === '' ||
        isNaN(newFees.bps) ||
        parseFloat(newFees.bps) < 0 ||
        parseFloat(newFees.bps) > 10000
      ) {
        toast.error('Basis points must be between 0 and 10000');
        return;
      }

      
      const flatFeeWei = parseEther(newFees.flatFee.toString());
      const bpsValue = BigInt(Math.floor(parseFloat(newFees.bps)));

      updateFees({
        address: FlexiscrowContract.address, 
        abi: FlexiscrowContract.abi, 
        functionName: 'updateFees',
        args: [flatFeeWei, bpsValue],
      });
    } catch (error) {
      toast.error(error.message || 'An error occurred while updating fees');
    }
  };

  const handleApprovalClick = (escrow) => {
    setSelectedEscrow(escrow);
    setShowApprovalModal(true);
  };

  const handleCreateEscrow = async (escrow) => {
   
    if (!connectedAddress?.address) {
      toast.error('Please connect your wallet');
      return;
    }

    

    try {
      
      if (!selectedEscrow) {
        toast.error('No escrow selected');
        return;
      }
      const completionDurationBigInt = BigInt(Math.floor(selectedEscrow.completionDuration));
      const releaseTimeoutBigInt = BigInt(selectedEscrow.releaseTimeout);

      createEscrow({
        address: FlexiscrowContract.address,
        abi: FlexiscrowContract.abi,
        functionName: 'createEscrow',
        args: [
            selectedEscrow.invoiceId,
            sellerAddress.address,
            selectedEscrow.completionDuration,
            selectedEscrow.releaseTimeout
        ],
        
      });
      
      // console.log('Transaction result:', result);
      
      setEscrows(prevEscrows => 
        prevEscrows.map(e => 
          e.invoiceId === selectedEscrow.invoiceId 
            ? { ...e, status: 'Active', isApproved: true }
            : e
        )
      );

      toast.success(`Escrow ${selectedEscrow.invoiceId} created successfully!`);
      setShowApprovalModal(false);
    } catch (error) {
      toast.error(`Failed to create escrow: ${error.message}`);
      setEscrows(prevEscrows => 
        prevEscrows.map(e => 
          e.invoiceId === escrow.invoiceId 
            ? { ...e, status: 'Failed' }
            : e
        )
      );
    }
  };

  
  const handleRejectEscrow = (escrow) => {
    setEscrows(prevEscrows => 
      prevEscrows.map(e => 
        e.invoiceId === escrow.invoiceId 
          ? { ...e, status: 'Rejected', isApproved: false }
          : e
      )
    );
    toast.info(`Escrow ${escrow.invoiceId} rejected`);
    setShowApprovalModal(false);
  };

  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    return `${days} days`;
  };


  

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Escrow Details</h1>
        {!isConnected && (
          <div className="text-yellow-600 bg-yellow-50 px-4 py-2 rounded-md">
            Please connect your wallet
          </div>
        )}
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Escrows</h2>
          <p className="text-3xl font-bold text-gray-900">15</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Active Escrows</h2>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Value Locked</h2>
          <p className="text-3xl font-bold text-gray-900">25.5 ETH</p>
        </div>
      </div>

      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Fees</h2>
            <form onSubmit={handleUpdateFees} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flat Fee (ETH)</label>
                <input
                  type="number"
                  value={newFees.flatFee}
                  onChange={(e) => setNewFees({ ...newFees, flatFee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basis Points (1 = 0.01%)
                </label>
                <input
                  type="number"
                  value={newFees.bps}
                  onChange={(e) => setNewFees({ ...newFees, bps: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>
              <button
                type="submit"
                disabled={updating}
                className={`w-full py-3 px-4 text-white bg-pink-500 rounded-md transition duration-200 ${
                  updating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
                }`}
              >
                {updating ? 'Updating Fees...' : 'Update Fees'}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Fee Structure</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Flat Fee:</span>
                <span className="text-gray-900">0.01 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Percentage Fee:</span>
                <span className="text-gray-900">1% (100 bps)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Last Updated:</span>
                <span className="text-gray-900">2024-03-15</span>
              </div>
            </div>
          </div>
        </div>
      )}

<div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Escrows</h2>
        </div>
        <div className="overflow-x-auto">
          {isLoadingEscrows ? (
            <div className="p-6 text-center">Loading escrows...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Release Timeout
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (ETH)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {escrows.map((escrow) => (
                  <React.Fragment key={escrow.invoiceId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {escrow.invoiceId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {`${escrow.seller.slice(0, 6)}...${escrow.seller.slice(-4)}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDuration(escrow.completionDuration)}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDuration(escrow.releaseTimeout)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {escrow.createdAt}
                    </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-sm rounded-full ${
                          escrow.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : escrow.status === 'Failed'
                            ? 'bg-red-100 text-red-800'
                            : escrow.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {escrow.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!escrow.isApproved && escrow.status !== 'Failed' ? (
                          <button
                            onClick={() => handleApprovalClick(escrow)}
                            disabled={!isConnected}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${
                              isConnected
                                ? 'bg-pink-500 text-white hover:bg-pink-600'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Approve
                          </button>
                        ) : escrow.status === 'Active' && isConnected && (
                          <button
                            onClick={() => handleViewDetails(escrow.invoiceId)}
                            disabled={isReadLoading}
                            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600"
                          >
                            {isReadLoading && selectedInvoiceId === escrow.invoiceId ? 'Loading...' : 'View Details'}
                          </button>
                        )}
                      </td>
                    </tr>
                    {escrowDetails[escrow.invoiceId] && (
                      <tr className="bg-gray-50">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Escrow Address</p>
                              <p className="text-sm font-mono text-gray-900">
                                {`${escrowDetails[selectedEscrow.invoiceId]?.escrowAddress.slice(0, 6)}...${escrowDetails[escrow.invoiceId]?.escrowAddress.slice(-4)}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Buyer</p>
                              <p className="text-sm font-mono text-gray-900">
                                {`${escrowDetails[selectedEscrow.invoiceId].buyer.slice(0, 6)}...${escrowDetails[escrow.invoiceId].buyer.slice(-4)}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Seller</p>
                              <p className="text-sm font-mono text-gray-900">
                                {`${escrowDetails[selectedEscrow.invoiceId].seller.slice(0, 6)}...${escrowDetails[escrow.invoiceId].seller.slice(-4)}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Created At</p>
                              <p className="text-sm text-gray-900">
                                {escrowDetails[selectedEscrow.invoiceId].createdAt}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal show={showApprovalModal} onHide={() => setShowApprovalModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Approve Escrow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEscrow && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                  <p className="text-sm font-medium text-gray-500">Invoice ID</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEscrow.invoiceId}</p>
                </div>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                  <p className="text-sm font-medium text-gray-500">Product Name</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedEscrow.productName}</p> */}
                </div>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                  <p className="text-sm font-medium text-gray-500">Seller</p>
                  <p className="text-sm font-mono text-gray-900">
                    {`${sellerAddress.address.slice(0, 6)}...${sellerAddress.address.slice(-4)}`}
                  </p>
                </div>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  {/* <p className="text-sm font-medium text-gray-900">{selectedEscrow.price} ETH</p> */}
                </div>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200  '>
                  <p className="text-sm font-medium text-gray-500">Release Timeout</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDuration(selectedEscrow.releaseTimeout)}
                  </p>
                </div>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                  <p className="text-sm font-medium text-gray-500">Completion duration</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEscrow.completionDuration}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                <p className="text-sm font-medium text-gray-500">Description</p>
                {/* <p className="text-sm text-gray-900">{selectedEscrow.description}</p> */}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        <Button 
          variant="danger" 
          onClick={() => handleRejectEscrow(selectedEscrow)}
          disabled={creatingEscrow}
          className='bg-red-500'
        >
          Reject
          </Button>
          <Button 
          variant="primary" 
          onClick={() => handleCreateEscrow(selectedEscrow)} 
          disabled={creatingEscrow}
        >
          {creatingEscrow ? 'Approving...' : 'Approve'}
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
