import React, { useState } from 'react';

const AdminDashboard = () => {
  const [newFees, setNewFees] = useState({
    flatFee: '0.01',
    bps: '100'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Dummy data
  const dummyEscrows = [
    {
      invoiceId: "ESC001",
      escrowAddress: "0x1234567890abcdef1234567890abcdef12345678",
      buyer: "0xabcdef1234567890abcdef1234567890abcdef12",
      seller: "0x7890abcdef1234567890abcdef1234567890abcd",
      createdAt: "2024-03-15",
      amount: "1.5 ETH",
      status: "Active"
    },
    {
      invoiceId: "ESC002",
      escrowAddress: "0x2345678901abcdef2345678901abcdef23456789",
      buyer: "0xbcdef1234567890abcdef1234567890abcdef123",
      seller: "0x890abcdef1234567890abcdef1234567890abcde",
      createdAt: "2024-03-14",
      amount: "2.0 ETH",
      status: "Completed"
    },
    {
      invoiceId: "ESC003",
      escrowAddress: "0x3456789012abcdef3456789012abcdef34567890",
      buyer: "0xcdef1234567890abcdef1234567890abcdef1234",
      seller: "0x90abcdef1234567890abcdef1234567890abcdef",
      createdAt: "2024-03-13",
      amount: "0.5 ETH",
      status: "Active"
    }
  ];

  const handleUpdateFees = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Escrow Details</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Escrows Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Escrows</h2>
          <p className="text-3xl font-bold text-gray-900">15</p>
        </div>

        {/* Active Escrows Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Active Escrows</h2>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>

        {/* Total Value Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Value Locked</h2>
          <p className="text-3xl font-bold text-gray-900">25.5 ETH</p>
        </div>
      </div>

      {/* Fee Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Fees Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Fees</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flat Fee (ETH)
              </label>
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
              onClick={handleUpdateFees}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Fees
            </button>
            {showSuccess && (
              <div className="bg-green-50 text-green-800 p-4 rounded-md">
                Fees updated successfully!
              </div>
            )}
          </div>
        </div>

        {/* Current Fees Card */}
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

      {/* Escrows Table */}
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
                  Escrow Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyEscrows.map((escrow) => (
                <tr key={escrow.invoiceId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {escrow.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {`${escrow.escrowAddress.slice(0, 6)}...${escrow.escrowAddress.slice(-4)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {`${escrow.buyer.slice(0, 6)}...${escrow.buyer.slice(-4)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {`${escrow.seller.slice(0, 6)}...${escrow.seller.slice(-4)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {escrow.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {escrow.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      escrow.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {escrow.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;