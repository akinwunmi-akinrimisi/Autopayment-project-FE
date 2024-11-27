import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailsModal = ({ showModal, onHide, currentEscrowDetails, formatDuration }) => {
  return (
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Escrow Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentEscrowDetails && (
          <div>
            <h5>Invoice ID: {currentEscrowDetails.invoiceId}</h5>
            <p>Seller: {currentEscrowDetails.seller}</p>
            <p>Buyer: {currentEscrowDetails.buyer}</p>
            <p>Completion Duration: {formatDuration(currentEscrowDetails.completionDuration)}</p>
            <p>Release Timeout: {formatDuration(currentEscrowDetails.releaseTimeout)}</p>
            <p>Created At: {currentEscrowDetails.createdAt}</p>
            <p>Status: {currentEscrowDetails.status}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal; 