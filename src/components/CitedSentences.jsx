import { useState } from 'react'
import { createPortal } from 'react-dom'
import { capitalizeSentenceStarts } from '../utils/capitalizeSentenceStarts'

export default function CitedSentences({ sentences }) {
  const [tip, setTip] = useState(null)

  return (
    <>
      {sentences.map((sentence, index) => (
        <span
          key={index}
          className="block mb-3 last:mb-0 rounded-sm transition-colors hover:underline hover:decoration-slate-500/60 hover:underline-offset-2 cursor-default"
          onMouseEnter={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setTip({
              citation: sentence.citation,
              top: rect.bottom + 8,
              left: Math.min(rect.left, window.innerWidth - 320),
            })
          }}
          onMouseLeave={() => setTip(null)}
          onFocus={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setTip({
              citation: sentence.citation,
              top: rect.bottom + 8,
              left: Math.min(rect.left, window.innerWidth - 320),
            })
          }}
          onBlur={() => setTip(null)}
          tabIndex={0}
          role="note"
        >
          {capitalizeSentenceStarts(sentence.text)}
        </span>
      ))}

      {tip && createPortal(
        <div
          role="tooltip"
          style={{ top: tip.top, left: tip.left }}
          className="fixed z-50 max-w-sm rounded-md border border-slate-700/80 bg-slate-800/95 px-3 py-2 text-[11px] leading-snug text-slate-400 shadow-lg pointer-events-none"
        >
          {tip.citation}
        </div>,
        document.body,
      )}
    </>
  )
}
