import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import dashboardIcon from "../assets/sidebar/dashboard_icon.svg";
import invoiceIcon from "../assets/sidebar/invoice_icon.svg";
import chatIcon from "../assets/sidebar/chat_icon.svg";

const AdminSideBar = () => {
  const location = useLocation();

  const sidebarLinks = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: dashboardIcon,
    },
    {
      title: "Invoice",
      path: "/admin/invoice",
      icon: invoiceIcon,
    },
    {
      title: "Chat",
      path: "/admin/chat",
      icon: chatIcon,
    },
  ];

  return (
    <div className="w-[240px] h-screen bg-[#143869] absolute top-0 left-0 px-[28px]">
      <img
        src={logo}
        alt="LEXISCROW"
        width="135px"
        height="67px"
        className="h-[67px] w-[135px] z-10 mt-[100px]"
      />

      <div className="w-full flex flex-col gap-5 mt-[41px]">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center gap-3 h-[45px] pl-[12px] rounded-[10px] cursor-pointer transition-all duration-300 
              ${location.pathname === link.path ? 'bg-[#1F4983]' : 'hover:bg-[#1F4983]'}`}
          >
            <img src={link.icon} alt={`${link.title} Icon`} />
            <p className="text-[#FFFFFF] text-[18px] font-medium">{link.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
