import SideBarMenu from "../components/SideBarMenu";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex">
            <SideBarMenu />
            <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
                <Navbar />
                <main className="p-6 mt-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
