/**
 * Maakt het eerste teken van elke zin een hoofdletter: na . ! ? (met witruimte),
 * aan het begin van de tekst, en na een witregel (nieuwe alinea).
 */
export function capitalizeSentenceStarts(text) {
  if (!text || typeof text !== 'string') return text
  return text
    .replace(/^(\s*)(\p{Ll})/u, (_, ws, c) => ws + c.toUpperCase())
    .replace(/([.!?])(\s+)(\p{Ll})/gu, (_, punct, ws, c) => punct + ws + c.toUpperCase())
    .replace(/(\n{2,}\s*)(\p{Ll})/gu, (_, ws, c) => ws + c.toUpperCase())
}
