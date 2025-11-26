"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Zone } from "@/types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import ZoneModal from "@/components/ZoneModal";

export default function ZonesPage() {
  const { zones, addZone, updateZone, deleteZone } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);

  const handleAdd = () => {
    setEditingZone(null);
    setIsModalOpen(true);
  };

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот зал?")) {
      deleteZone(id);
    }
  };

  const handleSave = (zone: Zone) => {
    if (editingZone) {
      updateZone(zone);
    } else {
      addZone(zone);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Залы (Зоны)</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Добавить зал
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => (
          <div key={zone.id} className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${zone.color}`}>
                {zone.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(zone)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(zone.id)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-600">{zone.description || "Нет описания"}</p>
          </div>
        ))}
      </div>

      <ZoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        zone={editingZone}
        onSave={handleSave}
      />
    </div>
  );
}
