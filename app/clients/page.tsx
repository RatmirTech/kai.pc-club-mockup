"use client";

import { useState } from "react";
import { Client } from "@/types";
import { Search, Filter } from "lucide-react";

const MOCK_CLIENTS: Client[] = [
  { id: "1", name: "Алексей Петров", nickname: "AlexKiller", email: "alex@mail.ru", phone: "+79001234567" },
  { id: "2", name: "Мария Иванова", nickname: "MaryJane", email: "mary@mail.ru", phone: "+79007654321" },
  { id: "3", name: "Дмитрий Смирнов", nickname: "Dimon", email: "dima@mail.ru", phone: "+79005555555" },
  { id: "4", name: "Елена Козлова", nickname: "Helen", email: "helen@mail.ru", phone: "+79009998877" },
  { id: "5", name: "Иван Сидоров", nickname: "VanyaPro", email: "ivan@mail.ru", phone: "+79001112233" },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Клиенты</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск клиентов..."
              className="h-10 w-64 rounded-lg border border-slate-200 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            Фильтры
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3">ФИО</th>
              <th className="px-6 py-3">Никнейм</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Телефон</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                <td className="px-6 py-4">{client.nickname}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
