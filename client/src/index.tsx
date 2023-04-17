// React
import React from "react";
import { createRoot } from "react-dom/client";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// Components
import App from "./App";

// Translations
import "./translations/i18next";

// Styling
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
