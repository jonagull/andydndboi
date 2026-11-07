import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Scene from './Scene'
import './index.css'
import './concepts.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Ambient life for every magic layer: flicker, pulse, drift.
function useAmbient(scope) {
  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.flame').forEach((el) =>
        gsap.to(el, { scaleY: 1.25, scaleX: 0.85, transformOrigin: '50% 100%', duration: gsap.utils.random(0.15, 0.3), repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      gsap.to('.orb', { scale: 1.3, transformOrigin: 'center', duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.4 })
      gsap.utils.toArray('.spark').forEach((el) =>
        gsap.to(el, { y: gsap.utils.random(-60, -20), x: gsap.utils.random(-20, 20), opacity: 0, duration: gsap.utils.random(2, 4), repeat: -1, delay: gsap.utils.random(0, 3), ease: 'sine.out' }))
      gsap.to('.dragon', { x: 30, y: -6, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.utils.toArray('.plate, .frame').forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }))
      gsap.to('.d20-glow', { opacity: 0.5, duration: 1.2, repeat: -1, yoyo: true })
    })
  }, { scope })
}

function BeforeAfter({ eyebrow, title, text, before, after }) {
  const [pos, setPos] = useState(50)
  return (
    <section className="concept">
      <header>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </header>
      <div className="ba">
        {before}
        <div className="ba-top" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>{after}</div>
        <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true"><span>⟷</span></div>
        <span className="ba-tag left">Tuesday night</span>
        <span className="ba-tag right">With Andreas</span>
        <input className="ba-range" type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Reveal the magic" />
      </div>
    </section>
  )
}

function ScrollTransform() {
  const ref = useRef(null)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=1600', scrub: 1, pin: true },
    })
    tl.set('.st .m-only', { opacity: 0 })
      .to('.st .cap-1', { opacity: 0, y: -20, duration: 0.3 })
      .to('.st .n-only', { opacity: 0, duration: 1 }, '<0.2')
      .fromTo('.st .m-only', { opacity: 0 }, { opacity: 1, duration: 1 }, '<')
      .fromTo('.st svg', { scale: 1 }, { scale: 1.06, duration: 1 }, '<')
      .fromTo('.st .cap-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
  }, { scope: ref })
  return (
    <section className="concept">
      <header>
        <p className="eyebrow">Concept B</p>
        <h2>Scroll to Transform</h2>
        <p>The page pins and the room changes as you scroll. Great as the bridge between the hero and the rest of the page.</p>
      </header>
      <div className="st" ref={ref}>
        <div className="st-frame">
          <Scene both className="st-img" label="A game night transforming into a magical adventure" />
          <p className="st-cap cap-1">Just a few friends around a table…</p>
          <p className="st-cap cap-2">…until the Dungeon Master speaks.</p>
        </div>
      </div>
    </section>
  )
}

