import React, { useEffect, useState } from "react";
import axios from "axios";
import LogCard from "../components/LogCard";

export default function FIPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/v0/admin/fi-status`);
                setLogs(res.data.logs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading)
        return <div className="text-center mt-20 text-gray-600">Loading...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Application Logs</h1>
            {logs.length === 0 ? (
                <p className="text-gray-500">No logs available.</p>
            ) : (
                logs.map((log) => <LogCard key={log._id} log={log} />)
            )}
        </div>
    );
}
