import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { ColorAccentProvider } from "./contexts/ColorAccentContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <HelmetProvider>
      <ColorAccentProvider>
        <App />
      </ColorAccentProvider>
    </HelmetProvider>
  </BrowserRouter>
);
