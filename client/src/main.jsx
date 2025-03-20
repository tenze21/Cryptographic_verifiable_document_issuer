import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import WalletConnectPage from "./pages/WalletConnectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CompileMarksheetsPage from "./pages/CompileMarksheetsPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<WalletConnectPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/compileMarksheets" element={<CompileMarksheetsPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
