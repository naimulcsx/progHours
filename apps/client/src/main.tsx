import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AccentColorProvider } from "./modules/common/contexts/AccentColorContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AccentColorProvider>
      <App />
    </AccentColorProvider>
  </React.StrictMode>
);
