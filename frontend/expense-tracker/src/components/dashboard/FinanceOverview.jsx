import React from "react";
import CustomPieChart from "../charts/CustomPieChart";
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalIncome, totalExpense, totalBalance }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome }
    ];
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial overview</h5>
            </div>
            <div className="flex justify-center w-full">
                <div className="mx-auto" style={{ maxWidth: 400, width: '100%' }}>
                    <CustomPieChart
                        data={balanceData}
                        label="Total Balance"
                        totalAmount={`$${totalBalance}`}
                        colors={COLORS}
                        showTextAnchor
                    />
                </div>
            </div>
        </div>
    );
};

export default FinanceOverview;