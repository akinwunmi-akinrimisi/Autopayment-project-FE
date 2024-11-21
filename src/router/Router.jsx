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
import Home from "../pages/home/Home";
import NewEscrow from "../pages/newEscrow/NewEscrow";
import LoginForm from "../pages/auth/login";
import Escrow from "../pages/adminEscrow/escrow";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* SAMPLE ROUTE */}
      <Route index element={<Home />} />
      <Route path="/authentication" element={<Auth />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>

      {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}

      <Route path="/admin" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashbaord />} />
        <Route
          path="invoice"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Invoice />
            </ProtectedRoute>
          }
        />
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
