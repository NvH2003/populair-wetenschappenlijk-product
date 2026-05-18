import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'
import { H3_PERSONAL_ACCEPTANCE } from '../../data/studyResults'

const { threeWay, pairwise } = H3_PERSONAL_ACCEPTANCE

export default function Step08_ResultInjunctief({ onReady }) {
  const script = [
    {
      id: 'result',
      daan: 'De derde hypothese: supporters met een injunctieve normboodschap zouden een lagere persoonlijke acceptatie van vuurwerk rapporteren dan supporters met een descriptieve normboodschap. Er was geen statistisch significant verschil. Hypothese 3 werd verworpen.',
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
      daan: `De ${threeWay.test} over alle drie condities liet al geen significant verschil zien, ${threeWay.f}, p = ${threeWay.p}. Aanvullend een ${pairwise.test} met alleen de ${pairwise.conditions}, met ${pairwise.covariates} als covariaten: ${pairwise.f}, p = ${pairwise.p}.`,
      condition: { ref: 'ask-numbers', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'end',
      daan: 'Door naar hypothese 4: identificatie met de harde kern.',
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
          Resultaat · hypothese 3
        </p>
        <h2 className="text-3xl font-extrabold">Injunctief vs. descriptief</h2>
      </motion.div>

      <DaanChat script={script} onComplete={onReady} />
    </motion.div>
  )
}
