import React, { useState } from "react";
import axios from "axios";
import LogCard from "../components/LogCard"; // Reuse your existing LogCard
import JsonViewer from "../components/JsonViewer";

const LogPage = () => {
    const [filters, setFilters] = useState({
        application_id: "",
        autovert_id: "",
        action: "",
        status: "",
    });
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchLogs = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setLogs([]);

        try {
            const params = {};
            Object.keys(filters).forEach((key) => {
                if (filters[key]) params[key] = filters[key];
            });

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/v0/admin/getLogs`, { params });
            setLogs(res.data.logs || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch logs. Check your filters or try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Logs</h1>

            {/* Filter Form */}
            <form onSubmit={fetchLogs} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    name="application_id"
                    placeholder="Application ID"
                    value={filters.application_id}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="autovert_id"
                    placeholder="Autovert ID"
                    value={filters.autovert_id}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="action"
                    placeholder="Action"
                    value={filters.action}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={filters.status}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="col-span-1 md:col-span-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Fetch Logs
                </button>
            </form>

            {/* Loading */}
            {loading && <p className="text-gray-600">Loading logs...</p>}

            {/* Error */}
            {error && <p className="text-red-600 mb-3">{error}</p>}

            {/* No logs */}
            {!loading && logs.length === 0 && !error && (
                <p className="text-gray-500">No logs found.</p>
            )}

            {/* Logs */}
            <div className="space-y-4">
                {logs.map((log) => (
                    <div
                        key={log._id}
                        className="p-4 bg-white rounded-lg shadow border border-gray-200"
                    >
                        <h2 className="font-semibold mb-2 text-gray-700">
                            {log.action} - Status: {log.status}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                            Application ID: {log.application_id || "N/A"} | Autovert ID: {log.autovert_id || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                            Created At: {log.created_at || log.timestamp || "N/A"}
                        </p>
                        <JsonViewer title="Log Details" data={log} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogPage;
