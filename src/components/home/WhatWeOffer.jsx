import { motion } from "framer-motion";
import security from "../../assets/home/security.svg";
import transparent from "../../assets/home/transparent.svg";

const WhatWeOffer = () => {
  const features = [
    {
      icon: security,
      title: "Security First",
      description: "Our platform uses blockchain technology to ensure that all transactions are secure and transparent."
    },
    {
      icon: transparent,
      title: "Transparent",
      description: "Our platform offers clear and concise explanations of each feature and functions."
    },
    {
      icon: security,
      title: "Easy to Use",
      description: "From depositing funds to releasing payments, we offers a suite of tools to make transactions seamless and easy."
    }
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-10 xl:px-[81px] py-12 md:py-16 lg:py-20 min-h-[500px] lg:h-[746px]">
      <div className="max-w-[1440px] w-full mx-auto">
        <motion.div 
          className="flex flex-col gap-5 mb-8 lg:mb-[57px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-center text-[#0D4A9F]">
            What We Offer?
          </h2>

          <p className="text-base md:text-lg lg:text-[22px] font-normal text-center max-w-[800px] lg:max-w-[1036px] mx-auto">
            Explore our comprehensive set of features, designed to make escrows
            transactions easy, secure and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-[70px] w-full">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="w-full bg-[#FFFFFF] rounded-[20px] shadow-[4px_4px_4px_0px_#073B771A] hover:shadow-lg transition-shadow duration-300 flex flex-col gap-[25px] p-6 lg:p-8 xl:p-10 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <motion.img 
                src={feature.icon} 
                alt={feature.title} 
                className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[73px] xl:h-[73px]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              />
              
              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="text-xl md:text-2xl lg:text-[25px] font-bold text-[#0D4A9F] leading-9">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg lg:text-[20px] font-medium leading-[30px] text-[#073B77]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;