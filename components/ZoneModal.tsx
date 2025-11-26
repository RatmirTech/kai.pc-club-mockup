"use client";

import { useState, useEffect } from "react";
import { Zone } from "@/types";
import { X } from "lucide-react";

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone: Zone | null;
  onSave: (zone: Zone) => void;
}

export default function ZoneModal({ isOpen, onClose, zone, onSave }: ZoneModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("bg-blue-100 text-blue-700");

  useEffect(() => {
    if (zone) {
      setName(zone.name);
      setDescription(zone.description || "");
      setColor(zone.color);
    } else {
      setName("");
      setDescription("");
      setColor("bg-blue-100 text-blue-700");
    }
  }, [zone, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: zone ? zone.id : Date.now().toString(),
      name,
      description,
      color,
    });
    onClose();
  };

  const colors = [
    { label: "Blue", value: "bg-blue-100 text-blue-700" },
    { label: "Purple", value: "bg-purple-100 text-purple-700" },
    { label: "Green", value: "bg-green-100 text-green-700" },
    { label: "Orange", value: "bg-orange-100 text-orange-700" },
    { label: "Red", value: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {zone ? "Редактировать зал" : "Добавить зал"}
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

          <div>
            <label className="block text-sm font-medium text-slate-700">Описание</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Цвет</label>
            <div className="mt-2 flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`h-8 w-8 rounded-full border-2 ${c.value.split(" ")[0]} ${
                    color === c.value ? "border-slate-600" : "border-transparent"
                  }`}
                  onClick={() => setColor(c.value)}
                />
              ))}
            </div>
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
