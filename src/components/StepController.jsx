import { motion, AnimatePresence } from 'framer-motion'

export default function StepController({ step, totalSteps = 12, canProceed, onNext, onBack, children }) {
  const progress = (step / totalSteps) * 100

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Progress bar */}
      <div className="shrink-0 px-6 pt-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            Stap {step} van {totalSteps}
          </span>
          <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full min-h-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="shrink-0 px-6 py-4 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <span>←</span> Terug
        </button>

        <AnimatePresence>
          {canProceed && step < totalSteps && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onNext}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
            >
              Volgende <span>→</span>
            </motion.button>
          )}
          {canProceed && step === totalSteps && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-slate-400 italic"
            >
              Einde van het verhaal
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
