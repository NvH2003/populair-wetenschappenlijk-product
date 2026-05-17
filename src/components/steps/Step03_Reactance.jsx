import DaanChat from '../DaanChat'

const script = [
  {
    id: 'intro',
    daan: "Kijk, ik ga je iets eerlijks vertellen. Als ik zo'n bericht zie op het stadionscherm, 'verboden, stadionverbod, geldboete', dan denk ik: laat ze lekker. Het maakt me juist eigenwijs.",
  },
  {
    id: 'q1',
    daan: "Snap je wat ik bedoel? Als iemand me verbiedt iets te doen, wil ik het soms juist méér.",
    question: "Herken jij dit gevoel bij mensen?",
    options: [
      { label: "Ja, dat klinkt logisch", value: 'yes' },
      { label: "Nee, dat verbaast me", value: 'no' },
    ],
  },
  {
    id: 'bridge-yes',
    daan: "Precies. En er is zelfs een naam voor. Het heet psychologische reactantie.",
    condition: { ref: 'q1', value: 'yes' },
  },
  {
    id: 'bridge-no',
    daan: "Toch is het een bekend psychologisch patroon. Er is zelfs een naam voor. Het heet psychologische reactantie.",
    condition: { ref: 'q1', value: 'no' },
  },
  {
    id: 'theory',
    daan: "Als jij voelt dat je vrijheid wordt ingeperkt, geeft je brein een alarmsignaal. Je gaat juist het tegenovergestelde willen doen, als daad van verzet. Bij mij werkt dat zo met sanctieboodschappen van de club.",
  },
  {
    id: 'q2',
    daan: "Wil je dat ik dit verder uitleg met de theorie erachter?",
    question: null,
    options: [
      { label: "Ja, vertel meer", value: 'yes' },
      { label: "Nee, ik snap het wel", value: 'no' },
    ],
  },
  {
    id: 'theory-detail',
    daan: "Een recente meta-analyse laat zien dat sanctieboodschappen significant vaker weerstand oproepen dan norm-bevestigende boodschappen. Groepssolidariteit versterkt dat effect: wij zitten samen in dat vak en als 'zij' ons aanvallen, sluiten wij de gelederen.",
    condition: { ref: 'q2', value: 'yes' },
  },
  {
    id: 'end',
    daan: "Oké, genoeg theorie. In het onderzoek testten we drie verschillende boodschappen om te kijken welke wél werkt. Ik laat ze je zien.",
    isEnd: true,
  },
]

export default function Step03_Reactance({ onReady }) {
  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">
          De psychologie erachter
        </p>
        <h2 className="text-3xl font-extrabold">Waarom werkt straf niet altijd?</h2>
      </div>

      <DaanChat script={script} onComplete={onReady} />
    </div>
  )
}
