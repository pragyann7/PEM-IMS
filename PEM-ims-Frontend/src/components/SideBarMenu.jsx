import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Receipt, BarChart } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-gray-100 h-screen fixed left-0 top-0 flex flex-col">
            <div className="flex flex-col font-bold px-6 py-4 text-3xl">
                <div className="flex justify-center">
                    P.E.M
                </div>
                <div className="flex justify-center border-b border-gray-800">
                    Inventory
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Dashboard</NavLink >
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Products</NavLink >
                <NavLink
                    to="/purchases"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Purchase</NavLink >
                <NavLink
                    to="/sales"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Sales</NavLink >
                <NavLink
                    to="/addproducts"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Add Product</NavLink >
                <NavLink
                    to="/repair"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                        }`
                    }
                >Repair</NavLink >
            </nav>

        </aside>
    );
};

export default Sidebar;
