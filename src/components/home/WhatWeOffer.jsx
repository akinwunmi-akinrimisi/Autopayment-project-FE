import security from "../../assets/home/security.svg";
import transparent from "../../assets/home/transparent.svg";

const WhatWeOffer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-[81px] mt-[40px] h-[746px]">
      <div className="flex flex-col gap-5">
        <p className="text-[40px] font-semibold text-center text-[#0D4A9F]">
          What We Offer?
        </p>

        <p className="text-[22px] font-normal text-center w-[1036px]">
          Explore our comprehensive set of features, designed to make escrows
          transactions easy, secure and efficient.
        </p>
      </div>

      <div className="flex items-center justify-center gap-[70px] mt-[57px]">
        <div className="w-[386px] min-h-[341px] bg-[#FFFFFF] rounded-[20px] shadow-[4px_4px_4px_0px_#073B771A] flex flex-col gap-[25px] p-10 h-full">
          <img src={security} alt="ICON" className="w-[73px] h-[73px]" />
          <div className="flex flex-col gap-2 flex-grow">
            <p className="text-[25px] font-bold text-[#0D4A9F] leading-9">
              Security First
            </p>
            <p className="text-[20px] font-medium leading-[30px] text-[#073B77]">
              Our platform uses blockchain technology to ensure that all
              transactions are secure and transparent.
            </p>
          </div>
        </div>

        <div className="w-[386px] min-h-[341px] bg-[#FFFFFF] rounded-[20px] shadow-[4px_4px_4px_0px_#073B771A] flex flex-col gap-[25px] p-10 h-full">
          <img src={transparent} alt="ICON" className="w-[73px] h-[73px]" />
          <div className="flex flex-col gap-2 flex-grow">
            <p className="text-[25px] font-bold text-[#0D4A9F] leading-9">
              Transparent
            </p>
            <p className="text-[20px] font-medium leading-[30px] text-[#073B77]">
            Our platform offers clear and concise explanations of each feature and functions.
            </p>
          </div>
        </div>

        <div className="w-[386px] min-h-[341px] bg-[#FFFFFF] rounded-[20px] shadow-[4px_4px_4px_0px_#073B771A] flex flex-col gap-[25px] p-10 h-full">
          <img src={security} alt="ICON" className="w-[73px] h-[73px]" />
          <div className="flex flex-col gap-2 flex-grow">
            <p className="text-[25px] font-bold text-[#0D4A9F] leading-9">
              Easy to Use
            </p>
            <p className="text-[20px] font-medium leading-[30px] text-[#073B77] ">
            From depositing funds to releasing payments, we offers a suite of tools to make transactions seamless and easy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
