import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import { useSummary } from "@/hooks/useSummary";

export default function HomeHero() {
  const { data, isLoading, isError, isFetching } = useSummary();

  const loading = isLoading || isFetching;

  console.log(JSON.stringify(data, null, 2));

  const summary = data?.data;

  return (
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

          <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[100px]">
                {loading ? (
                  <Skeleton className="h-3 mt-7 w-20 mx-auto" />
                ) : isError ? (
                  <span className="text-red-500">—</span>
                ) : (
                  <NumberTicker value={summary?.tables_count ?? 0} />
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Tabelas
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[100px]">
                {loading ? (
                  <Skeleton className="h-3 mt-7 w-20 mx-auto" />
                ) : isError ? (
                  <span className="text-red-500">—</span>
                ) : (
                  <NumberTicker value={summary?.views_count ?? 0} />
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Views
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[100px]">
                {loading ? (
                  <Skeleton className="h-3 mt-7 w-20 mx-auto" />
                ) : isError ? (
                  <span className="text-red-500">—</span>
                ) : (
                  <NumberTicker value={summary?.procedures_count ?? 0} />
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Procedures
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[100px]">
                {loading ? (
                  <Skeleton className="h-3 mt-7 w-20 mx-auto" />
                ) : isError ? (
                  <span className="text-red-500">—</span>
                ) : (
                  <NumberTicker value={summary?.triggers_count ?? 0} />
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Triggers
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 min-w-[100px]">
                {loading ? (
                  <Skeleton className="h-3 mt-7 w-20 mx-auto" />
                ) : isError ? (
                  <span className="text-red-500">—</span>
                ) : (
                  <NumberTicker value={summary?.foreign_keys_count ?? 0} />
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                FKs
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
