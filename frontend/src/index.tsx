import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import './styles.css';

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById("react-content"));
};
