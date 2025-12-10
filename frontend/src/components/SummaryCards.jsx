import React from "react";

export default function SummaryCards({ summary = {} }) {
  const { totalUnits = 0, totalAmt = 0, totalDisc = 0 } = summary || {};

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
        <div className="small-muted">Total units sold</div>
        <div className="text-2xl font-semibold mt-2">{totalUnits}</div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
        <div className="small-muted">Total Amount</div>
        <div className="text-2xl font-semibold mt-2">₹{Number(totalAmt).toLocaleString()}</div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
        <div className="small-muted">Total Discount</div>
        <div className="text-2xl font-semibold mt-2">₹{Number(totalDisc).toLocaleString()}</div>
      </div>
    </div>
  );
}
