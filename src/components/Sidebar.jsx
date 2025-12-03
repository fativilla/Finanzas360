// /src/components/Sidebar.jsx
import { useState } from "react";
import { LayoutGrid, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

/**
 * Sidebar responsive y accesible.
 * - Usa NavLink para detectar "active"
 * - Toggle para colapsar en pantallas pequeñas
 * - Usa colores personalizados definidos en tailwind.config.js
 */

const menuItems = [
  { title: "Principal", path: "/", icon: <LayoutGrid className="w-5 h-5" /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`flex flex-col h-screen ${
        open ? "w-64" : "w-16"
      } bg-athGrayLight border-r border-gray-200 transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <img
          src={Logo}
          alt="Logo Finanzas360"
          className="w-12 h-12 object-contain"
        />
        {open && (
          <span className="ml-2 font-bold text-athBlack text-lg">Finanzas360</span>
        )}
      </div>

      {/* Header con FN y toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-athYellow w-8 h-8 flex items-center justify-center text-white font-bold">
            FN
          </div>
          {open && (
            <span className="font-semibold text-lg text-athBlueDark">Bienvenidos</span>
          )}
        </div>

        <button
          aria-label="Toggle sidebar"
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-athGray transition"
        >
          <Menu className="w-5 h-5 text-athGray" />
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full p-2 rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-athYellow text-white font-medium"
                      : "text-athBlack hover:bg-athGray"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {open && <span className="truncate">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center">
        {open ? (
          <div className="text-sm text-athGray">v1.0 · Soporte</div>
        ) : (
          <div className="text-xs text-athGray">v1.0</div>
        )}
      </div>
    </aside>
  );
}

