import { Metadata } from "next";
import LearnerPrototype from "./components/LearnerPrototype";

export const metadata: Metadata = {
  title: "Prototype Apprenant | CinqMinutes - L'application en 5 min par jour",
  description:
    "Testez l'interface apprenant interactive de CinqMinutes : vue du jour, minuteur 5 min, fiche de micro-action, validation et parcours 30 jours.",
};

export default function PrototypePage() {
  return <LearnerPrototype />;
}
