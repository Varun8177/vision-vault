import React from "react";
import Pages from "./pages";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App(): JSX.Element {
  const { pathname } = useLocation();
  const pagesWithNoNavbar = ["/login", "/register"];

  return (
    <div className="relative min-h-screen bg-[#242424] text-white">
      {!pagesWithNoNavbar.includes(pathname) && <Navbar />}
      <Routes>
        {Pages.map((item) => (
          <Route key={item.path} {...item} />
        ))}
      </Routes>
    </div>
  );
}
