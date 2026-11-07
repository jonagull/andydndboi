// Fixed price per session for the whole party, same on every date. Tune here.
export const BASE = { oneshot: 3900, campaign: 2900 } // campaign: per session
export const MIN_DAYS = 3 // earliest bookable date, gives time to prep

// Local YYYY-MM-DD, `days` from now ('sv' locale formats dates as ISO).
export const isoInDays = (days, now = new Date()) => {
  const d = new Date(now)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('sv')
}

export function quote(quest, date) {
  const price = BASE[quest]
  return price && date ? { price } : null
}
