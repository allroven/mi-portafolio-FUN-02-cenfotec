export function MathCard({
  expression,
  sub,
  result,
  steps
}: {
  expression: React.ReactNode;
  sub?: string;
  result: React.ReactNode;
  steps?: React.ReactNode[];
}) {
  return (
    <div className="glass-panel p-5 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-emerald-500 transition-colors" />
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Evaluación {sub && <span className="text-blue-500 normal-case font-semibold tracking-normal ml-1">/ {sub}</span>}
        </h4>
      </div>
      <p className="math-font text-slate-800 dark:text-slate-200 font-semibold text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 text-center">
        {expression}
      </p>
      
      {steps && steps.length > 0 && (
        <div className="mt-4 mb-4 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-slate-200/50 dark:border-white/5">
          <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Procedimiento</h5>
          <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-400 math-font space-y-1.5 leading-relaxed tracking-tight break-all">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-3">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">
          Resultado
        </span>
        <div className="font-bold text-emerald-600 dark:text-emerald-400 text-lg math-font bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg text-center border border-emerald-100 dark:border-emerald-500/20 shadow-sm flex items-center justify-center space-x-2">
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
}
