import { motion, AnimatePresence } from 'framer-motion'
import { daanPhoto } from '../assets/images'

// ─── Talking-indicator (three animated dots) ──────────────────────────────────
function TalkingDots() {
  return (
    <span className="inline-flex items-end gap-[3px] ml-1 mb-0.5">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-current"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

// ─── Photo avatar with optional talking animation ─────────────────────────────
function DaanPhoto({ speaking, type }) {
  const ringColors = {
    huidig: 'ring-slate-400',
    verwacht: 'ring-gray-300',
    werkelijk: 'ring-orange-400',
    toekomst: 'ring-green-400',
  }
  const ring = ringColors[type] || ringColors.huidig

  return (
    <div className="relative shrink-0">
      <motion.div
        animate={speaking ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className={`w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-transparent ${ring} shadow-lg`}
      >
        <img
          src={daanPhoto}
          alt="Daan"
          className={`w-full h-full object-cover object-top transition-all duration-500 ${
            type === 'verwacht' ? 'grayscale opacity-60' : ''
          }`}
        />
      </motion.div>
    </motion.div>
  )
}

// ─── Config per type ──────────────────────────────────────────────────────────
const config = {
  verwacht: {
    label: 'Wat we verwachtten',
    sublabel: 'Hypothese',
    bubble: 'bg-white border border-gray-200 text-gray-700',
    wrapper: 'bg-gray-50 border border-gray-200',
    labelColor: 'text-gray-500',
  },
  werkelijk: {
    label: 'Wat het onderzoek liet zien',
    sublabel: 'Resultaat',
    bubble: 'bg-orange-50 border border-orange-200 text-gray-800',
    wrapper: 'bg-orange-50 border border-orange-200',
    labelColor: 'text-orange-600',
  },
  huidig: {
    label: 'Daan',
    sublabel: 'Harde-kern supporter',
    bubble: 'bg-slate-700 border border-slate-600 text-slate-100',
    wrapper: 'bg-slate-800 border border-slate-700',
    labelColor: 'text-orange-400',
  },
  toekomst: {
    label: 'Wat dit voor Daan betekent',
    sublabel: 'Implicatie',
    bubble: 'bg-green-50 border border-green-200 text-gray-800',
    wrapper: 'bg-green-50 border border-green-200',
    labelColor: 'text-green-700',
  },
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Daan({ type = 'huidig', text, speaking = true, className = '' }) {
  const v = config[type] || config.huidig

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl ${v.wrapper} p-4 ${className}`}
      >
        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <DaanPhoto speaking={speaking} type={type} />
          <div className="min-w-0">
            <p className={`font-semibold text-sm leading-tight ${v.labelColor}`}>
              {v.label}
            </p>
            <p className="text-xs text-gray-400 leading-tight mt-0.5">
              {v.sublabel}
            </p>
          </div>
        </div>

        {/* Speech bubble */}
        <div className={`rounded-2xl rounded-tl-sm ${v.bubble} px-5 py-4 relative`}>
          {/* Bubble tail pointing at avatar */}
          <div
            className={`absolute -top-2 left-5 w-4 h-4 rotate-45 ${v.bubble} border-l-0 border-b-0`}
            style={{ borderRadius: '0 0 0 4px' }}
          />
          <p className="text-sm leading-relaxed relative z-10">
            <span className="italic">&ldquo;{text}&rdquo;</span>
            {speaking && <TalkingDots />}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
