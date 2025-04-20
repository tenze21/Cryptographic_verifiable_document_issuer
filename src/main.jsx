import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import MarksheetPage from "./pages/MarksheetViewPage.jsx";
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
      <Route index={true} element={<HomePage />} />
      <Route path="/get-result" element={<ResultPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/marksheet" element={<MarksheetPage />} />
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
