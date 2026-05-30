/**
 * Stap 5 – beleidsimplicaties als scenario's.
 */
export const IMPLICATIONS_SCRIPT = [
  {
    id: 'intro',
    daan: 'De cijfers zijn duidelijk. Wat doe jij hiermee in de praktijk?',
  },

  {
    id: 's1-setup',
    daan: 'De club wil vuurwerk aanpakken met een verbodsbord. Wat adviseer jij?',
    question: null,
    options: [
      { label: 'Goed idee, een duidelijk signaal', value: 'good' },
      { label: 'Ik twijfel, dit verandert weinig', value: 'doubt' },
      { label: 'Nee, dit werkt averechts bij de harde kern', value: 'against' },
    ],
  },
  {
    id: 's1-good',
    daan: 'Dat is begrijpelijk, maar één boodschap verandert weinig op zichzelf.',
    condition: { ref: 's1-setup', value: 'good' },
  },
  {
    id: 's1-doubt',
    daan: 'Daar heb je gelijk. De drie boodschappen verschilden in het onderzoek niet veel.',
    condition: { ref: 's1-setup', value: 'doubt' },
  },
  {
    id: 's1-against',
    daan: 'Dat is een sterk punt. Dreigen zonder context helpt vaak weinig.',
    condition: { ref: 's1-setup', value: 'against' },
  },
  {
    id: 's1-les',
    daan: 'Één boodschap verandert gedrag zelden alleen.',
    waitForContinue: true,
    continueLabel: 'Naar scenario 2',
  },

  {
    id: 's2-setup',
    daan: 'Je wilt een campagne tegen vuurwerk starten. Hoe pak je dat aan?',
    question: null,
    options: [
      { label: 'Één boodschap voor alle supporters', value: 'uniform' },
      { label: 'Aparte aanpak voor de harde kern', value: 'separate' },
      { label: 'Eerst luisteren in het vak', value: 'listen' },
    ],
  },
  {
    id: 's2-uniform',
    daan: 'Dat klinkt efficiënt, maar identificatie met de harde kern maakte het grootste verschil.',
    condition: { ref: 's2-setup', value: 'uniform' },
  },
  {
    id: 's2-separate',
    daan: 'Dat is goed instinct. Beleid moet die groep meenemen.',
    condition: { ref: 's2-setup', value: 'separate' },
  },
  {
    id: 's2-listen',
    daan: 'Dat is de goede volgorde. Eerst begrijpen, dan praten.',
    condition: { ref: 's2-setup', value: 'listen' },
  },
  {
    id: 's2-les',
    daan: 'Houd rekening met de groepscultuur van fanatieke supporters.',
    waitForContinue: true,
    continueLabel: 'Naar scenario 3',
  },

  {
    id: 's3-setup',
    daan: 'Je hebt een boodschap klaar. Wie draagt die uit?',
    question: null,
    options: [
      { label: 'De clubdirectie', value: 'club' },
      { label: 'De supportersvereniging', value: 'association' },
      { label: 'Vaste gezichten uit het vak', value: 'ingroup' },
    ],
  },
  {
    id: 's3-club',
    daan: 'Dat is logisch, maar bij mij landt dat slecht. De directie staat ver van het vak.',
    condition: { ref: 's3-setup', value: 'club' },
  },
  {
    id: 's3-association',
    daan: 'Dat is beter. Of dat genoeg is, hangt af of supporters hen als wij zien.',
    condition: { ref: 's3-setup', value: 'association' },
  },
  {
    id: 's3-ingroup',
    daan: 'Dat is de richting. Iemand uit het vak heeft meer gezag dan een boodschap van boven.',
    condition: { ref: 's3-setup', value: 'ingroup' },
  },
  {
    id: 's3-les',
    daan: 'Het gaat niet alleen om wat je zegt, maar ook om wie de boodschap brengt en wie je met de boodschap aanspreekt.',
    isEnd: true,
  },
]
