import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import "./index.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
// import Vans from "./pages/Vans/Vans";
// import VanDetail from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
// import HostVans from "./pages/Host/HostVans";
// import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Login from "./pages/Login";
import Error from "./components/Error";
import AuthRequired from "./components/AuthRequired";

// import Home from "./pages/Home";
// import About from "./pages/About";
// // Import the loader as a named import from the component file and then pass it to the route
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
// import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
// import Income from "./pages/Host/Income";
// import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail";
// import HostVanInfo from "./pages/Host/HostVanInfo";
// import HostVanPricing from "./pages/Host/HostVanPricing";
// import HostVanPhotos from "./pages/Host/HostVanPhotos";
// import NotFound from "./pages/NotFound";
// import Login, {
//   loader as loginLoader,
//   action as loginAction,
// } from "./pages/Login";
// import Layout from "./components/Layout";
// import HostLayout from "./components/HostLayout";
// import Error from "./components/Error";
import { requireAuth } from "./utils";

import "./server";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Layout routes don't really have a path of their own, they are used for sharing a certain Layout among many routes */}
//         {/* If you don't use the / in front of the Route path it will be treated as a relative route, not an absolute route. They are relative to their parent component. */}
//         <Route path="/" element={<Layout />}>
//           {/* If you have an element that you want to display in the Outlet of the Layout component, but you want it to be at the same route as the Layout component is defined at, replace the path with a prop called index. */}
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="vans" element={<Vans />} />
//           {/* This route has a parameter as part of this path, which makes it a dynamic route, parameters can be idenitified by having a colon in front of the name. The colon tells the react router that this will actually be like a variable in the route path. */}
//           {/* A router parameter is a portion of our route path that is a placeholder for what will eventually be the actual segment in the URL of the page. */}
//           {/* We don't nest the details page, because the vans page and the details page don't share any UI so it doesn't make sense to nest it. */}
//           <Route path="vans/:id" element={<VanDetail />} />

//           {/* Nested routes will often share UI with their parents, hence it makes sense to have some sort of Layout component as a parent. */}
//           {/* Use nested routes when you want to keep displaying some UI on the page, but want to also display something more and when you want to avoid repetition in your route definitions. */}
//           {/* React Router matches multiple routes and can decide that multiple things can render on the page at the same time, when we are using the Outlet component */}
//           <Route path="host" element={<HostLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="income" element={<Income />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="vans" element={<HostVans />} />
//             {/* When setting path here we must specify as vans/:id we can't just write :id since this route is not nested inside of the vans route */}
//             <Route path="vans/:id" element={<HostVanDetail />}>
//               <Route index element={<HostVanInfo />} />
//               <Route path="pricing" element={<HostVanPricing />} />
//               <Route path="photos" element={<HostVanPhotos />} />
//             </Route>
//           </Route>
//           {/* Catch all route that will show on all routes that don't have a specific path defined, to display a customized not found page */}
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// How to use loaders
// Export a loader function from the page that fetches the data that page will need
// Pass a loader prop to the Route that renders that page and pass in the loader function
// Use the useLoaderData hook in the component to get the data
// React router will delay loading the component until the loaders finishes fetching the data

// To use React route data api we need to change how we instantiate the Route

const router = createBrowserRouter(
  // Use createRoutesFromElements to turn your Route components into object that then get passed to createBrowserRouter, this was added for simpler transition to data api router
  createRoutesFromElements(
    // Putting error element to the uppermost Route will mean that the error element will get triggered for any error in any of the child routes all along the components tree in this case setting the error in the Layout route this would catch any error anywhere in the app
    <Route
      path="/"
      element={<Layout />}
      // errorElement={<Error />}
    >
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        // loader={loginLoader}
        // action={loginAction}
      />
      {/* Error element will happens any time your component you are trying to run has an error */}
      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        errorElement={<Error />}
        loader={vanDetailLoader}
      />

      {/* When you are fetching data for routes by using loaders all of the loaders of all of routes run in parallel, which leads to a question how to implement protected routes, since on such routes we only want the fetch requests to run if the user is authenticated */}
      {/* To create protected routes when using loaders we use a redirect() function which will happens inside of the loader function => If user isn't logged in, redirect to login page when protected loaders run, before any route rendering happens */}
      {/* Downside of this approach is that as of right now this needs to happen in every protected route's loader */}
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          // Check if user is authenticated before loading data
          // loader={dashboardLoader}
          loader={async () => await requireAuth()}
        />
        <Route
          path="income"
          element={<Income />}
          // loader={async ({ request }) => await requireAuth(request)}
          loader={async () => await requireAuth()}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          // loader={async ({ request }) => await requireAuth(request)}
          loader={async () => await requireAuth()}
        />
        <Route
          path="vans"
          element={<HostVans />}
          errorElement={<Error />}
          loader={hostVansLoader}
        />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          errorElement={<Error />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            // loader={async ({ request }) => await requireAuth(request)}
            loader={async () => await requireAuth()}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            // loader={async ({ request }) => await requireAuth(request)}
            loader={async () => await requireAuth()}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            // loader={async ({ request }) => await requireAuth(request)}
            loader={async () => await requireAuth()}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      {/* Purpose of protected routes is to stop data fetching of sensitive information, only logged-in users should be able to access their data */}
      {/* Protected routes are implemented by preventin renders, so that if user isn't logged in, components don't get rendered and user is redirected to the login page, since data fetching takes place inside of the relevant components, if components don't render the fetching never happens */}
      {/* Old way to implement protected routes, if you are not using any loaders and the new react router Data router api */}
      {/* <Route element={<AuthRequired />}>
        <Route path="protected" element={<h1>Super secret info here</h1>} />
      </Route> */}
    </Route>
  )
);

// Pass the created router to the RouterProvider as a prop to create a Router
function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
