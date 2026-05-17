import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'
import { H1_PERSONAL_ACCEPTANCE } from '../../data/studyResults'

const { main } = H1_PERSONAL_ACCEPTANCE

export default function Step06_ResultSanctie({ onReady }) {
  const script = [
    {
      id: 'result',
      daan: 'De eerste hypothese: normboodschappen zouden tot lagere persoonlijke acceptatie van vuurwerk leiden dan een sanctionerende boodschap. Alle drie boodschapcondities werden met elkaar vergeleken, met leeftijd en opleidingsniveau meegenomen. Er was geen statistisch significant verschil. Hypothese 1 werd verworpen.',
    },
    {
      id: 'ask-numbers',
      daan: 'Wil je de cijfers erachter weten?',
      question: null,
      options: [
        { label: 'Ja, laat de cijfers zien', value: 'yes' },
        { label: 'Nee, verder', value: 'no' },
      ],
    },
    {
      id: 'numbers-main',
      daan: `${main.test} op ${main.dv}, met ${main.covariates} als covariaten: ${main.f}, p = ${main.p}. Geen significant verschil tussen de drie condities. Hieronder de gemiddelden per conditie.`,
      condition: { ref: 'ask-numbers', value: 'yes' },
    },
    {
      id: 'numbers-chart',
      chartKey: 'h1',
      chartOnly: true,
      condition: { ref: 'ask-numbers', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'end',
      daan: 'Door naar de tweede hypothese. Die gaat over waargenomen sociale acceptatie van vuurwerk in het stadion.',
      isEnd: true,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-3xl mx-auto"
    >
      <motion.div className="mb-5">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Resultaat · hypothese 1
        </p>
        <h2 className="text-3xl font-extrabold mb-1">Persoonlijke acceptatie</h2>
        <p className="text-slate-400 text-sm">
          Vergelijking van alle drie boodschapcondities (ANCOVA)
        </p>
      </motion.div>

      <DaanChat script={script} onComplete={onReady} />
    </motion.div>
  )
}
