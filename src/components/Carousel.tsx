"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Carousel({ title, slides }: { title: string; slides: React.ReactNode[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all duration-500 hover:shadow-xl group">
        <div className="bg-slate-800 dark:bg-black p-4 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
          <span className="opacity-80">Vista Previa</span>
          <span className="bg-blue-600 px-2 py-1 rounded text-white">{title}</span>
        </div>
        
        <div className="relative overflow-hidden bg-slate-900/5 dark:bg-black aspect-video flex items-center justify-center group/view cursor-pointer" onClick={() => setIsFullscreen(true)}>
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0 group-hover/view:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
            <span className="bg-black/80 text-white flex items-center gap-2 px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl backdrop-blur-md transform scale-95 group-hover/view:scale-100 transition-transform">
              <Maximize2 className="w-4 h-4" /> Ampliar
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center p-2 sm:p-4"
            >
              {slides[currentIndex]}
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800/90 backdrop-blur-md p-2 rounded-full transition-all z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800/90 backdrop-blur-md p-2 rounded-full transition-all z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentIndex ? "bg-white w-3" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 p-4 sm:p-8 md:p-12 cursor-zoom-out backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="w-full h-full max-w-[1400px] mx-auto flex items-center justify-center relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }} 
                className="fixed top-4 right-4 sm:top-8 sm:right-8 p-3 bg-black/50 text-white/70 hover:text-red-400 hover:bg-black/80 z-[110] rounded-full transition-all backdrop-blur-md"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center [&>img]:object-contain [&>img]:w-full [&>img]:max-h-full [&>img]:bg-transparent [&>img]:border-none [&>img]:p-0" onClick={(e) => e.stopPropagation()}>
                {slides[currentIndex]}
              </div>
            </div>

            {slides.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="fixed left-4 sm:left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-black/30 hover:bg-black/70 p-3 sm:p-5 rounded-full transition-all z-[110] backdrop-blur-md"
                >
                  <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
                </button>
                <button
                  onClick={next}
                  className="fixed right-4 sm:right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-black/30 hover:bg-black/70 p-3 sm:p-5 rounded-full transition-all z-[110] backdrop-blur-md"
                >
                  <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
                </button>
                
                <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-[110] bg-black/60 px-6 py-3 rounded-full backdrop-blur-md shadow-2xl border border-white/10">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 rounded-full transition-all ${
                        i === currentIndex ? "bg-blue-400 w-8" : "bg-white/30 w-2.5 cursor-pointer hover:bg-white/60"
                      }`}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
