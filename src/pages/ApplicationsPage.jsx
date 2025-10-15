import React, { useState } from "react";
import axios from "axios";
import LogCard from "../components/LogCard";
import JsonViewer from "../components/JsonViewer";
import EventCard from "../components/EventCard";

const ApplicationsPage = () => {
    const [autovertId, setAutovertId] = useState("");
    const [application, setApplication] = useState(null);
    const [logs, setLogs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        if (!autovertId) return;
        setLoading(true);
        setError("");
        setApplication(null);
        setLogs([]);
        setEvents([]);

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/v0/admin/application/${autovertId}`
            );

            setApplication(res.data.application || null);
            setLogs(res.data.logs || []);
            setEvents(res.data.events || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch application data. Check Autovert ID.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Application Details</h1>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Autovert ID"
                    value={autovertId}
                    onChange={(e) => setAutovertId(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Fetch
                </button>
            </form>

            {/* Loading */}
            {loading && <p className="text-gray-600">Loading...</p>}

            {/* Error */}
            {error && <p className="text-red-600 mb-3">{error}</p>}

            {/* Jump Navigation */}
            {(application || logs.length > 0 || events.length > 0) && (
                <div className="flex gap-4 mb-6 sticky top-0 bg-gray-100 p-2 z-10">
                    {application && (
                        <a
                            href="#application-section"
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Application
                        </a>
                    )}
                    {logs.length > 0 && (
                        <a
                            href="#logs-section"
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Logs
                        </a>
                    )}
                    {events.length > 0 && (
                        <a
                            href="#events-section"
                            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Web Hooks
                        </a>
                    )}
                </div>
            )}

            {/* Application Info */}
            {application && (
                <div id="application-section" className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Application</h2>
                    <JsonViewer title="Application Data" data={application} />
                </div>
            )}

            {/* Logs */}
            {logs.length > 0 && (
                <div id="logs-section" className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Logs</h2>
                    {logs.map((log) => (
                        <LogCard key={log._id} log={log} />
                    ))}
                </div>
            )}

            {/* Events */}
            {events.length > 0 && (
                <div id="events-section" className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        Webhook Events
                    </h2>
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}

            {!loading &&
                !application &&
                logs.length === 0 &&
                events.length === 0 &&
                !error && (
                    <p className="text-gray-500">Enter an Autovert ID to fetch data.</p>
                )}
        </div>
    );
};

export default ApplicationsPage;
