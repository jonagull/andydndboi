import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { T, LANGS } from './i18n'
import QuestBuilder from './QuestBuilder'
import AvailabilityCalendar from './AvailabilityCalendar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Edit these to make the page his.
const BRAND = 'DinDM'
const DM_NAME = 'Andreas'
const DM_FULL_NAME = 'Andreas Flatekvål'
const EMAIL = 'andreasersfla@gmail.com'
const GIFT = `mailto:${EMAIL}?subject=Gift%20card%20order`
// Paste a Cal.com / Calendly link here to show a "Pick a Time" button on the last wizard step.
const BOOKING_URL = ''

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'
const NUMERALS = ['I', 'II', 'III', 'IV']

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved && T[saved]) return saved
  } catch { /* storage blocked */ }
  return 'no' // dindm.no: Norwegian audience, EN is one tap away
}

function D20({ value = 20, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points="50,3 93,27 93,73 50,97 7,73 7,27" className="d20-face" />
      <polygon points="50,24 79,70 21,70" className="d20-line" />
      <path d="M50,3 L50,24 M93,27 L79,70 M93,27 L50,24 M93,73 L79,70 M50,97 L79,70 M50,97 L21,70 M7,73 L21,70 M7,27 L21,70 M7,27 L50,24" className="d20-line" />
      <text x="50" y="59" className="d20-num">{value}</text>
    </svg>
  )
}

function MagicCircle() {
  return (
    <svg viewBox="0 0 400 400" className="magic-circle" aria-hidden="true">
      <defs>
        <path id="ring" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
      </defs>
      <circle cx="200" cy="200" r="190" />
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="100" className="thin" />
      <text><textPath href="#ring">{RUNES.repeat(2)}</textPath></text>
      <polygon points="200,50 330,275 70,275" className="thin" />
      <polygon points="200,350 70,125 330,125" className="thin" />
    </svg>
  )
}

