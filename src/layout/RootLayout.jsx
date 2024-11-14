import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";

const RootLayout = () => {
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
          <div className="p-10 overflow-y-auto h-[calc(100vh-64px)]">
            <Outlet />
          </div>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default RootLayout;
