// MainLayout.jsx
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";


export default function MainLayout() {
    return (
        <div className="min-h-screen flex bg-white"> {/* AHORA SÍ AQUÍ */}

            <Sidebar />

            <main className="flex-1 p-8">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </main>

        </div>
    );
}
