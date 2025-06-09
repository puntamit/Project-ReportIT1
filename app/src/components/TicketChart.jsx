import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import config from "../config";

const TicketChart = ({ timeframe }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTicketData();
  }, [timeframe]);

  const fetchTicketData = async () => {
    try {
      const res = await axios.get(config.api_path + "ticket/getAll");
      const tickets = res.data.data;
      const processedData = processChartData(tickets);
      setData(processedData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching ticket data");
      setLoading(false);
    }
  };

  const processChartData = (tickets) => {
    const groupedData = {};
    tickets.forEach((ticket) => {
      const date = new Date(ticket.createdAt);
      let key;
      if (timeframe === "daily") {
        key = date.toLocaleDateString(); // Group by day
      } else if (timeframe === "weekly") {
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`; // Group by week
        key = week;
      } else if (timeframe === "monthly") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Group by month
      }

      if (!groupedData[key]) {
        groupedData[key] = { name: key, new: 0, inProgress: 0, resolved: 0 };
      }
      if (ticket.status === "new") {
        groupedData[key].new += 1;
      } else if (ticket.status === "inProgress") {
        groupedData[key].inProgress += 1;
      } else if (ticket.status === "resolved") {
        groupedData[key].resolved += 1;
      }
    });

    return Object.values(groupedData);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading chart...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Ticket Status Overview</h3>
      <p className="text-sm text-gray-500 mb-4">
        {timeframe === "daily" && "Showing data for the last 7 days"}
        {timeframe === "weekly" && "Showing data for the last 4 weeks"}
        {timeframe === "monthly" && "Showing data for the last 6 months"}
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="new"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
            name="New Tickets"
          />
          <Line
            type="monotone"
            dataKey="inProgress"
            stroke="#f59e0b"
            name="In Progress"
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="#10b981"
            name="Resolved Tickets"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketChart;