import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Sidebar from './Sidebar'
import '../styles/Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            <Main />
            <Footer />
        </div>
    );
};

export default Layout;