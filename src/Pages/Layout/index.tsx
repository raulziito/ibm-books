import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
// import { Container } from './styles';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
