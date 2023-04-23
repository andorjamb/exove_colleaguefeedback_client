// React
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// Components and pages
import Layout from "./components/Layout/Layout";
import LayoutUser from "./components/LayoutUser/LayoutUser";
import LayoutAdmin from "./components/LayoutAdmin/LayoutAdmin";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Template from "./pages/Template/Template";
import Feedback from "./pages/Feedback/Feedback";
import Profile from "./pages/Profile/Profile";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />}></Route>
      </Route>
      <Route element={<LayoutUser />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
      </Route>
      <Route element={<LayoutAdmin />}>
        <Route path="/admin/template" element={<Template />}>
          Template
        </Route>
        <Route path="/admin/profiles/:id" element={<Profile/>}>
          Template
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          Dashboard
        </Route>
        <Route></Route>
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
