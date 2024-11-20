import React, { useState, useEffect } from 'react';
import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseEther } from "ethers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FlexiscrowContract } from "../../Constant/index";

const AdminDashboard = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const ADMIN_ADDRESS = "0x6BF7d6b94282BD48ff458599aDafA268BcB009FF";
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [escrowDetails, setEscrowDetails] = useState({});

  const [newFees, setNewFees] = useState({
    flatFee: '0.01',
    bps: '100',
  });

  const [escrows, setEscrows] = useState([
    {
      invoiceId: '1',
      seller: '0x6BF7d6b94282BD48ff458599aDafA268BcB009FF',
      completionDuration: 7 * 24 * 60 * 60, // 7 days in seconds
      releaseTimeout: 2 * 24 * 60 * 60, // 2 days in seconds
      createdAt: '2024-03-15',
      status: 'Pending',
      isApproved: false,
    },
    {
      invoiceId: "2",
      seller: "0x890abcdef1234567890abcdef1234567890abcde",
      completionDuration: 14 * 24 * 60 * 60, // 14 days in seconds
      releaseTimeout: 3 * 24 * 60 * 60, // 3 days in seconds
      createdAt: "2024-03-14",
      status: 'Pending',
      isApproved: false,
    },
    {
      invoiceId: "3",
      seller: "0x7890abcdef1234567890abcdef1234567890abcd",
      completionDuration: 30 * 24 * 60 * 60, // 30 days in seconds
      releaseTimeout: 5 * 24 * 60 * 60, // 5 days in seconds
      createdAt: "2024-03-13",
      status: 'Pending',
      isApproved: false,
    }
  ]); 

  const { writeContract: updateFees, data: updateData, isSuccess, isLoading: updating, error: updateError } = useWriteContract({});

  const { writeContract: createEscrow, isLoading: creatingEscrow } = useWriteContract();

  const { data: escrowData, isError: isReadError, isLoading: isReadLoading, refetch } = useReadContract({
    address: FlexiscrowContract.address,
    abi: FlexiscrowContract.abi,
    functionName: 'getEscrowDetails',
    args: selectedInvoiceId ? [selectedInvoiceId] : undefined,
    enabled: !!selectedInvoiceId,
  });

  const isAdmin = isConnected && connectedAddress?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

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

  const handleViewDetails = async (invoiceId) => {
    if (!isAdmin) {
      toast.error('Only admin can view escrow details');
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

    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!isAdmin) {
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

      // Convert ETH to Wei and ensure bps is an integer
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

  const handleCreateEscrow = async (escrow) => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!isAdmin) {
      toast.error('Unauthorized: Only admin can approve escrows');
      return;
    }

    try {
       createEscrow({
        address: FlexiscrowContract.address,
        abi: FlexiscrowContract.abi,
        functionName: 'createEscrow',
        args: [
          escrow.invoiceId,
          escrow.seller,
          BigInt(escrow.completionDuration),
          BigInt(escrow.releaseTimeout)
        ],
      });
      
      // Update the local state to reflect the change
      setEscrows(prevEscrows => 
        prevEscrows.map(e => 
          e.invoiceId === escrow.invoiceId 
            ? { ...e, status: 'Active', isApproved: true }
            : e
        )
      );

      toast.success(`Escrow ${escrow.invoiceId} created successfully!`);
    } catch (error) {
      toast.error(`Failed to create escrow: ${error.message}`);
      // Update status to reflect failure
      setEscrows(prevEscrows => 
        prevEscrows.map(e => 
          e.invoiceId === escrow.invoiceId 
            ? { ...e, status: 'Failed' }
            : e
        )
      );
    }
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
        {/* {isConnected && !isAdmin && (
          <div className="text-red-600 bg-red-50 px-4 py-2 rounded-md">
            Not authorized as admin
          </div>
        )} */}
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

      {isAdmin && (
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
                  Completion Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release Timeout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
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
                          onClick={() => handleCreateEscrow(escrow)}
                          disabled={creatingEscrow || !isAdmin}
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            isAdmin
                              ? 'bg-pink-500 text-white hover:bg-pink-600'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          } ${creatingEscrow ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {creatingEscrow ? 'Approving...' : 'Approve'}
                        </button>
                      ) : escrow.status === 'Active' && isAdmin && (
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
                              {`${escrowDetails[escrow.invoiceId].escrowAddress.slice(0, 6)}...${escrowDetails[escrow.invoiceId].escrowAddress.slice(-4)}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Buyer</p>
                            <p className="text-sm font-mono text-gray-900">
                              {`${escrowDetails[escrow.invoiceId].buyer.slice(0, 6)}...${escrowDetails[escrow.invoiceId].buyer.slice(-4)}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Seller</p>
                            <p className="text-sm font-mono text-gray-900">
                              {`${escrowDetails[escrow.invoiceId].seller.slice(0, 6)}...${escrowDetails[escrow.invoiceId].seller.slice(-4)}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Created At</p>
                            <p className="text-sm text-gray-900">
                              {escrowDetails[escrow.invoiceId].createdAt}
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;