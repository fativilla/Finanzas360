// Principal.jsx
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import GastoPorRubro from "./GastoPorRubro";

const Dashboard = () => {
    // Estado de movimientos
    const [movimientos, setMovimientos] = useState([]);
    const [form, setForm] = useState({ tipo: "Ingreso", descripcion: "", monto: "" });

    // Función para agregar movimiento
    const agregarMovimiento = () => {
        if (!form.descripcion || !form.monto) return;
        setMovimientos([
            ...movimientos,
            { ...form, id: Date.now(), monto: parseFloat(form.monto) },
        ]);
        setForm({ tipo: "Ingreso", descripcion: "", monto: "" });
    };

    // Eliminar movimiento
    const eliminarMovimiento = (id) => {
        setMovimientos(movimientos.filter((m) => m.id !== id));
    };

    // Totales
    const totalIngresos = movimientos
        .filter((m) => m.tipo === "Ingreso")
        .reduce((acc, m) => acc + m.monto, 0);
    const totalGastos = movimientos
        .filter((m) => m.tipo === "Gasto")
        .reduce((acc, m) => acc + m.monto, 0);
    const saldo = totalIngresos - totalGastos;

    // Datos para gráfico circular (solo gastos)
    const data = movimientos
        .filter((m) => m.tipo === "Gasto")
        .reduce((acc, curr) => {
            const found = acc.find((item) => item.categoria === curr.descripcion);
            if (found) {
                found.monto += curr.monto;
            } else {
                acc.push({ categoria: curr.descripcion, monto: curr.monto });
            }
            return acc;
        }, []);

    return (
        <div className="min-h-screen bg-athGrayLight">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-4">
                            <img src={Logo} alt="Logo" className="w-10 h-10" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">FINANZAS360</h1>
                                <p className="text-gray-600 mt-1">Ordena tus finanzas y logra la libertad que anhelas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario de movimientos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-2xl shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">Registrar movimiento</h2>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <select
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        className="border px-3 py-2 rounded w-full sm:w-40"
                    >
                        <option>Ingreso</option>
                        <option>Egreso</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <input
                        type="number"
                        placeholder="Monto"
                        value={form.monto}
                        onChange={(e) => setForm({ ...form, monto: e.target.value })}
                        className="border px-3 py-2 rounded w-full sm:w-32"
                    />
                    <button
                        onClick={agregarMovimiento}
                        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
                    >
                        Agregar
                    </button>
                    <button
                        onClick={() => setForm({ tipo: "Ingreso", descripcion: "", monto: "" })}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Tabla de movimientos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-2xl shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">Movimientos</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-2xl shadow-sm">
                        <thead>
                            <tr className="bg-athGrayLight text-left">
                                <th className="px-4 py-2">Tipo</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className="px-4 py-2">Monto</th>
                                <th className="px-4 py-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((m) => (
                                <tr key={m.id} className="border-b">
                                    <td className="px-4 py-2">{m.tipo}</td>
                                    <td className="px-4 py-2">{m.descripcion}</td>
                                    <td className="px-4 py-2">
                                        {m.monto.toLocaleString("es-PY", { maximumFractionDigits: 0 })}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => eliminarMovimiento(m.id)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-athGrayLight font-bold">
                            <tr>
                                <td className="px-4 py-2">Totales</td>
                                <td></td>
                                <td className="px-4 py-2">
                                    Ingresos: {totalIngresos.toLocaleString("es-PY", { maximumFractionDigits: 0 })} |
                                    Gastos: {totalGastos.toLocaleString("es-PY", { maximumFractionDigits: 0 })} |
                                    Saldo: {saldo.toLocaleString("es-PY", { maximumFractionDigits: 0 })}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Gráfico circular */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-2xl shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-2">Vizualiza tus gastos</h2>
                <GastoPorRubro data={data} />
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                    <div>© 2025 Finanzas360</div>
                    <div>Autores: Fatima Villamayor, Luis Sosa</div>
                </div>
            </footer>
        </div>
    );
};


export default Dashboard;