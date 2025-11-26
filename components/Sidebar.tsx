"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MonitorPlay, 
  Tags, 
  LogOut, 
  Map as MapIcon,
  Layout
} from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
  { name: "Бронирования", href: "/", icon: MapIcon },
  { name: "Клиенты", href: "/clients", icon: Users },
  { name: "Услуги", href: "/services", icon: MonitorPlay },
  { name: "Акции", href: "/promotions", icon: Tags },
  { name: "Залы", href: "/zones", icon: Layout },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg fixed left-0 top-0 z-50">
      <div className="flex h-20 items-center justify-center border-b px-6">
        <h1 className="text-xl font-bold text-blue-600">CyberClub Admin</h1>
      </div>
      
      <div className="px-6 py-4">
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-slate-100 p-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            И
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Админ</p>
            <p className="text-xs text-slate-500">Иван И.</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5" />
          Выйти
        </button>
      </div>
    </div>
  );
}
