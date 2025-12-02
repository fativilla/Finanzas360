import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GastoPorRubro = ({ data }) => {
    const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#8884D8"];

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-2">Gastos por Rubro</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="monto"
                        nameKey="categoria"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString("es-PY", { maximumFractionDigits: 0 })} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GastoPorRubro;
