/**
 * Testnavigatie: spring naar elke stap tijdens ontwikkeling.
 *
 * Zichtbaar alleen bij `npm run dev` (niet op de live site na `npm run build` / Vercel).
 * Tijdens dev uitschakelen: in `.env` of `.env.local`:
 *   VITE_DEV_STEP_JUMP=false
 *
 * Let op: `npm run preview` gebruikt een productie-build, dus daar is de knop ook weg.
 */

export const DEV_STEP_JUMP_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_DEV_STEP_JUMP !== 'false'

export const APP_STEPS = [
  { n: 1, label: 'Incident & intro' },
  { n: 2, label: 'Drie boodschappen' },
  { n: 3, label: 'Resultaten' },
  { n: 4, label: 'Harde kern' },
  { n: 5, label: 'Implicaties' },
  { n: 6, label: 'Takeaway' },
]
