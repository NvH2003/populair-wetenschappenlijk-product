/**
 * DaanChat: conversation engine used in steps 3-12.
 *
 * Layout: large Daan photo LEFT | scrollable conversation thread RIGHT
 *
 * Script item shape:
 *   { id, daan: "text" }
 *   { id, daan: "text", question: "…?", options: [{label, value}] }
 *   { id, daan: "text", question: "…?", textInput: true }   ← free-text field
 *   { id, daan: "text", condition: { ref: 'otherId', value: 'someValue' } }
 *   { id, daan: "text", isEnd: true }
 *   { id, daan: "text", waitForContinue: true, continueLabel: "Verder" }
 *   { id, citedSentences: [{ text, citation }], waitForContinue: true }  ← hoverbare bronnen
 *   { id, chartKey: "h1", chartOnly: true, waitForContinue: true }  ← alleen figuur, geen tekst
 */

import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ComparisonBarChart from './ComparisonBarChart'
import CitedSentences from './CitedSentences'
import { daanPhoto } from '../assets/images'
import { capitalizeSentenceStarts } from '../utils/capitalizeSentenceStarts'

function citedSentencesToSpeechText(sentences) {
  return sentences.map(s => s.text).join('\n\n')
}

// Woorden + witruimte (incl. enters); werkt ook bij lange alinea's
function tokenizeSpeech(text) {
  return text.match(/\S+|\s+/g) ?? (text ? [text] : [])
}

/** ms tussen tokens (woord of witruimte); hoger = rustiger meelezen */
const DEFAULT_SPEECH_TOKEN_MS = 52

// ─── Word-by-word speech reveal ────────────────────────────────────────────
function SpokenText({ text, speed = DEFAULT_SPEECH_TOKEN_MS, onDone, onProgress }) {
  const tokens = useMemo(() => tokenizeSpeech(text), [text])
  const [count, setCount] = useState(0)
  const doneRef = useRef(false)
  const timerRef = useRef(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useEffect(() => {
    doneRef.current = false
    setCount(0)
    return () => clearTimeout(timerRef.current)
  }, [text])

  // Na elke zichtbare token: scroll mee (na layout, zodat scrollHeight klopt)
  useLayoutEffect(() => {
    onProgressRef.current?.()
  }, [count])

  useEffect(() => {
    if (tokens.length === 0) {
      if (!doneRef.current) {
        doneRef.current = true
        onDoneRef.current?.()
      }
      return
    }
    if (count >= tokens.length) {
      if (!doneRef.current) {
        doneRef.current = true
        onDoneRef.current?.()
      }
      return
    }
    timerRef.current = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(timerRef.current)
  }, [count, tokens.length, speed])

  const visible = tokens.slice(0, count).join('')
  const speaking = count < tokens.length

  return (
    <>
      <span className="whitespace-pre-wrap">{visible}</span>
      {speaking && (
        <span className="inline-block w-[2px] h-[1em] bg-orange-400/80 align-middle ml-0.5 animate-pulse" />
      )}
    </>
  )
}

// ─── Bubbles ───────────────────────────────────────────────────────────────
function DaanBubble({ text, citedSentences, live, onSpeechDone, onSpeechProgress }) {
  const speechText = useMemo(() => {
    if (text) return capitalizeSentenceStarts(text)
    if (citedSentences) return capitalizeSentenceStarts(citedSentencesToSpeechText(citedSentences))
    return ''
  }, [text, citedSentences])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="max-w-[92%] bg-slate-700 border border-slate-600 rounded-2xl rounded-tl-sm px-5 py-3 shadow"
    >
      <p className="text-slate-100 text-base leading-relaxed">
        {citedSentences && !live
          ? <CitedSentences sentences={citedSentences} />
          : live
            ? (
              <SpokenText
                text={speechText}
                onDone={onSpeechDone}
                onProgress={onSpeechProgress}
              />
            )
            : <span className="whitespace-pre-wrap">{speechText}</span>
        }
      </p>
    </motion.div>
  )
}

function UserBubble({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[72%] bg-orange-500 text-white rounded-2xl rounded-tr-sm px-5 py-2.5 shadow text-sm font-medium">
        {text}
      </div>
    </motion.div>
  )
}

