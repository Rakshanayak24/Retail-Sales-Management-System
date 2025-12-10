import React, { useEffect, useMemo, useState } from "react";
import fetchTransactions from "./api";
import Topbar from "./components/Topbar";
import FilterBarTop from "./components/FilterBarTop";
import SummaryCards from "./components/SummaryCards";
import TransactionsTable from "./components/TransactionsTable";
import Pagination from "./components/Pagination";

const PAGE_SIZE = 10;

export default function App() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // controls
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [regions, setRegions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [tags, setTags] = useState("");
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });

  // build params for server
  const params = useMemo(() => {
    const p = {
      page,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      sort,
    };
    if (regions.length) p.region = regions.join(",");
    if (genders.length) p.gender = genders.join(",");
    if (categories.length) p.category = categories.join(",");
    if (payments.length) p.payment = payments.join(",");
    if (dateRange.from) p.startDate = dateRange.from;
    if (dateRange.to) p.endDate = dateRange.to;
    if (tags) p.tags = tags;
    if (ageRange.min) p.minAge = ageRange.min;
    if (ageRange.max) p.maxAge = ageRange.max;
    return p;
  }, [page, search, sort, regions, genders, categories, payments, dateRange, tags, ageRange]);

  useEffect(() => {
    // fetch data when params change
    let mounted = true;
    setLoading(true);
    fetchTransactions(params).then((res) => {
      if (!mounted) return;
      setRows(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [params]);

  // reset page when filters/search change (not when page changes)
  useEffect(() => setPage(1), [search, sort, JSON.stringify(regions), JSON.stringify(genders), JSON.stringify(categories), JSON.stringify(payments), dateRange.from, dateRange.to, tags, ageRange.min, ageRange.max]);

  // summary numbers from server-sent rows (page rows). For global summary you could request separate endpoint.
  const summary = useMemo(() => {
    const totalUnits = (rows || []).reduce((s, r) => s + (Number(r.quantity) || 0), 0);
    const totalAmt = (rows || []).reduce((s, r) => s + (Number(r.final_amount) || Number(r.total_amount) || 0), 0);
    const totalDisc = (rows || []).reduce((s, r) => s + ((Number(r.total_amount) || 0) - (Number(r.final_amount) || 0)), 0);
    return { totalUnits, totalAmt, totalDisc };
  }, [rows]);

  return (
    <div className="min-h-screen">
      <Topbar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <FilterBarTop
          regions={["North","South","East","West","Central"]}
          genders={["Male","Female"]}
          categories={["Clothing","Electronics","Beauty"]}
          payments={["UPI","Cash","Credit Card","credit card","Debit Card","Net Banking","Wallet"]}
          regionsValue={regions} setRegions={setRegions}
          gendersValue={genders} setGenders={setGenders}
          categoriesValue={categories} setCategories={setCategories}
          paymentsValue={payments} setPayments={setPayments}
          dateRange={dateRange} setDateRange={setDateRange}
          tags={tags} setTags={setTags}
          ageRange={ageRange} setAgeRange={setAgeRange}
          sortBy={sort} setSortBy={setSort}
        />

        <div className="mt-6">
          <SummaryCards summary={summary} />
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-500">Total: {total}</div>
            <div>
              <select className="input-pill" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="date_desc">Date (Newest)</option>
                <option value="date_asc">Date (Oldest)</option>
                <option value="qty">Quantity (High → Low)</option>
                <option value="name">Customer Name (A–Z)</option>
              </select>
            </div>
          </div>

          <TransactionsTable rows={rows} loading={loading} />

          <div className="mt-4 flex justify-center">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
