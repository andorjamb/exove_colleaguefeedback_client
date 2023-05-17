// React
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Redux
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";
import { getSecureUserUid } from "./functions/secureUser";

// Components and pages
import ProtectedRoutes from "./routing/ProtectedRoutes";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Template from "./pages/Template/Template";
import DashboardUser from "./components/DashboardUser/DashboardUser";
import Feedback from "./pages/Feedback/Feedback";
import Profile from "./pages/Profile/Profile";
import Report from "./pages/Report/Report";
import PicksUser from "./components/DashboardUser/PicksUser";

// Types
import { loggedInUser } from "./types/users";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/picking" element={<PicksUser />}></Route>
          {/* <Route path="/userview" element={<DashboardUser />}></Route> */}
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/template" element={<Template />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/report/:revieweeId/:reportId" element={<Report />}></Route>
          <Route path="/profiles/:id" element={<Profile />}></Route>
          <Route path="/*" element={<Navigate to="/" replace />}></Route>
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();
  //dispatch(api.util.resetApiState());  //reset base api state to clear cache and refresh
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();
  const getUserInfo = async () => {
    const userDetails: loggedInUser = await getSecureUserUid();
    setCurrentUserInfo(userDetails);
    console.log("loggedInUser", userDetails);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
