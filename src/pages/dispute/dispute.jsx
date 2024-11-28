import { useState, useEffect } from "react";
import DisputeForm from "./dsipute-form";

const Dsipute = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">Dispute</h1>
        <p className="text-gray-600">
          Fill the forms below to submit your dispute.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <DisputeForm />
      </div>
    </div>
  );
};

export default Dsipute;
