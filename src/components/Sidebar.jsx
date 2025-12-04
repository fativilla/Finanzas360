// /src/components/Sidebar.jsx
import { useState } from "react";
import { LayoutGrid, ChevronLeft, ChevronRight, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

const menuItems = [
    { title: "Principal", path: "/", icon: <LayoutGrid className="w-5 h-5" /> },
    // Puedes agregar más items aquí
];

export default function Sidebar({ openMobile, setOpenMobile }) {
    const [open, setOpen] = useState(true);

    return (
        <aside
            className={`
                flex flex-col h-full bg-gradient-to-b from-white to-gray-50 
                border-r border-gray-200 shadow-sm transition-all duration-300
                ${open ? "w-64" : "w-20"} 
                md:relative
            `}
        >
            {/* Cerrar en móvil */}
            {openMobile && (
                <button
                    className="md:hidden absolute top-4 right-4 p-2 bg-white rounded-lg shadow"
                    onClick={() => setOpenMobile(false)}
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
            )}

            {/* Logo */}
            <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                    <img
                        src={Logo}
                        alt="Finanzas360 Logo"
                        className={`transition-all duration-300 ${open ? "w-40 h-auto" : "w-10 h-auto"}`}
                    />
                </div>

                {/* Toggle desktop */}
                <button
                    aria-label="Toggle sidebar"
                    onClick={() => setOpen(prev => !prev)}
                    className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 md:block hidden"
                >
                    {open ? <ChevronLeft className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
                </button>
            </div>

            {/* Perfil */}
            <div className="px-4 pb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100">
                    <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 w-10 h-10 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
                        FN
                    </div>
                    {open && (
                        <div className="overflow-hidden">
                            <h3 className="font-semibold text-gray-800 truncate">Bienvenidos</h3>
                            <p className="text-xs text-gray-500 truncate">Administrador</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Menú */}
            <nav className="flex-1 px-3 overflow-y-auto">
                <div className="mb-4 px-3">
                    {open && (
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navegación</h4>
                    )}
                </div>

                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) => `
                                    flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 shadow-sm"
                                        : "hover:bg-gray-100/80 hover:translate-x-1"
                                    }
                                `}
                            >
                                <span className={`flex-shrink-0 transition-colors duration-200 ${open ? "ml-1" : ""}`}>
                                    {item.icon}
                                </span>
                                {open && <span className="font-medium text-gray-700 truncate group-hover:text-gray-900">{item.title}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white/50">
                {open ? (
                    <div className="space-y-4">
                        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group">
                            <HelpCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="font-medium">Soporte</span>
                        </button>
                        <div className="flex items-center justify-between px-3">
                            <span className="text-sm text-gray-500">v1.0</span>
                            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-gray-400">v1.0</span>
                    </div>
                )}
            </div>
        </aside>
    );
}
