// assets
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('flexi_session');
    
    if (!isLoggedIn) {
      toast.warning('Please login to access the dashboard');
      return;
    }
    
    navigate('/admin/dashboard');
  };

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
            <NavLink onClick={handleDashboardClick}>Dashboard</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {isConnected && (
          <button 
            onClick={() => navigate('/login')}
            className="h-[42px] bg-[#EA3982] w-fit px-4 rounded-[10px] text-[#FFFFFF] font-medium hover:scale-[102%] transition-all duration-100"
          >
            Sign up
          </button>
        )}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
