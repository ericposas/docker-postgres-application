import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";

export const apiBase = `http://localhost:${process.env.API_PORT}/api/v1`;

window.onload = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("react-content")
  );
};
