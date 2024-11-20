import React from 'react'
import home from "../../assets/home/home_hero.svg";
import { motion } from "framer-motion";

function HeroSection() {
    return (
        <div className="w-full px-4 sm:px-10 xl:px-[81px] pt-[120px] min-h-[400px] lg:min-h-[600px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-[1440px] mx-auto">
            {/* Text Content */}
            <motion.div 
              className="flex-1 flex flex-col justify-center text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="font-semibold text-3xl md:text-4xl lg:text-[48px] xl:text-[64px] text-[#0D4A9F] leading-tight lg:leading-[1.2] xl:leading-[76.8px] max-w-[720px] lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Secure, Transparent Payment for Small Businesses.
              </motion.h1>
              
              <motion.p 
                className="w-full lg:max-w-[460px] xl:max-w-[567px] text-base md:text-lg lg:text-[20px] xl:text-[22px] font-medium leading-relaxed lg:leading-[36px] text-[#333333CC] mt-3 lg:mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Automate payments, secure transactions, and ensure transparency with our Web3 escrow solution.
              </motion.p>
            </motion.div>
    
            {/* Image */}
            <motion.div 
              className="flex-1 flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <img 
                src={home} 
                alt="home" 
                className="w-full max-w-[500px] lg:max-w-[450px] xl:max-w-none h-auto"
              />
            </motion.div>
          </div>
        </div>
      );
}

export default HeroSection