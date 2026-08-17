import { Metadata } from "next";
import LearnerPrototype from "../prototype/components/LearnerPrototype";

export const metadata: Metadata = {
  title: "Application Apprenant | CinqMinutes",
  description:
    "Testez l'interface apprenant interactive de CinqMinutes : vue du jour, minuteur 5 min, fiche de micro-action, validation et parcours 30 jours.",
};

export default function AppRoutePage() {
  return <LearnerPrototype />;
}
