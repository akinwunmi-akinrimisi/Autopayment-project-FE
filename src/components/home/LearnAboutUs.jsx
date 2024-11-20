import bitcoin from "../../assets/home/bitcoin.svg";

const LearnAboutUs = () => {
  return (
    <div className="w-full flex flex-col justify-center  px-[81px] mt-[40px] bg-[#0D4A9F] h-[713px]">
      <div className="flex gap-10 relative">
        <div className="">
          <p className="text-[36px] font-bold text-white">Learn About Us</p>

          <p className="text-[22px] font-medium text-white w-[391px] mt-5">
            Flexiscrow offers secure escrow services for cryptocurrency
            payments, protecting funds until all transaction terms are met.
            Trust us for safe and transparent digital trades.
          </p>
        </div>

        <div className="flex flex-col gap-5 z-10">
          <div className="w-[310px] h-[113px] bg-white rounded-[10px] flex items-center justify-center p-5">
            <p className="text-[18px] font-medium text-center text-[#0D4A9F]">
              Registered by the Corporate Affairs Commission in Nigeria.
            </p>
          </div>

          <div className="w-[310px] h-[113px] bg-white rounded-[10px] flex items-center justify-center p-5">
            <p className="text-[18px] font-medium text-center text-[#0D4A9F]">
            Licensed as an Escrow Company.
            </p>
          </div>

          <div className="w-[310px] h-[113px] bg-white rounded-[10px] flex items-center justify-center p-5">
            <p className="text-[18px] font-medium text-center text-text">
              Award-Winning Crypto Payment Company in Africa.
            </p>
          </div>
        </div>

        <img src={bitcoin} alt="bitcoin" className="absolute -top-8 right-0 "/>
      </div>

      <button className="text-white px-4 py-2 rounded-md w-[215px] h-[70px] bg-btn_bg hover:scale-[101%] transition-all duration-200 mt-[10px] ">
        Learn More...
      </button>
    </div>
  );
};

export default LearnAboutUs;
