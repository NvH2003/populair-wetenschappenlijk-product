import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'

// ─── Drie boodschappen + hypothese-scripts ────────────────────────────────────
const berichten = [
  {
    id: 'sanctie',
    scherm: 'Vuurwerk afsteken in het stadion is verboden en kan leiden tot een stadionverbod en een geldboete voor betrokkenen.',
    script: (isLast) => [
      {
        id: 'open',
        daan: "Oké. Kijk even naar dit bericht. Dit is de sanctieboodschap, dreigen met straf en regels.",
      },
      {
        id: 'q-expect',
        daan: "Wat verwacht jij dat dit doet met de acceptatie van vuurwerk bij een supporter zoals ik?",
        question: null,
        options: [
          { label: "Minder acceptatie, straf werkt", value: 'less' },
          { label: "Geen effect", value: 'none' },
          { label: "Meer verzet, averechts", value: 'more' },
        ],
      },
      {
        id: 'ack-less',
        daan: "Je denkt dat straf werkt. Dat is de intuïtieve gedachte van veel mensen.",
        condition: { ref: 'q-expect', value: 'less' },
      },
      {
        id: 'ack-none',
        daan: "Geen effect. Je hebt al twijfels over de kracht van sancties.",
        condition: { ref: 'q-expect', value: 'none' },
      },
      {
        id: 'ack-more',
        daan: "Averechts. Je verwacht reactantie, dat sluit precies aan bij de theorie achter H1.",
        condition: { ref: 'q-expect', value: 'more' },
      },
      {
        id: 'hyp',
        daan: "H1 was de hypothese: supporters die een sociale-normboodschap kregen, zouden vuurwerk minder accepteren dan de sanctiegroep. Minder dreigen, minder weerstand.",
      },
      {
        id: 'q-theory',
        daan: "Wil je de theorie achter H1 zien?",
        question: null,
        options: [
          { label: "Ja, vertel de theorie", value: 'yes' },
          { label: isLast ? "Nee, naar de resultaten" : "Nee, volgende boodschap", value: 'no' },
        ],
      },
      {
        id: 'theory',
        daan: "H1 is gebaseerd op Social Norms Theory: mensen reguleren gedrag op basis van groepsnormen. Een dreiging activeert psychologische reactantie, je keert je ertegen. Een normboodschap corrigeert misperceptie zonder weerstand op te roepen.",
        condition: { ref: 'q-theory', value: 'yes' },
      },
      {
        id: 'end',
        daan: isLast ? "Goed. Dan nu de resultaten." : "Goed. Verder met de volgende boodschap.",
        isEnd: true,
      },
    ],
  },
  {
    id: 'descriptief',
    scherm: 'Naar schatting 99% van de supporters bezoekt wedstrijden zonder vuurwerk te gebruiken in het stadion.',
    script: (isLast) => [
      {
        id: 'open',
        daan: "Dit is de descriptieve normboodschap. Geen dreigement, een feit over wat anderen doen.",
      },
      {
        id: 'q-expect',
        daan: "Wat verwacht jij dat dit doet? Als je weet dat 99% het niet doet, heeft dat invloed op jou?",
        question: null,
        options: [
          { label: "Ja, groepsgedrag beïnvloedt mij", value: 'yes' },
          { label: "Nee, ik trek mijn eigen plan", value: 'no' },
          { label: "Misschien, hangt ervan af", value: 'maybe' },
        ],
      },
      {
        id: 'ack-yes',
        daan: "Je denkt dat de groepsnorm werkt. Dat is precies het idee achter descriptieve normen.",
        condition: { ref: 'q-expect', value: 'yes' },
      },
      {
        id: 'ack-no',
        daan: "Je trekt je eigen plan. Interessant, dat heeft te maken met groepsidentificatie.",
        condition: { ref: 'q-expect', value: 'no' },
      },
      {
        id: 'ack-maybe',
        daan: "Contextafhankelijk. Dat klinkt realistisch en het sluit aan bij hoe identificatie een rol speelt.",
        condition: { ref: 'q-expect', value: 'maybe' },
      },
      {
        id: 'hyp',
        daan: "H2 was: supporters met een normboodschap zouden daarna denken dat anderen vuurwerk meer afkeuren, een verschuiving in hoe zij de groepsnorm percipiëren.",
      },
      {
        id: 'q-theory',
        daan: "Wil je de theorie achter H2 zien?",
        question: null,
        options: [
          { label: "Ja, vertel de theorie", value: 'yes' },
          { label: isLast ? "Nee, naar de resultaten" : "Nee, volgende boodschap", value: 'no' },
        ],
      },
      {
        id: 'theory',
        daan: "H2 bouwt op de misperception-these: mensen overschatten hoeveel anderen risicogedrag vertonen. Een descriptieve normboodschap corrigeert dat beeld. Als jij denkt dat 99% het niet doet, past je perceptie van de groepsnorm zich aan.",
        condition: { ref: 'q-theory', value: 'yes' },
      },
      {
        id: 'end',
        daan: isLast ? "Goed. Dan nu de resultaten." : "Goed. Eén boodschap over.",
        isEnd: true,
      },
    ],
  },
  {
    id: 'injunctief',
    scherm: 'Naar schatting 64% van de supporters vindt dat wedstrijden vuurwerkvrij horen te zijn en keurt vuurwerkgebruik af.',
    script: (isLast) => [
      {
        id: 'open',
        daan: "De derde boodschap. Nu niet wat mensen dóén, maar wat ze goedkeuren of afkeuren.",
      },
      {
        id: 'q-expect',
        daan: "Maakt het voor jou uit als 64% van je medesupporters vuurwerk afkeurt?",
        question: null,
        options: [
          { label: "Ja, dat raakt me", value: 'yes' },
          { label: "Nee, hun mening, mijn keuze", value: 'no' },
          { label: "Hangt af van wie dat zijn", value: 'depends' },
        ],
      },
      {
        id: 'ack-yes',
        daan: "Sociale afkeuring van je eigen groep doet iets. Dat is precies de kracht van injunctieve normen.",
        condition: { ref: 'q-expect', value: 'yes' },
      },
      {
        id: 'ack-no',
        daan: "Sterke autonomie. Dat zie je vaker bij hoge groepsidentificatie, de eigen groepsnorm weegt zwaarder dan externe afkeuring.",
        condition: { ref: 'q-expect', value: 'no' },
      },
      {
        id: 'ack-depends',
        daan: "Precies. Als die 64% mensen zijn waarmee jij je identificeert, weegt het zwaarder dan als het 'gewone' supporters zijn.",
        condition: { ref: 'q-expect', value: 'depends' },
      },
      {
        id: 'hyp',
        daan: "H3 was: de injunctieve normboodschap zou beter werken dan de descriptieve. Sociale afkeuring als sterkere motivator dan een gedragsfeit.",
      },
      {
        id: 'q-theory',
        daan: "Wil je de theorie achter H3 zien?",
        question: null,
        options: [
          { label: "Ja, vertel de theorie", value: 'yes' },
          { label: isLast ? "Nee, naar de resultaten" : "Nee, volgende boodschap", value: 'no' },
        ],
      },
      {
        id: 'theory',
        daan: "H3 is gebaseerd op onderzoek naar normsalience: wat anderen goedkeuren is prikkelbaarder dan wat ze doen. Afkeuring activeert sociale conformiteitsdruk. Descriptieve normen informeren, injunctieve normen raken de sociale identiteit.",
        condition: { ref: 'q-theory', value: 'yes' },
      },
      {
        id: 'end',
        daan: isLast ? "Goed. Nu neem ik je mee door de resultaten, boodschap voor boodschap." : "Goed. Eén boodschap over.",
        isEnd: true,
      },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Step05_Prediction({ onReady, onPredictions }) {
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(0)   // how many conversations completed

  const current = berichten[idx]
  const isLast = idx === berichten.length - 1

  function handleDone() {
    const newDone = done + 1
    setDone(newDone)
    if (isLast) {
      onPredictions?.({})   // predictions captured per-choice via onChoice in steps 6-8
      onReady()
    }
  }

  function goNext() {
    setIdx(i => i + 1)
  }

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-5">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Jouw verwachting
        </p>
        <h2 className="text-3xl font-extrabold mb-1">Wat denk jij?</h2>
        <p className="text-slate-400 text-sm">Boodschap {idx + 1} van {berichten.length}</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {berichten.map((b, i) => (
          <div
            key={b.id}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < done ? 'bg-orange-500' : i === idx ? 'bg-slate-400' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Stadionscherm */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-5"
        >
          <div className="bg-yellow-400 rounded-2xl p-5 text-center mb-5">
            <p className="text-xs font-bold text-yellow-900 uppercase tracking-widest mb-2">
              Stadionscherm
            </p>
            <p className="text-black font-bold text-base leading-snug">{current.scherm}</p>
          </div>

          <DaanChat
            key={current.id + '-chat'}
            script={current.script(isLast)}
            onComplete={handleDone}
          />
        </motion.div>
      </AnimatePresence>

      {/* Between-message navigation (only shown when current conv is done but not last) */}
      {done > idx && !isLast && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mt-4"
        >
          <button
            onClick={goNext}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
          >
            Volgende boodschap →
          </button>
        </motion.div>
      )}
    </div>
  )
}
