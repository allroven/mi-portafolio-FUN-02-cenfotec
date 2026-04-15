import { Calculator } from "lucide-react";

export function Header({
  activeWeek,
  setActiveWeek,
}: {
  activeWeek: number;
  setActiveWeek: (week: number) => void;
}) {
  const weeks = [5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm mb-12 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-700/10 p-2.5 rounded-xl border border-blue-700/20 text-blue-700">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-none">
              Universidad CENFOTEC
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              Allan Rodriguez Venegas
            </p>
          </div>
        </div>

        <nav className="flex space-x-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700/50">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 tracking-wider uppercase ${
                activeWeek === week
                  ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
              }`}
            >
              Semana {week}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
