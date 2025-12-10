import React from "react";
import { FiHome, FiUsers, FiFolder, FiFileText } from "react-icons/fi";

export default function Sidebar(){
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 hidden md:block">
      <div className="mb-8">
        <div className="text-sm text-gray-300">Vault</div>
        <div className="font-bold text-lg mt-1">Anurag Yadav</div>
      </div>

      <nav className="space-y-3 text-sm">
        <div className="flex items-center gap-3"><FiHome /> <span>Dashboard</span></div>
        <div className="flex items-center gap-3"><FiUsers /> <span>Nexus</span></div>
        <div className="flex items-center gap-3"><FiFolder /> <span>Intake</span></div>
        <div className="flex items-center gap-3"><FiFileText /> <span>Services</span></div>
        <div className="mt-6 border-t border-gray-800 pt-4">
          <div className="text-xs text-gray-400">Invoices</div>
          <div className="mt-2 text-sm">Proforma Invoices</div>
          <div className="text-sm">Final Invoices</div>
        </div>
      </nav>
    </aside>
  );
}
