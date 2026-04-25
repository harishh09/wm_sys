import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <ThemeProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
    />
  </ThemeProvider>
</Provider>
);