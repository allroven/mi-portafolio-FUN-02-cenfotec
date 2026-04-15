"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { MathCard } from "@/components/MathCard";
import { Carousel } from "@/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code2 } from "lucide-react";

// Placerholders for missing images to maintain premium aesthetic
const ImgPlaceholder = ({ text, sub }: { text: string; sub: string }) => (
  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-900/50 to-slate-900 flex flex-col items-center justify-center border border-white/10 shadow-inner">
    <Code2 className="w-12 h-12 text-blue-400 mb-4 opacity-50" />
    <h3 className="text-white font-bold tracking-widest uppercase">{text}</h3>
    <p className="text-blue-200/50 text-xs mt-2 math-font">{sub}</p>
  </div>
);

const Fraction = ({ num, den }: { num: React.ReactNode; den: React.ReactNode }) => (
  <span className="inline-flex flex-col items-center justify-center align-middle mx-1 gap-[2px]">
    <span className="border-b-[1.5px] border-slate-700 dark:border-slate-300 w-full text-center pb-[2px] leading-none whitespace-nowrap text-[0.9em]">{num}</span>
    <span className="text-center pt-[2px] leading-none whitespace-nowrap text-[0.9em]">{den}</span>
  </span>
);

export default function Home() {
  const [activeWeek, setActiveWeek] = useState(5);

  const expressions = [
    {
      expr: "4a²b - 2b³",
      sub: "a = -1, b = 2",
      res: "-8",
      steps: [
        "Sustituyendo: 4(-1)²(2) - 2(2)³",
        "Potencias: 4(1)(2) - 2(8)",
        "Multiplicando: 8 - 16",
      ]
    },
    {
      expr: "R(x) = (x³ + 5) / (x - 2)",
      sub: "x = 4",
      res: "34.5",
      steps: [
        "Sustituyendo: (4³ + 5) / (4 - 2)",
        "Potencias: (64 + 5) / 2",
        "Sumando: 69 / 2"
      ]
    }
  ];

  const aiMirrorData = [
    { q: "Cuando observo una expresión algebraica (un polinomio) ¿Logro comprender lo que representan los números, las letras y las operaciones?", a: "5" },
    { q: "Identificación de Estructuras: Al ver una expresión larga como 4x³ - 2x + 1, ¿logro identificar rápidamente cuál es el coeficiente principal y cuál es el grado?", a: "Identifico la estructura" },
    { q: "Leyes de Potencias: ¿Tengo clara la regla de sumar exponentes al multiplicar variables vs restarlos al dividir?", a: "A veces los confundo" },
    { q: "Semejanza de Términos: ¿Entiendo que solo puedo sumar 'peras con peras' (términos semejantes)?", a: "Sí, totalmente claro" },
    { q: "Visualización de Productos Notables: Cuando veo (a+b)², ¿recuerdo aplicar la fórmula completa del trinomio?", a: "Recuerdo el término del medio (2ab)" },
    { q: "Abstracción de la Factorización: ¿Comprendo que 'factorizar' es simplemente reescribir una suma como una multiplicación?", a: "Entiendo el concepto" },
    { q: "Conexión con Programación: ¿Logro identificar cómo el concepto de 'Variable' en álgebra es el fundamento de las variables en código?", a: "5" },
  ];

  const exercisesW6P1 = [
    { expr: "8mp⁴ - p", sub: "m=3, p=-2", res: "386", steps: ["Sustitución: 8(3)(-2)⁴ - (-2)", "Potencia: 8(3)(16) + 2", "Multiplicación: 24(16) + 2", "Suma: 384 + 2 = 386", "Validado ✓"] },
    { expr: "3a² - 2b + c", sub: "a=2, b=5, c=4", res: "6", steps: ["Sustitución: 3(2)² - 2(5) + 4", "Potencia: 3(4) - 10 + 4", "Suma: 12 - 10 + 4 = 6", "Validado ✓"] },
    { expr: "4x - 2y² + z", sub: "x=-3, y=-2, z=5", res: "-15", steps: ["Sustitución: 4(-3) - 2(-2)² + 5", "Potencia: -12 - 2(4) + 5", "Suma: -12 - 8 + 5 = -15", "Validado ✓"] },
    { expr: "a² - 2b(c - d)", sub: "a=-3, b=2, c=1, d=-1", res: "1", steps: ["Sustitución: (-3)² - 2(2)(1 - -1)", "Paréntesis: 9 - 4(1 + 1)", "Suma: 9 - 4(2) = 1", "Validado ✓"] },
  ];

  const exercisesW6P2 = [
    { expr: "(x⁴ - 2x³ + 5x + 8) + (6x⁴ - 9x³ - 7x² + 1)", sub: "Suma", res: "7x⁴ - 11x³ - 7x² + 5x + 9", steps: ["Agrupar y sumar términos semejantes"] },
    { expr: "(9x⁴ - 2x³ + 5x + 12) - (6x⁴ + 9x³ - 2x² + 1)", sub: "Resta", res: "3x⁴ - 11x³ + 2x² + 5x + 11", steps: ["Invertir signos del sustraendo y sumar", "(9x⁴ - 6x⁴) + (-2x³ - 9x³) + ..."] },
    { expr: "(3x + y)(2x - 5y)", sub: "Producto", res: "6x² - 13xy - 5y²", steps: ["Distribuir términos: 6x² - 15xy + 2xy - 5y²", "*Nota: el pdf original indicaba +5y², corregido a negativo"] },
    { expr: "(2x - 5y)²", sub: "Cuadrado de Binomio", res: "4x² - 20xy + 25y²", steps: ["Fórmula de Binomio: (a - b)² = a² - 2ab + b²", "(2x)² - 2(2x)(5y) + (-5y)²"] },
  ];

  const exercisesW7Formula = [
    { expr: "8a² - 12a + 4", sub: "Fórmula General", res: "4(a-1)(2a-1)", steps: ["a=8, b=-12, c=4, Δ=16", "Raíces a=(12±4)/16 -> 1, 1/2", "8(a-1)(a-1/2) = 4(a-1)(2a-1)"] },
    { expr: "5m² - 3m", sub: "Fórmula General", res: "m(5m-3)", steps: ["a=5, b=-3, c=0, Δ=9", "Raíces m=(3±3)/10 -> 3/5, 0", "5(m-3/5)(m-0) = m(5m-3)"] },
    { expr: "6r² - r", sub: "Fórmula General", res: "r(6r-1)", steps: ["a=6, b=-1, c=0, Δ=1", "Raíces r=(1±1)/12 -> 1/6, 0", "6(r-1/6)(r-0) = r(6r-1)"] },
  ];

  const exercisesW7Factorizacion = [
    { expr: "-8x³ + 4x² - 16x", sub: "Factor Común", res: "-4x(2x² - x + 4)", steps: ["Extraer factor común -4x", "-4x(2x² - x + 4)"] },
    { expr: "x³ + 2x² + 3x + 6", sub: "Agrupación", res: "(x²+3)(x+2)", steps: ["Agrupar variables: x²(x + 2) + 3(x + 2)", "(x² + 3)(x + 2)"] },
    { expr: "4x² - 12x + 9", sub: "Trinomio Cuadrado Perfecto", res: "(2x-3)²", steps: ["Fórmula: a² - 2ab + b²", "(2x - 3)²"] },
    { expr: "9a² - 25b²", sub: "Diferencia de Cuadrados", res: "(3a-5b)(3a+5b)", steps: ["Fórmula: a² - b² = (a - b)(a + b)", "(3a - 5b)(3a + 5b)"] },
  ];

  const exercisesW8 = [
    {
      expr: <><Fraction num="3" den="2x+4" /> + <Fraction num="2x" den="x²-4" /></>,
      sub: "Suma de Fracciones",
      res: <Fraction num="7x - 6" den="2(x²-4)" />,
      steps: [
        "Factorizar denominadores: 2x+4 = 2(x+2), x²-4 = (x+2)(x-2)",
        "MCM = 2(x+2)(x-2)",
        "Num1: 3(x-2) = 3x - 6",
        "Num2: 2x(2) = 4x",
        <>Sumar: <Fraction num="3x - 6 + 4x" den="MCM" /></>,
        <>Resultado: <Fraction num="7x - 6" den="2(x²-4)" /></>
      ]
    },
    {
      expr: <><Fraction num="x²-1" den="x³" /> - <Fraction num="2x" den="x²+7" /></>,
      sub: "Resta de Fracciones",
      res: <Fraction num="-x⁴ + 6x² - 7" den="x³(x²+7)" />,
      steps: [
        "MCM = x³(x²+7)",
        "Num1: (x²-1)(x²+7) = x⁴+6x²-7",
        "Num2: -2x(x³) = -2x⁴",
        "Restar: x⁴+6x²-7 - 2x⁴",
        <>Resultado: <Fraction num="-x⁴ + 6x² - 7" den="x³(x²+7)" /></>
      ]
    },
    {
      expr: <><Fraction num="3x-1" den="x²-9" /> &nbsp;·&nbsp; <Fraction num="x+3" den="2x" /></>,
      sub: "Multiplicación de Fracciones",
      res: <Fraction num="3x-1" den="2x(x-3)" />,
      steps: [
        <>Factorizar y Expresar: <Fraction num="(3x-1)(x+3)" den="(x-3)(x+3)(2x)" /></>,
        "Cancelar factor común (x+3)",
        "Numerador resultante: (3x-1)",
        "Denominador resultante: 2x(x-3)"
      ]
    },
    {
      expr: <><Fraction num="x-4" den="x²-4" /> &nbsp;÷&nbsp; <Fraction num="x²-3x-4" den="x²+5x+6" /></>,
      sub: "División de Fracciones",
      res: <Fraction num="x+3" den="(x-2)(x+1)" />,
      steps: [
        <>Invertir divisor a multiplicación: &nbsp;·&nbsp; <Fraction num="x²+5x+6" den="x²-3x-4" /></>,
        <>Factorizar el primer término: <Fraction num="x-4" den="(x-2)(x+2)" /></>,
        <>Factorizar el segundo término: <Fraction num="(x+2)(x+3)" den="(x-4)(x+1)" /></>,
        "Cancelar los factores comunes: (x-4) y (x+2)",
        <>Resultado final: <Fraction num="x+3" den="(x-2)(x+1)" /></>
      ]
    },
  ];

  const exercisesW10Linear = [
    { expr: "3x - 7 = 2x + 5", sub: "Ec. Lineal", res: "x = 12", steps: ["Transponer: 3x - 2x = 5 + 7", "Simplificar: x = 12", "Validado ✓"] },
    { expr: "5(x+2) - 3 = 4(x-1) + 6", sub: "Ec. Lineal con Distribución", res: "x = -5", steps: ["Distribuir: 5x + 10 - 3 = 4x - 4 + 6", "Simplificar: 5x + 7 = 4x + 2", "Transponer: 5x - 4x = 2 - 7", "x = -5 ✓  (img original indicaba x=-9, corregido)"] },
    { expr: <><Fraction num="2x" den="x - 3" /> = 4</>, sub: "Ec. Fraccionaria (x ≠ 3)", res: "x = 6", steps: ["Multiplicar: 2x = 4(x - 3)", "Expandir: 2x = 4x - 12", "Transponer: 12 = 2x", "x = 6 ✓"] },
  ];

  const exercisesW10Quadratic = [
    { expr: "x² - 5x + 6 = 0", sub: "Cuadrática por Factorización", res: "S = {2, 3}", steps: ["Buscar factores de 6 que sumen -5: (-2) y (-3)", "(x - 2)(x - 3) = 0", "x = 2 ó x = 3", "S = {2, 3} ✓"] },
    { expr: "2x² + 3x - 2 = 0", sub: "Fact. por Agrupación", res: <><Fraction num="1" den="2" /> ó x = -2</>, steps: ["Descomponer 3x = 4x - x", "2x(x+2) - 1(x+2) = 0", "(2x-1)(x+2) = 0", "x = 1/2 ó x = -2 ✓"] },
    { expr: "x² - 6x + 9 = 0", sub: "Trinomio Cuadrado Perfecto", res: "S = {3}", steps: ["Reconocer patrón (a-b)²", "(x - 3)² = 0", "x = 3", "Raíz doble ✓"] },
  ];

  const exercisesW10AbsVal = [
    { expr: "|x - 5| = 8", sub: "Valor Absoluto", res: "S = {-3, 13}", steps: ["Caso 1: x - 5 = 8 → x = 13", "Caso 2: x - 5 = -8 → x = -3", "S = {-3, 13} ✓"] },
    { expr: "|2x + 3| = 11", sub: "Valor Absoluto", res: "S = {-7, 4}", steps: ["Caso 1: 2x + 3 = 11 → 2x = 8 → x = 4", "Caso 2: 2x + 3 = -11 → 2x = -14 → x = -7", "S = {-7, 4} ✓"] },
  ];

  const exercisesW10Radical = [
    { expr: "√(2x + 3) = 5", sub: "Ec. Radical", res: "x = 11", steps: ["Elevar al cuadrado: 2x + 3 = 25", "2x = 22", "x = 11", "Verificar: √(22+3) = √25 = 5 ✓"] },
    { expr: "√(x + 1) = x - 1", sub: "Ec. Radical (verificar extrañas)", res: "x = 3", steps: ["Elevar al cuadrado: x+1 = (x-1)²", "x+1 = x²-2x+1", "0 = x²-3x = x(x-3)", "x=0 → √1 = -1 (Falso ✗)", "x=3 → √4 = 2 (Verdadero ✓)", "Solución: x = 3"] },
  ];

  const exercisesW10Ineq = [
    { expr: "3x - 7 < 2x + 5", sub: "Inecuación Lineal", res: "]-∞, 12[", steps: ["Transponer: 3x - 2x < 5 + 7", "x < 12", "S = ]-∞, 12[ ✓"] },
    { expr: "x² - 5x + 6 > 0", sub: "Inecuación Cuadrática", res: "]-∞, 2[ ∪ ]3, ∞[", steps: ["Factorizar: (x-2)(x-3) > 0", "Valores críticos: x=2, x=3", "Analizar signos por intervalos", "Producto > 0 fuera del intervalo [2,3]", "S = ]-∞, 2[ ∪ ]3, ∞[ ✓"] },
    { expr: "x² - 4 ≤ 0", sub: "Inecuación Cuadrática", res: "[-2, 2]", steps: ["Factorizar (dif. cuadrados): (x-2)(x+2) ≤ 0", "Valores críticos: x = ±2", "Producto ≤ 0 entre -2 y 2 (inclusive)", "S = [-2, 2] ✓"] },
  ];

  const exercisesW10AbsIneq = [
    { expr: "|x - 3| < 5", sub: "Inecuación de Valor Absoluto", res: "]-2, 8[", steps: ["-5 < x - 3 < 5", "Sumar 3: -2 < x < 8", "S = ]-2, 8[ ✓"] },
    { expr: "|2x + 1| ≥ 7", sub: "Inecuación de Valor Absoluto", res: "]-∞, -4] ∪ [3, ∞[", steps: ["Caso 1: 2x+1 ≥ 7 → x ≥ 3", "Caso 2: 2x+1 ≤ -7 → x ≤ -4", "S = ]-∞,-4] ∪ [3,∞[ ✓"] },
  ];

  return (
    <>
      <Header activeWeek={activeWeek} setActiveWeek={setActiveWeek} />

      <main className="max-w-5xl mx-auto px-6 py-6 min-h-screen flex-1 w-full">
        <AnimatePresence mode="wait">
          {activeWeek === 5 ? (
            <motion.div
              key="week-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Expresiones Algebraicas</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                {/* SECCIÓN 1: Interacción con DiálogoX */}
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Carousel
                      title="Q1: Lógica de Variables"
                      slides={[
                        <img key="1" src="/img/s5-q1-1.png" alt="Captura Q1-1" className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10" />,
                        <img key="2" src="/img/s5-q1-2.png" alt="Captura Q1-2" className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10" />
                      ]}
                    />
                    <Carousel
                      title="Q2: Contexto (3a + 4ab)"
                      slides={[
                        <img key="1" src="/img/s5-q2-1.png" alt="Captura Q2-1" className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10" />,
                        <img key="2" src="/img/s5-q2-2.png" alt="Captura Q2-2" className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10" />
                      ]}
                    />
                  </div>
                </section>

                {/* SECCIÓN 2: Ejercicios Prácticos */}
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BookOpen className="w-64 h-64" />
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-indigo-500 pl-4 mb-10 uppercase text-sm tracking-widest relative z-10 flex items-center">
                    2. Ejercicios Prácticos
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {expressions.map((item, idx) => (
                      <MathCard key={idx} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>
                </section>

                {/* SECCIÓN 3: Autoevaluación AI-Mirror */}
                <section className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-indigo-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-emerald-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-emerald-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-indigo-300">¿Qué pienso sobre resolver ejercicios de álgebra?</h4>
                        <p className="text-slate-300 leading-relaxed font-light">
                          Es entretenido y los considero útiles para la programación.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 6 ? (
            <motion.div
              key="week-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Expresiones Algebraicas (Continuación)</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                {/* SECCIÓN 1: Interacción con DiálogoX */}
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative">
                    <h4 className="font-bold text-lg mb-2 text-indigo-400">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-2">
                      "¿De qué manera didáctica puedo aprender a identificar las fórmulas notables?"
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Fórmulas Notables"
                        slides={[1, 2, 3, 4, 5].map(num => (
                          <img
                            key={num}
                            src={`/img/s6-q1-${num}.png`}
                            alt={`Captura ${num}`}
                            className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10"
                          />
                        ))}
                      />
                    </div>
                  </div>
                </section>

                {/* SECCIÓN 2: Ejercicios Prácticos */}
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BookOpen className="w-64 h-64" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-indigo-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos Vistos en Clase
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm relative z-10">
                    Resolución paso a paso de los ejercicios de clase, verificando correcciones y valores numéricos.
                  </p>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-8">1. Valor Numérico de Expresiones</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW6P1.map((item, idx) => (
                      <MathCard key={`w6p1-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-6">2. Operaciones con Polinomios</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {exercisesW6P2.map((item, idx) => (
                      <MathCard key={`w6p2-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>
                </section>

                {/* SECCIÓN 3: Autoevaluación AI-Mirror */}
                <section className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-indigo-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-emerald-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-emerald-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-sm font-bold mb-4 text-indigo-400 uppercase tracking-widest">Resumen de Autoevaluación AI-Mirror</h4>
                        <div className="space-y-3">
                          {aiMirrorData.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/50 p-4 rounded-lg border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-800/80">
                              <span className="text-indigo-100 text-sm font-medium leading-relaxed tracking-wide">
                                {item.q}
                              </span>
                              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1.5 flex-shrink-0 rounded-md text-xs font-bold uppercase tracking-wider text-center md:text-right border border-indigo-500/30">
                                {item.a}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-indigo-500/20 pt-8 mt-4">
                          <h4 className="text-sm font-bold mb-4 text-emerald-400 uppercase tracking-widest">Evidencia DiálogoX (Cubriendo Limitaciones)</h4>
                          <div className="rounded-xl border border-emerald-500/20 overflow-hidden hover:border-emerald-500/50 transition-colors">
                            <Carousel
                              title="Evidencia DiálogoX"
                              slides={[1, 2].map(num => (
                                <img
                                  key={num}
                                  src={`/img/evidencia-gema-${num}.png`}
                                  alt={`Evidencia ${num}`}
                                  className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10"
                                />
                              ))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 7 ? (
            <motion.div
              key="week-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Expresiones Algebraicas (Continuación)</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                {/* SECCIÓN 1: Interacción con DiálogoX */}
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-amber-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-amber-400 dark:border-t-amber-600">
                    <h4 className="font-bold text-lg mb-2 text-amber-500">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-amber-300 dark:border-amber-700 pl-4 py-2">
                      "¿Para qué procedimientos o conceptos de otros cursos (como cálculo diferencial e integral, álgebra lineal, métodos numéricos, física) se requiere aprender factorización de polinomios?"
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Factorización en el Futuro"
                        slides={[1, 2].map(num => (
                          <img
                            key={num}
                            src={`/img/s7-q1-${num}.png`}
                            alt={`Captura ${num}`}
                            className="w-full h-full object-contain bg-black/50 rounded-2xl p-2 border border-slate-200/10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-slate-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-xs font-bold uppercase tracking-widest">Sube tus fotos como s7-q1-${num}.png en /img/</p></div>`; }}
                          />
                        ))}
                      />
                    </div>
                  </div>
                </section>

                {/* SECCIÓN 2: Ejercicios Prácticos */}
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BookOpen className="w-64 h-64" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-amber-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos (Fórmula General y Factorización)
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm relative z-10">
                    Resolución paso a paso según las instrucciones de clase.
                  </p>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 relative z-10">A) Completar tabla (Fórmula General)</h4>
                  <div className="overflow-x-auto mb-10 relative z-10">
                    <table className="w-full bg-white dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 text-sm text-left">
                      <thead className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                        <tr>
                          <th className="p-3 border-b border-amber-100 dark:border-amber-800/30 tracking-wider">Polinomio</th>
                          <th className="p-3 border-b border-amber-100 dark:border-amber-800/30 tracking-wider text-center">a</th>
                          <th className="p-3 border-b border-amber-100 dark:border-amber-800/30 tracking-wider text-center">b</th>
                          <th className="p-3 border-b border-amber-100 dark:border-amber-800/30 tracking-wider text-center">c</th>
                          <th className="p-3 border-b border-amber-100 dark:border-amber-800/30 tracking-wider">Δ (Discriminante: b² - 4ac)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="p-3 font-semibold text-slate-700 dark:text-slate-200 math-font">3x² + 5x - 7</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">3</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">5</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">-7</td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 math-font">5² - 4(3)(-7) &nbsp;=&nbsp; <span className="font-bold text-emerald-500">109</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="p-3 font-semibold text-slate-700 dark:text-slate-200 math-font">-2x² + 4x + 1</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">-2</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">4</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">1</td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 math-font">4² - 4(-2)(1) &nbsp;=&nbsp; <span className="font-bold text-emerald-500">24</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="p-3 font-semibold text-slate-700 dark:text-slate-200 math-font">x² - 9</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">1</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">0</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-bold">-9</td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 math-font">0² - 4(1)(-9) &nbsp;=&nbsp; <span className="font-bold text-emerald-500">36</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 relative z-10">B) Factorización completa usando Fórmula General</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-10">
                    {exercisesW7Formula.map((item, idx) => (
                      <MathCard key={`w7p1-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 relative z-10">C) Factorización General (Varios Métodos)</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {exercisesW7Factorizacion.map((item, idx) => (
                      <MathCard key={`w7p2-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>
                </section>

                {/* SECCIÓN 3: Autoevaluación AI-Mirror */}
                <section className="bg-gradient-to-br from-amber-900 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-amber-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-amber-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-amber-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-amber-300">¿Cuál de los métodos de factorización entiendo con más facilidad y cuál se me hace más difícil?</h4>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="bg-amber-900/40 p-5 rounded-xl border border-amber-500/30 shadow-inner">
                            <p className="text-amber-100 font-medium italic mb-2 text-sm leading-relaxed whitespace-pre-line border-l-4 border-emerald-400 pl-4 py-1">
                              "Creo que el que más fácil lo veo o lo entiendo mejor es la Diferencia de Cuadrados y el más complicado Factorización por Agrupación."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 8 ? (
            <motion.div
              key="week-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500">Expresiones Algebraicas (Continuación)</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-fuchsia-500 to-purple-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                {/* SECCIÓN 1: Interacción con DiálogoX */}
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-fuchsia-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-fuchsia-400 dark:border-t-fuchsia-600">
                    <h4 className="font-bold text-lg mb-2 text-fuchsia-500">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-fuchsia-300 dark:border-fuchsia-700 pl-4 py-2">
                      "Ayúdame a crear un diagrama o esquema del paso a paso para simplificar expresiones algebraicas y que no olvide ningún detalle al realizar este tipo de ejercicios matemáticos."
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Esquema paso a paso"
                        slides={[1].map(num => (
                          <img
                            key={num}
                            src={`/img/s8-q1-${num}.jpg`}
                            alt={`Captura ${num}`}
                            className="w-full h-full object-contain bg-slate-900/50 rounded-2xl p-2 border border-slate-200/10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-slate-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-xs font-bold uppercase tracking-widest">Sube tus fotos como s8-q1-${num}.jpg en /img/</p></div>`; }}
                          />
                        ))}
                      />
                    </div>
                  </div>
                </section>

                {/* SECCIÓN 2: Ejercicios Prácticos */}
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BookOpen className="w-64 h-64" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-fuchsia-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos (Fracciones Algebraicas)
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm relative z-10">
                    Resolución paso a paso según las instrucciones de clase para suma, resta, producto y división.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-10">
                    {exercisesW8.map((item, idx) => (
                      <MathCard key={`w8p1-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>
                </section>

                {/* SECCIÓN 3: Autoevaluación AI-Mirror */}
                <section className="bg-gradient-to-br from-fuchsia-900/80 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-fuchsia-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-fuchsia-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-fuchsia-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-fuchsia-300">Después de ver la materia y de todo lo aprendido en este módulo, ¿Qué pienso sobre resolver ejercicios algebraicos? ¿Cambió mi perspectiva?</h4>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="bg-fuchsia-900/40 p-5 rounded-xl border border-fuchsia-500/30 shadow-inner">
                            <p className="text-fuchsia-100 font-medium italic mb-2 text-sm leading-relaxed whitespace-pre-line border-l-4 border-fuchsia-400 pl-4 py-1">
                              "Sí, cambió un poco. Recordé (después de bastante tiempo de no usar álgebra) que no es tan difícil y que lo importante es asimilar las reglas y seguir el proceso, que en la mayoría de los casos es un proceso mecánico."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 9 ? (
            <motion.div key="week-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-16">
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 5: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Semana 9</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-teal-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-teal-400 dark:border-t-teal-600 mb-8">
                    <h4 className="font-bold text-lg mb-2 text-teal-500">Pregunta 1 al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-teal-300 dark:border-teal-700 pl-4 py-2">
                       "¿Cuál es la diferencia entre una ecuación y un polinomio?"
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Ecuación vs Polinomio"
                        slides={[1, 2, 3, 4].map(num => (
                          <img
                            key={`q1-${num}`}
                            src={`/img/s9-q1-${num}.jpg`}
                            alt={`Captura Q1-${num}`}
                            className="w-full h-full object-contain bg-slate-900/50 rounded-2xl p-2 border border-slate-200/10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-slate-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-xs font-bold uppercase tracking-widest">Sube tus fotos como s9-q1-${num}.jpg en /img/</p></div>`; }}
                          />
                        ))}
                      />
                    </div>
                  </div>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-teal-400 dark:border-t-teal-600">
                    <h4 className="font-bold text-lg mb-2 text-teal-500">Pregunta 2 al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-teal-300 dark:border-teal-700 pl-4 py-2">
                       "¿Por qué razón matemática es que al aplicar reglas de despeje para resolver una ecuación lineal, se pasan términos al otro lado de la ecuación invirtiendo su operación, por ejemplo si un término suma pasa a restar y si un término multiplica pasa a dividir?"
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Segunda Pregunta"
                        slides={[1, 2, 3, 4, 5].map(num => (
                          <img
                            key={`q2-${num}`}
                            src={`/img/s9-q2-${num}.jpg`}
                            alt={`Captura Q2-${num}`}
                            className="w-full h-full object-contain bg-slate-900/50 rounded-2xl p-2 border border-slate-200/10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-slate-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-xs font-bold uppercase tracking-widest">Sube tus fotos como s9-q2-${num}.jpg en /img/</p></div>`; }}
                          />
                        ))}
                      />
                    </div>
                  </div>
                </section>
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><BookOpen className="w-64 h-64" /></div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-teal-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm relative z-10">
                    Infografía desarrollada en clase sobre Ecuaciones Lineales, siguiendo las instrucciones del PDF de la materia y de AI-Studio.
                  </p>
                  <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-teal-500/20 shadow-lg hover:border-teal-500/50 transition-colors">
                    <img
                      src="/img/Infografia%20Ecuaciones%20Lineales.jpeg"
                      alt="Infografía Ecuaciones Lineales"
                      className="w-full h-auto object-contain bg-white dark:bg-slate-900/50 rounded-2xl"
                    />
                  </div>
                </section>
                <section className="bg-gradient-to-br from-teal-900/80 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-teal-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-teal-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-teal-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <div className="space-y-4 mb-4">
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/30 border border-teal-400/50 flex items-center justify-center text-teal-300 font-bold text-xs">1</span>
                            <h4 className="text-base font-semibold text-teal-200 leading-relaxed">
                              En una escala del 1 al 5, donde 1 es lo más bajo y 5 lo más alto, ¿qué tan preparado o preparada me siento para traducir situaciones o problemas de contexto real en expresiones matemáticas para plantear una ecuación?
                            </h4>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/30 border border-teal-400/50 flex items-center justify-center text-teal-300 font-bold text-xs">2</span>
                            <h4 className="text-base font-semibold text-teal-200 leading-relaxed">
                              ¿Cómo puedo mejorar esta habilidad?
                            </h4>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-6">
                          {/* Score Badge */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 rounded-2xl px-5 py-3">
                              <span className="text-4xl font-black text-teal-300">4</span>
                              <div className="flex flex-col leading-tight">
                                <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">/ 5</span>
                                <span className="text-teal-200 text-xs">Mi preparación</span>
                              </div>
                            </div>
                            <p className="text-teal-100 text-sm leading-relaxed flex-1">
                              Un 4 confirma que mi cerebro ya tiene el &quot;cableado&quot; lógico estructurado gracias a la programación. Lo que experimento no es falta de lógica, sino <span className="text-emerald-300 font-semibold">sintaxis oxidada</span>.
                            </p>
                          </div>

                          {/* Strategy 1: Mapeo de Sintaxis */}
                          <div className="bg-teal-900/40 p-5 rounded-xl border border-teal-500/30">
                            <h5 className="text-emerald-300 font-bold mb-3 text-sm flex items-center gap-2">🌉 1. Crea tu &quot;Mapeo de Sintaxis&quot; (Código vs. Álgebra)</h5>
                            <div className="overflow-x-auto rounded-lg border border-teal-700/40">
                              <table className="w-full text-xs text-left">
                                <thead className="bg-teal-800/60 text-teal-200 uppercase tracking-wider">
                                  <tr>
                                    <th className="p-3 border-b border-teal-700/40">Programación</th>
                                    <th className="p-3 border-b border-teal-700/40">Álgebra</th>
                                    <th className="p-3 border-b border-teal-700/40">¿Para qué sirve?</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-teal-800/40 text-teal-100">
                                  <tr className="hover:bg-teal-800/20 transition-colors">
                                    <td className="p-3 font-mono text-teal-300">let x = ?;</td>
                                    <td className="p-3">Incógnitas (x, y, z)</td>
                                    <td className="p-3 text-teal-200/70">Guardar un valor desconocido que el sistema debe descubrir.</td>
                                  </tr>
                                  <tr className="hover:bg-teal-800/20 transition-colors">
                                    <td className="p-3 font-mono text-teal-300">Bloque / Expresión</td>
                                    <td className="p-3">Polinomio (3x² + 2x)</td>
                                    <td className="p-3 text-teal-200/70">Definir operaciones sin ejecutar una igualdad.</td>
                                  </tr>
                                  <tr className="hover:bg-teal-800/20 transition-colors">
                                    <td className="p-3 font-mono text-teal-300">Operador ==</td>
                                    <td className="p-3">Ecuación (3x + 5 = 20)</td>
                                    <td className="p-3 text-teal-200/70">Establecer una condición rígida que debe cumplirse.</td>
                                  </tr>
                                  <tr className="hover:bg-teal-800/20 transition-colors">
                                    <td className="p-3 font-mono text-teal-300">Refactorizar código</td>
                                    <td className="p-3">Factorización</td>
                                    <td className="p-3 text-teal-200/70">Hacer la expresión más eficiente sin cambiar su resultado.</td>
                                  </tr>
                                  <tr className="hover:bg-teal-800/20 transition-colors">
                                    <td className="p-3 font-mono text-teal-300">calcular(5)</td>
                                    <td className="p-3">Evaluar P(5)</td>
                                    <td className="p-3 text-teal-200/70">Reemplazar x por un número real para obtener un resultado.</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Strategy 2 */}
                          <div className="bg-teal-900/40 p-5 rounded-xl border border-teal-500/30">
                            <h5 className="text-emerald-300 font-bold mb-2 text-sm flex items-center gap-2">🛠️ 2. Ingeniería Inversa de Problemas</h5>
                            <p className="text-teal-100 text-sm leading-relaxed">
                              No empezar por la matemática, sino por el resultado. Tomar una fórmula de la vida diaria, escribirla en palabras, sustituir las partes variables por <span className="font-mono text-teal-300">x</span> o <span className="font-mono text-teal-300">y</span> y así crear mi propio modelo matemático.
                            </p>
                          </div>

                          {/* Strategy 3 */}
                          <div className="bg-teal-900/40 p-5 rounded-xl border border-teal-500/30">
                            <h5 className="text-emerald-300 font-bold mb-2 text-sm flex items-center gap-2">🧠 3. Identificar mis &quot;Puntos Ciegos&quot;</h5>
                            <ul className="text-teal-100 text-sm space-y-2 mt-2">
                              <li className="flex items-start gap-2">
                                <span className="text-teal-400 mt-0.5">▸</span>
                                <span><span className="font-semibold text-teal-200">Orden de restas:</span> &quot;La diferencia entre 10 y un número&quot; → <span className="font-mono text-teal-300">10 - x</span>, pero &quot;un número disminuido en 10&quot; → <span className="font-mono text-teal-300">x - 10</span>.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-teal-400 mt-0.5">▸</span>
                                <span><span className="font-semibold text-teal-200">Paréntesis ocultos:</span> &quot;El doble de la suma de dos números&quot; → <span className="font-mono text-teal-300">2(x + y)</span>, no <span className="font-mono text-teal-300">2x + y</span>.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 10 ? (
            <motion.div key="week-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-16">
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 5: <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Semana 10</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-rose-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-rose-400 dark:border-t-rose-600">
                    <h4 className="font-bold text-lg mb-2 text-rose-500">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-2">
                      &quot;¿Qué tipo de situaciones cotidianas o de contextos reales pueden ser representadas por medio de una ecuación cuadrática?&quot;
                    </p>
                    <div className="w-full">
                      <Carousel
                        title="DiálogoX: Ecuaciones Cuadráticas en la Vida Real"
                        slides={[1, 2, 3, 4].map(num => (
                          <img
                            key={`s10-q1-${num}`}
                            src={`/img/s10-q1-${num}.jpg`}
                            alt={`Captura Q1-${num}`}
                            className="w-full h-full object-contain bg-slate-900/50 rounded-2xl p-2 border border-slate-200/10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-slate-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-xs font-bold uppercase tracking-widest">Imagen s10-q1-${num}.jpg</p></div>`; }}
                          />
                        ))}
                      />
                    </div>
                  </div>
                </section>
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><BookOpen className="w-64 h-64" /></div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-rose-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm relative z-10">
                    A continuación se presentan diversos ejercicios para practicar. Las respuestas se incluyen para que pueda verificar su trabajo.
                  </p>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-6 relative z-10">A) Ecuaciones Lineales</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW10Linear.map((item, idx) => (
                      <MathCard key={`w10l-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-2 relative z-10">B) Ecuaciones Cuadráticas</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW10Quadratic.map((item, idx) => (
                      <MathCard key={`w10q-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-2 relative z-10">C) Ecuaciones de Valor Absoluto</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW10AbsVal.map((item, idx) => (
                      <MathCard key={`w10a-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-2 relative z-10">D) Ecuaciones con Radicales</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW10Radical.map((item, idx) => (
                      <MathCard key={`w10r-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-2 relative z-10">E) Inecuaciones</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-8">
                    {exercisesW10Ineq.map((item, idx) => (
                      <MathCard key={`w10i-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>

                  <h4 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs mb-4 mt-2 relative z-10">F) Inecuaciones de Valor Absoluto</h4>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {exercisesW10AbsIneq.map((item, idx) => (
                      <MathCard key={`w10ai-${idx}`} expression={item.expr} sub={item.sub} result={item.res} steps={item.steps} />
                    ))}
                  </div>
                </section>
                <section className="bg-gradient-to-br from-rose-900/80 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-rose-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-rose-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-rose-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-rose-300">Pregunta pendiente...</h4>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="bg-rose-900/40 p-5 rounded-xl border border-rose-500/30 shadow-inner">
                            <p className="text-rose-100 font-medium italic mb-2 text-sm leading-relaxed whitespace-pre-line border-l-4 border-pink-400 pl-4 py-1">"Respuesta pendiente..."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 11 ? (
            <motion.div key="week-11" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-16">
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 6: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Semana 11</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-emerald-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-emerald-400 dark:border-t-emerald-600">
                    <h4 className="font-bold text-lg mb-2 text-emerald-500">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-emerald-300 dark:border-emerald-700 pl-4 py-2">
                       "Pendiente..."
                    </p>
                  </div>
                </section>
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><BookOpen className="w-64 h-64" /></div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-emerald-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm relative z-10">Pendiente de agregar...</p>
                </section>
                <section className="bg-gradient-to-br from-emerald-900/80 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-emerald-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-emerald-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-emerald-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-emerald-300">Pregunta pendiente...</h4>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="bg-emerald-900/40 p-5 rounded-xl border border-emerald-500/30 shadow-inner">
                            <p className="text-emerald-100 font-medium italic mb-2 text-sm leading-relaxed whitespace-pre-line border-l-4 border-green-400 pl-4 py-1">"Respuesta pendiente..."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeWeek === 12 ? (
            <motion.div key="week-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-16">
              <header className="text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl" />
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 relative">
                  Módulo 6: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Semana 12</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-sky-500 to-indigo-500 mx-auto rounded-full"></div>
              </header>

              <div className="space-y-16">
                <section>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-sky-500 pl-4 mb-8 uppercase text-sm tracking-widest flex items-center">
                    1. Interacción con DiálogoX
                  </h3>
                  <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-sky-400 dark:border-t-sky-600">
                    <h4 className="font-bold text-lg mb-2 text-sky-500">Pregunta al AI Studio:</h4>
                    <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-6 border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-2">
                       "Pendiente..."
                    </p>
                  </div>
                </section>
                <section className="glass-panel p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><BookOpen className="w-64 h-64" /></div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 border-l-4 border-sky-500 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center">
                    2. Ejercicios Prácticos
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm relative z-10">Pendiente de agregar...</p>
                </section>
                <section className="bg-gradient-to-br from-sky-900/80 to-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-sky-500/20 text-white">
                  <div className="relative z-10">
                    <h3 className="font-bold border-l-4 border-sky-400 pl-4 mb-6 uppercase text-sm tracking-widest flex items-center text-sky-50">
                      3. Autoevaluación AI-Mirror
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold mb-3 text-sky-300">Pregunta pendiente...</h4>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="bg-sky-900/40 p-5 rounded-xl border border-sky-500/30 shadow-inner">
                            <p className="text-sky-100 font-medium italic mb-2 text-sm leading-relaxed whitespace-pre-line border-l-4 border-blue-400 pl-4 py-1">"Respuesta pendiente..."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`week-${activeWeek}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-sm rotate-12">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-2">
                Semana {activeWeek}: Próximamente
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Esta sección está siendo preparada para documentar los próximos aprendizajes del curso.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800/50 mt-12 py-12 text-center">
        <div className="max-w-6xl mx-auto px-6 italic opacity-60">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Allan Rodriguez Venegas <span className="mx-2 text-slate-600">|</span> Universidad CENFOTEC 2026
          </p>
        </div>
      </footer>
    </>
  );
}
