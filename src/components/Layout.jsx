import React from "react";
// Outlets are used in parent routes to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        {/* Child Routes will be rendered where the Outlet component is located, without an Outlet, nothing would render! */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
