import React from "react";
import Pages from "./pages";
import { Route, Routes } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <>
      <Routes>
        {Pages.map((item) => (
          <Route key={item.path} {...item} />
        ))}
      </Routes>
    </>
  );
}
