import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ApprovalModal = ({
  showModal,
  onHide,
  selectedEscrow,
  sellerAddress,
  onReject,
  onCreate,
  isCreating,
  formatDuration
}) => {
  return (
    <Modal show={showModal} onHide={onHide} size="lg">
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
                <p className="text-sm font-medium text-gray-900">{selectedEscrow.productName}</p>
              </div>
              <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                <p className="text-sm font-medium text-gray-500">Seller</p>
                <p className="text-sm font-mono text-gray-900">
                  {`${sellerAddress.address.slice(0, 6)}...${sellerAddress.address.slice(-4)}`}
                </p>
              </div>
              <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="text-sm font-medium text-gray-900">{selectedEscrow.price} ETH</p>
              </div>
              <div className='flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
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
              <p className="text-sm text-gray-900">{selectedEscrow.description}</p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="danger" 
          onClick={onReject}
          disabled={isCreating}
          className='bg-red-500'
        >
          Reject
        </Button>
        <Button 
          variant="primary" 
          onClick={onCreate} 
          disabled={isCreating}
        >
          {isCreating ? 'Approving...' : 'Approve'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalModal; 