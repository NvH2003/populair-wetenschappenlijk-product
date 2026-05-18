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
    text: 'Sociale normboodschappen zijn niet effectiever dan sanctionerende boodschappen in het verlagen van de acceptatie van vuurwerkgebruik.',
    correct: true,
  },
  {
    id: 't2',
    text: 'Identificatie met de harde kern hangt sterk samen met een hogere persoonlijke acceptatie van vuurwerkgebruik.',
    correct: true,
  },
  {
    id: 't3',
    text: 'Voetbalorganisaties moeten verder kijken dan losse boodschappen en meer rekening houden met groepsidentiteit, bron en referentiegroep.',
    correct: true,
  },
  {
    id: 'd1',
    text: 'Injunctieve normboodschappen zijn effectiever dan descriptieve normboodschappen bij fanatieke supporters.',
    correct: false,
  },
  {
    id: 'd2',
    text: 'Hoe vaker een boodschap wordt herhaald, hoe lager de acceptatie van vuurwerkgebruik wordt.',
    correct: false,
  },
  {
    id: 'd3',
    text: 'Supporters met lage identificatie met de harde kern accepteren vuurwerkgebruik meer dan supporters met hoge identificatie.',
    correct: false,
  },
  {
    id: 'd4',
    text: 'Sanctionerende boodschappen roepen meer weerstand op dan normboodschappen en zijn daardoor het minst effectief.',
    correct: false,
  },
]

// Shuffle deterministisch genoeg voor een vaste maar gemixte volgorde
const SHUFFLED = [...SENTENCES].sort((a, b) =>
  (a.id + b.id).charCodeAt(1) % 2 === 0 ? 1 : -1,
)

const CORRECT_IDS = new Set(SENTENCES.filter(s => s.correct).map(s => s.id))

/** Volledige takeaway als lopende tekst; Daan spreekt dit na controle uit */
const TAKEAWAY_OVERVIEW = `Uit het onderzoek blijkt dat sociale normboodschappen niet effectiever zijn dan sanctionerende boodschappen in het verlagen van de acceptatie van vuurwerkgebruik in voetbalstadions onder fanatieke voetbalsupporters. Tegelijkertijd laat het onderzoek zien dat identificatie met de harde kern sterk samenhangt met een hogere persoonlijke acceptatie, waardoor voetbalorganisaties verder moeten kijken dan losse boodschappen en meer rekening houden met groepsidentiteit, bron en referentiegroep.`

const TAKEAWAY_OVERVIEW_SCRIPT = [
  {
    id: 'bridge',
    daan: 'Dit is de takeaway in één keer, zoals het onderzoek die formuleert.',
  },
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
                ? 'Precies goed. Je hebt de drie kernonderdelen van de takeaway gevonden.'
                : `${correctSelected} van de ${CORRECT_IDS.size} correcte zinnen geselecteerd${wrongSelected > 0 ? `, ${wrongSelected} niet passend` : ''}. De groene zinnen vormen samen de takeaway.`
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
    daan: 'We zijn er bijna. Maar ik geef je de takeaway niet zomaar. Jij stelt hem zelf samen.',
    waitForContinue: true,
  },
]

const outroScript = [
  {
    id: 'end',
    daan: 'Bedankt dat je geluisterd hebt. Dit is mijn wereld en nu begrijp jij hem een stukje beter. Ik hoop dat je er iets aan hebt. Dit is het einde van het verhaal.',
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
