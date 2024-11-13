import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="w-ful">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <div className="">
      <Outlet />
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default RootLayout;
