import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardClientApp from "../components/DashboardClientApp";

export const metadata: Metadata = {
  title: "Paramètres & Profil | CinqMinutes",
  description: "Gérez les paramètres de votre projet et vos préférences de notification.",
};

export default async function DashboardSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard/settings");
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
