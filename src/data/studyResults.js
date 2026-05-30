/** Hypothese 1 – persoonlijke acceptatie (ANCOVA + gemiddelden in grafiek) */
export const H1_PERSONAL_ACCEPTANCE = {
  main: {
    test: 'one-way ANCOVA',
    f: 'F(2, 390) = 0.21',
    p: '.809',
    covariates: 'leeftijd en opleidingsniveau',
    dv: 'persoonlijke acceptatie van vuurwerkgebruik in een voetbalstadion',
  },
}

/** Hypothese 3 – persoonlijke acceptatie, descriptief vs. injunctief */
export const H3_PERSONAL_ACCEPTANCE = {
  threeWay: {
    test: 'one-way ANCOVA',
    f: 'F(2, 390) = 0.21',
    p: '.809',
  },
  pairwise: {
    test: 'ANCOVA',
    f: 'F(1, 257) = 0.22',
    p: '.641',
    covariates: 'leeftijd en opleidingsniveau',
    conditions: 'descriptieve en injunctieve normconditie',
  },
}

/** Hypothese 4 – identificatie met de harde kern (2 × 3 ANCOVA) */
export const H4_IDENTIFICATION = {
  test: '2 × 3 ANCOVA',
  covariates: 'leeftijd en opleidingsniveau',
  dv: 'persoonlijke acceptatie van vuurwerkgebruik',
  interaction: { f: 'F(2, 387) = 2.60', p: '.076' },
  mainIdentification: {
    f: 'F(1, 387) = 71.68',
    p: '< .001',
    high: { m: 6.01, sd: 1.15 },
    low: { m: 4.71, sd: 1.51 },
  },
  mainMessage: { f: 'F(2, 387) = 0.11', p: '.894' },
}

/** Hypothese 2 – waargenomen sociale acceptatie (geen tabel met gemiddelden in de app) */
export const H2_SOCIAL_APPROVAL = {
  main: {
    test: 'one-way ANCOVA',
    f: 'F(2, 390) = 1.50',
    p: '.224',
    covariates: 'leeftijd en opleidingsniveau',
    dv: 'totale schaal voor waargenomen sociale acceptatie van vuurwerkgebruik in een voetbalstadion',
  },
  subschalen: [
    {
      label: 'waargenomen sociale acceptatie van niet-gewelddadig vuurwerkgebruik',
      test: 'one-way ANOVA',
      f: 'F(2, 390) = 2.06',
      p: '.129',
    },
    {
      label: 'waargenomen sociale acceptatie van vuurwerk gooien',
      test: 'one-way ANOVA',
      f: 'F(2, 390) = 0.37',
      p: '.693',
    },
  ],
}

/**
 * Tabel 3 – gemiddelden (en SD) voor persoonlijke acceptatie per boodschapconditie (schaal 1–7).
 * Alleen gebruikt bij hypothese 1 (grafiek).
 */
export const PERSONAL_ACCEPTANCE = {
  sanctie: { label: 'Sanctionerend', m: 5.39, sd: 1.5 },
  descriptief: { label: 'Descriptief', m: 5.42, sd: 1.45 },
  injunctief: { label: 'Injunctief', m: 5.3, sd: 1.51 },
  totaal: { m: 5.37, sd: 1.49 },
}

function bar(entry, fill) {
  return { name: entry.label, value: entry.m, sd: entry.sd, fill }
}

const ALL_BARS = [
  bar(PERSONAL_ACCEPTANCE.sanctie, '#64748b'),
  bar(PERSONAL_ACCEPTANCE.descriptief, '#94a3b8'),
  bar(PERSONAL_ACCEPTANCE.injunctief, '#f97316'),
]

/** Grafiek alleen waar tabeldata voor persoonlijke acceptatie beschikbaar is */
export const RESULT_CHARTS = {
  h1: {
    title: 'Resultaat',
    subtitle: 'Gemiddelde acceptatie per boodschap (schaal 1–7)',
    comparison: 'Drie boodschapcondities naast elkaar',
    compareInChart: ['Sanctionerend', 'Descriptief', 'Injunctief'],
    yMax: 7,
    bars: ALL_BARS,
  },
  h4: {
    title: 'Resultaat',
    subtitle: 'Gemiddelde acceptatie (schaal 1–7)',
    comparison: 'Lage versus hoge identificatie met de harde kern',
    compareInChart: ['Lage identificatie', 'Hoge identificatie'],
    yMax: 7,
    bars: [
      { name: 'Lage identificatie', value: 4.71, fill: '#64748b' },
      { name: 'Hoge identificatie', value: 6.01, fill: '#f97316' },
    ],
  },
}
