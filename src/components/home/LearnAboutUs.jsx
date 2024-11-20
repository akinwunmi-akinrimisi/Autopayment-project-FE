import { motion } from "framer-motion";
import bitcoin from "../../assets/home/bitcoin.svg";

const LearnAboutUs = () => {
  const cards = [
    {
      text: "Registered by the Corporate Affairs Commission in Nigeria.",
      color: "text-[#0D4A9F]"
    },
    {
      text: "Licensed as an Escrow Company.",
      color: "text-[#0D4A9F]"
    },
    {
      text: "Award-Winning Crypto Payment Company in Africa.",
      color: "text-text"
    }
  ];

  return (
    <div className="w-full flex flex-col justify-center px-4 sm:px-6 lg:px-[81px] py-12 md:py-16 lg:py-0 bg-[#0D4A9F] min-h-[500px] lg:h-[713px]">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
          {/* Text Content */}
          <div className="flex flex-col w-full lg:w-auto">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-[36px] font-bold text-white text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Learn About Us
            </motion.h2>

            <motion.p 
              className="text-base md:text-lg lg:text-[20px] xl:text-[22px] font-medium text-white w-full lg:w-[350px] xl:w-[391px] mt-3 lg:mt-5 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Flexiscrow offers secure escrow services for cryptocurrency
              payments, protecting funds until all transaction terms are met.
              Trust us for safe and transparent digital trades.
            </motion.p>

            {/* Button moved inside text content div */}
            <motion.button 
              className="text-white px-4 py-2 rounded-md w-full sm:w-[215px] h-[50px] md:h-[70px] bg-btn_bg hover:scale-[101%] transition-all duration-200 mt-6 lg:mt-8 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More...
            </motion.button>
          </div>

          {/* Rest of the component remains the same */}
          <motion.div 
            className="flex flex-col gap-5 z-10 w-full lg:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                className="w-full lg:w-[280px] xl:w-[310px] h-[113px] bg-white rounded-[10px] flex items-center justify-center p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <p className={`text-base md:text-[16px] lg:text-[18px] font-medium text-center ${card.color}`}>
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.img 
            src={bitcoin} 
            alt="bitcoin" 
            className="hidden lg:block absolute -top-8 right-0  w-auto h-auto lg:w-[500px] xl:w-auto "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LearnAboutUs;