import logo from "../assets/logo.svg";
import facebook from "../assets/home/facebook.svg";
import twitter from "../assets/home/twitter.svg";
import youtube from "../assets/home/youtube.svg";
import linkedin from "../assets/home/linkedin.svg";

const Footer = () => {
  return (
    <div className="bg-[#0D4A9F] text-white px-[81px]">
      <div className="container mx-auto px-4  py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <img src={logo} alt="Lexiscrow Logo" className="w-32 mb-4" />
        </div>

        <div>
          <h3 className="font-bold mb-3">PRODUCT</h3>
          <ul className="space-y-2 text-[#FFD8E4]">
            <li>
              <a href="#" className="link hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Browse
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Five
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-[#FFD8E4]">
            <li>
              <a href="#" className="link hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-[#FFD8E4]">
            <li>
              <a href="#" className="link hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="link hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-t border-[#CBD5E1] w-[100%] mx-auto" />

      <div className="container mx-auto   py-6 flex items-center gap-[46px] text-sm">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-gray-300">
            <img src={youtube} alt="youtube" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <img src={facebook} alt="facebook" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>

        <div className="text-center md:text-left">
          Copyright &copy; 2024, Inc. All rights reserved.
        </div>

        <div className="">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="flex">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
