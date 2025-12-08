import { BlurFade } from "@/components/ui/blur-fade";

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <BlurFade delay={0.2}>
        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Tabelas</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Explore todas as tabelas cadastradas no sistema</p>
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Campos</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Consulte definições de campos e tipos de dados</p>
        </div>
      </BlurFade>

      <BlurFade delay={0.4}>
        <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Relacionamentos</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Visualize conexões entre tabelas</p>
        </div>
      </BlurFade>
    </div>
  );
}
