import pc_screen from "../../assets/home/pc_screen.svg";
import phone_screen from "../../assets/home/phone_screen.svg";
import phone_duplicate from "../../assets/home/phone_duplicate.svg";

const HowItWorks = () => {
  return (
    <div className="w-full flex flex-col items-center px-[81px] mt-[104px]">
      <p className="text-[40px] font-semibold text-[#0D4A9F] leading-[60px]">
        How it works
      </p>
      <p className="w-[1036px] text-center text-[22px] font-normal leading-[33px] text-[#073B77] mt-3">
        Explore our comprehensive set of features, designed to make escrows
        transactions easy, secure and efficient.
      </p>

      <div className="flex items-center mt-[144px] gap-[80px]">
        <div className="flex-1 flex flex-col justify-center gap-[35px]">
          <p className="text-[24px] font-semibold leading-[36px]">
            Initiate Escrow Transaction
          </p>
          <p className="text-[22px] font-normal leading-[33px] text-[#333333CC]">
            Buyer selects a service or product and deposits the agreed amount
            into a secure Web3 escrow. Funds are safely held until the
            transaction is completed.r
          </p>
        </div>
        <div className="flex items-center">
          {" "}
          <img src={pc_screen} alt="PC SCREEN" />{" "}
        </div>
      </div>

      <div className="flex items-center mt-[144px] gap-[80px]">
        <div className="flex items-center">
          {" "}
          <img src={phone_screen} alt="PC SCREEN" />{" "}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-[35px]">
          <p className="text-[24px] font-semibold leading-[36px]">
            Deliver and Confirm
          </p>
          <p className="text-[22px] font-normal leading-[33px] text-[#333333CC]">
            The platform provides real-time updates, allowing the buyer to track
            the status and progress of the delivery. Once the buyer receives the
            product or service, they have the opportunity to review it for
            quality and accuracy.
          </p>
        </div>
      </div>

      <div className="flex items-center mt-[144px] gap-[80px]">
        <div className="flex-1 flex flex-col justify-center gap-[35px]">
          <p className="text-[24px] font-semibold leading-[36px]">
            Automatic Release
          </p>
          <p className="text-[22px] font-normal leading-[33px] text-[#333333CC]">
            Upon buyer confirmation, funds are released to the seller instantly.
            Every transaction is transparently recorded on the blockchain for
            complete trust and security.{" "}
          </p>
        </div>
        <div className="flex items-center">
          <img src={phone_duplicate} alt="PC SCREEN" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
