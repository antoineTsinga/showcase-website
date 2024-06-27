import React from "react";
import { NotificationContainer } from "react-notifications";

import { AppContextProvider } from "./AppContext";

import Router from "./Router";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <AppContextProvider>
        <NotificationContainer />
        <Router />
      </AppContextProvider>
    </>
  );
}
export default App;
