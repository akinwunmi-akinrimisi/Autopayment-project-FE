import Header from "../../layout/Header";
import home from "../../assets/home/home_hero.svg";
import HowItWorks from "../../components/home/HowItWorks";
import LearnAboutUs from "../../components/home/LearnAboutUs";
import WhatWeOffer from "../../components/home/WhatWeOffer";
import Footer from "../../layout/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Header />

      <div className="w-full flex px-[81px] mt-[100px] min-h-[600px] ">
        <div className="flex-1 flex flex-col justify-center">
          <p className="font-semibold text-[64px] text-[#0D4A9F] leading-[76.8px]">Secure, Transparent Payment for Small Businesses.</p>
          <p className="w-[567px] text-[22px] font-medium leading-[36px] text-[#333333CC] mt-5">Automate payments, secure transactions, and ensure transparency with our Web3 escrow solution.</p>
        </div>
        <div className="flex-1 flex items-center">
          <img src={home} alt="home" className="w-full h-auto" />
        </div>
      </div>
      <HowItWorks />
      <LearnAboutUs />
      <WhatWeOffer />
      <Footer />
    </div>
  );
};

export default Home;
