"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Service } from "@/types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import ServiceModal from "@/components/ServiceModal";

export default function ServicesPage() {
  const { services, zones, addService, updateService, deleteService } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту услугу?")) {
      deleteService(id);
    }
  };

  const handleSave = (service: Service) => {
    if (editingService) {
      updateService(service);
    } else {
      addService(service);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Услуги и Тарифы</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Добавить услугу
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {zones.map((zone) => {
          const zoneServices = services.filter(s => s.zone === zone.name);
          
          return (
            <div key={zone.id} className="rounded-xl bg-white shadow-sm overflow-hidden">
              <div className={`border-b px-6 py-4 ${zone.color.split(" ")[0]}`}>
                <h2 className={`text-lg font-bold ${zone.color.split(" ")[1]}`}>{zone.name} Zone</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {zoneServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 group">
                    <div>
                      <h3 className="font-medium text-slate-900">{service.name}</h3>
                      <p className="text-sm text-slate-500">{service.price} ₽ / {service.unit}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button 
                        onClick={() => handleEdit(service)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {zoneServices.length === 0 && (
                  <div className="px-6 py-8 text-center text-sm text-slate-500">
                    Нет услуг в этой категории
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={editingService}
        zones={zones}
        onSave={handleSave}
      />
    </div>
  );
}
