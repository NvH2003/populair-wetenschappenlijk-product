import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'

const items = [
  { id: 'a', text: 'Supporters die al jaren samen in het vak staan', correct: 'ingroup' },
  { id: 'b', text: 'De clubdirectie en het bestuur', correct: 'outgroup' },
  { id: 'c', text: 'De voetbalbond (KNVB)', correct: 'outgroup' },
  { id: 'd', text: 'Andere fanatieke supporters van dezelfde club', correct: 'ingroup' },
  { id: 'e', text: 'Politie en stewards in het stadion', correct: 'outgroup' },
  { id: 'f', text: 'Supportersvereniging van de eigen club', correct: 'ingroup' },
]

const HINTS = {
  a: 'Dat is wij. Dezelfde mensen, hetzelfde vak, elke wedstrijd opnieuw.',
  b: 'Dat is zij. Regels en boodschappen van boven, niet uit mijn hoek.',
  c: 'Dat is zij. De bond is ver van het vak af.',
  d: 'Dat is wij. Fanatiek, dezelfde club, dezelfde taal op de tribune.',
  e: 'Dat is zij. Handhaving voelt als controle van buitenaf.',
  f: 'Dat is wij. Officieel misschien, maar nog steeds van onze club, dichter bij ons dan de bond.',
}

const introScript = [
  {
    id: 'perspective',
    daan: 'Belangrijk: denk niet vanuit jouw eigen blik, als SLO of als neutrale toeschouwer. Stap opzij en bedenk hoe ík het zie, vanuit het vak, als fanatieke supporter.',
  },
  {
    id: 'challenge',
    daan: 'Jouw beurt. Zes groepen rond het stadion. Zet ze bij wij of bij zij zoals jij denkt dat ík ze zou indelen, niet zoals jij het zelf zou doen. Ik hou mijn mond nog even.',
    isEnd: true,
  },
]

function buildDebriefScript(correctCount, placements) {
  const total = items.length
  const wrongItems = items.filter(i => placements[i.id] !== i.correct)

  const script = [
    {
      id: 'score',
      daan:
        correctCount === total
          ? `Alle ${total} goed. Je hebt mijn verdeling goed ingeschat.`
          : correctCount >= 4
            ? `${correctCount} van de ${total}. Redelijk, maar ik ben nog niet overtuigd dat je mijn wereld echt snapt.`
            : `${correctCount} van de ${total}. Lastiger dan je dacht, hè?`,
    },
  ]

  if (correctCount === total) {
    script.push(
      {
        id: 'close-perfect',
        daan: 'Dat verschil is precies het punt. Niet elke "club"-stem is voor mij dezelfde stem. De bond en het bestuur staan ver van het vak; andere supporters van dezelfde club kunnen wél bij wij horen.',
        waitForContinue: true,
        continueLabel: 'Verder',
      },
      { id: 'end', daan: 'Dan gaan we verder.', isEnd: true },
    )
    return script
  }

  script.push({
    id: 'pick-mistake',
    daan: 'Welke had jij het verst fout? Kies er één, dan zeg ik alleen daar iets over.',
    question: null,
    options: wrongItems.map(i => ({
      label: i.text.length > 52 ? `${i.text.slice(0, 49)}…` : i.text,
      value: i.id,
    })),
  })

  wrongItems.forEach(item => {
    const placed = placements[item.id]
    script.push({
      id: `hint-${item.id}`,
      daan: `${HINTS[item.id]} Jij zette deze bij ${placed === 'ingroup' ? 'wij' : 'zij'}.`,
      condition: { ref: 'pick-mistake', value: item.id },
    })
  })

  script.push(
    {
      id: 'wrap',
      daan: 'Zie je het? Voor mij gaat het niet om "supporter" in het algemeen, maar om wie echt bij mijn groep hoort.',
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    { id: 'end', daan: 'Dan gaan we verder.', isEnd: true },
  )

  return script
}

export default function Step10_HardeKern({ onReady }) {
  const [placements, setPlacements] = useState({})
  const [checked, setChecked] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  const allPlaced = items.every(item => placements[item.id])
  const correctCount = items.filter(i => placements[i.id] === i.correct).length

  const debriefScript = useMemo(
    () => (checked ? buildDebriefScript(correctCount, placements) : []),
    [checked, correctCount, placements],
  )

  function place(id, group) {
    if (checked) return
    setPlacements(prev => ({ ...prev, [id]: group }))
  }

  function check() {
    setChecked(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Uitdaging
        </p>
        <h2 className="text-3xl font-extrabold">Wij of zij?</h2>
        <p className="text-slate-400 text-sm mt-1">
          Denk vanuit Daans perspectief: wie is wij, wie is zij?
        </p>
      </div>

      <DaanChat script={introScript} onComplete={() => setIntroDone(true)} />

      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 space-y-5"
          >
            <motion.div className="grid grid-cols-2 gap-3">
              {['ingroup', 'outgroup'].map(group => (
                <div
                  key={group}
                  className={`rounded-2xl border p-3 min-h-24 ${
                    group === 'ingroup'
                      ? 'border-green-700 bg-green-950/30'
                      : 'border-red-800 bg-red-950/20'
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      group === 'ingroup' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {group === 'ingroup' ? 'Wij' : 'Zij'}
                  </p>
                  <motion.div className="space-y-1.5" layout>
                    {items.filter(i => placements[i.id] === group).map(i => {
                      const isCorrect = i.correct === group
                      return (
                        <motion.div
                          key={i.id}
                          layout
                          className={`text-xs px-2 py-1.5 rounded-lg border flex items-center justify-between gap-1 ${
                            checked
                              ? isCorrect
                                ? 'bg-green-900/40 border-green-600 text-green-300'
                                : 'bg-red-900/40 border-red-600 text-red-300'
                              : 'bg-slate-700 border-slate-600 text-slate-200'
                          }`}
                        >
                          <span>{i.text}</span>
                          {checked && <span>{isCorrect ? '✓' : '✗'}</span>}
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <div className="space-y-2">
              {items.filter(i => !placements[i.id]).length > 0 && (
                <p className="text-slate-500 text-xs uppercase font-semibold tracking-wide">
                  Nog te plaatsen
                </p>
              )}
              {items.filter(i => !placements[i.id]).map(i => (
                <div
                  key={i.id}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <span className="text-slate-200 text-sm">{i.text}</span>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => place(i.id, 'ingroup')}
                      disabled={checked}
                      className="text-xs bg-green-900/40 hover:bg-green-800/60 border border-green-700 text-green-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                    >
                      Wij
                    </button>
                    <button
                      type="button"
                      onClick={() => place(i.id, 'outgroup')}
                      disabled={checked}
                      className="text-xs bg-red-900/40 hover:bg-red-800/60 border border-red-800 text-red-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                    >
                      Zij
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {allPlaced && !checked && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={check}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-full transition-colors text-sm"
                >
                  Controleer mijn antwoorden
                </motion.button>
              )}
            </AnimatePresence>

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2 border-t border-slate-700"
              >
                <p className="text-slate-500 text-xs uppercase font-semibold tracking-wide mb-3">
                  {correctCount}/{items.length} correct
                </p>
                <DaanChat
                  key={`debrief-${correctCount}`}
                  script={debriefScript}
                  onComplete={onReady}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
