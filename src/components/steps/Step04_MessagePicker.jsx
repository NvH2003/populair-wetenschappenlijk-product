import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'
import { EXPECTATION_CITATIONS } from '../../data/expectationTheory'

const BOODSCHAPPEN = [
  {
    id: 'sanctie',
    label: '1',
    tekst: 'Vuurwerk afsteken in het stadion is verboden en kan leiden tot een stadionverbod en een geldboete voor betrokkenen.',
  },
  {
    id: 'descriptief',
    label: '2',
    tekst: 'Naar schatting 99% van de supporters bezoekt wedstrijden zonder vuurwerk te gebruiken in het stadion.',
  },
  {
    id: 'injunctief',
    label: '3',
    tekst: 'Naar schatting 64% van de supporters vindt dat wedstrijden vuurwerkvrij horen te zijn en keurt vuurwerkgebruik af.',
  },
]

const PHASES = [
  { id: 'sanctie', label: 'Boodschap 1', focus: 'sanctie' },
  { id: 'descriptief', label: 'Boodschap 2', focus: 'descriptief' },
  { id: 'injunctief', label: 'Boodschap 3', focus: 'injunctief' },
  { id: 'verwachting', label: 'Verwachting', focus: 'all' },
]

const SCRIPTS = {
  sanctie: [
    {
      id: 's1',
      focus: 'sanctie',
      daan: 'Denk je dat deze boodschap effectief is bij fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
  ],
  descriptief: [
    {
      id: 'd1',
      focus: 'descriptief',
      daan: 'Denk je dat deze boodschap effectief is bij fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
  ],
  injunctief: [
    {
      id: 'i1',
      focus: 'injunctief',
      daan: 'Denk je dat deze boodschap effectief is bij fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
  ],
  verwachting: [
    {
      id: 'expect-bridge',
      focus: 'all',
      daan: 'De verwachting was dat normboodschappen beter zouden werken dan dreigen met sancties en dat de manier van communiceren minder uitmaakt voor supporters die zich sterk identificeren met de harde kern.  Wil je weten waarom?',
      question: null,
      options: [
        { label: 'Ja, leg het uit', value: 'yes' },
        { label: 'Nee, naar de resultaten', value: 'no' },
      ],
    },
    {
      id: 'expect-theory',
      focus: 'all',
      citedSentences: EXPECTATION_CITATIONS,
      condition: { ref: 'expect-bridge', value: 'yes' },
    },
    {
      id: 'expect-hint',
      focus: 'all',
      daan: 'Ga met je muis over de zinnen als je de bronnen wilt zien.',
      condition: { ref: 'expect-bridge', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Naar de resultaten',
    },
  ],
}

const estimateByScriptId = {
  s1: 'sanctie',
  d1: 'descriptief',
  i1: 'injunctief',
}

function isHighlighted(focus, id) {
  if (!focus || focus === 'all') return true
  return focus === id
}

function ThreeScreens({ focus }) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {BOODSCHAPPEN.map(b => {
        const active = isHighlighted(focus, b.id)
        return (
          <motion.div
            key={b.id}
            layout
            animate={{
              opacity: active ? 1 : 0.35,
              scale: active && focus !== 'all' ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-3 text-center ${
              active && focus !== 'all'
                ? 'bg-yellow-400 ring-2 ring-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-yellow-400/40 ring-1 ring-yellow-600/30'
            }`}
          >
            <p className="text-[10px] font-bold text-yellow-900 uppercase tracking-widest mb-1.5">
              Boodschap {b.label}
            </p>
            <p
              className={`font-bold leading-snug ${
                active ? 'text-black text-xs' : 'text-yellow-950/70 text-[11px]'
              }`}
            >
              {b.tekst}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function PhaseProgress({ currentIndex }) {
  return (
    <motion.div className="flex gap-1.5 mb-6">
      {PHASES.map((p, i) => (
        <div
          key={p.id}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i < currentIndex ? 'bg-orange-500' : i === currentIndex ? 'bg-slate-400' : 'bg-slate-700'
          }`}
          title={p.label}
        />
      ))}
    </motion.div>
  )
}

export default function Step04_MessagePicker({ onReady, onEstimate }) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [focus, setFocus] = useState('all')
  const phase = PHASES[phaseIndex]

  useEffect(() => {
    setFocus(phase.focus)
  }, [phaseIndex, phase.focus])

  function goNextPhase() {
    if (phaseIndex < PHASES.length - 1) {
      setPhaseIndex(i => i + 1)
      setFocus(PHASES[phaseIndex + 1].focus)
    } else {
      onReady()
    }
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-4">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Het experiment
        </p>
        <h2 className="text-3xl font-extrabold mb-2">Drie boodschappen</h2>
        <p className="text-slate-300 text-sm">
          In het onderzoek kregen 395 supporters één van deze drie boodschappen te zien.
        </p>
      </div>

      <PhaseProgress currentIndex={phaseIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <ThreeScreens focus={focus} />

          <DaanChat
            key={phase.id}
            script={SCRIPTS[phase.id]}
            onComplete={goNextPhase}
            onItemFocus={setFocus}
            onChoice={(scriptId, value) => {
              const messageId = estimateByScriptId[scriptId]
              if (messageId) onEstimate?.(messageId, value)
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
