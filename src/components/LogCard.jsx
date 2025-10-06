import React from "react";
import JsonViewer from "./JsonViewer";

export default function LogCard({ log }) {
    return (
        <div className="bg-white rounded-xl shadow p-5 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {log.action}
                    </h2>
                    <p className="text-sm text-gray-500">{log._id}</p>
                </div>
                <span
                    className={`px-3 py-1 rounded text-sm font-medium ${log.status === "FAILED"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {log.status}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">
                Created: {log.created_at}
            </p>

            <JsonViewer title="Raw Body" data={log.raw_body} />
            <JsonViewer title="Send Payload" data={log.send_payload} />
            <JsonViewer title="Response" data={log.response} />
        </div>
    );
}
