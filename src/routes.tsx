import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Outlet,
} from "react-router-dom";

import BookDetail from "./Pages/Bookdetail";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";

function Private(setUser: any) {
    return <Outlet />;
}

function RoutesWrapper() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/book-detail/:id" element={<BookDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default RoutesWrapper;
