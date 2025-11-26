"use client";

import { PC, Zone } from "@/types";
import { Monitor } from "lucide-react";
import { clsx } from "clsx";

interface PCMapProps {
  pcs: PC[];
  zones: Zone[];
  onPcClick: (pc: PC) => void;
}

export default function PCMap({ pcs, zones, onPcClick }: PCMapProps) {
  return (
    <div className="space-y-8">
      {zones.map((zone) => {
        const zonePcs = pcs.filter((pc) => pc.zone === zone.name);
        
        return (
          <div key={zone.id} className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className={`mb-4 text-lg font-bold ${zone.color.split(" ")[1]}`}>{zone.name} Zone</h3>
            {zonePcs.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {zonePcs.map((pc) => (
                  <button
                    key={pc.id}
                    onClick={() => onPcClick(pc)}
                    className={clsx(
                      "relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all hover:scale-105",
                      pc.status === "available"
                        ? "border-green-200 bg-green-50 hover:border-green-300"
                        : pc.status === "occupied"
                        ? "border-red-200 bg-red-50 hover:border-red-300"
                        : "border-orange-200 bg-orange-50 hover:border-orange-300"
                    )}
                  >
                    <Monitor
                      className={clsx(
                        "mb-2 h-8 w-8",
                        pc.status === "available"
                          ? "text-green-500"
                          : pc.status === "occupied"
                          ? "text-red-500"
                          : "text-orange-500"
                      )}
                    />
                    <span className="font-bold text-slate-700">{pc.number}</span>
                    {pc.currentClient && (
                      <span className="mt-1 text-xs font-medium text-slate-500 truncate w-full text-center">
                        {pc.currentClient.nickname}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                Нет ПК в этой зоне
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
