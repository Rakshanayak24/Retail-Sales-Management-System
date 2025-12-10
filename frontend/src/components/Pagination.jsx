import React from "react";

export default function Pagination({ page = 1, setPage = ()=>{}, totalPages = 1 }) {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center gap-3">
      <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded" disabled={page===1}>Previous</button>

      {start > 1 && <button onClick={()=>setPage(1)} className="px-3 py-1 border rounded">1</button>}
      {start > 2 && <span className="px-2">...</span>}

      {pages.map(p => (
        <button key={p} onClick={()=>setPage(p)} className={`px-3 py-1 border rounded ${p===page ? 'bg-gray-800 text-white' : 'bg-white'}`}>{p}</button>
      ))}

      {end < totalPages - 1 && <span className="px-2">...</span>}
      {end < totalPages && <button onClick={()=>setPage(totalPages)} className="px-3 py-1 border rounded">{totalPages}</button>}

      <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded" disabled={page===totalPages}>Next</button>
    </div>
  );
}
