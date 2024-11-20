import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { toast } from "react-toastify";
import { useEffect } from 'react';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Dashboard", onClick: handleDashboardClick },
  ];

  useEffect(() => {
    if (!isConnected && localStorage.getItem('flexi_session')) {
      localStorage.removeItem('flexi_session');
      toast.info('Logged out successfully');
      navigate('/');
    }
  }, [isConnected, navigate]);

  function handleDashboardClick(e) {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('flexi_session');
    
    if (!isLoggedIn) {
      toast.warning('Please login to access the dashboard');
      return;
    }
    
    navigate('/admin/dashboard');
    setIsSidebarOpen(false);
  }

  const renderNavLinks = (isMobile = false) => (
    navLinks.map((link, index) => (
      <li key={index}>
        {link.onClick ? (
          <NavLink
            onClick={link.onClick}
            className={`text-[#FFE2E0] text-[24px] font-medium ${
              isMobile ? 'block py-2 px-4 hover:bg-[#1A5AB0] rounded-md' : ''
            }`}
          >
            {link.text}
          </NavLink>
        ) : (
          <NavLink
            to={link.path}
            className={`text-[#FFE2E0] text-[24px] font-medium ${
              isMobile ? 'block py-2 px-4 hover:bg-[#1A5AB0] rounded-md' : ''
            }`}
            onClick={() => isMobile && setIsSidebarOpen(false)}
          >
            {link.text}
          </NavLink>
        )}
      </li>
    ))
  );

  return (
    <>
      <div className="max-w-full w-full h-[70px] md:h-[100px] bg-[#0D4A9F] flex items-center justify-between px-4 lg:px-[84px] fixed top-0 z-50">
        <img src={logo} alt="LEXISCROW" className="h-8 md:h-auto" />

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {renderNavLinks()}
          </ul>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isConnected && !localStorage.getItem('flexi_session') && (
            <button 
              onClick={() => navigate('/login')}
              className="h-[42px] bg-[#EA3982] w-fit px-2 md:px-4 rounded-[10px] text-[#FFFFFF] font-medium hover:scale-[102%] transition-all duration-100 text-sm md:text-base"
            >
              Sign up
            </button>
          )}
          <ConnectButton />
          
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-96 bg-[#0D4A9F] z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white p-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-2">
          <ul className="space-y-4">
            {renderNavLinks(true)}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;