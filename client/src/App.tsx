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
import LayoutUser from "./components/LayoutUser";
import LayoutAdmin from "./components/LayoutAdmin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Template from "./pages/Template";
import Feedback from "./pages/Feedback";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/user" element={<LayoutUser />}>
        <Route path="/user/dashboard" element={<Dashboard />}></Route>

        <Route path="/user/feedback" element={<Feedback />}></Route>
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="/admin/templates" element={<Template />}>
          Template
        </Route>
        <Route path="/admin/dashboard" element={<Template />}>
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
