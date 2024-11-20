import Header from "../../layout/Header";
import HowItWorks from "../../components/home/HowItWorks";
import LearnAboutUs from "../../components/home/LearnAboutUs";
import WhatWeOffer from "../../components/home/WhatWeOffer";
import Footer from "../../layout/Footer";
import HeroSection from "../../components/home/HeroSection";

const Home = () => {
  return (
    <div className="home-page w-full">
      <Header />

      <HeroSection/>
      <HowItWorks />
      <LearnAboutUs />
      <WhatWeOffer />
      <Footer />
    </div>
  );
};

export default Home;
