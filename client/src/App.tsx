// React
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// Components and pages
import ProtectedRoutes from "./routing/ProtectedRoutes";

import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Template from "./pages/Template/Template";
import DashboardUser from "./components/DashboardUser/DashboardUser";
import Feedback from "./pages/Feedback/Feedback";
import Profile from "./pages/Profile/Profile";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/userview" element={<DashboardUser />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/template" element={<Template />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/profiles/:id" element={<Profile />}></Route>

          <Route path="/*" element={<Navigate to="/" replace />}></Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
