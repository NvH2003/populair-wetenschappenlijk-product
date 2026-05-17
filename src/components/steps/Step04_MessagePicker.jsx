import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DaanChat from '../DaanChat'

const BOODSCHAPPEN = [
  {
    id: 'sanctie',
    label: '1',
    tekst: 'Vuurwerk afsteken in het stadion is verboden en kan leiden tot een stadionverbod en een geldboete voor betrokkenen.',
  },
  {
    id: 'descriptief',
    label: '2',
    tekst: 'Naar schatting 99% van de supporters bezoekt wedstrijden zonder vuurwerk te gebruiken in het stadion.',
  },
  {
    id: 'injunctief',
    label: '3',
    tekst: 'Naar schatting 64% van de supporters vindt dat wedstrijden vuurwerkvrij horen te zijn en keurt vuurwerkgebruik af.',
  },
]

const PHASES = [
  { id: 'intro', label: 'Overzicht', focus: 'all' },
  { id: 'sanctie', label: 'Boodschap 1', focus: 'sanctie' },
  { id: 'descriptief', label: 'Boodschap 2', focus: 'descriptief' },
  { id: 'injunctief', label: 'Boodschap 3', focus: 'injunctief' },
  { id: 'vergelijking', label: 'H1 & H2', focus: 'compare12' },
  { id: 'hypotheses', label: 'H3 & H4', focus: 'injunctief' },
]

