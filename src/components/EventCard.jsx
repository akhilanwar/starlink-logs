import React from "react";
import JsonViewer from "./JsonViewer";

export default function EventCard({ event }) {
    return (
        <div className="bg-white rounded-xl shadow p-5 mb-6 border border-gray-200">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {`${event.source?.toUpperCase()} - ${event.loan_application_status}`}
                    </h2>
                    <p className="text-sm text-gray-500">{event._id}</p>
                </div>

                <span
                    className={`px-3 py-1 rounded text-sm font-medium ${event.status === "FAILED"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {event.status}
                </span>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm text-gray-700">
                <p>
                    <span className="font-medium text-gray-800">Application ID:</span>{" "}
                    {event.application_id}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Autovert ID:</span>{" "}
                    {event.autovert_id}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Loan Status:</span>{" "}
                    {event.loan_application_status}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Retry Count:</span>{" "}
                    {event.retry_count} / {event.max_retries}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Retry Base:</span>{" "}
                    {event.retry_base_minutes} min
                </p>
                <p>
                    <span className="font-medium text-gray-800">Retry Max:</span>{" "}
                    {event.retry_max_minutes} min
                </p>
            </div>

            {/* Time Info */}
            <p className="text-gray-600 text-sm mb-3">
                Created: {event.created_at} | Updated: {event.updated_at}
            </p>

            {/* JSON Data */}
            <JsonViewer title="Payload Raw" data={event.payload_raw} />
            <JsonViewer title="Payload Mapped" data={event.payload_mapped} />
            <JsonViewer title="MS Response" data={event.ms_response} />
        </div>
    );
}
