import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Preferences({ notifications, setNotifications, autoSave, setAutoSave, compactView, setCompactView } : any) {
  return (
    <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Preferências Gerais</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Notificações</Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">Receber alertas sobre atualizações no dicionário</p>
          </div>
          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autosave">Salvamento Automático</Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">Salvar automaticamente alterações em documentações</p>
          </div>
          <Switch id="autosave" checked={autoSave} onCheckedChange={setAutoSave} />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="compact">Visualização Compacta</Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">Mostrar mais informações em menos espaço</p>
          </div>
          <Switch id="compact" checked={compactView} onCheckedChange={setCompactView} />
        </div>
      </div>
    </div>
  );
}
