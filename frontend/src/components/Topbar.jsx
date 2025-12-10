import React from "react";
import { FiSearch } from "react-icons/fi";

export default function Topbar({ search, setSearch, sort, setSort }) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-semibold text-lg">Sales Management System</div>

        <div className="flex-1 mx-6">
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search customer name or phone"
              className="w-full border rounded-md px-4 py-2 pl-10 text-sm bg-white"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        
      </div>
    </div>
  );
}


