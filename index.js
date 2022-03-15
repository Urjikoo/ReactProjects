import { StrictMode } from "react";
import ReactDOM from "react-dom";
import logo from "/logo.png";
import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <div className="logo_Header">
      <img src="logo.png" alt=""></img>
      <img src={logo} alt="Logo" />
    </div>
    <h3 className="title">Airlines</h3>

    <App />
  </StrictMode>,
  rootElement
);
