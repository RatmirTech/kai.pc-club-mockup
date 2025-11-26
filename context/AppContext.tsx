"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PC, Client, Promotion, Service, Zone } from "@/types";

interface AppContextType {
  zones: Zone[];
  addZone: (zone: Zone) => void;
  updateZone: (zone: Zone) => void;
  deleteZone: (id: string) => void;

  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;

  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotion: Promotion) => void;
  deletePromotion: (id: string) => void;

  pcs: PC[];
  updatePC: (pc: PC) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_ZONES: Zone[] = [
  { id: "1", name: "VIP", description: "Комфортная зона с топовыми ПК", color: "bg-purple-100 text-purple-700" },
  { id: "2", name: "Standard", description: "Общий зал", color: "bg-blue-100 text-blue-700" },
  { id: "3", name: "Bootcamp", description: "Зона для командных тренировок", color: "bg-orange-100 text-orange-700" },
];

const INITIAL_SERVICES: Service[] = [
  { id: "1", name: "VIP-ПК (1 час)", price: 500, unit: "час", zone: "VIP" },
  { id: "2", name: "VIP-ПК (Пакет 3 часа)", price: 1200, unit: "пакет", zone: "VIP" },
  { id: "3", name: "VIP-ПК (Ночь)", price: 1500, unit: "ночь", zone: "VIP" },
  { id: "4", name: "Обычный ПК (1 час)", price: 250, unit: "час", zone: "Standard" },
  { id: "5", name: "Обычный ПК (Пакет 3 часа)", price: 600, unit: "пакет", zone: "Standard" },
  { id: "6", name: "Обычный ПК (Ночь)", price: 800, unit: "ночь", zone: "Standard" },
  { id: "7", name: "Буткемп (1 место / час)", price: 400, unit: "час", zone: "Bootcamp" },
  { id: "8", name: "Буткемп (Команда 5 мест / час)", price: 1800, unit: "час", zone: "Bootcamp" },
];

const INITIAL_PROMOTIONS: Promotion[] = [
  { id: "1", title: "Ночной пакет", description: "Играй всю ночь с 22:00 до 08:00 по фиксированной цене.", validUntil: "2026-12-31", discount: "500 ₽" },
  { id: "2", title: "Студенческий", description: "Скидка 20% при предъявлении студенческого билета в будние дни до 18:00.", validUntil: "2026-06-30", discount: "-20%" },
  { id: "3", title: "День рождения", description: "3 часа игры бесплатно в день рождения (+/- 3 дня).", validUntil: "Бессрочно", discount: "Бесплатно" },
  { id: "4", title: "Приведи друга", description: "Получи 1 час игры за каждого приведенного друга, который купит пакет от 3 часов.", validUntil: "2026-12-31", discount: "1 час" },
];

const INITIAL_PCS: PC[] = [
  { id: "1", number: "VIP-01", zone: "VIP", status: "available" },
  { id: "2", number: "VIP-02", zone: "VIP", status: "occupied", currentClient: { id: "1", name: "Алексей Петров", nickname: "AlexKiller", email: "alex@mail.ru", phone: "+79001234567" }, endTime: new Date(Date.now() + 30 * 60000).toISOString() },
  { id: "3", number: "VIP-03", zone: "VIP", status: "available" },
  { id: "4", number: "VIP-04", zone: "VIP", status: "reserved", currentClient: { id: "2", name: "Мария Иванова", nickname: "MaryJane", email: "mary@mail.ru", phone: "+79007654321" } },
  { id: "5", number: "STD-01", zone: "Standard", status: "available" },
  { id: "6", number: "STD-02", zone: "Standard", status: "available" },
  { id: "7", number: "STD-03", zone: "Standard", status: "occupied", currentClient: { id: "3", name: "Дмитрий С.", nickname: "Dimon", email: "dima@mail.ru", phone: "+79005555555" }, endTime: new Date(Date.now() + 15 * 60000).toISOString() },
  { id: "8", number: "STD-04", zone: "Standard", status: "available" },
  { id: "9", number: "STD-05", zone: "Standard", status: "available" },
  { id: "10", number: "STD-06", zone: "Standard", status: "available" },
  { id: "11", number: "BC-01", zone: "Bootcamp", status: "available" },
  { id: "12", number: "BC-02", zone: "Bootcamp", status: "available" },
  { id: "13", number: "BC-03", zone: "Bootcamp", status: "available" },
  { id: "14", number: "BC-04", zone: "Bootcamp", status: "available" },
  { id: "15", number: "BC-05", zone: "Bootcamp", status: "available" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [pcs, setPcs] = useState<PC[]>(INITIAL_PCS);

  const addZone = (zone: Zone) => setZones([...zones, zone]);
  const updateZone = (updatedZone: Zone) => setZones(zones.map(z => z.id === updatedZone.id ? updatedZone : z));
  const deleteZone = (id: string) => setZones(zones.filter(z => z.id !== id));

  const addService = (service: Service) => setServices([...services, service]);
  const updateService = (updatedService: Service) => setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
  const deleteService = (id: string) => setServices(services.filter(s => s.id !== id));

  const addPromotion = (promotion: Promotion) => setPromotions([...promotions, promotion]);
  const updatePromotion = (updatedPromotion: Promotion) => setPromotions(promotions.map(p => p.id === updatedPromotion.id ? updatedPromotion : p));
  const deletePromotion = (id: string) => setPromotions(promotions.filter(p => p.id !== id));

  const updatePC = (updatedPC: PC) => setPcs(pcs.map(pc => pc.id === updatedPC.id ? updatedPC : pc));

  return (
    <AppContext.Provider value={{
      zones, addZone, updateZone, deleteZone,
      services, addService, updateService, deleteService,
      promotions, addPromotion, updatePromotion, deletePromotion,
      pcs, updatePC
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
