import React, { useEffect, useState, useRef } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";

const WebhookEventsSection = () => {
  const [autovertId, setAutovertId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [groupedEvents, setGroupedEvents] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const sectionRefs = useRef({});

  const fetchWebhookEvents = async (autovertId, applicationId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const params = {};
      if (autovertId) params.autovert_id = autovertId;
      if (applicationId) params.application_id = applicationId;

      const res = await axios.get(`${baseUrl}/v0/admin/webhooks/events`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching webhook events:", error);
      return null;
    }
  };

  const loadEvents = async () => {
    setLoading(true);
    const data = await fetchWebhookEvents(
      autovertId || undefined,
      applicationId ? Number(applicationId) : undefined
    );
    if (data?.is_success) {
      setGroupedEvents(data.grouped);
      setTotalCount(data.totalCount);

      // Initialize collapse state
      const initialCollapse = {};
      Object.keys(data.grouped).forEach((status) => {
        initialCollapse[status] = false; // all expanded initially
      });
      setCollapsed(initialCollapse);
    } else {
      setGroupedEvents({});
      setTotalCount(0);
      setCollapsed({});
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const scrollToSection = (status) => {
    const section = sectionRefs.current[status];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleCollapse = (status) => {
    setCollapsed((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  return (
    <div id="events-section" className="mb-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Webhook Events (Total: {totalCount})
      </h2>

      {/* Filter Form */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Autovert ID"
          value={autovertId}
          onChange={(e) => setAutovertId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-48"
        />
        <input
          type="number"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-48"
        />
        <button
          onClick={loadEvents}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Filter
        </button>
        <button
          onClick={() => {
            setAutovertId("");
            setApplicationId("");
            loadEvents();
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>

      {/* Jump to Status */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.keys(groupedEvents).map((status) => (
          <button
            key={status}
            onClick={() => scrollToSection(status)}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            {status} ({groupedEvents[status].count})
          </button>
        ))}
      </div>

      {loading && <p>Loading events...</p>}
      {!loading && totalCount === 0 && <p>No webhook events found.</p>}

      {/* Grouped Events */}
      {!loading &&
        Object.entries(groupedEvents).map(([status, { count, events }]) => (
          <div
            key={status}
            ref={(el) => (sectionRefs.current[status] = el)}
            className="mb-6 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleCollapse(status)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {status} ({count})
              </h3>
              <span className="text-gray-500">
                {collapsed[status] ? "▼" : "▲"}
              </span>
            </div>

            {!collapsed[status] &&
              (events.length ? (
                <div className="mt-4 space-y-4">
                  {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No events in this status.</p>
              ))}
          </div>
        ))}
    </div>
  );
};

export default WebhookEventsSection;
