import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardClientApp from "./components/DashboardClientApp";

export const metadata: Metadata = {
  title: "Espace Apprenant | CinqMinutes",
  description: "Accédez à vos 30 micro-actions quotidiennes, minuteur 5 min et générateur de dossier de création d'activité.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  return (
    <DashboardClientApp
      initialUser={{
        id: session.user.id,
        name: session.user.name || "Apprenant",
        email: session.user.email || "",
      }}
    />
  );
}
