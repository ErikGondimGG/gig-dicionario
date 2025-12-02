import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
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
          <a href="#" className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">Acessar →</a>
        </div>
      </div>
    </div>
  );
}
