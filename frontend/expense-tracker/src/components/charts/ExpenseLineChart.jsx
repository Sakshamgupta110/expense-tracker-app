import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip to show category and amount
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm text-gray-600">
          Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseLineChart = ({ data }) => {
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid  stroke="none"/>
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#expenseGradient)"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#875cf5", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 8, fill: "#875cf5" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;

export function prepareExpenseLineChartData(expenses) {
  const grouped = {};
  expenses.forEach(exp => {
    const date = new Date(exp.date).toLocaleDateString();
    grouped[date] = {
      amount: (grouped[date]?.amount || 0) + Number(exp.amount),
      category: exp.category // This will only keep the last category for the date
    };
  });
  return Object.entries(grouped).map(([date, { amount, category }]) => ({
    date,
    amount,
    category
  }));
}