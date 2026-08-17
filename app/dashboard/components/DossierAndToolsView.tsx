"use client";

import { useState } from "react";
import ProjectDossierDrawer from "@/app/prototype/components/ProjectDossierDrawer";
import ToolsCalculators from "./ToolsCalculators";
import { FolderCheck, Wrench, Sparkles, Copy, Check, Printer, FileText } from "lucide-react";

interface DossierAndToolsViewProps {
  completedDays: number[];
  deliverablesMap: Record<string, string>;
  projectTitle: string;
  learnerName: string;
}

export default function DossierAndToolsView({
  completedDays,
  deliverablesMap,
  projectTitle,
  learnerName,
}: DossierAndToolsViewProps) {
  const [activeSection, setActiveSection] = useState<"dossier" | "tools">("dossier");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Toggle Switch */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B]">
          <button
            onClick={() => setActiveSection("dossier")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === "dossier"
                ? "bg-[#1E293B] text-white shadow-sm"
                : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            <FolderCheck className="w-4 h-4 text-[#FF6B35]" />
            <span>Mon Dossier Projet ({completedDays.length}/30 fiches)</span>
          </button>

          <button
            onClick={() => setActiveSection("tools")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === "tools"
                ? "bg-[#FF6B35] text-white shadow-sm"
                : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Outils, Simulateurs & Modèles</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSection === "dossier" ? (
        <ProjectDossierDrawer
          completedDays={completedDays}
          deliverablesMap={deliverablesMap}
          projectTitle={projectTitle}
          learnerName={learnerName}
        />
      ) : (
        <ToolsCalculators
          deliverablesMap={deliverablesMap}
          projectTitle={projectTitle}
          learnerName={learnerName}
        />
      )}
    </div>
  );
}
