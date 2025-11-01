import SideBarMenu from "../components/sideBarMenu";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex">
            <SideBarMenu />
            <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
                <Navbar />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
