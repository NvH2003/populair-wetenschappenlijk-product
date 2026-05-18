import { motion } from 'framer-motion'
import DaanChat from '../DaanChat'
import { H4_IDENTIFICATION } from '../../data/studyResults'

const h4 = H4_IDENTIFICATION
const { mainIdentification: idMain } = h4

export default function Step09_BigFinding({ onReady }) {
  const script = [
    {
      id: 'result',
      daan: 'De vierde hypothese: het effect van de boodschap op persoonlijke acceptatie zou minder sterk zijn bij hoge identificatie met de harde kern dan bij lage identificatie. Het interactie-effect was niet significant: het effect van de boodschap verschilt niet tussen lage en hoge identificatie. Hypothese 4 werd verworpen. Wel was er een sterk hoofdeffect van identificatie: hoe sterker je je met de harde kern identificeert, hoe hoger je persoonlijke acceptatie van vuurwerk, ongeacht welke boodschap je zag.',
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
      daan: `Met een ${h4.test} op ${h4.dv}, met ${h4.covariates} als covariaten, was er geen significant interactie-effect tussen boodschapconditie en identificatie met de harde kern (${h4.interaction.f}, p = ${h4.interaction.p}). Wel was er een significant hoofdeffect van identificatie (${idMain.f}, p ${idMain.p}): hoge identificatie M = ${idMain.high.m}, lage identificatie M = ${idMain.low.m}. Het hoofdeffect van de boodschapconditie was niet significant (${h4.mainMessage.f}, p = ${h4.mainMessage.p}).`,
      condition: { ref: 'ask-numbers', value: 'yes' },
    },
    {
      id: 'numbers-chart',
      chartKey: 'h4',
      chartOnly: true,
      condition: { ref: 'ask-numbers', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'end',
      daan: 'In de volgende stap laat ik je zelf voelen wat dat verschil betekent. Jij mag even sorteren.',
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
          Resultaat · hypothese 4
        </p>
        <h2 className="text-3xl font-extrabold">Identificatie met de harde kern</h2>
      </motion.div>

      <DaanChat script={script} onComplete={onReady} />
    </motion.div>
  )
}
