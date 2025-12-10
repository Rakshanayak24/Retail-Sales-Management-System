import axios from "axios";

const API_BASE = "http://localhost:4000/api/transactions";

export default async function fetchTransactions(params = {}) {
  // params: { page, pageSize, search, region, gender, category, payment, startDate, endDate, sort, minAge, maxAge, tags }
  try {
    const res = await axios.get(API_BASE, { params });
    // backend returns { page, pageSize, total, totalPages, data }
    return res.data || {};
  } catch (err) {
    console.error("API error:", err);
    return { page: 1, pageSize: params.pageSize || 10, total: 0, totalPages: 1, data: [] };
  }
}
