import { motion } from "framer-motion";
import logo from "../assets/logo.svg";
import facebook from "../assets/home/facebook.svg";
import twitter from "../assets/home/twitter.svg";
import youtube from "../assets/home/youtube.svg";
import linkedin from "../assets/home/linkedin.svg";

const Footer = () => {
  const footerSections = [
    {
      title: "PRODUCT",
      links: ["Pricing", "Overview", "Browse", "Accessibility", "Five"]
    },
    {
      title: "RESOURCES",
      links: ["Help Center", "Blog", "Tutorials"]
    },
    {
      title: "COMPANY",
      links: ["About", "Press", "Events", "Careers"]
    }
  ];

  const socialLinks = [
    { icon: youtube, alt: "youtube" },
    { icon: twitter, alt: "twitter" },
    { icon: facebook, alt: "facebook" },
    { icon: linkedin, alt: "linkedin" }
  ];

  return (
    <footer className="bg-[#0D4A9F] text-white px-4 sm:px-6 lg:px-[81px]">
      <div className="container mx-auto py-8 lg:py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="Lexiscrow Logo" className="w-32 mb-4" />
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-bold mb-3 text-lg">{section.title}</h3>
              <ul className="space-y-2 text-[#FFD8E4]">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline transition-all duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <hr className="my-8 border-t border-[#CBD5E1] opacity-30" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href="#"
                className="hover:opacity-80 transition-opacity"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={social.icon} alt={social.alt} className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[46px] text-center md:text-left">
            <div className="text-sm">
              Copyright &copy; 2024, Inc. All rights reserved.
            </div>
            
            <div className="flex gap-4 md:gap-[46px]">
              <a href="#" className="hover:underline transition-all duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline transition-all duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;