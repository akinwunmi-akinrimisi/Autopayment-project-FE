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
  
  // PAGES
//   import Home from "../pages/homePage/Home";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* SAMPLE ROUTE */}
        <Route path="/authentication" element={<Auth />}></Route>
        {/* <Route index element={<Home />} /> */}
        
  
        {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
        
        <Route path="/admin" element={<RootLayout />}>
          <Route path="dashboard" element={<Dashbaord />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="chat" element={<Chat />} />
          
          {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /invoice/test  */}
         </Route>  
      </Route>
    )
  );
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;