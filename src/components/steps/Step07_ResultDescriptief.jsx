import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'
import { H2_SOCIAL_APPROVAL } from '../../data/studyResults'

const { main, subschalen } = H2_SOCIAL_APPROVAL

export default function Step07_ResultDescriptief({ onReady }) {
  const script = [
    {
      id: 'result',
      daan: 'De tweede hypothese ging over waargenomen sociale acceptatie: normboodschappen zouden tot lagere sociale acceptatie van vuurwerk in het stadion leiden dan een sanctionerende boodschap. Alle drie boodschapcondities werden met elkaar vergeleken, met leeftijd en opleidingsniveau meegenomen. Er was geen statistisch significant verschil. Hypothese 2 werd verworpen.',
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
      id: 'numbers',
      daan: `${main.test} op ${main.dv}, met ${main.covariates} als covariaten: ${main.f}, p = ${main.p}. Na factoranalyse ook op twee subschalen: ${subschalen[0].label}, ${subschalen[0].f}, p = ${subschalen[0].p}; ${subschalen[1].label}, ${subschalen[1].f}, p = ${subschalen[1].p}. Overal niet significant.`,
      condition: { ref: 'ask-numbers', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'end',
      daan: 'Door naar hypothese 3: injunctieve norm versus descriptieve norm op persoonlijke acceptatie.',
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
          Resultaat · hypothese 2
        </p>
        <h2 className="text-3xl font-extrabold">Waargenomen sociale acceptatie</h2>
      </motion.div>

      <DaanChat script={script} onComplete={onReady} />
    </motion.div>
  )
}
