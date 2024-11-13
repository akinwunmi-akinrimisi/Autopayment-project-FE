import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  // LAYOUTS
  import RootLayout from "../layout/RootLayout";
  
  // PAGES
//   import Home from "../pages/homePage/Home";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* SAMPLE ROUTE */}
        {/* <Route index element={<Home />} /> */}
        
  
        {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
        <Route path="/" element={<RootLayout />}>
          {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /invoice/test  */}
         </Route>  
      </Route>
    )
  );
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;