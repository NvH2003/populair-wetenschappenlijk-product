import { useState } from 'react'
import { APP_STEPS, DEV_STEP_JUMP_ENABLED } from '../config/devStepJump'

export default function DevStepJump({ currentStep, onJump }) {
  const [open, setOpen] = useState(false)

  if (!DEV_STEP_JUMP_ENABLED) return null

  return (
    <div className="fixed bottom-20 left-4 z-50 max-w-[220px]">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="bg-slate-800/95 border border-amber-500/60 text-amber-300 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
        title="Alleen zichtbaar in testfase (dev)"
      >
        Test {open ? '▾' : '▸'}
      </button>

      {open && (
        <div className="mt-2 p-2 bg-slate-900/98 border border-slate-600 rounded-xl shadow-2xl backdrop-blur-sm">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest px-1 mb-2">
            Spring naar stap
          </p>
          <ul className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
            {APP_STEPS.map(({ n, label }) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => {
                    onJump(n)
                    setOpen(false)
                  }}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    n === currentStep
                      ? 'bg-orange-500/25 text-orange-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-slate-500 mr-1">{n}.</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-slate-600 mt-2 px-1 leading-snug">
            Uit in .env: VITE_DEV_STEP_JUMP=false
          </p>
        </div>
      )}
    </div>
  )
}
