import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'
import { ajaxIncident } from '../../assets/images'

const introScript = [
  {
    id: 'intro',
    daan: `Hoi, ik ben Daan, harde-kern supporter en ik zit al jaren week in, week uit op de tribune. Waar mijn club ook speelt, ik ben er!

Jij bent waarschijnlijk SLO of iemand die wil weten hoe clubs het beste met fanatieke supporters kunnen communiceren om incidenten te voorkomen. Goed dat je er bent!

Ik neem je mee door een onderzoek van Noa van Helvoirt over de invloed van communicatie op de acceptatie van vuurwerkgebruik in een voetbalstadion.

We bekijken samen wat er in het onderzoek werd verwacht en ik leg uit waarom. Daarna bekijken we de resultaten en de implicaties van het onderzoek. Misschien kun je er nog iets uit meenemen.

Jij bepaalt trouwens zelf hoe diep je erin duikt. Wil je vooral het grote verhaal, prima. Wil je bij details of cijfers even stilstaan, dan kan dat ook: waar het kan, kies je zelf.

Ik zal ook vragen stellen en jij mag dan antwoord geven. Ik ben ook benieuwd wat jij denkt. Ben je er klaar voor?`,
    question: null,
    options: [
      { label: 'Ja, laten we beginnen', value: 'yes' },
    ],
  },
  {
    id: 'start',
    daan: 'Mooi. Dan beginnen we met de eerste boodschap.',
    condition: { ref: 'intro', value: 'yes' },
    isEnd: true,
  },
]

export default function Step01_Incident({ onReady }) {
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
        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
          Ajax vs. FC Groningen, 2025
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
          Zes minuten.
          <br />
          <span className="text-orange-400">Toen was de wedstrijd voorbij.</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
          Fakkels, rook, vuurwerk op het veld. De scheidsrechter staakte de wedstrijd.
          Op welke manier kunnen we communiceren, zodat dit niet opnieuw gebeurt?
        </p>
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
            <DaanChat script={introScript} onComplete={onReady} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