// ─── Daan sidebar ──────────────────────────────────────────────────────────
function DaanSide({ speaking }) {
  return (
    <motion.div className="flex flex-col items-center gap-3 w-40 shrink-0 pt-1">
      <motion.div
        animate={speaking ? {
          boxShadow: [
            '0 0 0 0px rgba(249,115,22,0.35)',
            '0 0 0 7px rgba(249,115,22,0)',
            '0 0 0 0px rgba(249,115,22,0.35)',
          ],
        } : {}}
        transition={{ duration: 1.9, repeat: Infinity }}
        className="w-36 h-44 rounded-2xl overflow-hidden shadow-xl ring-2 ring-orange-500/50"
      >
        <img
          src={daanPhoto}
          alt="Daan"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      <motion.div className="text-center">
        <p className="text-white font-bold text-sm leading-tight">Daan</p>
        <p className="text-orange-400 text-xs">Harde-kern supporter</p>
        <AnimatePresence>
          {speaking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-1 mt-1.5"
              aria-hidden
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full bg-orange-400/70"
                  animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Free-text input ───────────────────────────────────────────────────────
function TextInputArea({ question, onSubmit }) {
  const [value, setValue] = useState('')
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-2"
    >
      {question && (
        <p className="text-slate-400 text-sm italic pl-1">{capitalizeSentenceStarts(question)}</p>
      )}
      <div className="flex gap-2 items-end">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault()
              onSubmit(value.trim())
            }
          }}
          placeholder="Typ hier je antwoord…"
          rows={2}
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm
                     text-slate-100 placeholder-slate-500 resize-none focus:outline-none
                     focus:border-orange-400/60 transition-colors"
        />
        <button
          onClick={() => value.trim() && onSubmit(value.trim())}
          disabled={!value.trim()}
          className="bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed
                     text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          Verstuur
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────
export default function DaanChat({ script, onComplete, onChoice, onItemFocus }) {
  // thread = array of { type: 'daan'|'user'|'choices', id, ...data }
  const [thread, setThread] = useState([])
  const [speaking, setSpeaking] = useState(false)
  const [pendingId, setPendingId] = useState(null)
  const [showChoices, setShowChoices] = useState(null)    // { scriptId, question, options }
  const [showTextInput, setShowTextInput] = useState(null) // { scriptId, question }
  const [showContinue, setShowContinue] = useState(null) // { scriptId, label }
  const choicesRef = useRef({})                        // user choices: scriptId → value
  const startedRef = useRef(false)
  const bottomRef = useRef(null)
  const threadScrollRef = useRef(null)

  const scrollThreadToEnd = useCallback(() => {
    const root = threadScrollRef.current
    if (root && root.scrollHeight > root.clientHeight) {
      root.scrollTop = root.scrollHeight
    }
    // Ook buiten deze kolom kan scrollen nodig zijn (StepController: flex-1 overflow-y-auto)
    bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'auto' })
  }, [])

  // Scroll naar beneden bij nieuwe berichten of UI-blokken
  useEffect(() => {
    scrollThreadToEnd()
  }, [thread, showChoices, showContinue, speaking, pendingId, scrollThreadToEnd])

  const isEligible = useCallback((item) => {
    if (!item.condition) return true
    return choicesRef.current[item.condition.ref] === item.condition.value
  }, [])

  const speechDoneRef = useRef(null)

  const showItem = useCallback((item, afterFn) => {
    if (item.focus) onItemFocus?.(item.focus)

    if (item.chartKey && (item.chartOnly || !String(item.daan ?? '').trim())) {
      setThread(prev => [...prev, { type: 'chart', id: item.id, chartKey: item.chartKey }])
      setShowContinue({
        scriptId: item.id,
        label: item.continueLabel || 'Verder',
      })
      return
    }

    setThread(prev => [...prev, {
      type: 'daan',
      id: item.id,
      text: item.daan,
      citedSentences: item.citedSentences,
    }])
    setPendingId(item.id)
    setSpeaking(true)

    speechDoneRef.current = () => {
      setPendingId(null)
      setSpeaking(false)

      if (item.textInput) {
        setShowTextInput({ scriptId: item.id, question: item.question })
      } else if (item.options) {
        setShowChoices({ scriptId: item.id, question: item.question, options: item.options })
      } else if (item.chartKey) {
        setThread(prev => [...prev, { type: 'chart', id: item.id + '_chart', chartKey: item.chartKey }])
        setShowContinue({
          scriptId: item.id,
          label: item.continueLabel || 'Verder',
        })
      } else if (item.waitForContinue) {
        setShowContinue({
          scriptId: item.id,
          label: item.continueLabel || 'Verder',
        })
      } else if (item.isEnd) {
        onComplete?.()
      } else {
        setTimeout(afterFn, 400)
      }
    }
  }, [onComplete, onItemFocus])

  // Build a chain: given index `idx`, show next eligible items recursively
  const advance = useCallback((fromIdx) => {
    let i = fromIdx
    while (i < script.length) {
      if (isEligible(script[i])) {
        showItem(script[i], () => advance(i + 1))
        return
      }
      i++
    }
    // No more items
    onComplete?.()
  }, [script, isEligible, showItem, onComplete])

  // Start on mount (StrictMode-safe: use ref guard)
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    advance(0)
  }, [advance])

  const handleChoice = (opt) => {
    const { scriptId } = showChoices
    onChoice?.(scriptId, opt.value)
    choicesRef.current[scriptId] = opt.value

    setShowChoices(null)
    setThread(prev => [...prev, { type: 'user', id: scriptId + '_reply', text: opt.label }])

    const idx = script.findIndex(s => s.id === scriptId)
    setTimeout(() => advance(idx + 1), 400)
  }

  const handleTextSubmit = (text) => {
    const { scriptId } = showTextInput
    choicesRef.current[scriptId] = text

    setShowTextInput(null)
    setThread(prev => [...prev, { type: 'user', id: scriptId + '_reply', text }])

    const idx = script.findIndex(s => s.id === scriptId)
    setTimeout(() => advance(idx + 1), 400)
  }

  const handleContinue = () => {
    const { scriptId } = showContinue
    setShowContinue(null)
    const idx = script.findIndex(s => s.id === scriptId)
    setTimeout(() => advance(idx + 1), 300)
  }

  return (
    <div className="flex gap-5 items-start min-h-0 min-w-0">
      <DaanSide speaking={speaking} />

      <div
        ref={threadScrollRef}
        className="flex-1 min-h-0 min-w-0 flex flex-col gap-3 max-h-[min(500px,70dvh)] overflow-y-auto overscroll-contain pr-1 pb-1"
      >
        <AnimatePresence initial={false}>
          {thread.map(item => {
            if (item.type === 'daan') {
              const isLive = item.id === pendingId
              return (
                <DaanBubble
                  key={item.id}
                  text={item.text}
                  citedSentences={item.citedSentences}
                  live={isLive}
                  onSpeechDone={() => speechDoneRef.current?.()}
                  onSpeechProgress={isLive ? scrollThreadToEnd : undefined}
                />
              )
            }
            if (item.type === 'user') {
              return <UserBubble key={item.id} text={item.text} />
            }
            if (item.type === 'chart') {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <ComparisonBarChart chartKey={item.chartKey} />
                </motion.div>
              )
            }
            return null
          })}
        </AnimatePresence>

        {/* Choice buttons */}
        <AnimatePresence>
          {showChoices && (
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2"
            >
              {showChoices.question && (
                <p className="text-slate-400 text-sm italic pl-1">{capitalizeSentenceStarts(showChoices.question)}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {showChoices.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleChoice(opt)}
                    className="px-4 py-2 rounded-full border border-orange-400/70 text-orange-300 text-sm font-medium
                               hover:bg-orange-500 hover:text-white hover:border-orange-500
                               transition-all duration-150 active:scale-95"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Free-text input */}
        <AnimatePresence>
          {showTextInput && (
            <TextInputArea
              key="text-input"
              question={showTextInput.question}
              onSubmit={handleTextSubmit}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              key="continue"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-end pt-1"
            >
              <button
                type="button"
                onClick={handleContinue}
                className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                {showContinue.label} →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
