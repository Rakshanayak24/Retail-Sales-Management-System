import React from "react";

export default function TransactionsTable({ rows = [], loading = false }) {
  const headers = [
    "Transaction ID","Date","Customer ID","Customer name","Phone Number","Gender","Age",
    "Product Category","Quantity","Total Amount","Final Amount","Payment Method","Order Status","Store Location","Employee"
  ];

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 table-head">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 border-b">{h}</th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white text-sm text-gray-800">
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="p-6 text-center text-gray-500">No records</td></tr>
          ) : rows.map((r, idx) => (
            <tr key={idx} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-3">{r.transaction_id}</td>
              <td className="px-4 py-3">{r.date}</td>
              <td className="px-4 py-3">{r.customer_id}</td>
              <td className="px-4 py-3">{r.customer_name}</td>
              <td className="px-4 py-3">{r.phone_number}</td>
              <td className="px-4 py-3">{r.gender}</td>
              <td className="px-4 py-3">{r.age}</td>
              <td className="px-4 py-3">{r.product_category}</td>
              <td className="px-4 py-3">{String(r.quantity).padStart(2,"0")}</td>
              <td className="px-4 py-3">₹{Number(r.total_amount || 0).toLocaleString()}</td>
              <td className="px-4 py-3">₹{Number(r.final_amount || 0).toLocaleString()}</td>
              <td className="px-4 py-3">{r.payment_method}</td>
              <td className="px-4 py-3">{r.order_status}</td>
              <td className="px-4 py-3">{r.store_location}</td>
              <td className="px-4 py-3">{r.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



