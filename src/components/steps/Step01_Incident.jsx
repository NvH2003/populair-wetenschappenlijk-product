import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'
import { ajaxIncident } from '../../assets/images'

const introScript = [
  {
    id: 'intro',
    daan: `Hoi, ik ben Daan. Harde-kern supporter. Als mijn club speelt, zit ik op de tribune.

Op die foto zie je waar we het over hebben: de wedstrijd tussen Ajax en FC Groningen werd na zes minuten gestaakt, omdat er vuurwerk op het veld terechtkwam en de spelers niet meer veilig waren.

Jij bent SLO. Jij zoekt manieren om zulke momenten te voorkomen. Meestal zien clubs één route: verboden, regels en straffen op het scherm. Begrijpelijk. Alleen lost het het probleem in de praktijk nog niet structureel op.

De onderzoeker wilde weten of een andere aanpak wél verschil maakt: boodschappen over wat andere supporters doen of afkeuren, in plaats van dreigen. Daar draaide haar onderzoek om.

De vraag die centraal stond luidde: In hoeverre dragen sociale norminterventies bij aan het ontmoedigen van vuurwerkgebruik door voetbalsupporters in Nederlandse voetbalstadions, in vergelijking met sanctionerende communicatie?

Ik loop met je door het onderzoek heen. Jij bepaalt zelf hoe diep je erin duikt. En let op, want ik ga je ook een aantal vragen stellen. Zullen we beginnen?`,
    question: null,
    options: [
      { label: 'Ja, laten we beginnen', value: 'yes' },
    ],
  },
]

export default function Step01_Incident({ onComplete }) {
  const [showDaan, setShowDaan] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-4xl mx-auto overflow-y-auto"
    >
      <div className="text-center mb-8">
        <motion.figure
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700">
            <img
              src={ajaxIncident}
              alt="Ajax-stadion met rook en het scherm: Het afsteken van vuurwerk is verboden"
              className="w-full h-auto max-h-72 object-cover object-center"
            />
          </div>
          <figcaption className="text-slate-500 text-xs mt-2">
            Bron: Ajax Life.
          </figcaption>
        </motion.figure>
      </div>

      <AnimatePresence mode="wait">
        {!showDaan ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-white text-xl sm:text-2xl font-bold text-center max-w-lg leading-snug">
              Hoe zorg je dat dit niet meer gebeurt?
            </p>
            <motion.button
              onClick={() => setShowDaan(true)}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-base px-8 py-3.5 rounded-full transition-colors"
            >
              Ontmoet Daan →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="daan"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DaanChat script={introScript} onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
