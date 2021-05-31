import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import './styles.css';

window.onload = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("react-content")
  );
};
