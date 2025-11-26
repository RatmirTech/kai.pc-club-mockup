"use client";

import { useState, useEffect } from "react";
import { PC, Client, Service } from "@/types";
import { useApp } from "@/context/AppContext";
import { X, Clock, User, Trash2, Save } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pc: PC | null;
  onUpdate: (updatedPC: PC) => void;
}

// Mock clients for assignment
const MOCK_CLIENTS: Client[] = [
  { id: "1", name: "Алексей Петров", nickname: "AlexKiller", email: "alex@mail.ru", phone: "+79001234567" },
  { id: "2", name: "Мария Иванова", nickname: "MaryJane", email: "mary@mail.ru", phone: "+79007654321" },
];

export default function BookingModal({ isOpen, onClose, pc, onUpdate }: BookingModalProps) {
  const { services } = useApp();
  const [extendMinutes, setExtendMinutes] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setExtendMinutes("");
      setSelectedClientId("");
      setSelectedServiceId("");
    }
  }, [isOpen]);

  if (!isOpen || !pc) return null;

  const availableServices = services.filter(s => s.zone === pc.zone);

  const handleAssign = () => {
    const client = MOCK_CLIENTS.find(c => c.id === selectedClientId);
    const service = services.find(s => s.id === selectedServiceId);
    
    if (client && service) {
      const now = new Date();
      let endTime = undefined;

      // Simple logic to calculate end time based on service unit
      if (service.unit === "час") {
        endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
      } else if (service.unit === "пакет") {
        // Assuming packet is 3 hours for this example based on mock data names, 
        // but ideally Service should have a duration field.
        // For now, let's just say 3 hours if it contains "3 часа"
        if (service.name.includes("3 часа")) {
           endTime = new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString();
        } else {
           endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // Default 1 hour
        }
      } else if (service.unit === "ночь") {
         // Set to 8 AM next day
         const tomorrow = new Date(now);
         tomorrow.setDate(tomorrow.getDate() + 1);
         tomorrow.setHours(8, 0, 0, 0);
         endTime = tomorrow.toISOString();
      } else {
        // Default 1 hour
        endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
      }

      onUpdate({
        ...pc,
        status: "occupied",
        currentClient: client,
        endTime,
      });
      onClose();
    }
  };

  const handleExtend = () => {
    if (pc.endTime && extendMinutes) {
      const currentEnd = new Date(pc.endTime);
      const newEnd = new Date(currentEnd.getTime() + parseInt(extendMinutes) * 60000);
      onUpdate({
        ...pc,
        endTime: newEnd.toISOString(),
      });
      onClose();
    }
  };

  const handleCancel = () => {
    onUpdate({
      ...pc,
      status: "available",
      currentClient: undefined,
      endTime: undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {pc.zone} - {pc.number}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Статус</span>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                pc.status === "available" ? "bg-green-100 text-green-700" :
                pc.status === "occupied" ? "bg-red-100 text-red-700" :
                "bg-orange-100 text-orange-700"
              }`}>
                {pc.status === "available" ? "Свободен" : 
                 pc.status === "occupied" ? "Занят" : "Забронирован"}
              </span>
            </div>
            
            {pc.currentClient && (
              <div className="mt-3 border-t pt-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {pc.currentClient.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{pc.currentClient.nickname}</p>
                    <p className="text-xs text-slate-500">{pc.currentClient.name}</p>
                  </div>
                </div>
                {pc.endTime && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>До: {new Date(pc.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {pc.status === "available" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Клиент</label>
                <select 
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                >
                  <option value="">Выберите клиента...</option>
                  {MOCK_CLIENTS.map(c => (
                    <option key={c.id} value={c.id}>{c.nickname} ({c.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Тариф / Услуга</label>
                <select 
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  <option value="">Выберите тариф...</option>
                  {availableServices.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — {s.price} ₽</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAssign}
                disabled={!selectedClientId || !selectedServiceId}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Начать сессию
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Продлить время (минуты)</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    className="flex-1 rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="30"
                    value={extendMinutes}
                    onChange={(e) => setExtendMinutes(e.target.value)}
                  />
                  <button 
                    onClick={handleExtend}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleCancel}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Завершить сессию
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
