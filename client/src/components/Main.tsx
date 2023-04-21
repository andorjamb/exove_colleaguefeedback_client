import React from 'react';

//react-router-dom
import { Outlet } from 'react-router-dom';


const Main = () => {
    return (
        <div>
            <h1>Main</h1>
            <Outlet />
        </div>
    );
};

export default Main;