/**
 * Testnavigatie: spring naar elke stap tijdens ontwikkeling.
 *
 * Standaard AAN in `npm run dev`, UIT in productie-builds.
 * Uitschakelen: zet in `.env` of `.env.local`:
 *   VITE_DEV_STEP_JUMP=false
 */

export const DEV_STEP_JUMP_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_DEV_STEP_JUMP !== 'false'

export const APP_STEPS = [
  { n: 1, label: 'Incident & Daan' },
  { n: 2, label: 'Drie boodschappen' },
  { n: 3, label: 'H1 · persoonlijke acceptatie' },
  { n: 4, label: 'H2 · sociale acceptatie' },
  { n: 5, label: 'H3 · injunctief vs. descriptief' },
  { n: 6, label: 'H4 · identificatie' },
  { n: 7, label: 'Harde kern' },
  { n: 8, label: 'Implicaties' },
  { n: 9, label: 'Overzicht' },
]
