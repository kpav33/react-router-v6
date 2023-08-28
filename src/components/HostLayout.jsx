import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="host-nav">
        {/* This component gets rendered on the host path, which is why we can use the relative links without specifying the host route again */}
        {/* Since the Dashboard route is supposed to lead us to the root of the host route we use the "." as the route location (like in terminal where dot signalizes the current folder) */}
        <NavLink
          to="."
          // end prop changes the matching logic for the active and pending states to only match to the "end" of the NavLink's to path. If the URL is longer than to, it will no longer be considered active.
          // With end prop /host/income is not considered as active only /host route would set the isActive boolean to true, but without this route would show up as active
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Dashboard
        </NavLink>

        {/* For example this is actually a /host/income path, but the host part of the link is not needed since this element is already defined as rendered on the host route */}
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Income
        </NavLink>

        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
