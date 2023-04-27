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
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import Template from "./pages/Template/Template";
import Feedback from "./pages/Feedback/Feedback";
import Profile from "./pages/Profile/Profile";

// Styling
import "./App.css";

const user: any = true; //Replace with auth

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin_dashboard" element={<DashboardAdmin />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/admin/template" element={<Template />}></Route>
          <Route path="/admin/profiles/:id" element={<Profile />}></Route>
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
