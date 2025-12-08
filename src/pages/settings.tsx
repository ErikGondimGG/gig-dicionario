import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import Preferences from "@/components/settings/Preferences";
import About from "@/components/settings/About";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [compactView, setCompactView] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <Header />
      
      <main className="pt-32 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Configurações</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Personalize sua experiência no Gig Dicionário
              </p>
            </div>
          </BlurFade>

          <div className="space-y-6">
            <BlurFade delay={0.2}>
              <Preferences
                notifications={notifications}
                setNotifications={setNotifications}
                autoSave={autoSave}
                setAutoSave={setAutoSave}
                compactView={compactView}
                setCompactView={setCompactView}
              />
            </BlurFade>

            <BlurFade delay={0.3}>
              <About />
            </BlurFade>
          </div>
        </div>
      </main>
    </div>
  );
}
