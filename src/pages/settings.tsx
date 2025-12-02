import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
              <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Preferências Gerais</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notificações</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Receber alertas sobre atualizações no dicionário
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autosave">Salvamento Automático</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Salvar automaticamente alterações em documentações
                      </p>
                    </div>
                    <Switch
                      id="autosave"
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact">Visualização Compacta</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Mostrar mais informações em menos espaço
                      </p>
                    </div>
                    <Switch
                      id="compact"
                      checked={compactView}
                      onCheckedChange={setCompactView}
                    />
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Sobre</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Versão</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Última atualização</span>
                    <span className="font-medium">Dezembro 2025</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Documentação</span>
                    <a href="#" className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                      Acessar →
                    </a>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </main>
    </div>
  );
}
