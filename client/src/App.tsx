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
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Styling
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/Login" element={<Login />}></Route>
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
