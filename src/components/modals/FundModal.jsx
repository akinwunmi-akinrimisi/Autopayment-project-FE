import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FundModal = ({ showModal, onHide, selectedEscrow, onFund }) => {
  return (
    <Modal show={showModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Fund Escrow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to fund this escrow with{' '}
            <span className="font-bold">{selectedEscrow?.price} ETH</span>?
          </p>
          <p className="text-sm text-gray-600">
            This action will require a wallet transaction to transfer the funds.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="success" 
          onClick={onFund}
          className="bg-green-500"
        >
          Approve Fund
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FundModal; 