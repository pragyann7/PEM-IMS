import React, { useEffect, useMemo, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];

// helper: generate an array of points for the charts
function generateRandomSeries(points = 12, min = 10, max = 120) {
    const series = [];
    for (let i = 0; i < points; i++) {
        series.push({
            name: `P${i + 1}`,
            valueA: Math.round(Math.random() * (max - min) + min),
            valueB: Math.round(Math.random() * (max - min) + min),
            valueC: Math.round(Math.random() * (max - min) + min),
        });
    }
    return series;
}

function aggregateForPie(series) {
    // create a simple aggregate for Pie chart from series
    const totalA = series.reduce((s, p) => s + p.valueA, 0);
    const totalB = series.reduce((s, p) => s + p.valueB, 0);
    const totalC = series.reduce((s, p) => s + p.valueC, 0);
    return [
        { name: 'Series A', value: totalA },
        { name: 'Series B', value: totalB },
        { name: 'Series C', value: totalC },
    ];
}

export default function RandomCharts() {
    const [points, setPoints] = useState(12);
    const [seed, setSeed] = useState(0);

    // regenerate when seed or points change
    const data = useMemo(() => generateRandomSeries(points), [points, seed]);
    const pie = useMemo(() => aggregateForPie(data), [data]);

    // Example derived stats
    const stats = useMemo(() => {
        const avgA = (data.reduce((s, p) => s + p.valueA, 0) / data.length) | 0;
        const avgB = (data.reduce((s, p) => s + p.valueB, 0) / data.length) | 0;
        const avgC = (data.reduce((s, p) => s + p.valueC, 0) / data.length) | 0;
        return { avgA, avgB, avgC };
    }, [data]);

    useEffect(() => {
        // optional: auto-regenerate every 10s (commented out by default)
        // const id = setInterval(() => setSeed(s => s + 1), 10000);
        // return () => clearInterval(id);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Random Charts Demo</h1>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Points</span>
                            <input
                                type="range"
                                min="6"
                                max="36"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                                className="w-40"
                            />
                        </label>

                        <button
                            onClick={() => setSeed((s) => s + 1)}
                            className="px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Regenerate
                        </button>

                        <button
                            onClick={() => {
                                // quick randomize points as well
                                setPoints(6 + Math.floor(Math.random() * 31));
                                setSeed((s) => s + 1);
                            }}
                            className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Surprise
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Line Chart (A vs B)</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="valueA" stroke={COLORS[0]} strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="valueB" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">Averages — A: {stats.avgA} • B: {stats.avgB}</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Bar Chart (Stacked-ish)</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="valueA" stackId="a" fill={COLORS[0]} />
                                    <Bar dataKey="valueB" stackId="a" fill={COLORS[1]} />
                                    <Bar dataKey="valueC" stackId="a" fill={COLORS[2]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">Total points: {data.length}</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm lg:col-span-1">
                        <h2 className="text-lg font-medium mb-2">Pie Chart (Aggregate)</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Tooltip />
                                    <Legend />
                                    <Pie
                                        data={pie}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label
                                    >
                                        {pie.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">Aggregates: A {pie[0].value} • B {pie[1].value} • C {pie[2].value}</div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm lg:col-span-1">
                        <h2 className="text-lg font-medium mb-2">Raw Data Preview</h2>
                        <div className="overflow-auto max-h-72">
                            <table className="w-full text-sm table-auto border-collapse">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="py-2 pr-4">Name</th>
                                        <th className="py-2 pr-4">A</th>
                                        <th className="py-2 pr-4">B</th>
                                        <th className="py-2 pr-4">C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((r) => (
                                        <tr key={r.name} className="border-b last:border-b-0">
                                            <td className="py-2 pr-4">{r.name}</td>
                                            <td className="py-2 pr-4">{r.valueA}</td>
                                            <td className="py-2 pr-4">{r.valueB}</td>
                                            <td className="py-2 pr-4">{r.valueC}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <footer className="mt-6 text-xs text-gray-500">Tip: click "Regenerate" to produce a new random dataset.</footer>
            </div>
        </div>
    );
}
