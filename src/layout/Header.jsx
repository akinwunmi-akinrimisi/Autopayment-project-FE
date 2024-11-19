// assets
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="max:w-full w-full h-[100px] bg-[#0D4A9F] flex items-center justify-between pl-[106px] pr-[84px]">
      <img src={logo} alt="LEXISCROW" />

      <div>
        <ul className="flex items-center gap-10">
          <li className="text-[#FFFFFF] text-[24px] font-medium">
            <NavLink>Home</NavLink>
          </li>

          <li className="text-[#FFFFFF] text-[24px] font-medium">
            <NavLink>About Us</NavLink>
          </li>

          <li className="text-[#FFFFFF] text-[24px] font-medium">
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>
      <ConnectButton/>

      {/* <button className="h-[60px] bg-[#EA3982] w-[215px] rounded-[10px] text-[#FFFFFF] font-medium">
        Connect wallet
      </button> */}
    </div>
  );
};

export default Header;
