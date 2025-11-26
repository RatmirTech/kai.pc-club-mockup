"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Promotion } from "@/types";
import { Calendar, Tag, Plus, Edit2, Trash2 } from "lucide-react";
import PromotionModal from "@/components/PromotionModal";

export default function PromotionsPage() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const handleAdd = () => {
    setEditingPromotion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту акцию?")) {
      deletePromotion(id);
    }
  };

  const handleSave = (promotion: Promotion) => {
    if (editingPromotion) {
      updatePromotion(promotion);
    } else {
      addPromotion(promotion);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Акции</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Добавить акцию
        </button>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Tag className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                  {promo.discount}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <h3 className="mb-2 text-lg font-bold text-slate-900">{promo.title}</h3>
            <p className="mb-4 flex-1 text-sm text-slate-600">{promo.description}</p>
            
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>Действует до: {promo.validUntil}</span>
            </div>
          </div>
        ))}
      </div>

      <PromotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        promotion={editingPromotion}
        onSave={handleSave}
      />
    </div>
  );
}
