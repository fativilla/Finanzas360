// MainLayout.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";

import Dashboard from "../pages/Dashboard";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-white relative">

            {/* Botón hamburguesa SOLO en móvil */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Sidebar como drawer en móvil */}
            <div
                className={`
                    fixed md:static top-0 left-0 h-full z-40 
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <Sidebar openMobile={sidebarOpen} setOpenMobile={setSidebarOpen} />
            </div>

            {/* Contenido principal */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </main>

        </div>
    );
}
