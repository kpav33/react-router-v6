import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import "./index.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";

import "./server";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout routes don't really have a path of their own, they are used for sharing a certain Layout among many routes */}
        {/* If you don't use the / in front of the Route path it will be treated as a relative route, not an absolute route. They are relative to their parent component. */}
        <Route path="/" element={<Layout />}>
          {/* If you have an element that you want to display in the Outlet of the Layout component, but you want it to be at the same route as the Layout component is defined at, replace the path with a prop called index. */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          {/* This route has a parameter as part of this path, which makes it a dynamic route, parameters can be idenitified by having a colon in front of the name. The colon tells the react router that this will actually be like a variable in the route path. */}
          {/* A router parameter is a portion of our route path that is a placeholder for what will eventually be the actual segment in the URL of the page. */}
          {/* We don't nest the details page, because the vans page and the details page don't share any UI so it doesn't make sense to nest it. */}
          <Route path="vans/:id" element={<VanDetail />} />

          {/* Nested routes will often share UI with their parents, hence it makes sense to have some sort of Layout component as a parent. */}
          {/* Use nested routes when you want to keep displaying some UI on the page, but want to also display something more and when you want to avoid repetition in your route definitions. */}
          {/* React Router matches multiple routes and can decide that multiple things can render on the page at the same time, when we are using the Outlet component */}
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            {/* When setting path here we must specify as vans/:id we can't just write :id since this route is not nested inside of the vans route */}
            <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
