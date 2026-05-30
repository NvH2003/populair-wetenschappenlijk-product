import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'
import { capitalizeSentenceStarts } from '../../utils/capitalizeSentenceStarts'

// ─── Takeaway-puzzle ───────────────────────────────────────────────────────

/**
 * Zinnen waaruit de takeaway is opgebouwd.
 * correct: true  → hoort bij de echte takeaway
 * correct: false → lijkt erop, maar klopt inhoudelijk niet
 */
const SENTENCES = [
  {
    id: 't1',
    text: 'Normboodschappen zijn niet beter dan sancties in het verlagen van de acceptatie van vuurwerk.',
    correct: true,
  },
  {
    id: 't2',
    text: 'Supporters die zich sterk identificeren met de harde kern accepteren vuurwerk meer, ongeacht welke boodschap ze zagen.',
    correct: true,
  },
  {
    id: 't3',
    text: 'Clubs moeten niet alleen kijken naar welke boodschap ze sturen, maar ook naar wie ze met de boodschap aanspreken en wie de boodschap brengt.',
    correct: true,
  },
  {
    id: 'd1',
    text: 'Afkeuringsboodschappen werken beter dan feitenboodschappen bij fanatieke supporters.',
    correct: false,
  },
  {
    id: 'd2',
    text: 'Hoe vaker je een boodschap herhaalt, hoe minder vuurwerk supporters accepteren.',
    correct: false,
  },
  {
    id: 'd3',
    text: 'Supporters die zich minder identificeren met de harde kern accepteren vuurwerk meer dan de harde kern zelf.',
    correct: false,
  },
  {
    id: 'd4',
    text: 'Sanctionerende boodschappen roepen zoveel weerstand op dat ze het slechtst werken van de drie.',
    correct: false,
  },
]

// Shuffle deterministisch genoeg voor een vaste maar gemixte volgorde
const SHUFFLED = [...SENTENCES].sort((a, b) =>
  (a.id + b.id).charCodeAt(1) % 2 === 0 ? 1 : -1,
)

const CORRECT_IDS = new Set(SENTENCES.filter(s => s.correct).map(s => s.id))

/** Volledige takeaway als lopende tekst; Daan spreekt dit na controle uit */
const TAKEAWAY_OVERVIEW = `Normboodschappen werken niet beter dan sancties. Wel maakt het uit hoe sterk iemand zich met de harde kern verbindt. Clubs moeten dus ook kijken naar wie ze met de boodschap aanspreken en wie de boodschap brengt.`

const TAKEAWAY_OVERVIEW_SCRIPT = [
  {
    id: 'overview',
    daan: TAKEAWAY_OVERVIEW,
    waitForContinue: true,
  },
]

function TakeawayPuzzle({ onComplete }) {
  const [selected, setSelected] = useState(new Set())
  const [checked, setChecked] = useState(false)

  const correctSelected = [...selected].filter(id => CORRECT_IDS.has(id)).length
  const wrongSelected = [...selected].filter(id => !CORRECT_IDS.has(id)).length
  const allCorrectPicked = correctSelected === CORRECT_IDS.size && wrongSelected === 0

  function toggle(id) {
    if (checked) return
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function check() {
    setChecked(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-4"
    >
      <p className="text-slate-300 text-sm leading-relaxed">
        Selecteer de zinnen die <span className="text-white font-semibold">bij de takeaway passen</span>.
        Meerdere zinnen zijn correct.
      </p>

      <div className="space-y-2">
        {SHUFFLED.map(item => {
          const isSelected = selected.has(item.id)
          const isCorrect = CORRECT_IDS.has(item.id)

          let stateClass = 'border-slate-600 bg-slate-800/80 hover:border-slate-500 hover:bg-slate-800'
          if (isSelected && !checked) stateClass = 'border-orange-500 bg-orange-500/10'
          if (checked && isSelected && isCorrect) stateClass = 'border-green-500 bg-green-900/30'
          if (checked && isSelected && !isCorrect) stateClass = 'border-red-500 bg-red-900/25'
          if (checked && !isSelected && isCorrect) stateClass = 'border-green-700/60 bg-green-950/20 opacity-70'

          return (
            <motion.button
              key={item.id}
              type="button"
              layout
              onClick={() => toggle(item.id)}
              disabled={checked}
              className={`w-full text-left rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors ${stateClass} disabled:cursor-default`}
            >
              <span className={
                checked
                  ? isCorrect
                    ? 'text-green-300'
                    : isSelected ? 'text-red-300' : 'text-slate-500'
                  : isSelected ? 'text-white' : 'text-slate-300'
              }>
                {capitalizeSentenceStarts(item.text)}
              </span>
              {checked && isSelected && (
                <span className={`ml-2 font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              )}
              {checked && !isSelected && isCorrect && (
                <span className="ml-2 text-green-600 font-bold">✓</span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {!checked && selected.size > 0 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={check}
            className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors"
          >
            Controleer mijn keuze
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className={`rounded-xl px-4 py-3 border text-sm ${
              allCorrectPicked
                ? 'bg-green-900/25 border-green-700 text-green-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              {allCorrectPicked
                ? 'Precies goed.'
                : `${correctSelected} van de ${CORRECT_IDS.size} correct${wrongSelected > 0 ? `, ${wrongSelected} niet passend` : ''}.`
              }
            </div>

            <div className="pt-1">
              <DaanChat
                key="takeaway-overview"
                script={TAKEAWAY_OVERVIEW_SCRIPT}
                onComplete={onComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Script ────────────────────────────────────────────────────────────────

const introScript = [
  {
    id: 'open',
    daan: 'Stel de takeaway zelf samen.',
    waitForContinue: true,
  },
]

const outroScript = [
  {
    id: 'end',
    daan: "Bedankt dat je er was. Dit is mijn wereld, nu snap jij 'm een stukje beter. Dit is het einde van het verhaal.",
    isEnd: true,
  },
]

// ─── Component ─────────────────────────────────────────────────────────────

export default function Step12_Overview({ onReady }) {
  const [phase, setPhase] = useState('intro')

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Terugblik
        </p>
        <h2 className="text-3xl font-extrabold">Wat hebben we geleerd?</h2>
      </div>

      {phase === 'intro' && (
        <DaanChat script={introScript} onComplete={() => setPhase('puzzle')} />
      )}

      {phase === 'puzzle' && (
        <TakeawayPuzzle onComplete={() => setPhase('outro')} />
      )}

      {phase === 'outro' && (
        <DaanChat script={outroScript} onComplete={onReady} />
      )}
    </div>
  )
}
