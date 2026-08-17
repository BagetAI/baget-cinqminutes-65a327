"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Sparkles, ArrowRight, CheckCircle2, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

const AFTER_AUTH_DEFAULT = "/dashboard";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const requested = new URLSearchParams(window.location.search).get("callbackUrl");
    const callbackUrl =
      requested && requested.startsWith("/") && !requested.startsWith("//") && !requested.includes("\\")
        ? requested
        : AFTER_AUTH_DEFAULT;

    const { error: signInError } = await authClient.signIn.email({ email, password });
    if (signInError) {
      setError(signInError.message ?? "Identifiants incorrects. Veuillez vérifier votre email et mot de passe.");
      setPending(false);
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Header */}
      <div className="max-w-md w-full mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <img
            src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
            alt="CinqMinutes logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight font-display">
            Cinq<span className="text-[#FF6B35]">Minutes</span>
          </span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] p-7 sm:p-9 space-y-6">
          <div className="space-y-1 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Espace Apprenant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
              Connexion à votre espace
            </h1>
            <p className="text-xs sm:text-sm text-[#475569]">
              Reprenez votre parcours et votre micro-action du jour.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                Adresse email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.fr"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#CBD5E1] focus:border-[#FF6B35] focus:bg-[#FFF2EB]/10 focus:outline-none text-sm text-[#0F172A] font-medium bg-[#F8FAFC] transition-colors"
                />
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Mot de passe
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#CBD5E1] focus:border-[#FF6B35] focus:bg-[#FFF2EB]/10 focus:outline-none text-sm text-[#0F172A] font-medium bg-[#F8FAFC] transition-colors"
                />
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 px-6 rounded-xl bg-[#1E293B] hover:bg-[#FF6B35] text-white font-extrabold text-sm sm:text-base border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35] hover:shadow-[1px_1px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder à mon espace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-3 border-t border-[#E2E8F0] text-center">
            <p className="text-xs sm:text-sm text-[#475569]">
              Vous n'avez pas encore de compte ?{" "}
              <Link href="/sign-up" className="font-bold text-[#FF6B35] hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-[#94A3B8]">
        <span>CinqMinutes • 5 minutes par jour pour lancer votre activité</span>
      </div>
    </main>
  );
}
