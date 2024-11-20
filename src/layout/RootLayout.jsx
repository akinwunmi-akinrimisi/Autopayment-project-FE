import { Outlet, useLocation } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import { useEffect } from "react";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      document.body.style.backgroundColor = "#1F4983";
    } else {
      document.body.style.backgroundColor = "#F6F9FF";
    }

    // Cleanup effect on component unmount
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [location.pathname]);
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* HEADER */}
      {/* <Header /> */}

      <div className="flex h-full">
        {/* SIDEBAR */}
        <AdminSideBar />
        <div className="ml-[240px] overflow-hidden w-[calc(100vw-240px)]">
          <AdminHeader />

          {/* MAIN CONTENT */}
          <div className="p-10 overflow-y-auto h-[calc(100vh-64px)]z">
            <Outlet />
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default RootLayout;
