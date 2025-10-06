import React, { useEffect, useState } from "react";
import axios from "axios";
import JsonViewer from "../components/JsonViewer";

const ErrorLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch error logs on page load
    useEffect(() => {
        const fetchErrorLogs = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/v0/admin/errorLogs`);
                setLogs(res.data.logs || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch error logs.");
            } finally {
                setLoading(false);
            }
        };

        fetchErrorLogs();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Error Logs</h1>

            {loading && <p className="text-gray-600">Loading error logs...</p>}

            {error && <p className="text-red-600 mb-3">{error}</p>}

            {!loading && logs.length === 0 && !error && (
                <p className="text-gray-500">No error logs found.</p>
            )}

            {/* Display each error log */}
            {logs.map((log, index) => (
                <div
                    key={index}
                    className="mb-4 p-4 bg-white rounded-lg shadow border border-gray-200"
                >
                    <h2 className="font-semibold mb-2 text-gray-700">
                        {log.method} {log.path} - Status: {log.statusCode}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                        Timestamp: {log.timestamp}
                    </p>
                    <JsonViewer title="Error Details" data={log} />
                </div>
            ))}
        </div>
    );
};

export default ErrorLogsPage;
