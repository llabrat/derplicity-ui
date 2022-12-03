import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage/MainPage";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lvordbeezf3wqlh2.us.auth0.com"
      clientId="bxO9IaHBqODagVl5akpFNMnvyznzQlOw"
      redirectUri={window.location.origin}
    >
      <CssBaseline />
      <MainPage />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
