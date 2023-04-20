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
import Layout from "./components/LayoutB";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Template from "./pages/Template";
import Feedback from "./pages/Feedback";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Templates" element={<Template />}></Route>
      <Route path="/Feedback" element={<Feedback />}></Route>
    </Route>
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