function CastSpell() {
  const ref = useRef(null)
  const [magic, setMagic] = useState(false)
  useGSAP(() => { gsap.set('.cs-frame .m-only', { opacity: 0 }) }, { scope: ref })
  const { contextSafe } = useGSAP({ scope: ref })
  const cast = contextSafe(() => {
    const to = !magic
    setMagic(to)
    gsap.timeline()
      .to('.cs-frame', { x: -6, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' })
      .to('.cs-flash', { opacity: 1, duration: 0.15 }, '<0.2')
      .set('.cs-frame .m-only', { opacity: to ? 1 : 0 })
      .set('.cs-frame .n-only', { opacity: to ? 0 : 1 })
      .to('.cs-flash', { opacity: 0, duration: 0.8 })
      .fromTo('.cs-ring', { scale: 0.2, opacity: 1 }, { scale: 2.4, opacity: 0, duration: 1.1, ease: 'power2.out' }, '<')
  })
  return (
    <section className="concept" ref={ref}>
      <header>
        <p className="eyebrow">Concept C</p>
        <h2>Cast the Spell</h2>
        <p>A button that transforms the scene with a flash and a shockwave. Playful, fits next to a booking call to action.</p>
      </header>
      <div className="cs-frame">
        <Scene both className="cs-img" label={magic ? 'The magical table' : 'The ordinary table'} />
        <div className="cs-flash" aria-hidden="true" />
        <div className="cs-ring" aria-hidden="true" />
      </div>
      <div className="cs-actions">
        <button className="btn btn-big" onClick={cast}>{magic ? 'Dispel Magic' : 'Cast the Spell'}</button>
      </div>
    </section>
  )
}

// Public-domain paintings + engravings (see public/art/pd/CREDITS.txt).
function ArtHero() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.ah-img', { scale: 1.15 }, { scale: 1, duration: 12, ease: 'sine.out' })
      gsap.from('.ah-text > *', { y: 30, opacity: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out', delay: 0.3 })
      gsap.to('.ah-img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    })
  }, { scope: ref })
  return (
    <section className="concept">
      <header>
        <p className="eyebrow">Concept F · Real Art</p>
        <h2>Hero: The Road to Soria Moria</h2>
        <p>Kittelsen’s 1900 painting (public domain) as a full-bleed hero with a slow zoom. A Norwegian classic, and it fits “your legend begins here”.</p>
      </header>
      <div className="ah" ref={ref}>
        <img className="ah-img" src="/art/pd/soria-moria.jpg" alt="A lone traveller gazes at a golden palace far away across misty mountains" />
        <div className="ah-text">
          <p className="eyebrow">Dungeon Master for Hire</p>
          <h3>Your Legend Begins Here</h3>
          <a className="btn" href="#">Summon Your DM</a>
        </div>
        <span className="credit">Theodor Kittelsen, Soria Moria, 1900 · Public domain</span>
      </div>
    </section>
  )
}

function Bestiary() {
  const plates = [
    ['/art/pd/fafnir.jpg', 'Fafnir', 'Arthur Rackham, 1911', 'The dragon who guards the gold'],
    ['/art/pd/sea-troll.jpg', 'Sjøtrollet', 'Theodor Kittelsen, 1887', 'The sea troll rises from the waves'],
  ]
  return (
    <section className="concept">
      <header>
        <p className="eyebrow">Concept G · Real Art</p>
        <h2>The Bestiary Plates</h2>
        <p>Old engravings turned into gold ink on black, like pages from a monster manual. Hover to see the original. Good for section backgrounds or a “monsters you might meet” strip.</p>
      </header>
      <div className="plates reveal-plates">
        {plates.map(([src, name, by, line]) => (
          <figure key={name} className="plate">
            <div className="plate-img"><img src={src} alt={`${name}, ${by}`} /></div>
            <figcaption><strong>{name}</strong><span>{line}</span><em>{by} · Public domain</em></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="concept">
      <header>
        <p className="eyebrow">Concept H · Real Art</p>
        <h2>Framed in the Hall</h2>
        <p>Paintings hung in gilded frames next to the copy, like a castle gallery. Bauer’s trolls are perfect next to “Every Party Is Welcome”.</p>
      </header>
      <div className="hall">
        <figure className="frame"><img src="/art/pd/bauer-trolls.jpg" alt="Two trolls lead a pale princess through a dark forest" /></figure>
        <div>
          <p className="eyebrow">Chapter I</p>
          <h3>Every Party Is Welcome</h3>
          <p>Six strangers or six best friends, first-timers or grizzled veterans. Even trolls. If you’ve got a table, I’ve got a tale.</p>
          <p className="credit-inline">Art: John Bauer, 1913 · Public domain</p>
        </div>
      </div>
    </section>
  )
}

function Concepts() {
  const root = useRef(null)
  useAmbient(root)
  return (
    <main ref={root} className="concepts">
      <div className="concepts-head">
        <a href="/" className="back">← Back to landing page</a>
        <p className="eyebrow">Concept Art · Iteration 2</p>
        <h1>The Table, Transformed</h1>
        <p className="lede">One scene, two worlds: an ordinary game night and the same party once Andreas starts the story. Three ways to present it.</p>
      </div>
      <ArtHero />
      <Bestiary />
      <Gallery />
      {/* Drop AI/illustrated art into public/art/before.jpg + after.jpg (same size + framing). */}
      <BeforeAfter
        eyebrow="Concept A · Painted"
        title="Before & After, Painted"
        text="Same slider, real artwork. Generate the two images, save them as public/art/before.jpg and public/art/after.jpg, and they show up here."
        before={<img className="ba-img" src="/art/before.jpg" alt="An ordinary game night around a table" />}
        after={<img className="ba-img" src="/art/after.jpg" alt="The same table transformed into a magical adventure" />}
      />
      <BeforeAfter
        eyebrow="Concept A"
        title="Before & After Slider"
        text="Drag to cross from an ordinary Tuesday into the realm. Works as a hero image or a standalone section."
        before={<Scene className="ba-img" label="An ordinary game night around a kitchen table" />}
        after={<Scene magic className="ba-img" label="The same table transformed: a wizard Dungeon Master and an awestruck party" />}
      />
      <ScrollTransform />
      <CastSpell />
      <section className="concept static-pair">
        <header>
          <p className="eyebrow">Concept D</p>
          <h2>Side by Side</h2>
          <p>No interaction, just the two frames. Simplest option and works on any device.</p>
        </header>
        <div className="pair">
          <figure><Scene label="Before" /><figcaption>Before</figcaption></figure>
          <figure><Scene magic label="After" /><figcaption>After</figcaption></figure>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><Concepts /></StrictMode>)
