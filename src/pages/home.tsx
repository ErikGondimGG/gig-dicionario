import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import { LightRays } from "@/components/ui/light-rays";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      <Header />

      {/* Background light rays - white/ambient for dark mode, green for light mode */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <LightRays
          count={6}
          color="rgba(255, 255, 255, 0.35)"
          blur={40}
          speed={25}
          length="60vh"
          className="dark:block hidden"
        />
        <LightRays
          count={6}
          color="rgba(34, 197, 94, 0.28)"
          blur={40}
          speed={25}
          length="60vh"
          className="dark:hidden block"
        />
      </div>

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16 py-12">
              <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-galactican">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    Gig Dicionário
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
                  Documente, explore e gerencie seu dicionário de dados de forma
                  colaborativa e moderna
                </p>

                <div className="grid grid-cols-3 gap-0 max-w-2xl mx-auto mt-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[120px]">
                      <NumberTicker value={247} />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Tabelas
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[120px]">
                      <NumberTicker value={1842} />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Campos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[120px]">
                      <NumberTicker value={96} />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Relacionamentos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <BlurFade delay={0.2}>
              <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tabelas</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Explore todas as tabelas cadastradas no sistema
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Campos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Consulte definições de campos e tipos de dados
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Relacionamentos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Visualize conexões entre tabelas
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </main>
    </div>
  );
}
