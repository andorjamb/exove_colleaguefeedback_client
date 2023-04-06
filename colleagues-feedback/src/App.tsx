import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';


import './App.css';
import Login from './pages/Login';

import { store } from './app/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />} />
  )
)


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
