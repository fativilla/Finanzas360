// Principal.jsx
import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import GastoPorRubro from "./GastoPorRubro";
import { Calendar, Clock, TrendingUp, TrendingDown, DollarSign, PieChart, X } from "lucide-react";

const Dashboard = () => {
    // Estado de movimientos
    const [movimientos, setMovimientos] = useState([]);
    const [form, setForm] = useState({ tipo: "Ingreso", descripcion: "", monto: "", fecha: new Date().toISOString().split('T')[0] });

    // Estado para hora actual
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Estado para calendario
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Actualizar hora cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Función para agregar movimiento
    const agregarMovimiento = () => {
        if (!form.descripcion || !form.monto) return;
        const newMovimiento = {
            ...form,
            id: Date.now(),
            monto: parseFloat(form.monto),
            fecha: form.fecha || new Date().toISOString().split('T')[0]
        };
        setMovimientos([newMovimiento, ...movimientos]);
        setForm({ tipo: "Ingreso", descripcion: "", monto: "", fecha: new Date().toISOString().split('T')[0] });
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
        .filter((m) => m.tipo === "Egreso")
        .reduce((acc, m) => acc + m.monto, 0);
    const saldo = totalIngresos - totalGastos;

    // Datos para gráfico circular (solo gastos)
    const data = movimientos
        .filter((m) => m.tipo === "Egreso")
        .reduce((acc, curr) => {
            const found = acc.find((item) => item.categoria === curr.descripcion);
            if (found) {
                found.monto += curr.monto;
            } else {
                acc.push({ categoria: curr.descripcion, monto: curr.monto });
            }
            return acc;
        }, []);

    // Funciones para el calendario
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        return { firstDay, lastDay, daysInMonth, startingDay };
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString("es-PY", { 
            style: "currency", 
            currency: "PYG",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    // Formatear fecha
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];

    // Días del mes anterior
    for (let i = 0; i < startingDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-12 bg-gray-50 rounded-lg"></div>);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const dayMovements = movimientos.filter(m => {
            const moveDate = new Date(m.fecha);
            return moveDate.toDateString() === date.toDateString();
        });
        const dayIncome = dayMovements.filter(m => m.tipo === "Ingreso").reduce((a, b) => a + b.monto, 0);
        const dayExpense = dayMovements.filter(m => m.tipo === "Egreso").reduce((a, b) => a + b.monto, 0);

        days.push(
            <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`
                    h-12 flex flex-col items-center justify-center rounded-lg border
                    transition-all duration-200 hover:scale-105
                    ${isToday ? 'border-yellow-400 bg-yellow-50' : ''}
                    ${isSelected ? 'bg-yellow-100 border-yellow-300 shadow-sm' : 'border-gray-200 hover:border-yellow-300'}
                `}
            >
                <span className={`font-semibold ${isToday ? 'text-yellow-600' : 'text-gray-700'}`}>
                    {day}
                </span>
                <div className="flex gap-1 mt-1">
                    {dayIncome > 0 && (
                        <span className="text-xs text-green-500">+{formatCurrency(dayIncome)}</span>
                    )}
                    {dayExpense > 0 && (
                        <span className="text-xs text-red-500">-{formatCurrency(dayExpense)}</span>
                    )}
                </div>
            </button>
        );
    }

    // Movimientos del día seleccionado
    const selectedDayMovements = movimientos.filter(m => {
        const moveDate = new Date(m.fecha);
        return moveDate.toDateString() === selectedDate.toDateString();
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Mejorado */}
            <div className="bg-gradient-to-r from-white to-yellow-50/30 shadow-sm border-b border-yellow-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img src={Logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-sm" />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <DollarSign className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
                                    FINANZAS360
                                </h1>
                                <p className="text-gray-600 mt-1">Ordena tus finanzas y logra la libertad que anhelas.</p>
                            </div>
                        </div>
                        
                        {/* Reloj y Fecha Actual */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800 font-mono">
                                        {currentTime.toLocaleTimeString('es-PY', { 
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {currentTime.toLocaleDateString('es-PY', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sección Izquierda - Formulario y Estadísticas */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tarjetas de Estadísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Ingresos</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-1">
                                            {formatCurrency(totalIngresos)}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                                <div className="text-xs text-green-500 mt-2">
                                    +{movimientos.filter(m => m.tipo === "Ingreso").length} movimientos
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Gastos</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-1">
                                            {formatCurrency(totalGastos)}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <TrendingDown className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                                <div className="text-xs text-red-500 mt-2">
                                    +{movimientos.filter(m => m.tipo === "Egreso").length} movimientos
                                </div>
                            </div>
                            
                            <div className={`bg-gradient-to-br from-yellow-50 to-yellow-100 border rounded-2xl p-4 shadow-sm ${saldo >= 0 ? 'border-yellow-200' : 'border-red-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Saldo Actual</p>
                                        <p className={`text-2xl font-bold mt-1 ${saldo >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                                            {formatCurrency(saldo)}
                                        </p>
                                    </div>
                                    <div className={`p-2 rounded-lg ${saldo >= 0 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                                        <DollarSign className={`w-6 h-6 ${saldo >= 0 ? 'text-yellow-600' : 'text-red-600'}`} />
                                    </div>
                                </div>
                                <div className={`text-xs mt-2 ${saldo >= 0 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {saldo >= 0 ? 'Balance positivo ✓' : 'Balance negativo ✗'}
                                </div>
                            </div>
                        </div>

                        {/* Formulario Mejorado */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-yellow-500" />
                                Registrar movimiento
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={form.tipo}
                                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                                    >
                                        <option>Ingreso</option>
                                        <option>Egreso</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                    <input
                                        type="date"
                                        value={form.fecha}
                                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Sueldo, Comida, Transporte..."
                                        value={form.descripcion}
                                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={form.monto}
                                        onChange={(e) => setForm({ ...form, monto: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={agregarMovimiento}
                                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow"
                                >
                                    Agregar Movimiento
                                </button>
                                <button
                                    onClick={() => setForm({ tipo: "Ingreso", descripcion: "", monto: "", fecha: new Date().toISOString().split('T')[0] })}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Limpiar
                                </button>
                            </div>
                        </div>

                        {/* Tabla de Movimientos Mejorada */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    Movimientos Recientes
                                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {movimientos.length} total
                                    </span>
                                </h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                                            <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {movimientos.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <DollarSign className="w-12 h-12 text-gray-300 mb-3" />
                                                        <p className="text-lg font-medium">No hay movimientos registrados</p>
                                                        <p className="text-sm">Agrega tu primer movimiento usando el formulario</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            movimientos.map((m) => (
                                                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${m.tipo === "Ingreso" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {m.tipo === "Ingreso" ? (
                                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                            ) : (
                                                                <TrendingDown className="w-4 h-4 mr-1" />
                                                            )}
                                                            {m.tipo}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                        {new Date(m.fecha).toLocaleDateString('es-PY')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-gray-800 font-medium">{m.descripcion}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-lg font-bold ${m.tipo === "Ingreso" ? 'text-green-600' : 'text-red-600'}`}>
                                                            {m.tipo === "Ingreso" ? '+' : '-'}{formatCurrency(m.monto)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => eliminarMovimiento(m.id)}
                                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Eliminar movimiento"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {movimientos.length > 0 && (
                                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-600">
                                            <span className="font-medium">Ingresos:</span> {formatCurrency(totalIngresos)} | 
                                            <span className="font-medium ml-4">Gastos:</span> {formatCurrency(totalGastos)} | 
                                            <span className="font-medium ml-4">Saldo:</span> {formatCurrency(saldo)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección Derecha - Calendario y Gráfico */}
                    <div className="space-y-6">
                        {/* Calendario */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-yellow-500" />
                                    Calendario
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        ◀
                                    </button>
                                    <span className="font-semibold text-gray-700">
                                        {currentMonth.toLocaleDateString('es-PY', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        ▶
                                    </button>
                                </div>
                            </div>
                            
                            {/* Días de la semana */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Días del mes */}
                            <div className="grid grid-cols-7 gap-1">
                                {days}
                            </div>
                            
                            {/* Movimientos del día seleccionado */}
                            {selectedDayMovements.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Movimientos del {selectedDate.toLocaleDateString('es-PY')}
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedDayMovements.map(m => (
                                            <div key={m.id} className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                                                <span className="text-gray-700">{m.descripcion}</span>
                                                <span className={`font-medium ${m.tipo === "Ingreso" ? 'text-green-600' : 'text-red-600'}`}>
                                                    {m.tipo === "Ingreso" ? '+' : '-'}{formatCurrency(m.monto)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Gráfico Circular */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-yellow-500" />
                                    Distribución de Gastos
                                </h3>
                                {data.length > 0 && (
                                    <span className="text-sm text-gray-500">
                                        {data.length} categorías
                                    </span>
                                )}
                            </div>
                            
                            {data.length > 0 ? (
                                <GastoPorRubro data={data} />
                            ) : (
                                <div className="text-center py-8">
                                    <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No hay datos de gastos para mostrar</p>
                                    <p className="text-sm text-gray-400">Registra algunos gastos para ver el gráfico</p>
                                </div>
                            )}
                            
                            {data.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Total gastos:</span> {formatCurrency(totalGastos)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">© 2025 Finanzas360</p>
                                <p className="text-sm text-gray-600">Sistema de Gestión Financiera</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span>Autores: Fatima Villamayor, Luis Sosa</span>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                            Última actualización: {currentTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
