import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./contexts/AuthContext";
import DataContextProvider from "./contexts/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        maxSnack={3}
        autoHideDuration={3000}
      >
        <AuthContextProvider>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
