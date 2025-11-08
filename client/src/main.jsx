import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import AppRouter from "./AppRouter";
import "./index.css";

const theme = extendTheme({});

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
      }}
      cacheLocation="localstorage" // ✅ stores tokens persistently
      useRefreshTokens={true} // ✅ automatically renews sessions
    >
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>
);