const SCRIPTS = {
  sanctie: [
    {
      id: 's1',
      focus: 'sanctie',
      daan: 'We beginnen met de eerste. Deze boodschap wordt getoond op het scherm in het stadion.',
    },
    {
      id: 's2',
      focus: 'sanctie',
      daan: 'Schat jij in dat deze boodschap effectief is in het ontmoedigen van vuurwerkgebruik bij de fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
    {
      id: 's3-effective',
      focus: 'sanctie',
      daan: 'De onderzoeker dacht daar anders over. De verwachting was dat deze boodschap niet effectief zou zijn in het ontmoedigen van vuurwerkgebruik bij fanatieke supporters.',
      condition: { ref: 's2', value: 'effective' },
      waitForContinue: true,
      continueLabel: 'Naar boodschap 2',
    },
    {
      id: 's3-ineffective',
      focus: 'sanctie',
      daan: 'Dat was ook de verwachting van de onderzoeker: deze boodschap zou niet effectief zijn in het ontmoedigen van vuurwerkgebruik bij fanatieke supporters.',
      condition: { ref: 's2', value: 'ineffective' },
      waitForContinue: true,
      continueLabel: 'Naar boodschap 2',
    },
  ],
  descriptief: [
    {
      id: 'd1',
      focus: 'descriptief',
      daan: 'Dan de tweede. Ook op het stadionscherm, maar een andere toon: geen dreigement, een feit over wat anderen doen.',
    },
    {
      id: 'd2',
      focus: 'descriptief',
      daan: 'Schat jij in dat deze boodschap effectief is in het ontmoedigen van vuurwerkgebruik bij de fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
    {
      id: 'd-ack-effective',
      focus: 'descriptief',
      daan: 'Oké, genoteerd.',
      condition: { ref: 'd2', value: 'effective' },
      waitForContinue: true,
      continueLabel: 'Naar boodschap 3',
    },
    {
      id: 'd-ack-ineffective',
      focus: 'descriptief',
      daan: 'Oké, genoteerd.',
      condition: { ref: 'd2', value: 'ineffective' },
      waitForContinue: true,
      continueLabel: 'Naar boodschap 3',
    },
  ],
  injunctief: [
    {
      id: 'i1',
      focus: 'injunctief',
      daan: 'Dan de derde. Ook op het stadionscherm. Dit is een injunctieve norm: wat anderen goed- of afkeuren, niet alleen wat ze doen.',
    },
    {
      id: 'i2',
      focus: 'injunctief',
      daan: 'Schat jij in dat deze boodschap effectief is in het ontmoedigen van vuurwerkgebruik bij de fanatieke supporters?',
      question: null,
      options: [
        { label: 'Effectief', value: 'effective' },
        { label: 'Niet effectief', value: 'ineffective' },
      ],
    },
    {
      id: 'i-ack-effective',
      focus: 'injunctief',
      daan: 'Oké, genoteerd. Nu je alle drie de boodschappen kent, gaan we naar wat de onderzoeker verwachtte bij de eerste twee hypothesen.',
      condition: { ref: 'i2', value: 'effective' },
      waitForContinue: true,
      continueLabel: 'Naar de vergelijking',
    },
    {
      id: 'i-ack-ineffective',
      focus: 'injunctief',
      daan: 'Oké, genoteerd. Nu je alle drie de boodschappen kent, gaan we naar wat de onderzoeker verwachtte bij de eerste twee hypothesen.',
      condition: { ref: 'i2', value: 'ineffective' },
      waitForContinue: true,
      continueLabel: 'Naar de vergelijking',
    },
  ],
  vergelijking: [
    {
      id: 'h1-bridge',
      focus: 'compare12',
      daan: 'Je hebt nu alle drie de boodschappen gezien. Bij de eerste en tweede hypothese werden ze in het onderzoek met elkaar vergeleken.',
    },
    {
      id: 'h12-expect',
      focus: 'compare12',
      daan: `De eerste hypothese luidde: Nederlandse voetbalsupporters die een sociale-normboodschap ontvangen, rapporteren een lagere persoonlijke acceptatie van vuurwerk in voetbalstadions dan supporters die een sanctionerende boodschap ontvangen.

De tweede hypothese luidde: Nederlandse voetbalsupporters die een sociale-normboodschap ontvangen, ervaren een lagere sociale acceptatie van vuurwerk in voetbalstadions dan supporters die een sanctionerende boodschap ontvangen.`,
    },
    {
      id: 'compare-ask',
      focus: 'compare12',
      daan: 'Wil je dat ik uitleg waarom de onderzoeker dit verwachtte?',
      question: null,
      options: [
        { label: 'Ja, leg het uit', value: 'yes' },
        { label: 'Nee, dat hoeft niet', value: 'no' },
      ],
    },
    {
      id: 'compare-theory',
      focus: 'compare12',
      daan: `De onderzoeker baseerde de eerste en tweede hypothese op twee lijnen van onderzoek.

Volgens de Psychological Reactance Theory leidt dwingende communicatie tot weerstand: ontvangers wijzen de boodschap af of legitimeren het gedrag juist sterker (Brehm & Brehm, 1981). Li en Shi (2026) bevestigen in een meta-analyse dat sanctieboodschappen vaker weerstand oproepen dan normbevestigende boodschappen. Daarom verwachtte de onderzoeker dat de normboodschappen (boodschap 2 en 3) op persoonlijke én sociale acceptatie sterker zouden werken dan de sanctionerende boodschap 1, toen alle drie condities met elkaar werden vergeleken.

Daarnaast worden sociale normen via communicatie waargenomen. Bij verkeerde inschattingen ontstaan normatieve mispercepties: mensen passen zich aan wat zij denken dat de groep doet (Balvig & Holmberg, 2011). Balvig en Holmberg onderzochten hoe jongeren het alcoholgebruik van hun leeftijdsgenoten inschatten en wat er gebeurt als je die misperceptie corrigeert. Ze lieten zien dat de perceptie van de groepsnorm verandert zodra jongeren correcte cijfers krijgen. Een feit als "99% doet het niet" kan dat beeld bijstellen en daarmee zowel de eerste als de tweede verwachting ondersteunen.`,
      condition: { ref: 'compare-ask', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Naar H3 en H4',
    },
    {
      id: 'compare-skip',
      focus: 'compare12',
      daan: 'Prima. Dan gaan we door naar de derde en vierde hypothese.',
      condition: { ref: 'compare-ask', value: 'no' },
      waitForContinue: true,
      continueLabel: 'Naar H3 en H4',
    },
  ],
  hypotheses: [
    {
      id: 'h3-bridge',
      focus: 'injunctief',
      daan: 'Nu de derde hypothese. Daarbij vergeleek de onderzoeker alleen de injunctieve met de descriptieve normboodschap.',
    },
    {
      id: 'h3-expect',
      focus: 'injunctief',
      daan: 'De derde hypothese luidde: Nederlandse voetbalsupporters die een injunctieve normboodschap ontvangen, rapporteren een lagere persoonlijke acceptatie van vuurwerk in voetbalstadions dan supporters die een descriptieve normboodschap ontvangen.',
    },
    {
      id: 'i3-effective',
      focus: 'injunctief',
      daan: 'Dat sluit aan bij wat de onderzoeker onder de derde hypothese verwachtte.',
      condition: { ref: 'i2', value: 'effective' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'i3-ineffective',
      focus: 'injunctief',
      daan: 'Toch was dat de verwachting onder de derde hypothese van de onderzoeker.',
      condition: { ref: 'i2', value: 'ineffective' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'i-ask',
      focus: 'injunctief',
      daan: 'Wil je dat ik uitleg waarom de onderzoeker dit verwachtte?',
      question: null,
      options: [
        { label: 'Ja, leg het uit', value: 'yes' },
        { label: 'Nee, dat hoeft niet', value: 'no' },
      ],
    },
    {
      id: 'i3-theory',
      focus: 'injunctief',
      daan: `Gauld et al. (2025) onderzochten of verschillende typen normen ook verschillen in hun effect op gedrag. Bij jonge bestuurders vergeleken ze drie boodschappen: een descriptieve norm (wat anderen doen), een injunctieve norm (sociale goed- of afkeuring) en een subjectieve norm (wat belangrijke anderen van je vinden; Ajzen, 1991).

De injunctieve en subjectieve normboodschappen bleken effectiever dan de descriptieve. Wie goedkeuring of afkeuring zag, rapporteerde minder intentie om onder het rijden de smartphone te gebruiken dan wie alleen hoorde wat andere bestuurders doen (Gauld et al., 2025).

Dat laat zien dat normboodschappen kunnen verschillen in overtuigingskracht. Benadrukt de communicatie expliciet sociale goed- of afkeuring, dan werkt dat sterker door dan een boodschap die enkel beschrijft wat anderen doen. Daarom verwachtte de onderzoeker bij de derde hypothese dat de injunctieve boodschap (boodschap 3) de persoonlijke acceptatie van vuurwerk sterker verlaagt dan de descriptieve boodschap 2.`,
      condition: { ref: 'i-ask', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'i-skip',
      focus: 'injunctief',
      daan: 'Prima. Dan gaan we door naar de vierde verwachting.',
      condition: { ref: 'i-ask', value: 'no' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'h4-intro',
      focus: 'injunctief',
      daan: 'En dan de vierde hypothese. Die gaat niet over wélke boodschap, maar over identificatie met de harde kern. Laat me je daar iets over vragen.',
    },
    {
      id: 'h4-q',
      focus: 'injunctief',
      daan: 'Hoe sterk identificeer jij je met de ultras of de harde kern van jouw club?',
      question: null,
      options: [
        { label: 'Heel sterk, ik zit wekelijks in het fanatieke vak met mijn vrienden', value: 'strong' },
        { label: 'Minder sterk, ik zou mezelf zo niet noemen', value: 'moderate' },
      ],
    },
    {
      id: 'h4-strong',
      focus: 'injunctief',
      daan: 'Duidelijk. Jij voelt je thuis in het fanatieke vak. Dat is precies het type supporter waar de vierde hypothese over ging.',
      condition: { ref: 'h4-q', value: 'strong' },
    },
    {
      id: 'h4-moderate',
      focus: 'injunctief',
      daan: 'Oké. Dan identificeer je je minder met die ultras-subcultuur. Ook dat maakte in het onderzoek verschil.',
      condition: { ref: 'h4-q', value: 'moderate' },
    },
    {
      id: 'h4-expect-strong',
      focus: 'injunctief',
      daan: `De vierde hypothese luidde: sociale normboodschappen zijn minder effectief in het verlagen van de persoonlijke acceptatie van vuurwerk in voetbalstadions onder supporters die zich sterk identificeren met ultras dan onder supporters die zich minder sterk identificeren met ultras.

Omdat jij je sterk identificeert, verwachtte de onderzoeker dat boodschappen op het scherm bij jou minder aankomen dan bij supporters met een zwakkere band met de harde kern.`,
      condition: { ref: 'h4-q', value: 'strong' },
    },
    {
      id: 'h4-expect-moderate',
      focus: 'injunctief',
      daan: `De vierde hypothese luidde: sociale normboodschappen zijn minder effectief in het verlagen van de persoonlijke acceptatie van vuurwerk in voetbalstadions onder supporters die zich sterk identificeren met ultras dan onder supporters die zich minder sterk identificeren met ultras.

Jij zit meer aan de kant van minder sterke identificatie. De onderzoeker verwachtte dat normboodschappen bij jouw profiel juist wél sterker zouden doorwerken dan bij de harde kern.`,
      condition: { ref: 'h4-q', value: 'moderate' },
    },
    {
      id: 'h4-ask',
      focus: 'injunctief',
      daan: 'Wil je dat ik uitleg waarom de onderzoeker dit verwachtte?',
      question: null,
      options: [
        { label: 'Ja, leg het uit', value: 'yes' },
        { label: 'Nee, dat hoeft niet', value: 'no' },
      ],
    },
    {
      id: 'h4-theory',
      focus: 'injunctief',
      daan: `De Sociale Identiteitstheorie verklaart waarom identificatie ertoe doet. Volgens Tajfel (1982) categoriseren mensen zichzelf als lid van groepen en ontstaat een ingroup: een categorie waarmee je je identificeert en waaraan je emotionele waarde ontleent. Daarbij horen loyaliteit en het volgen van groepsnormen, ook wanneer die afwijken van bredere maatschappelijke verwachtingen. Tegelijk ontstaan outgroups: groepen die je als "zij" ziet.

Neville et al. (2021) laten zien dat normboodschappen anders landen afhankelijk van wie ze uitspreekt. Komt de norm van een ingroup-bron, dan wordt die vaker geïnternaliseerd. Komt dezelfde boodschap van een outgroup, dan wordt die sneller ervaren als controlerend of moraliserend en volgt vaker weerstand dan echte gedragsverandering.

In het betaald voetbal komt normcommunicatie vaak van club of bond. Jack (2024) beschrijft de harde kern als de meest fanatieke supporters: sterk toegewijd aan de club, maar minder volgzaam naar officiële regels. Pyrotechniek hoort bij passie en loyaliteit; de harde kern zelf is het belangrijkste referentiekader voor normen, niet de club op het scherm. Normboodschappen van de club kunnen daardoor als outgroup-communicatie landen. Hoe sterker iemand zich met ultras identificeert, hoe kleiner het verwachte effect op persoonlijke acceptatie van vuurwerk. Dat is de vierde hypothese.`,
      condition: { ref: 'h4-ask', value: 'yes' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'h4-skip',
      focus: 'injunctief',
      daan: 'Prima. Dan hebben we alle vier de verwachtingen gehad.',
      condition: { ref: 'h4-ask', value: 'no' },
      waitForContinue: true,
      continueLabel: 'Verder',
    },
    {
      id: 'end',
      focus: 'all',
      daan: 'Vier verwachtingen besproken. Nu gaan we kijken wat de data zegt.',
      isEnd: true,
    },
  ],
}

const estimateByScriptId = {
  s2: 'sanctie',
  d2: 'descriptief',
  i2: 'injunctief',
}

function isHighlighted(focus, id) {
  if (!focus || focus === 'all') return true
  if (focus === 'compare12') return id === 'sanctie' || id === 'descriptief' || id === 'injunctief'
  return focus === id
}

function ThreeScreens({ focus }) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {BOODSCHAPPEN.map(b => {
        const active = isHighlighted(focus, b.id)
        return (
          <motion.div
            key={b.id}
            layout
            animate={{
              opacity: active ? 1 : 0.35,
              scale: active && focus !== 'all' ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-3 text-center ${
              active && focus !== 'all'
                ? 'bg-yellow-400 ring-2 ring-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-yellow-400/40 ring-1 ring-yellow-600/30'
            }`}
          >
            <p className="text-[10px] font-bold text-yellow-900 uppercase tracking-widest mb-1.5">
              Boodschap {b.label}
            </p>
            <p
              className={`font-bold leading-snug ${
                active ? 'text-black text-xs' : 'text-yellow-950/70 text-[11px]'
              }`}
            >
              {b.tekst}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function PhaseProgress({ currentIndex }) {
  return (
    <motion.div className="flex gap-1.5 mb-6">
      {PHASES.map((p, i) => (
        <div
          key={p.id}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i < currentIndex ? 'bg-orange-500' : i === currentIndex ? 'bg-slate-400' : 'bg-slate-700'
          }`}
          title={p.label}
        />
      ))}
    </motion.div>
  )
}

export default function Step04_MessagePicker({ onReady, onEstimate }) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [focus, setFocus] = useState('all')
  const phase = PHASES[phaseIndex]

  useEffect(() => {
    setFocus(phase.focus)
  }, [phaseIndex, phase.focus])

  function goNextPhase() {
    if (phaseIndex < PHASES.length - 1) {
      setPhaseIndex(i => i + 1)
      setFocus(PHASES[phaseIndex + 1].focus)
    } else {
      onReady()
    }
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-4">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Het experiment
        </p>
        <h2 className="text-3xl font-extrabold mb-2">Drie boodschappen, vier verwachtingen</h2>
        <p className="text-slate-300 text-sm">
          In het onderzoek kregen 395 supporters een van deze drie boodschappen te zien. We doen het in
          kleine stappen.
        </p>
      </div>

      <PhaseProgress currentIndex={phaseIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
            {phase.label}
          </p>

          <ThreeScreens focus={phase.id === 'intro' ? 'all' : focus} />

          {phase.id === 'intro' ? (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Elke supporter zag één van deze drie boodschappen op het stadionscherm. Straks loop ik
                ze met je door: eerst alle drie de boodschappen, daarna de verwachtingen bij H1 en H2 en tot slot H3 en H4.
              </p>
              <button
                type="button"
                onClick={goNextPhase}
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
              >
                Begin met boodschap 1 →
              </button>
            </div>
          ) : (
            <DaanChat
              key={phase.id}
              script={SCRIPTS[phase.id]}
              onComplete={goNextPhase}
              onItemFocus={setFocus}
              onChoice={(scriptId, value) => {
                const messageId = estimateByScriptId[scriptId]
                if (messageId) onEstimate?.(messageId, value)
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
