"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Flame,
  Award,
  Sparkles,
  Layers,
  FolderCheck,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  streakCount: number;
  xpPoints: number;
  activeTab: "today" | "curriculum" | "dossier" | "community" | "settings";
  onTabChange: (tab: "today" | "curriculum" | "dossier" | "community" | "settings") => void;
  activeDayNumber: number;
  completedDaysCount: number;
}

export default function DashboardHeader({
  userName,
  userEmail,
  streakCount,
  xpPoints,
  activeTab,
  onTabChange,
  activeDayNumber,
  completedDaysCount,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  const navItems: Array<{
    id: "today" | "curriculum" | "dossier" | "community" | "settings";
    label: string;
    icon: any;
    badge?: string;
  }> = [
    {
      id: "today",
      label: `Aujourd'hui (J${activeDayNumber})`,
      icon: Sparkles,
    },
    {
      id: "curriculum",
      label: "Parcours 30 Jours",
      icon: Layers,
      badge: `${completedDaysCount}/30`,
    },
    {
      id: "dossier",
      label: "Dossier & Outils",
      icon: FolderCheck,
    },
    {
      id: "community",
      label: "Cohorte & Entraide",
      icon: Users,
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#1E293B] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <img
                src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
                alt="CinqMinutes"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-bold text-[#0F172A] font-display hidden sm:inline">
                Cinq<span className="text-[#FF6B35]">Minutes</span>
              </span>
            </Link>

            <div className="h-6 w-[2px] bg-[#E2E8F0] hidden sm:block"></div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
              <span>Espace Apprenant</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-2xl border-2 border-[#CBD5E1]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#1E293B] text-white shadow-sm"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B35]" : "text-[#64748B]"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                        isActive ? "bg-[#334155] text-white" : "bg-[#CBD5E1] text-[#1E293B]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Status / Streaks / XP / Sign Out */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF2EB] border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B]">
              <Flame className="w-4 h-4 text-[#FF6B35] fill-current animate-bounce" />
              <span className="text-xs font-black text-[#0F172A]">{streakCount}j</span>
            </div>

            {/* XP Points */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#CBD5E1]">
              <Award className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-xs font-extrabold text-[#1E293B]">{xpPoints} XP</span>
            </div>

            {/* User Mini Avatar & Logout */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onTabChange("settings")}
                className="w-9 h-9 rounded-xl bg-[#1E293B] text-white font-bold text-xs flex items-center justify-center cursor-pointer border border-[#1E293B] hover:bg-[#334155] transition-colors"
                title={userEmail}
              >
                {userName ? userName.slice(0, 2).toUpperCase() : "CM"}
              </button>

              <button
                onClick={handleSignOut}
                className="p-2 rounded-xl border border-[#CBD5E1] hover:border-[#1E293B] bg-white text-[#64748B] hover:text-red-600 transition-colors cursor-pointer"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border-2 border-[#1E293B] bg-white text-[#0F172A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E2E8F0] space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center justify-between ${
                    isActive ? "bg-[#1E293B] text-white" : "text-[#475569] hover:bg-[#F1F5F9]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between px-2">
              <span className="text-xs text-[#64748B]">{userEmail}</span>
              <button
                onClick={handleSignOut}
                className="text-xs font-bold text-red-600 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
