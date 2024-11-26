import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// LAYOUTS
import RootLayout from "../layout/RootLayout";
import Auth from "../pages/auth/authentication";
import Dashbaord from "../pages/dashboard/Dashbaord";
import Invoice from "../pages/invoice/invoice";
import Chat from "../pages/chat/chat";
import Dispute from "../pages/dispute/dispute";

// PAGES
import HomePage from "../pages/home/HomePage";
import NewEscrow from "../pages/newEscrow/NewEscrow";
import LoginForm from "../pages/auth/login";
import Escrow from "../pages/adminEscrow/escrow";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/profile/Profile";
import About from "../pages/about/about";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* SAMPLE ROUTE */}
      <Route index element={<HomePage />} />
      <Route path="/home/:id" element={<HomePage />} />
      <Route path="/authentication" element={<Auth />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/about" element={<About/>} />

      {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}

      <Route path="/admin" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashbaord />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="escrow" element={<Escrow />} />
        <Route path="new-escrow" element={<NewEscrow />} />
        <Route path="dispute" element={<Dispute />} />
        {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /invoice/test  */}
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
