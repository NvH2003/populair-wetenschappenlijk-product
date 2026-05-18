/**
 * Stap 8 – beleidsimplicaties als scenario's (par. 5.2.3.2).
 * Elk item is een reeks DaanChat script-entries die direct in Step11 worden gebruikt.
 */
export const IMPLICATIONS_SCRIPT = [
  // ── Intro ────────────────────────────────────────────────────────────────
  {
    id: 'intro',
    daan: 'De cijfers zijn duidelijk. Nu de vraag die er voor jou als SLO echt toe doet: wat doe je hiermee in de praktijk? Ik zet je drie keer in een echte situatie. Kies steeds wat jij zou doen.',
  },

  // ── Scenario 1: losse boodschap ──────────────────────────────────────────
  {
    id: 's1-setup',
    daan: 'Scenario 1. De club wil vuurwerk aanpakken en vraagt jou als SLO wat te doen. Het voorstel op tafel: een nieuw verbodsbord bij de ingang en een tekst op het stadionscherm. Wat adviseer jij?',
    question: null,
    options: [
      { label: 'Goed idee, een duidelijk signaal naar iedereen', value: 'good' },
      { label: 'Ik twijfel, dit alleen verandert waarschijnlijk weinig', value: 'doubt' },
      { label: 'Nee, dit werkt eerder averechts bij de harde kern', value: 'against' },
    ],
  },
  {
    id: 's1-good',
    daan: 'Begrijpelijk, maar het onderzoek geeft reden tot twijfel. Sanctie en normboodschappen verschilden niet significant van elkaar op persoonlijke acceptatie. De sanctionerende boodschap liet zelfs gemiddeld de hoogste acceptatie zien. Een bord of schermtekst alléén is niet genoeg.',
    condition: { ref: 's1-setup', value: 'good' },
  },
  {
    id: 's1-doubt',
    daan: 'Terecht. Het onderzoek laat zien dat de drie boodschapcondities niet significant van elkaar verschilden op persoonlijke acceptatie. Een losse communicatieactie, hoe duidelijk ook, verandert ingesleten groepsgedrag niet. Structurele aanpak is nodig.',
    condition: { ref: 's1-setup', value: 'doubt' },
  },
  {
    id: 's1-against',
    daan: 'Sterk punt. De sanctionerende boodschap liet zelfs de hoogste gemiddelde acceptatie zien van de drie condities. Dat wijst erop dat dreigen zonder context averechts kan werken. Alleen communiceren over regels en straffen is niet genoeg.',
    condition: { ref: 's1-setup', value: 'against' },
  },
  {
    id: 's1-les',
    daan: 'Les 1: verwacht niet dat een losse boodschap op zichzelf gedrag verandert, ongeacht of die normatief of sanctionerend is.',
    waitForContinue: true,
    continueLabel: 'Naar scenario 2',
  },

  // ── Scenario 2: sociale identiteit ──────────────────────────────────────
  {
    id: 's2-setup',
    daan: 'Scenario 2. Je wil een campagne opzetten om vuurwerkgebruik in het stadion te verminderen. Hoe pak jij dat aan?',
    question: null,
    options: [
      { label: 'Één boodschap voor alle supporters, uniform en duidelijk', value: 'uniform' },
      { label: 'Aparte aanpak voor de harde kern, zij zijn anders', value: 'separate' },
      { label: 'Eerst luisteren in het vak, dan pas iets communiceren', value: 'listen' },
    ],
  },
  {
    id: 's2-uniform',
    daan: 'Eén boodschap klinkt efficiënt, maar het onderzoek laat zien dat identificatie met de harde kern sterk samenhangt met hogere acceptatie van vuurwerk. Een generieke campagne mist die groep volledig. Wie je voor je hebt, bepaalt of iets binnenkomt.',
    condition: { ref: 's2-setup', value: 'uniform' },
  },
  {
    id: 's2-separate',
    daan: 'Goed instinct. Identificatie met de harde kern was de sterkste voorspeller van persoonlijke acceptatie in dit onderzoek. Beleid dat geen rekening houdt met die groepscultuur werkt langs de doelgroep heen.',
    condition: { ref: 's2-setup', value: 'separate' },
  },
  {
    id: 's2-listen',
    daan: 'Precies de goede volgorde. Wie zich sterk identificeert met de harde kern, denkt in groepsnormen, niet in procenten op een scherm. Je moet eerst begrijpen wat die groep drijft voordat je iets zinnigs kunt zeggen.',
    condition: { ref: 's2-setup', value: 'listen' },
  },
  {
    id: 's2-les',
    daan: 'Les 2: identificatie met de harde kern bepaalt in sterke mate hoe iemand reageert. Communicatie moet aansluiten bij de groepscultuur van fanatieke supporters, niet alleen bij het reglement.',
    waitForContinue: true,
    continueLabel: 'Naar scenario 3',
  },

  // ── Scenario 3: afzender & ingroup ──────────────────────────────────────
  {
    id: 's3-setup',
    daan: 'Scenario 3. Je hebt een boodschap klaar over vuurwerkgedrag. Nu de vraag: wie draagt die boodschap uit?',
    question: null,
    options: [
      { label: 'De clubdirectie, dat geeft gewicht', value: 'club' },
      { label: 'De supportersvereniging van de club', value: 'association' },
      { label: 'Vaste gezichten uit de harde kern zelf', value: 'ingroup' },
    ],
  },
  {
    id: 's3-club',
    daan: 'Logisch vanuit de organisatie, maar bij mij landt dat slecht. De directie staat ver van het vak. In stap 7 zag je al: club en bond zijn voor de harde kern eerder "zij" dan "wij". Een boodschap van hen roept eerder weerstand op dan verandering.',
    condition: { ref: 's3-setup', value: 'club' },
  },
  {
    id: 's3-association',
    daan: 'Beter. De supportersvereniging staat dichter bij de groep. Het is nog steeds een officieel kanaal, maar wel van de club. Of dat genoeg is, hangt af van hoe sterk supporters de vereniging als "wij" zien. Vervolgonderzoek moet dit bevestigen.',
    condition: { ref: 's3-setup', value: 'association' },
  },
  {
    id: 's3-ingroup',
    daan: 'Dat is de richting die het onderzoek aanbeveelt. Wie de afzender en de referentiegroep als geloofwaardig en herkenbaar ervaart, staat opener voor de boodschap. Iemand uit het vak zelf heeft meer gezag dan een zin van boven.',
    condition: { ref: 's3-setup', value: 'ingroup' },
  },
  {
    id: 's3-les',
    daan: 'Les 3: let op wie de boodschap uitdraagt en naar welke groep wordt verwezen. Ingroup-bronnen, zoals supportersvertegenwoordigers of gerespecteerde supporters, zijn waarschijnlijk effectiever. Vervolgonderzoek moet dit bevestigen.',
    waitForContinue: true,
    continueLabel: 'Verder',
  },

  // ── Afsluiter ────────────────────────────────────────────────────────────
  {
    id: 'close',
    daan: 'Drie scenario\'s, drie lessen. De kern: niet wat je zegt, maar hoe je het zegt, wie je aanspreekt en wie het zegt. Dat is wat dit onderzoek jou als SLO meegeeft.',
    isEnd: true,
  },
]
