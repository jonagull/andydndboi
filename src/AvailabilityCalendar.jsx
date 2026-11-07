import { useState } from 'react'
import { quote, isoInDays, MIN_DAYS } from './pricing'

// Every date is open except Andreas's regular days off and dates he blocks by hand.
// ponytail: hand-kept lists, swap for a Cal.com embed if he wants real-time calendar sync.
const DAYS_OFF = [1, 2] // 0 = Sunday, 1 = Monday, 2 = Tuesday …
const BLOCKED = [] // e.g. ['2026-12-24', '2026-12-31'] for holidays or booked dates
const isFree = (d) => !DAYS_OFF.includes(d.getDay()) && !BLOCKED.includes(iso(d))
const LAST_DAY = isoInDays(90)

const iso = (d) => d.toLocaleDateString('sv')

export default function AvailabilityCalendar({ t, fmt, locale, onPick }) {
  const [offset, setOffset] = useState(0)
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const lead = (first.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const minDay = isoInDays(MIN_DAYS)
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'short' }))

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" className="cal-arrow" onClick={() => setOffset(offset - 1)} disabled={offset === 0} aria-label={t.prev}>‹</button>
        <h3>{first.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</h3>
        <button type="button" className="cal-arrow" onClick={() => setOffset(offset + 1)} disabled={offset === 2} aria-label={t.next}>›</button>
      </div>
      <div className="cal-grid">
        {weekdays.map((w) => <span key={w} className="cal-wd">{w}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = new Date(first.getFullYear(), first.getMonth(), i + 1)
          const day = iso(d)
          const free = day >= minDay && day <= LAST_DAY && isFree(d)
          if (!free) return <span key={day} className="cal-day off">{i + 1}</span>
          const q = quote('oneshot', day)
          return (
            <button key={day} type="button" className="cal-day" onClick={() => onPick(day)}
              aria-label={`${d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}, ${fmt(q.price)}`}>
              <span className="cal-n">{i + 1}</span>
              <span className="cal-p">{fmt(q.price)}</span>
            </button>
          )
        })}
      </div>
      <p className="cal-note">{t.note}</p>
    </div>
  )
}
