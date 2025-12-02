import { BlurFade } from "@/components/ui/blur-fade";

export default function TableCard({ table, i }: { table: any; i: number }) {
  return (
    <BlurFade delay={0.3 + i * 0.05}>
      <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{table.name}</h3>
          <span className="text-xs px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">{table.type}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{table.description}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {table.fields} campos
          </span>
        </div>
      </div>
    </BlurFade>
  );
}
