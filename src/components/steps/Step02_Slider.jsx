import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Step02_Slider({ onReady }) {
  const [value, setValue] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    setSubmitted(true)
    onReady()
  }

  return (
    <div className="h-full flex flex-col px-6 py-8 max-w-2xl mx-auto justify-center gap-5 overflow-y-auto">
      <div>
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">
          De huidige aanpak
        </p>
        <h2 className="text-3xl font-extrabold mb-3">Herken je dit?</h2>
        <p className="text-slate-300 leading-relaxed text-sm">
          Nederlandse clubs reageren op vuurwerkincidenten doorgaans met stadionverboden,
          boetes en het leegmaken van tribunes. Denk aan berichten als dit op het stadionscherm:
        </p>
      </div>

      <div className="bg-yellow-400 rounded-2xl p-5 text-center">
        <p className="text-xs font-bold text-yellow-900 uppercase tracking-widest mb-2">Stadionscherm</p>
        <p className="text-black font-bold text-base leading-snug">
          Vuurwerk afsteken in het stadion is verboden en kan leiden tot een stadionverbod
          en een geldboete voor betrokkenen.
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <p className="text-slate-300 text-sm mb-1 font-medium">
          Hoe effectief denk jij dat deze aanpak is?
        </p>
        <p className="text-slate-500 text-xs mb-5">
          1 = helemaal niet effectief, 10 = zeer effectief
        </p>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-slate-500 text-sm w-4">1</span>
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            disabled={submitted}
            className="flex-1 accent-orange-500 cursor-pointer"
          />
          <span className="text-slate-500 text-sm w-4">10</span>
        </div>
        <div className="text-center">
          <span className="text-5xl font-black text-orange-400">{value}</span>
          <span className="text-slate-500 text-sm ml-1">/ 10</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.button
            key="btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSubmit}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors self-start"
          >
            Dit is mijn inschatting
          </motion.button>
        ) : (
          <motion.div
            key="ack"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="text-2xl">👍</span>
            <div>
              <p className="text-white font-semibold text-sm">Jouw inschatting: {value}/10</p>
              <p className="text-slate-400 text-sm">Oké, hier komen we later op terug.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
