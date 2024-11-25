import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useWriteContract } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import { EscrowContract } from "../../Constant";

const FundModal = ({ showModal, onHide, selectedEscrow, onFund }) => {
  const { writeContract: fundEscrow, isLoading: fundingEscrow } = useWriteContract();

  const handleFundEscrow = async () => {
    try {
     
      const priceInEther = parseFloat(selectedEscrow.price); 
      const feeInEther = (priceInEther * (0.025)) + 3; 
      const amountAfterFee = priceInEther + feeInEther; 
     
      // Convert values to Wei
      const amount = ethers.parseEther(priceInEther.toString());
      const fee = ethers.parseEther(feeInEther.toString());

      console.log("amount in wei:", amount);
      console.log("amount in wei:", fee);
      

       fundEscrow({
        address: EscrowContract.address,
        abi: EscrowContract.abi,
        functionName: "fundEscrow",
        args: [amount, fee],
      });

      toast.success("Escrow funded successfully!");
      onHide(); 
      onFund(); 
    } catch (error) {
      toast.error("Failed to fund escrow: " + error.message);
    }
    
    
  };

  return (
    <Modal show={showModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Fund Escrow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to fund this escrow with{" "}
            <span className="font-bold">{selectedEscrow?.price} ETH</span>?
          </p>
          <p className="text-sm text-gray-600">
            This action will require a wallet transaction to transfer the funds.
          </p>
          <p></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleFundEscrow}
          className="bg-green-500"
          disabled={fundingEscrow}
        >
          {fundingEscrow ? "Processing..." : "Approve Fund"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FundModal;
