// MainLayout.jsx
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-athGrayLight">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-athBlueDark text-athWhite p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Finanzas360</h1>
          <button className="bg-athGreen px-4 py-2 rounded-md hover:bg-athGreenDark transition">
            Nuevo ingreso
          </button>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-8 bg-athWhite">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-athGray text-athWhite p-4 text-center">
          © 2025 Finanzas360 · Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}
