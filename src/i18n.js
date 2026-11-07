// All page copy lives here. Add a language = add a key with the same shape.
// ponytail: plain object, swap for i18next if this grows past ~3 languages or needs plurals.

export const T = {
  en: {
    swipe: 'Swipe',
    nav: { who: 'Who', what: 'What', quests: 'Quests', faq: 'FAQ', book: 'Book a Session' },
    hero: {
      eyebrow: 'Professional Dungeon Master for Hire · D&D 5th Edition',
      title: 'Your Legend Begins Here',
      sub: 'Gather your friends. I’ll bring the world, the dragons, the minis and the dice. A fully hosted Dungeons & Dragons adventure, written from scratch for your group. No experience needed, no homework, just a story that’s yours alone.',
      cta: 'Summon Your DM',
      cta2: 'See What’s Included',
      rollPrompt: 'Roll for your destiny.',
      rollAria: 'Roll a twenty-sided die',
      roll: (n) =>
        n === 20 ? 'NATURAL 20! The party awaits you.'
        : n === 1 ? 'Critical fail… better hire a DM.'
        : n >= 15 ? `${n}. The gods smile upon you.`
        : n >= 8 ? `${n}. Respectable. Adventure calls.`
        : `${n}. Ouch. You need a party.`,
    },
    stats: [
      ['5+', 'Years behind the screen'],
      ['100%', 'Custom-made stories'],
      ['3–6', 'Players per table'],
      ['0', 'Experience required'],
    ],
    parties: {
      eyebrow: 'Chapter I',
      title: 'Every Party Is Welcome',
      lede: 'Six strangers or six best friends, first-timers or grizzled veterans. If you’ve got a table, I’ve got a tale.',
      items: [
        ['🕯️', 'Total Beginners', 'Never rolled a die? Perfect. You’ll learn by playing, not by reading a 300-page rulebook.'],
        ['⚔️', 'Veteran Adventurers', 'Tired of being the forever-DM? Sit on the other side of the screen for once and just play.'],
        ['🏰', 'Teams & Companies', 'Team-building that people actually talk about on Monday. Nothing bonds a team like slaying a lich together.'],
        ['🎂', 'Birthdays & Parties', 'A one-night quest built around the guest of honor. Cake optional. Glory guaranteed.'],
        ['🧙', 'Families & Young Heroes', 'Age-appropriate adventures that sneak in teamwork, maths and storytelling without anyone noticing.'],
        ['🌍', 'Online Parties', 'Scattered across the realm? We play over voice and virtual tabletop, with the same immersion.'],
      ],
    },
    oath: {
      eyebrow: 'The Dungeon Master’s Oath',
      title: 'No Two Parties Ever Play the Same Story',
      text: 'I don’t run store-bought modules. Every campaign is forged from scratch for your group: your heroes’ backstories woven into the lore, villains shaped by your choices, your inside jokes hidden on the tavern signs. When the tale ends, it belongs to you.',
      points: ['Written from scratch for your party', 'Built around your heroes and your tastes', 'Never reused for another table'],
    },
    about: {
      eyebrow: 'Behind the Screen',
      title: 'Meet Your Dungeon Master',
      body: [
        'I’ve been running tables for more than five years: in basements, boardrooms, birthday parties and Discord servers at 2 a.m. I’ve watched shy first-timers become fearless paladins and seen grown adults scream at a goblin with a crossbow.',
        'My job is simple. Everyone at the table has a moment where they feel like the hero. I do the voices, paint the minis, build the world and keep the rules out of your way, so all you have to do is decide what your character does next.',
      ],
      sign: '— Andreas, your Dungeon Master',
    },
    loot: {
      eyebrow: 'Chapter II',
      title: 'Contents of the Bag of Holding',
      lede: 'Everything you need for a night of legend, packed and ready. You bring yourselves. I bring the rest.',
      items: [
        ['A Fully Hosted Campaign', 'Worldbuilding, plot, villains, voices and pacing. I run the whole thing so you can just show up and play.'],
        ['Miniatures & Models', 'Painted heroes, monsters and terrain on the table. When the dragon lands, you’ll see it.'],
        ['Ready-Made Character Sheets', 'Pre-built heroes for quick starts, or I’ll guide you step by step through making your own.'],
        ['Dice, Maps & Props', 'Everything a party needs: dice, battle maps, handouts, music and the occasional cursed letter.'],
        ['Rules Taught at the Table', 'No homework. I teach as we go and keep the game moving, so nobody gets stuck in the rules.'],
        ['A Story Forged Only for You', 'No recycled modules. Every campaign is written fresh for your party, and your choices reshape the world as you play.'],
      ],
    },
    steps: {
      eyebrow: 'Chapter III',
      title: 'How the Quest Unfolds',
      items: [
        ['Send a Raven', 'Tell me who’s in your party, when you want to play, and what kind of adventure gets you excited.'],
        ['Session Zero', 'We meet, build characters, set the tone and agree on the table rules. Horror? Comedy? Epic? Your call.'],
        ['Roll Initiative', 'The adventure begins. I bring the world, the minis and the monsters. You bring snacks and bad decisions.'],
        ['The Saga Continues', 'Wrap up in a single legendary night, or keep going for weeks with a campaign that grows with you.'],
      ],
    },
    quests: {
      eyebrow: 'Chapter IV',
      title: 'Choose Your Quest',
      lede: 'Prices are for the whole party, not per player. Every session includes the hours of planning behind it. Everything in the Bag of Holding is included.',
      featured: 'Most Chosen',
      cta: 'Book This Quest',
      // Effective rate ≈ 1,000 NOK/hour of play, with prep baked in. Tune here.
      items: [
        { tier: 'Cantrip', name: 'The One-Shot', price: 'NOK 3,900', unit: '/ party', perPlayer: '≈ NOK 780 per player with 5 players', text: 'A complete adventure in a single session, about 4 hours. Ideal for first-timers, parties and events.', prep: 'Includes ~6 hours of prep: a custom adventure, maps and painted minis for your table.', perks: ['Brand-new adventure', 'Minis & maps included', '3–6 players'] },
        { tier: '3rd Level', name: 'The Campaign Arc', price: 'NOK 2,900', unit: '/ session', perPlayer: '≈ NOK 580 per player with 5 players', text: 'A multi-session story with recurring villains, character growth and twists that pay off. Min. 4 sessions.', prep: 'Includes worldbuilding before you start and fresh prep between every session, shaped by what your party did.', perks: ['Free session zero', 'Written from scratch for you', 'Weekly or bi-weekly'], featured: true },
        { tier: '9th Level', name: 'The Guild Contract', price: 'From NOK 9,900', unit: '', perPlayer: 'Companies, schools & events', text: 'Corporate events, conventions, schools and private groups. Tell me the occasion and I’ll forge the quest.', prep: 'Includes a themed adventure built around your event, plus setup and teardown on site.', perks: ['Multiple tables possible', 'On-site or online', 'Tailored themes'] },
      ],
    },
    gift: {
      eyebrow: 'A Gift of Legend',
      title: 'Give an Adventure',
      text: 'Birthdays, Christmas, bachelor parties. A gift card for a one-shot is the present nobody else thought of.',
      cta: 'Order a Gift Card',
    },
    book: {
      eyebrow: 'Chapter V',
      title: 'Forge Your Quest',
      lede: 'Shape your adventure in five quick steps. Andreas reads your scroll, prepares the world and serves it at your table.',
      steps: ['Quest', 'Party', 'Heroes', 'Theme', 'Table', 'Scroll'],
      back: 'Back',
      next: 'Continue',
      send: 'Send My Quest Scroll',
      pickTime: 'Pick a Time',
      price: {
        fmt: (n) => `NOK ${n.toLocaleString('en')}`,
        first: 'per session',
        hint: 'Fixed price for the whole party. A 50% deposit via Vipps locks your date, the rest is paid on the day.',
      },
      cal: {
        prev: 'Previous month', next: 'Next month',
        note: 'Free dates, One-Shot prices. Tap a date to start your quest with it filled in.',
      },
      restart: 'Start over',
      q: {
        quest: {
          title: 'What kind of quest calls to you?',
          options: [
            ['oneshot', '🕯️', 'The One-Shot', 'One night, one complete adventure'],
            ['campaign', '📜', 'The Campaign Arc', 'An unfolding saga over many sessions'],
            ['guild', '🏰', 'The Guild Contract', 'A company, school or special event'],
            ['unsure', '🔮', 'Not sure yet', 'Help me choose'],
          ],
        },
        party: {
          title: 'Who’s in your party?',
          sizeLabel: 'How many players?',
          sizes: ['2', '3', '4', '5', '6', '7+'],
          expLabel: 'How experienced is the party?',
          exp: [
            ['new', '🌱', 'All brand new', 'Never played before'],
            ['mixed', '⚖️', 'A mix', 'Some have played, some haven’t'],
            ['vets', '🗡️', 'Seasoned veterans', 'We know our way around a d20'],
          ],
        },
        heroes: {
          title: 'Who will your heroes be?',
          options: [
            ['premade', '🎭', 'Hand us heroes', 'Ready-made characters, jump straight in'],
            ['build', '🛠️', 'Help us build our own', 'Andreas guides you through creating them'],
            ['own', '📋', 'We bring our own', 'Our characters are ready to go'],
          ],
          classesLabel: 'Any classes calling to your party? Tap all that sound fun.',
          classes: [
            ['fighter', '⚔️', 'Fighter', 'Master of weapons, first into battle'],
            ['wizard', '🧙', 'Wizard', 'Bends reality with studied spells'],
            ['rogue', '🗝️', 'Rogue', 'Sneaky, clever, picks every lock'],
            ['cleric', '✨', 'Cleric', 'Heals friends, smites foes'],
            ['bard', '🎻', 'Bard', 'Charms, inspires and talks their way out'],
            ['ranger', '🏹', 'Ranger', 'Tracker and archer of the wilds'],
            ['barbarian', '🪓', 'Barbarian', 'Pure rage and big axes'],
            ['paladin', '🛡️', 'Paladin', 'Holy knight bound by an oath'],
          ],
        },
        theme: {
          title: 'What kind of story should it be?',
          options: [
            ['dragons', '🐉', 'Dragons & Glory', 'Classic heroic fantasy'],
            ['horror', '🕸️', 'Dark & Haunted', 'Curses, crypts and creeping dread'],
            ['mystery', '🔍', 'Mystery & Intrigue', 'Secrets, schemes and betrayal'],
            ['comedy', '🍺', 'Comedy & Chaos', 'Taverns, mishaps and terrible plans'],
            ['seas', '🏴‍☠️', 'High Seas', 'Pirates, storms and sea monsters'],
            ['dungeon', '💀', 'Dungeon Delve', 'Traps, treasure and monsters below'],
          ],
        },
        tone: { title: 'Roleplay or battles?', left: 'Roleplay', right: 'Combat' },
        table: {
          title: 'Where and when do we gather?',
          where: [
            ['home', '🏠', 'At our place', 'Andreas brings the table to you'],
            ['venue', '🍻', 'At a venue', 'Office, café or event space'],
            ['online', '🌐', 'Online', 'Voice + virtual tabletop'],
          ],
          date: 'Preferred date',
          name: 'Your name',
          notes: 'Anything else Andreas should know?',
          notesPlaceholder: 'Birthday for Kari, she loves elves. Someone is scared of spiders…',
        },
      },
      scroll: {
        title: 'Your Quest Scroll',
        quest: 'Quest', party: 'Party', heroes: 'Heroes', theme: 'Theme', tone: 'Tone', where: 'Where', date: 'Date', price: 'Price', notes: 'Notes',
        subject: 'A new quest for the Dungeon Master',
        greeting: (dm) => `Hail ${dm}! Our party wishes to begin a quest.`,
        hint: (dm) => `This opens your email with the scroll filled in. Hit send and ${dm} replies within a day with dates and next steps.`,
      },
    },
    faq: {
      eyebrow: 'Chapter VI',
      title: 'Questions From the Tavern',
      items: [
        ['Do I need to know how to play?', 'Not at all. Most of my players start with zero experience. I’ll explain everything at the table, and you’ll be casting spells within the first hour.'],
        ['Is it a pre-written adventure?', 'Never. Every one-shot and campaign is created fresh for your specific group, built around your heroes, your tastes and the things you tell me in session zero. Nobody else will ever play your story.'],
        ['What edition do you run?', 'Dungeons & Dragons 5th Edition. It’s the friendliest edition for new players and still deep enough for veterans.'],
        ['Do we need to buy anything?', 'No. I bring dice, character sheets, miniatures, maps and everything else. You just need yourselves.'],
        ['How many people can play?', 'The sweet spot is 3–6 players per table. Bigger groups? We can split into multiple parties or run a special event.'],
        ['Where do we play?', 'At your place, a venue of your choosing, or online. Tell me what works and we’ll make it happen.'],
        ['Is it okay for people who don’t know each other?', 'Absolutely. We set boundaries together in session zero and use safety tools at the table, so everyone feels comfortable and the game stays fun.'],
        ['How does payment work?', 'Once I confirm your date, you pay a 50% deposit via Vipps to lock it in. The rest is paid via Vipps on the day. Companies can pay by invoice.'],
        ['What if I need to cancel?', 'Free rescheduling up to 48 hours before the session. Cancel later than that and the deposit covers the prep already done. If I ever have to cancel, you get a full refund or a new date. Life happens, even to heroes.'],
        ['What if someone in the group isn’t into fantasy?', 'Give me one session. Worst case, they get to be the bard who insults the dragon.'],
      ],
    },
    final: {
      title: 'The Dragon Won’t Slay Itself',
      sub: 'Spots at the table are limited. Claim yours before the next full moon.',
      cta: 'Roll for Initiative',
    },
    footer: {
      made: 'Crafted by candlelight',
      legal: 'Dungeons & Dragons is a trademark of Wizards of the Coast. This is an independent service, not affiliated with or endorsed by Wizards of the Coast.',
    },
  },

  no: {
    swipe: 'Sveip',
    nav: { who: 'Hvem', what: 'Hva', quests: 'Oppdrag', faq: 'Spørsmål', book: 'Book en økt' },
    hero: {
      eyebrow: 'Profesjonell Dungeon Master til leie · D&D 5. utgave',
      title: 'Din legende begynner her',
      sub: 'Samle vennene dine. Jeg tar med verdenen, dragene, figurene og terningene. Et komplett Dungeons & Dragons-eventyr, skrevet fra bunnen av for akkurat dere. Ingen erfaring nødvendig, ingen lekser, bare en historie som er helt deres.',
      cta: 'Tilkall din DM',
      cta2: 'Se hva som er inkludert',
      rollPrompt: 'Kast for skjebnen din.',
      rollAria: 'Kast en tjuesidet terning',
      roll: (n) =>
        n === 20 ? 'NATURLIG 20! Eventyret venter på deg.'
        : n === 1 ? 'Kritisk bom… du trenger nok en DM.'
        : n >= 15 ? `${n}. Gudene smiler til deg.`
        : n >= 8 ? `${n}. Respektabelt. Eventyret kaller.`
        : `${n}. Au. Du trenger et følge.`,
    },
    stats: [
      ['5+', 'År bak skjermen'],
      ['100%', 'Skreddersydde historier'],
      ['3–6', 'Spillere per bord'],
      ['0', 'Erfaring kreves'],
    ],
    parties: {
      eyebrow: 'Kapittel I',
      title: 'Alle følger er velkomne',
      lede: 'Seks fremmede eller seks bestevenner, nybegynnere eller erfarne veteraner. Har du et bord, har jeg en fortelling.',
      items: [
        ['🕯️', 'Helt nybegynnere', 'Aldri kastet en terning? Perfekt. Du lærer ved å spille, ikke ved å lese en regelbok på 300 sider.'],
        ['⚔️', 'Erfarne eventyrere', 'Lei av å alltid være DM? Sett deg på den andre siden av skjermen for en gangs skyld og bare spill.'],
        ['🏰', 'Team og bedrifter', 'Teambuilding folk faktisk snakker om på mandag. Ingenting knytter et team sammen som å nedkjempe en lich.'],
        ['🎂', 'Bursdager og fester', 'Et eventyr på én kveld bygget rundt æresgjesten. Kake valgfritt. Ære garantert.'],
        ['🧙', 'Familier og unge helter', 'Alderstilpassede eventyr som sniker inn samarbeid, matte og fortellerglede uten at noen merker det.'],
        ['🌍', 'Spill på nett', 'Spredt over hele riket? Vi spiller over tale og virtuelt spillbord, med like stor innlevelse.'],
      ],
    },
    oath: {
      eyebrow: 'Dungeon Masterens ed',
      title: 'Ingen følger spiller noen gang samme historie',
      text: 'Jeg kjører ikke ferdigkjøpte eventyr. Hver kampanje smis fra bunnen av for akkurat dere: heltenes bakgrunnshistorier vevd inn i verdenen, skurker formet av valgene deres, interne vitser gjemt på vertshusskiltene. Når fortellingen er over, er den deres.',
      points: ['Skrevet fra bunnen av for følget deres', 'Bygget rundt heltene og smaken deres', 'Aldri gjenbrukt for et annet bord'],
    },
    about: {
      eyebrow: 'Bak skjermen',
      title: 'Møt din Dungeon Master',
      body: [
        'Jeg har ledet spillbord i over fem år: i kjellere, møterom, bursdager og på Discord klokka to om natta. Jeg har sett sjenerte nybegynnere bli fryktløse paladiner, og voksne folk skrike til en goblin med armbrøst.',
        'Jobben min er enkel. Alle rundt bordet skal få et øyeblikk der de føler seg som helten. Jeg gjør stemmene, maler figurene, bygger verdenen og holder reglene unna, så alt du trenger å gjøre er å bestemme hva karakteren din gjør videre.',
      ],
      sign: '— Andreas, din Dungeon Master',
    },
    loot: {
      eyebrow: 'Kapittel II',
      title: 'Innholdet i Bag of Holding',
      lede: 'Alt du trenger for en legendarisk kveld, pakket og klart. Dere tar med dere selv. Jeg tar med resten.',
      items: [
        ['En komplett kampanje', 'Verdensbygging, handling, skurker, stemmer og tempo. Jeg styrer alt, så dere bare kan møte opp og spille.'],
        ['Figurer og modeller', 'Malte helter, monstre og terreng på bordet. Når dragen lander, ser du den.'],
        ['Ferdige karakterark', 'Ferdiglagde helter for rask start, eller så guider jeg deg steg for steg gjennom å lage din egen.'],
        ['Terninger, kart og rekvisitter', 'Alt et følge trenger: terninger, kampkart, håndskrevne brev, musikk og en og annen forbannet beskjed.'],
        ['Reglene læres underveis', 'Ingen lekser. Jeg forklarer mens vi spiller og holder tempoet oppe, så ingen setter seg fast i reglene.'],
        ['En historie smidd kun for dere', 'Ingen gjenbrukte eventyr. Hver kampanje skrives ny for følget deres, og valgene deres former verdenen underveis.'],
      ],
    },
    steps: {
      eyebrow: 'Kapittel III',
      title: 'Slik utspiller eventyret seg',
      items: [
        ['Send en ravn', 'Fortell meg hvem som er med, når dere vil spille og hva slags eventyr dere har lyst på.'],
        ['Økt null', 'Vi møtes, lager karakterer, setter stemningen og blir enige om bordreglene. Skrekk? Komedie? Episk? Dere bestemmer.'],
        ['Kast for initiativ', 'Eventyret begynner. Jeg tar med verdenen, figurene og monstrene. Dere tar med snacks og dårlige beslutninger.'],
        ['Sagaen fortsetter', 'Avslutt på én legendarisk kveld, eller fortsett i ukevis med en kampanje som vokser med dere.'],
      ],
    },
    quests: {
      eyebrow: 'Kapittel IV',
      title: 'Velg ditt oppdrag',
      lede: 'Prisene gjelder hele følget, ikke per spiller. Hver økt inkluderer timene med planlegging bak. Alt i Bag of Holding er inkludert.',
      featured: 'Mest valgt',
      cta: 'Book dette oppdraget',
      items: [
        { tier: 'Cantrip', name: 'Enkelteventyret', price: '3 900 kr', unit: '/ følge', perPlayer: '≈ 780 kr per spiller med 5 spillere', text: 'Et komplett eventyr på én økt, rundt 4 timer. Perfekt for nybegynnere, fester og arrangementer.', prep: 'Inkluderer ca. 6 timer forberedelse: et skreddersydd eventyr, kart og malte figurer til bordet deres.', perks: ['Helt nytt eventyr', 'Figurer og kart inkludert', '3–6 spillere'] },
        { tier: '3. nivå', name: 'Kampanjen', price: '2 900 kr', unit: '/ økt', perPlayer: '≈ 580 kr per spiller med 5 spillere', text: 'En historie over flere økter med tilbakevendende skurker, karakterutvikling og vendinger som lønner seg. Min. 4 økter.', prep: 'Inkluderer verdensbygging før start og ny forberedelse mellom hver økt, formet av det følget har gjort.', perks: ['Gratis økt null', 'Skrevet fra bunnen av for dere', 'Ukentlig eller annenhver uke'], featured: true },
        { tier: '9. nivå', name: 'Laugskontrakten', price: 'Fra 9 900 kr', unit: '', perPlayer: 'Bedrifter, skoler og arrangementer', text: 'Firmaarrangementer, messer, skoler og private grupper. Fortell meg anledningen, så smir jeg oppdraget.', prep: 'Inkluderer et tematisk eventyr bygget rundt arrangementet, pluss rigging og nedrigging på stedet.', perks: ['Flere bord mulig', 'På stedet eller på nett', 'Skreddersydde temaer'] },
      ],
    },
    gift: {
      eyebrow: 'En gave for legender',
      title: 'Gi bort et eventyr',
      text: 'Bursdag, jul, utdrikningslag. Et gavekort på et enkelteventyr er gaven ingen andre kom på.',
      cta: 'Bestill gavekort',
    },
    book: {
      eyebrow: 'Kapittel V',
      title: 'Smi ditt oppdrag',
      lede: 'Form eventyret ditt i fem raske steg. Andreas leser skriftrullen din, forbereder verdenen og serverer den ved bordet deres.',
      steps: ['Oppdrag', 'Følge', 'Helter', 'Tema', 'Bord', 'Skriftrull'],
      back: 'Tilbake',
      next: 'Fortsett',
      send: 'Send skriftrullen',
      pickTime: 'Velg tidspunkt',
      price: {
        fmt: (n) => `${n.toLocaleString('nb')} kr`,
        first: 'per økt',
        hint: 'Fast pris for hele følget. 50 % depositum med Vipps sikrer datoen, resten betales samme dag.',
      },
      cal: {
        prev: 'Forrige måned', next: 'Neste måned',
        note: 'Ledige datoer, priser for Enkelteventyret. Trykk på en dato for å starte oppdraget med den fylt inn.',
      },
      restart: 'Begynn på nytt',
      q: {
        quest: {
          title: 'Hva slags oppdrag kaller på deg?',
          options: [
            ['oneshot', '🕯️', 'Enkelteventyret', 'Én kveld, ett komplett eventyr'],
            ['campaign', '📜', 'Kampanjen', 'En saga over mange økter'],
            ['guild', '🏰', 'Laugskontrakten', 'Bedrift, skole eller arrangement'],
            ['unsure', '🔮', 'Usikker', 'Hjelp meg å velge'],
          ],
        },
        party: {
          title: 'Hvem er med i følget?',
          sizeLabel: 'Hvor mange spillere?',
          sizes: ['2', '3', '4', '5', '6', '7+'],
          expLabel: 'Hvor erfarne er dere?',
          exp: [
            ['new', '🌱', 'Helt nye', 'Aldri spilt før'],
            ['mixed', '⚖️', 'En blanding', 'Noen har spilt, noen ikke'],
            ['vets', '🗡️', 'Erfarne veteraner', 'Vi kjenner en d20 godt'],
          ],
        },
        heroes: {
          title: 'Hvem skal heltene deres være?',
          options: [
            ['premade', '🎭', 'Gi oss helter', 'Ferdiglagde karakterer, rett i gang'],
            ['build', '🛠️', 'Hjelp oss å lage egne', 'Andreas guider dere gjennom det'],
            ['own', '📋', 'Vi har egne', 'Karakterene våre er klare'],
          ],
          classesLabel: 'Noen klasser som frister? Trykk på alle som høres gøy ut.',
          classes: [
            ['fighter', '⚔️', 'Kriger', 'Våpenmester, først inn i kampen'],
            ['wizard', '🧙', 'Trollmann', 'Bøyer virkeligheten med magi'],
            ['rogue', '🗝️', 'Skurk', 'Snik, list og dirkede låser'],
            ['cleric', '✨', 'Prest', 'Helbreder venner, knuser fiender'],
            ['bard', '🎻', 'Bard', 'Sjarmerer og prater seg ut av alt'],
            ['ranger', '🏹', 'Jeger', 'Sporfinner og bueskytter i villmarka'],
            ['barbarian', '🪓', 'Barbar', 'Rent raseri og store økser'],
            ['paladin', '🛡️', 'Paladin', 'Hellig ridder bundet av en ed'],
          ],
        },
        theme: {
          title: 'Hva slags historie skal det være?',
          options: [
            ['dragons', '🐉', 'Drager og ære', 'Klassisk heltefantasy'],
            ['horror', '🕸️', 'Mørkt og hjemsøkt', 'Forbannelser, gravkamre og uhygge'],
            ['mystery', '🔍', 'Mysterier og intriger', 'Hemmeligheter, renkespill og svik'],
            ['comedy', '🍺', 'Komedie og kaos', 'Vertshus, uhell og elendige planer'],
            ['seas', '🏴‍☠️', 'Det åpne hav', 'Pirater, stormer og sjømonstre'],
            ['dungeon', '💀', 'Inn i dypet', 'Feller, skatter og monstre'],
          ],
        },
        tone: { title: 'Rollespill eller kamp?', left: 'Rollespill', right: 'Kamp' },
        table: {
          title: 'Hvor og når samles vi?',
          where: [
            ['home', '🏠', 'Hjemme hos oss', 'Andreas tar med bordet til dere'],
            ['venue', '🍻', 'På et lokale', 'Kontor, kafé eller eventlokale'],
            ['online', '🌐', 'På nett', 'Tale + virtuelt spillbord'],
          ],
          date: 'Ønsket dato',
          name: 'Navnet ditt',
          notes: 'Noe mer Andreas bør vite?',
          notesPlaceholder: 'Bursdag for Kari, hun elsker alver. Noen er redde for edderkopper…',
        },
      },
      scroll: {
        title: 'Din oppdragsrull',
        quest: 'Oppdrag', party: 'Følge', heroes: 'Helter', theme: 'Tema', tone: 'Stemning', where: 'Sted', date: 'Dato', price: 'Pris', notes: 'Notater',
        subject: 'Et nytt oppdrag til Dungeon Masteren',
        greeting: (dm) => `Hei ${dm}! Følget vårt ønsker å starte et oppdrag.`,
        hint: (dm) => `Dette åpner e-posten din med skriftrullen ferdig utfylt. Trykk send, så svarer ${dm} innen et døgn med datoer og neste steg.`,
      },
    },
    faq: {
      eyebrow: 'Kapittel VI',
      title: 'Spørsmål fra vertshuset',
      items: [
        ['Må jeg kunne spillet fra før?', 'Overhodet ikke. De fleste spillerne mine starter uten erfaring. Jeg forklarer alt rundt bordet, og du kaster trylleformler innen første time.'],
        ['Er det et ferdigskrevet eventyr?', 'Aldri. Hvert enkelteventyr og hver kampanje lages ny for akkurat deres gruppe, bygget rundt heltene deres, smaken deres og det dere forteller meg i økt null. Ingen andre vil noen gang spille historien deres.'],
        ['Hvilken utgave spiller du?', 'Dungeons & Dragons 5. utgave. Den er den mest nybegynnervennlige, men har fortsatt nok dybde for veteraner.'],
        ['Må vi kjøpe noe?', 'Nei. Jeg tar med terninger, karakterark, figurer, kart og alt annet. Dere trenger bare dere selv.'],
        ['Hvor mange kan spille?', 'Det ideelle er 3–6 spillere per bord. Større gruppe? Vi kan dele opp i flere følger eller lage et eget arrangement.'],
        ['Hvor spiller vi?', 'Hjemme hos dere, et sted dere velger, eller på nett. Si hva som passer, så får vi det til.'],
        ['Går det fint for folk som ikke kjenner hverandre?', 'Absolutt. Vi setter grenser sammen i økt null og bruker trygghetsverktøy rundt bordet, så alle føler seg komfortable og spillet holder seg gøy.'],
        ['Hvordan fungerer betalingen?', 'Når jeg har bekreftet datoen, betaler dere 50 % depositum med Vipps for å sikre den. Resten betales med Vipps samme dag. Bedrifter kan betale med faktura.'],
        ['Hva om jeg må avlyse?', 'Gratis ombooking frem til 48 timer før økten. Avlyser dere senere, dekker depositumet forberedelsene som allerede er gjort. Må jeg avlyse, får dere full refusjon eller ny dato. Livet skjer, selv for helter.'],
        ['Hva om noen i gruppa ikke liker fantasy?', 'Gi meg én økt. I verste fall får de være barden som fornærmer dragen.'],
      ],
    },
    final: {
      title: 'Dragen dreper ikke seg selv',
      sub: 'Plassene rundt bordet er begrenset. Sikre deg din før neste fullmåne.',
      cta: 'Kast for initiativ',
    },
    footer: {
      made: 'Laget ved stearinlys',
      legal: 'Dungeons & Dragons er et varemerke som tilhører Wizards of the Coast. Dette er en uavhengig tjeneste, ikke tilknyttet eller godkjent av Wizards of the Coast.',
    },
  },
}

export const LANGS = [['en', 'EN'], ['no', 'NO']]
