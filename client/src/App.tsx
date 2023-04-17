import React from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import Layout from './components/Layout'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Main from './components/Main'
import Sidebar from './components/Sidebar'

import { store } from './app/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>


    </Route>
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
