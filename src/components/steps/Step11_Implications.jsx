import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'
import { IMPLICATIONS_SCRIPT } from '../../data/policyImplications'

export default function Step11_Implications({ onReady }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-3xl mx-auto"
    >
      <div className="mb-5">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Beleidsimplicaties
        </p>
        <h2 className="text-3xl font-extrabold">Wat doe jij als SLO?</h2>
        <p className="text-slate-400 text-sm mt-1">
          Drie scenario's uit de praktijk
        </p>
      </div>

      <DaanChat script={IMPLICATIONS_SCRIPT} onComplete={onReady} />
    </motion.div>
  )
}
