import { useState, useRef, useEffect } from "react";

const EscrowDropDown = ({
  userRole,
  onView,
  onEdit,
  onDelete,
  onReleaseFunds,
  onSubmitDispute,
  onFund,
  onApprove,
  escrowStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log(escrowStatus);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100/30 "
      >
        <img src="/src/assets/dots.svg" width={24} height={24} alt="more" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#F1F5F9] rounded-md shadow-lg z-[9999] divide-col-border divide-y ">
          {userRole === "customer" && (
            <>
              {escrowStatus !== "Accepted" && (
                <button
                  onClick={onApprove}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 justify-center"
                >
                  <span>Approve</span>
                </button>
              )}
              <button
                onClick={onReleaseFunds}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 justify-center"
              >
                <span>Release Funds</span>
              </button>
              <button
                onClick={onSubmitDispute}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 justify-center"
              >
                <span>Submit Dispute</span>
              </button>
              <button
                onClick={onFund}
                disabled={escrowStatus !== "Accepted"}
                className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 justify-center ${
                  escrowStatus !== "Accepted"
                    ? "bg-gray-300 cursor-not-allowed"
                    : ""
                }`}
              >
                <span>Fund</span>
              </button>
            </>
          )}
          {userRole === "vendor" && (
            <>
              <button
                onClick={onView}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 justify-center"
              >
                <span>View Details</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EscrowDropDown;