function SectionHead({ eyebrow, title, lede }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

export default function App() {
  const root = useRef(null)
  const dieRef = useRef(null)
  const [lang, setLang] = useState(initialLang)
  const t = T[lang]
  const [roll, setRoll] = useState(20)
  const [rollResult, setRollResult] = useState(null)
  const [pickedDate, setPickedDate] = useState('')
  const embers = useRef(Array.from({ length: window.innerWidth < 600 ? 15 : 40 }, (_, i) => i)).current

  useEffect(() => {
    document.documentElement.lang = lang === 'no' ? 'nb' : 'en'
    document.title = lang === 'no' ? `${BRAND} – Dungeon Master til leie` : `${BRAND} – Dungeon Master for hire`
    try { localStorage.setItem('lang', lang) } catch { /* storage blocked */ }
  }, [lang])

  // Mobile book button shows only while the hero's own buttons are off screen…
  useEffect(() => {
    // …and hides again over the booking section so it never covers the wizard's buttons.
    const btn = document.querySelector('.sticky-cta')
    const visible = new Map()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting))
      btn.classList.toggle('show', ![...visible.values()].some(Boolean))
    })
    document.querySelectorAll('.hero-ctas, #book').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.magic-circle', { scale: 0.4, opacity: 0, duration: 1.6, ease: 'expo.out' })
        .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8 }, '-=1.1')
        .from('.hero-title .char', { yPercent: 120, opacity: 0, rotate: 8, stagger: 0.035, duration: 0.9 }, '-=0.6')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-ctas > *', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.4')
        .from('.roller', { scale: 0, rotate: -360, opacity: 0, duration: 1.1, ease: 'back.out(1.6)' }, '-=0.6')

      gsap.to('.magic-circle', { rotate: 360, duration: 120, repeat: -1, ease: 'none' })

      gsap.utils.toArray('.ember').forEach((el) => {
        gsap.set(el, { x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight + 20, scale: gsap.utils.random(0.4, 1.2) })
        gsap.to(el, {
          y: -40,
          x: `+=${gsap.utils.random(-120, 120)}`,
          opacity: 0,
          duration: gsap.utils.random(6, 14),
          delay: gsap.utils.random(0, 10),
          repeat: -1,
          ease: 'none',
        })
      })

      gsap.to('.hero-inner', {
        yPercent: 30, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.utils.toArray('.section-head').forEach((el) => {
        gsap.from(el.children, {
          y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.utils.toArray('.reveal-group').forEach((group) => {
        gsap.from(group.children, {
          y: 60, opacity: 0, rotateX: -15, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 80%' },
        })
      })

      // Stats count up from 0 (reads the number out of the text, keeps suffix like "+" or "★")
      gsap.utils.toArray('.stat-n').forEach((el) => {
        const [, num, rest] = el.textContent.match(/^([\d.,]+)(.*)$/) || []
        if (!num || num === '0') return
        const decimals = num.includes('.') || num.includes(',') ? 1 : 0
        const sep = num.includes(',') ? ',' : '.'
        const target = parseFloat(num.replace(',', '.'))
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = obj.v.toFixed(decimals).replace('.', sep) + rest },
        })
      })

      gsap.from('.path-line', {
        scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })

      gsap.from('.scroll-card', {
        clipPath: 'inset(50% 0 50% 0)', stagger: 0.15, duration: 1.1, ease: 'power2.inOut', clearProps: 'clipPath',
        scrollTrigger: { trigger: '.quests', start: 'top 75%' },
      })

      gsap.timeline({ scrollTrigger: { trigger: '.oath', start: 'top 70%' } })
        .from('.oath-inner', { clipPath: 'inset(50% 0 50% 0)', duration: 1, ease: 'power2.inOut', clearProps: 'clipPath' })
        .from('.seal', { scale: 3, rotate: -40, opacity: 0, duration: 0.5, ease: 'power4.in' })
        .to('.oath-inner', { x: 4, duration: 0.05, repeat: 5, yoyo: true, clearProps: 'x' })
        .from('.oath-points li', { x: -20, opacity: 0, stagger: 0.15, duration: 0.5 })

      gsap.from('.about-seal', {
        rotate: -180, scale: 0, duration: 1.4, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.about', start: 'top 75%' },
      })

      gsap.from('.final h2', {
        scale: 0.6, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.final', start: 'top 75%' },
      })
    })
  }, { scope: root })

  const { contextSafe } = useGSAP({ scope: root })
  const rollDie = contextSafe(() => {
    const n = Math.ceil(Math.random() * 20)
    const ticker = { v: 0 }
    gsap.timeline()
      .to(dieRef.current, { rotate: '+=720', scale: 0.8, duration: 0.7, ease: 'power2.in' })
      .to(ticker, { v: 12, duration: 0.7, ease: 'none', onUpdate: () => setRoll(Math.ceil(Math.random() * 20)) }, 0)
      .add(() => { setRoll(n); setRollResult(n) })
      .to(dieRef.current, { scale: n === 20 ? 1.25 : 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      .to(dieRef.current, { scale: 1, duration: 0.4 })
    if (n === 20) gsap.fromTo('.crit-flash', { opacity: 0.8 }, { opacity: 0, duration: 1.2 })
  })

  return (
    <div ref={root}>
      <div className="crit-flash" aria-hidden="true" />
      <div className="embers" aria-hidden="true">
        {embers.map((i) => <span key={i} className="ember" />)}
      </div>

      <nav className="nav">
        <a href="#top" className="brand"><D20 className="brand-die" /> {BRAND}</a>
        <div className="nav-links">
          <a href="#parties">{t.nav.who}</a>
          <a href="#loot">{t.nav.what}</a>
          <a href="#quests">{t.nav.quests}</a>
          <a href="#faq">{t.nav.faq}</a>
          <div className="lang" role="group" aria-label="Language">
            {LANGS.map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)} aria-pressed={lang === code}>{label}</button>
            ))}
          </div>
          <a href="#book" className="btn btn-small">{t.nav.book}</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-inner">
          <MagicCircle />
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-title" aria-label={t.hero.title}>
            {t.hero.title.split(' ').map((word, w) => (
              <span key={w} className="word" aria-hidden="true">
                {word.split('').map((c, i) => <span key={i} className="char">{c}</span>)}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-ctas">
            <a href="#book" className="btn">{t.hero.cta}</a>
            <a href="#loot" className="btn btn-ghost">{t.hero.cta2}</a>
          </div>
          <button className="roller" onClick={rollDie} aria-label={t.hero.rollAria}>
            <span ref={dieRef} className="roller-die"><D20 value={roll} /></span>
            <span className="roller-text" aria-live="polite">
              {rollResult ? t.hero.roll(rollResult) : t.hero.rollPrompt}
            </span>
          </button>
        </div>
      </header>

      <div className="stats" key={`stats-${lang}`}>
        {t.stats.map(([n, label]) => (
          <div key={label} className="stat">
            <span className="stat-n">{n}</span>
            <span className="stat-l">{label}</span>
          </div>
        ))}
      </div>

      <section id="parties" className="section">
        <SectionHead {...t.parties} />
        <div className="grid reveal-group">
          {t.parties.items.map(([icon, title, text], i) => (
            <article key={i} className="card">
              <span className="card-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="swipe-hint" aria-hidden="true">{t.swipe} →</p>
      </section>

      <section className="oath">
        <div className="oath-inner">
          <div className="seal" aria-hidden="true"><span>{DM_NAME[0]}</span></div>
          <p className="eyebrow">{t.oath.eyebrow}</p>
          <h2>{t.oath.title}</h2>
          <p className="oath-text">{t.oath.text}</p>
          <ul className="oath-points">
            {t.oath.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      <section className="section about">
        <div className="about-inner">
          <div className="about-portrait">
            {/* ponytail: swap for <img src="/andy.jpg"> once there's a photo */}
            <D20 className="about-seal" value={DM_NAME[0]} />
          </div>
          <div>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
            {t.about.body.map((p, i) => <p key={i} className="about-p">{p}</p>)}
            <p className="about-sign">{t.about.sign}</p>
          </div>
        </div>
      </section>

      <section id="loot" className="section section-dark">
        <SectionHead {...t.loot} />
        <div className="grid grid-loot reveal-group">
          {t.loot.items.map(([title, text], i) => (
            <article key={i} className="loot">
              <span className="loot-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="swipe-hint" aria-hidden="true">{t.swipe} →</p>
      </section>

      <section className="section">
        <SectionHead {...t.steps} />
        <div className="steps">
          <span className="path-line" aria-hidden="true" />
          <ol className="reveal-group">
            {t.steps.items.map(([title, text], i) => (
              <li key={i} className="step">
                <span className="step-n">{NUMERALS[i]}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="quests" className="section section-dark">
        <SectionHead {...t.quests} />
        <div className="quests">
          {t.quests.items.map((q, i) => (
            <article key={i} className={`scroll-card${q.featured ? ' featured' : ''}`}>
              {q.featured && <span className="ribbon">{t.quests.featured}</span>}
              <p className="tier">{q.tier}</p>
              <h3>{q.name}</h3>
              <p className="price">{q.price} <span>{q.unit}</span></p>
              {q.perPlayer && <p className="per-player">{q.perPlayer}</p>}
              <p>{q.text}</p>
              {q.prep && <p className="prep">{q.prep}</p>}
              <ul>{q.perks.map((p) => <li key={p}>{p}</li>)}</ul>
              <a href="#book" className={`btn ${q.featured ? '' : 'btn-ghost'}`}>{t.quests.cta}</a>
            </article>
          ))}
        </div>
        <p className="swipe-hint" aria-hidden="true">{t.swipe} →</p>
      </section>

      <section className="gift">
        <div className="gift-inner">
          <span className="gift-icon" aria-hidden="true">🎁</span>
          <div>
            <p className="eyebrow">{t.gift.eyebrow}</p>
            <h2>{t.gift.title}</h2>
            <p>{t.gift.text}</p>
          </div>
          <a href={GIFT} className="btn">{t.gift.cta}</a>
        </div>
      </section>

      <section id="book" className="section section-dark">
        <SectionHead {...t.book} />
        <AvailabilityCalendar t={t.book.cal} fmt={t.book.price.fmt} locale={lang === 'no' ? 'nb' : 'en'}
          onPick={(d) => { setPickedDate(d); document.querySelector('.qb')?.scrollIntoView({ behavior: 'smooth' }) }} />
        <QuestBuilder key={`${lang}-${pickedDate}`} initialDate={pickedDate} t={t.book} email={EMAIL} bookingUrl={BOOKING_URL} dmName={DM_NAME} />
      </section>

      <section id="faq" className="section">
        <SectionHead {...t.faq} />
        <div className="faq reveal-group">
          {t.faq.items.map(([q, a], i) => (
            <details key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final">
        <D20 className="final-die" />
        <h2>{t.final.title}</h2>
        <p>{t.final.sub}</p>
        <a href="#book" className="btn btn-big">{t.final.cta}</a>
      </section>

      <a href="#book" className="btn sticky-cta">{t.nav.book}</a>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {BRAND} · {DM_FULL_NAME} · {t.footer.made}</p>
        <p className="fine">{t.footer.legal}</p>
      </footer>
    </div>
  )
}
