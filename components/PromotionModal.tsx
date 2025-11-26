"use client";

import { useState, useEffect } from "react";
import { Promotion } from "@/types";
import { X } from "lucide-react";

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotion: Promotion | null;
  onSave: (promotion: Promotion) => void;
}

export default function PromotionModal({ isOpen, onClose, promotion, onSave }: PromotionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (promotion) {
      setTitle(promotion.title);
      setDescription(promotion.description);
      setValidUntil(promotion.validUntil);
      setDiscount(promotion.discount);
    } else {
      setTitle("");
      setDescription("");
      setValidUntil("");
      setDiscount("");
    }
  }, [promotion, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: promotion ? promotion.id : Date.now().toString(),
      title,
      description,
      validUntil,
      discount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {promotion ? "Редактировать акцию" : "Добавить акцию"}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Описание</label>
            <textarea
              required
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Срок действия</label>
            <input
              type="text"
              required
              placeholder="Например: 2026-12-31 или Бессрочно"
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Скидка / Бонус</label>
            <input
              type="text"
              required
              placeholder="Например: 500 ₽ или -20%"
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
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
