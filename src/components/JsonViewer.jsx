import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function JsonViewer({ title, data }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border rounded-lg bg-gray-900 text-white overflow-hidden mb-3">
            <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2">
                    {open ? <FaChevronDown /> : <FaChevronRight />}
                    <span className="font-semibold">{title}</span>
                </div>
            </div>
            {open && (
                <SyntaxHighlighter
                    language="json"
                    style={dracula}
                    customStyle={{ margin: 0, padding: "10px", background: "#0f172a" }}
                >
                    {JSON.stringify(data, null, 2)}
                </SyntaxHighlighter>
            )}
        </div>
    );
}
