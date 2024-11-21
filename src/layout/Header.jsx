// assets
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { disconnect } from "wagmi/actions";

const Header = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (!isConnected && localStorage.getItem('flexi_session')) {
      localStorage.removeItem('flexi_session');
      toast.info('Logged out successfully');
      navigate('/');
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (address && isConnected && !localStorage.getItem('flexi_session')) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/web3-login`, {
            address: address,
            // role: 'vendor'
          });
    
          if (response.data.success) {
            localStorage.setItem('flexi_session', JSON.stringify(response.data.data.session));
            localStorage.setItem('flexi_user', JSON.stringify(response.data.data.user));
            
            if (response.data.data.user.isProfileUpdated === false) {
              toast.info('Please complete your profile');
              navigate('/admin/profile');
            } else {
              navigate('/admin/dashboard');
            }
          } else {
            toast.error('Failed to authenticate wallet');
          }
        } catch (error) {
          toast.error('Something went wrong. Please try connecting again.');
          if (isConnected) {
            disconnect();
            throw new Error(error);
          }
        }
      }
    };

    handleAuthentication();
  }, [address, isConnected]);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('flexi_session');
    
    if (!isLoggedIn) {
      toast.warning('Please login to access the dashboard');
      return;
    }
    
    navigate('/admin/dashboard');
  };

  const handleConnect = () => {
    openConnectModal();
  };

  return (
    <div className="max:w-full w-full h-[100px] bg-[#0D4A9F] flex items-center justify-between pl-[106px] pr-[84px] fixed top-0 z-50">
      <img src={logo} alt="LEXISCROW" />

      <div>
        <ul className="flex items-center gap-10">
          <li className="text-[#FFE2E0] text-[24px] font-medium">
            <NavLink>Home</NavLink>
          </li>

          <li className="text-[#FFE2E0] text-[24px] font-medium">
            <NavLink>About Us</NavLink>
          </li>

          <li className="text-[#FFFFFF] text-[24px] font-medium">
            <NavLink onClick={handleDashboardClick}>Dashboard</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, mounted }) => {
            return (
              <div>
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <button onClick={handleConnect} className="connect-button-styles">
                        Connect Wallet
                      </button>
                    );
                  }
                  return <ConnectButton />;
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Header;
