"use client";

import { PC } from "@/types";

interface PCTableProps {
  pcs: PC[];
}

export default function PCTable({ pcs }: PCTableProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-3">Зона</th>
            <th className="px-6 py-3">ПК №</th>
            <th className="px-6 py-3">Статус</th>
            <th className="px-6 py-3">Клиент</th>
            <th className="px-6 py-3">Время окончания</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pcs.map((pc) => (
            <tr key={pc.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">{pc.zone}</td>
              <td className="px-6 py-4">{pc.number}</td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  pc.status === "available" ? "bg-green-100 text-green-700" :
                  pc.status === "occupied" ? "bg-red-100 text-red-700" :
                  "bg-orange-100 text-orange-700"
                }`}>
                  {pc.status === "available" ? "Свободен" : 
                   pc.status === "occupied" ? "Занят" : "Забронирован"}
                </span>
              </td>
              <td className="px-6 py-4">
                {pc.currentClient ? (
                  <div>
                    <div className="font-medium text-slate-900">{pc.currentClient.nickname}</div>
                    <div className="text-xs text-slate-500">{pc.currentClient.name}</div>
                  </div>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-6 py-4">
                {pc.endTime ? new Date(pc.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
