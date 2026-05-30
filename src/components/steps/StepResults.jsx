import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'

const script = [
  {
    id: 'result',
    daan: `Wat bleek uit het onderzoek? Het type boodschap maakte weinig uit. Er was geen duidelijk verschil in vuurwerkacceptatie.

Supporters die zich sterk met de harde kern identificeren, accepteren vuurwerk wel veel meer dan supporters die zich minder sterk met de harde kern identificeren. Dat gold ongeacht de boodschap op het scherm.`,
  },
  {
    id: 'ask-charts',
    daan: 'Wil je de gemiddelden even in een grafiek zien?',
    question: null,
    options: [
      { label: 'Ja, laat de grafieken zien', value: 'yes' },
      { label: 'Nee, verder', value: 'no' },
    ],
  },
  {
    id: 'chart1',
    chartKey: 'h1',
    chartOnly: true,
    condition: { ref: 'ask-charts', value: 'yes' },
    waitForContinue: true,
    continueLabel: 'Volgende grafiek',
  },
  {
    id: 'chart2-intro',
    daan: 'Dit is het echte verschil.',
    condition: { ref: 'ask-charts', value: 'yes' },
  },
  {
    id: 'chart2',
    chartKey: 'h4',
    chartOnly: true,
    condition: { ref: 'ask-charts', value: 'yes' },
    waitForContinue: true,
    continueLabel: 'Verder',
  },
]

export default function StepResults({ onReady }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-3xl mx-auto"
    >
      <motion.div className="mb-5">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Resultaten
        </p>
        <h2 className="text-3xl font-extrabold">Wat bleek uit het onderzoek?</h2>
      </motion.div>

      <DaanChat script={script} onComplete={onReady} />
    </motion.div>
  )
}
