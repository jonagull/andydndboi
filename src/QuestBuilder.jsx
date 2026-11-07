import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { quote, isoInDays, MIN_DAYS } from './pricing'

// Booking wizard: the party shapes their adventure step by step, and the last step
// turns the choices into a pre-filled email. No backend needed.
// ponytail: mailto hand-off, swap for a form service (Formspree etc.) if emails go missing.

const START = { quest: null, size: '4', exp: 'mixed', heroes: null, classes: [], theme: null, tone: 50, where: null, address: '', date: '', time: '', name: '', notes: '' }

function Choice({ options, value, onPick, multi = false, small = false }) {
  return (
    <div className={`qb-choices${small ? ' small' : ''}`} role={multi ? 'group' : 'radiogroup'}>
      {options.map(([id, icon, label, desc]) => {
        const on = multi ? value.includes(id) : value === id
        return (
          <button
            key={id}
            type="button"
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={on}
            className={`qb-choice${on ? ' on' : ''}`}
            onClick={() => onPick(id)}
          >
            {icon && <span className="qb-icon" aria-hidden="true">{icon}</span>}
            <span className="qb-label">{label}</span>
            {desc && <span className="qb-desc">{desc}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default function QuestBuilder({ t, email, bookingUrl, dmName, initialDate = '' }) {
  const [step, setStep] = useState(0)
  const [a, setA] = useState({ ...START, date: initialDate })
  const panel = useRef(null)
  const set = (k) => (v) => setA((s) => ({ ...s, [k]: v }))
  const toggleClass = (id) => setA((s) => ({ ...s, classes: s.classes.includes(id) ? s.classes.filter((c) => c !== id) : [...s.classes, id] }))

  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(panel.current.children, { x: 40, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' })
    })
  }, { dependencies: [step], scope: panel })

  const q = t.q
  const label = (opts, id) => opts.find((o) => o[0] === id)?.[2] ?? '—'
  const canNext = [a.quest, true, a.heroes, a.theme, true][step] ?? true
  const last = t.steps.length - 1

  const price = quote(a.quest, a.date)
  const priceText = price && `${t.price.fmt(price.price)}${a.quest === 'campaign' ? ` (${t.price.first})` : ''}`

  const inPerson = a.where && a.where !== 'online'
  const summary = [
    [t.scroll.quest, label(q.quest.options, a.quest)],
    [t.scroll.party, `${a.size} · ${label(q.party.exp, a.exp)}`],
    [t.scroll.heroes, label(q.heroes.options, a.heroes) + (a.classes.length ? ` (${a.classes.map((c) => label(q.heroes.classes, c)).join(', ')})` : '')],
    [t.scroll.theme, label(q.theme.options, a.theme)],
    [t.scroll.tone, `${100 - a.tone}% ${q.tone.left} / ${a.tone}% ${q.tone.right}`],
    [t.scroll.where, a.where ? label(q.table.where, a.where) : '—'],
    ...(inPerson ? [[t.scroll.address, a.address || '—']] : []),
    [t.scroll.date, [a.date, a.time].filter(Boolean).join(' ') || '—'],
    ...(priceText ? [[t.scroll.price, priceText]] : []),
  ]
  const body = [
    t.scroll.greeting(dmName),
    '',
    ...summary.map(([k, v]) => `${k}: ${v}`),
    ...(a.notes ? ['', `${t.scroll.notes}: ${a.notes}`] : []),
    '',
    a.name || '',
  ].join('\n')
  const mailto = `mailto:${email}?subject=${encodeURIComponent(t.scroll.subject)}&body=${encodeURIComponent(body)}`

  return (
    <div className="qb">
      <ol className="qb-progress">
        {t.steps.map((s, i) => (
          <li key={s} className={i === step ? 'now' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
            <span className="qb-dot">{i < step ? '✦' : i + 1}</span>
            <span className="qb-step-name">{s}</span>
          </li>
        ))}
      </ol>

      <div className="qb-panel" ref={panel} key={step}>
        {step === 0 && <>
          <h3>{q.quest.title}</h3>
          <Choice options={q.quest.options} value={a.quest} onPick={set('quest')} />
        </>}

        {step === 1 && <>
          <h3>{q.party.title}</h3>
          <p className="qb-sub">{q.party.sizeLabel}</p>
          <Choice small options={q.party.sizes.map((n) => [n, null, n])} value={a.size} onPick={set('size')} />
          <p className="qb-sub">{q.party.expLabel}</p>
          <Choice options={q.party.exp} value={a.exp} onPick={set('exp')} />
        </>}

        {step === 2 && <>
          <h3>{q.heroes.title}</h3>
          <Choice options={q.heroes.options} value={a.heroes} onPick={set('heroes')} />
          {a.heroes === 'build' && <>
            <p className="qb-sub">{q.heroes.classesLabel}</p>
            <Choice small multi options={q.heroes.classes} value={a.classes} onPick={toggleClass} />
          </>}
        </>}

        {step === 3 && <>
          <h3>{q.theme.title}</h3>
          <Choice options={q.theme.options} value={a.theme} onPick={set('theme')} />
          <label className="qb-sub" htmlFor="qb-tone">{q.tone.title}</label>
          <div className="qb-tone">
            <span>{q.tone.left}</span>
            <input id="qb-tone" type="range" min="0" max="100" step="10" value={a.tone} onChange={(e) => set('tone')(+e.target.value)} />
            <span>{q.tone.right}</span>
          </div>
        </>}

        {step === 4 && <>
          <h3>{q.table.title}</h3>
          <Choice options={q.table.where} value={a.where} onPick={set('where')} />
          <div className="qb-fields">
            <label>{q.table.date}<input type="date" min={isoInDays(MIN_DAYS)} value={a.date} onChange={(e) => set('date')(e.target.value)} /></label>
            <label>{q.table.time}<input type="time" step={900} value={a.time} onChange={(e) => set('time')(e.target.value)} /></label>
            <p className="qb-price wide" aria-live="polite">{priceText || t.price.hint}</p>
            {inPerson && <label className="wide">{q.table.address}<input type="text" maxLength={200} autoComplete="street-address" placeholder={q.table.addressPlaceholder} value={a.address} onChange={(e) => set('address')(e.target.value)} /></label>}
            <label>{q.table.name}<input type="text" maxLength={80} value={a.name} onChange={(e) => set('name')(e.target.value)} /></label>
            <label className="wide">{q.table.notes}<textarea rows={3} maxLength={1000} placeholder={q.table.notesPlaceholder} value={a.notes} onChange={(e) => set('notes')(e.target.value)} /></label>
          </div>
        </>}

        {step === last && <>
          <div className="qb-scroll">
            <h3>{t.scroll.title}</h3>
            <dl>
              {summary.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            {a.notes && <p className="qb-notes">“{a.notes}”</p>}
          </div>
          <p className="qb-hint">{t.scroll.hint(dmName)}</p>
          <div className="qb-final">
            <a href={mailto} className="btn btn-big">{t.send}</a>
            {bookingUrl && <a href={bookingUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">{t.pickTime}</a>}
          </div>
        </>}
      </div>

      <div className="qb-nav">
        {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>{t.back}</button>}
        {step < last
          ? <button type="button" className="btn" disabled={!canNext} onClick={() => setStep(step + 1)}>{t.next}</button>
          : <button type="button" className="qb-restart" onClick={() => { setA(START); setStep(0) }}>{t.restart}</button>}
      </div>
    </div>
  )
}
