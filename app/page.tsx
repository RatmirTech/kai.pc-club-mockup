"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PC } from "@/types";
import PCMap from "@/components/PCMap";
import PCTable from "@/components/PCTable";
import BookingModal from "@/components/BookingModal";
import { LayoutGrid, List } from "lucide-react";

export default function BookingsPage() {
  const { pcs, zones, updatePC } = useApp();
  const [viewMode, setViewMode] = useState<"map" | "table">("map");
  const [selectedPC, setSelectedPC] = useState<PC | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePCClick = (pc: PC) => {
    setSelectedPC(pc);
    setIsModalOpen(true);
  };

  const handlePCUpdate = (updatedPC: PC) => {
    updatePC(updatedPC);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Бронирования</h1>
        <div className="flex rounded-lg bg-white p-1 shadow-sm">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "map"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Карта
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "table"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <List className="h-4 w-4" />
            Таблица
          </button>
        </div>
      </div>

      {viewMode === "map" ? (
        <PCMap pcs={pcs} zones={zones} onPcClick={handlePCClick} />
      ) : (
        <PCTable pcs={pcs} />
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pc={selectedPC}
        onUpdate={handlePCUpdate}
      />
    </div>
  );
}
