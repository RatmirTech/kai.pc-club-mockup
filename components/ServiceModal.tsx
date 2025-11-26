"use client";

import { useState, useEffect } from "react";
import { Service, Zone } from "@/types";
import { X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  zones: Zone[];
  onSave: (service: Service) => void;
}

export default function ServiceModal({ isOpen, onClose, service, zones, onSave }: ServiceModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("час");
  const [zoneId, setZoneId] = useState("");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setPrice(service.price.toString());
      setUnit(service.unit);
      setZoneId(service.zone);
    } else {
      setName("");
      setPrice("");
      setUnit("час");
      setZoneId(zones.length > 0 ? zones[0].name : "");
    }
  }, [service, isOpen, zones]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: service ? service.id : Date.now().toString(),
      name,
      price: Number(price),
      unit,
      zone: zoneId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {service ? "Редактировать услугу" : "Добавить услугу"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Название</label>
            <input
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Цена (₽)</label>
              <input
                type="number"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Единица</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="час">час</option>
                <option value="пакет">пакет</option>
                <option value="ночь">ночь</option>
                <option value="штука">штука</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Зона</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
            >
              {zones.map((z) => (
                <option key={z.id} value={z.name}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
