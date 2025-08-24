import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";


const pub = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`;

const ABOUT = {
  photo: "Henry Kacik.png",
  headline: "Henry Kacik Lighting Design",
  bio: `I'm a Brooklyn-based lighting designer for theatre, concerts, and events, and a proud Emerson College alum. I fell in love with lighting design thanks to my brother, who first showed me how light could tell a story just as powerfully as words or music. Ten years later, I’m still chasing that magic. I approach every project with curiosity, creativity, and a storyteller’s eye, shaping light to set the mood, guide the audience, and make moments unforgettable.`,
};



const PROJECTS = [
 {
   
   id: "great-comet-2024",
  title: "Natasha, Pierre, and the Great Comet of 1812",
  role: "Lighting Designer",
  year: "2024",
  hero: pub("greatcomet/comet10.jpg"),
  blurb: "Natasha, Pierre & The Great Comet of 1812 is an electrifying, immersive musical that blends Tolstoy’s War and Peace with a genre-defying score. Our design team channeled this mismatch into the design, resulting in a beautiful production.",
  photos: [
    pub("greatcomet/comet1.jpg"),
    pub("greatcomet/comet2.jpg"),
    pub("greatcomet/comet3.jpg"),
    pub("greatcomet/comet4.jpg"),
    pub("greatcomet/comet5.jpg"),
    pub("greatcomet/comet6.jpg"),
    pub("greatcomet/comet7.jpg"),
    pub("greatcomet/comet8.jpg"),
    pub("greatcomet/comet9.jpg"),
    pub("greatcomet/comet10.jpg") 
  ],
  captions: [
    "Pierre - Our main character takes the spotlight, with lighting showing the tension he’s feeling inside.",
    "Natasha & The Bolkonskys - Natasha and her future sister-in-law size each other up, their differences clear in the contrast.",
    "The Opera - The dream ballet of The Opera bursts onto the stage with a big, dramatic shift in lighting.",
    "The Opera - Sonya sings to Natasha from her box. I got to use the actual theatre architecture here, and it quickly became a key part of the design.",
    "The Duel - The party kicks off! The lighting moves fast and wild to match the cast’s energy.",
    "The Duel - The party gets even bigger, with strobes and quick changes that felt even crazier in person.",
    "Dust & Ashes - Soft blue light surrounds Pierre, matching the quiet and personal nature of the song.",
    "Balaga - Bright, bold colors keep up with Balaga’s over-the-top energy.",
    "A Call to Pierre - Marya’s desperation meets Pierre’s calm, shown through a cleaner, more focused look.",
    "Finale - Hanging globes glow across the stage and in the architecture above the audience, creating our Great Comet of 1812."
  ],
  credits: [
    "By: Dave Malloy",
    "Directed by: Bevin O'Gara",
    "Production Electrician: Lauren Hodgkins",
    "Scenic Design: Baron E. Pugh",
    "Costume Design: Chloe Moore",
    "Sound Design: Elizabeth Cahill",
    "Hair and Makeup Design: Livvy Waszak",
    "Props Lead: Mariel Richardson",
    "Choreography: Christopher Shin",
    "Music Direction: Sariva Goetz",
    "Stage Manager: Emma Alvarez-Roth",
    "Production Supervisor: Blake Berggren",
    "Dramaturg: David Estabrooks & Seramay Schultz",
    "Photos By: Nile Scott Studios"
  ]
 },
  { 
    id: "antony-cleopatra-2024", 
    title: "Antony & Cleopatra", 
    role: "Lighting Designer", 
    year: "2024", 
    hero: pub("antonyandcleopatra/cleopatra7.jpg"), 
    blurb: "Our queer retelling of Antony & Cleopatra reimagined the legendary romance with an all-queer cast. The lighting design leaned heavily on stark contrasts of red and blue to reflect the central tension—two lovers bound together yet fated to remain apart.", 
    photos: [
     pub("antonyandcleopatra/cleopatra1.jpg"),
      pub("antonyandcleopatra/cleopatra2.jpg"),
      pub("antonyandcleopatra/cleopatra3.jpg"),
      pub("antonyandcleopatra/cleopatra4.jpg"),
      pub("antonyandcleopatra/cleopatra5.jpg"),
      pub("antonyandcleopatra/cleopatra6.jpg"),
      pub("antonyandcleopatra/cleopatra7.jpg"),
      pub("antonyandcleopatra/cleopatra8.jpg"),
      pub("antonyandcleopatra/cleopatra9.jpg"),
      pub("antonyandcleopatra/cleopatra10.jpg")
    ], 
    captions: [
      "The cast emerges from the darkness in warm reds and cool blues, setting up the world’s divided loyalties.",
      "Antony faces Octavius Caesar.",
      "Antony and Cleopatra share an intimate moment.",
      "Octavius Cesar takes the stage",
      "Antony sits alone, bathed in soft blue. A moment of stillness before the chaos resumes.",
      "A Murdur plot begins as allegiances sway.",
      "Antony and Octavius face off, each standing in their hue. Red and blue held in perfect opposition.",
      "The tension boils over into physical conflict.",
      "Octavius towers above in red light, dagger poised, framed by the deep shadow of Antony’s blue.",
      "Warm amber and low red wrap the last moment between Antony and Cleopatra, the colors blending briefly before fading to black."
    ], 
    credits: ["By: Shakespeare","Directed by: Jake Tolentino", "Production Electrician: Spencer Swetlow", "Scenic Design: Alex Serino","Sound Design: Emery Frost","Stage Manager: Alayna Domboski"] 
  },
  { 
    id: "hookman-2023", 
   title: "Hookman", 
   role: "Lighting Designer", 
   year: "2023",
   hero: pub("hookman/hookman8.jpg"), 
   blurb: "Hookman is a dark comedy with slasher-movie energy, and I got to pack the lighting with small hints of what was coming next. Color choices and shadows carried just as much weight as the dialogue, giving the audience chills before anything even happened.", 
   photos: [
     pub("hookman/hookman1.jpg"),
     pub("hookman/hookman2.jpg"),
     pub("hookman/hookman3.jpg"),
     pub("hookman/hookman4.jpg"),
     pub("hookman/hookman5.jpg"),
     pub("hookman/hookman6.jpg"),
     pub("hookman/hookman7.jpg"),
     pub("hookman/hookman8.jpg"),
     pub("hookman/hookman9.jpg"),
     pub("hookman/hookman10.jpg")
   ], 
   captions: [
    "Lex drives with Jess in the passenger seat, bathed in cool tones with just a trace of red—a quiet hint of danger ahead.",
     "An everyday moment on the road turns tense under a wash of shifting light.",
     "Warm light grounds this scene in Lex’s “safe” space, while darker corners hint it might not stay that way.",
     "A surreal moment as petals representing blood scatter in the air, the red glow suggesting the danger is close.",
     "Hookman appears behind Lex and Jess, his shadow stretching across the car.",
     "Lex tries to brush it off, but the lighting keeps the threat just out of reach.",
     "A rare lighter moment between Lex and her roommate, framed by soft, intimate lighting.",
     "Lex faces Hookman as the light turns harsh and red, reality bending around them.",
     "Lex and Jess share a brief, calm connection in the car—surrounded by the red spill of danger.",
     "Hookman strikes, the scene swallowed in deep, urgent red.",
   ], 
   credits: ["By: Lauren Yee","Directed by: Erin Sullivan & Sophie Mcnamara","Scenic Design: Emma Mason","Costume Design: David Estabrooks","Sound Design: Emery Frost","Stage Manager: Kailey Pelletier", "Dramaturg: Katie Delaney", "Photos By: Jamie Nickerson"] },
 
  { 
    id: "evvy-awards-2023", 
    title: "The 42nd Annual Evvy Awards", 
    role: "Lighting Designer", 
    year: "2023", 
    hero: pub("evvys/evvy3.jpeg"), 
    blurb: "Live broadcast Polish and musical variety. Update later.", 
    photos: [
      pub("evvys/evvy1.jpeg"),
      pub("evvys/evvy2.jpeg"),
      pub("evvys/evvy3.jpeg"),
      pub("evvys/evvy4.jpg"),
      pub("evvys/evvy5.jpg"),
      pub("evvys/evvy6.jpg"),
      pub("evvys/evvy7.jpg"),
      pub("evvys/evvy8.jpg"),
      pub("evvys/evvy9.jpg"),
      pub("evvys/evvy10.jpg")
    ], 
    captions: [
      "Guests gather for the Evvy's 42 Gala under warm and cool tones, the starry backdrop setting the tone for the evening with a retrofuturism theme.",
      "The Opening Ceremony of the Gala begins.",
      "The show begins with a throwback to the 80s.",
      "Dancers take the stage for the opening number.",
      "The hosts arrive from their time travel in a burst of smoke.",
      "The hosts of the Gala and the Cutler Majestic show work address the crowd together.",
      "A winner gives a speech of thanks.",
      "The stage glows as winners share their moment.",
      "A glimpse behind the scenes, me working with my team."
              ], 
    credits: [
      "Executive Producers: Esther Chilson, Fuschia Faulding Steward, Fallon Hellan, and Kate Kiladis",
      "Director: Lillian Sexton",
      "Production Electrician: Lauren Hodgkins",
      "Scenic Design: Ariana Dookhran",
      "Editor: Zee Reichgut",
      "Audio: Susan Eyring",
      "Stage Manager: Alex Tawid Di Maggio"] },
  { 
    id: "are-you-someone-2022", 
    title: "Are You Someone to Somebody", 
    role: "Lighting Designer", 
    year: "2022", 
    hero: pub("devised/devised1.jpg"),
    blurb: "A devised piece blending movement, text, and media, Are You Someone to Somebody? explores memory, family, and the connections that shape us — all through the lens of a surreal, 1980s-inspired game show world.", 
    photos: [
      pub("devised/devised1.jpg"),
      pub("devised/devised2.jpg"),
      pub("devised/devised3.jpg"),
      pub("devised/devised4.jpg"),
      pub("devised/devised5.jpg"),
      pub("devised/devised6.jpeg"),
      pub("devised/devised7.jpg"),
      pub("devised/devised8.jpg"),
      pub("devised/devised9.jpg"),
      pub("devised/devised10.jpeg")
    ], 
    captions: ["Three boxes made up part of the world of this show, dividing certain characters from reality and preserving them in the boxes.",
               "The boxes originated early in the design process and became integral to the devising process.",
               "In an emotional dance backed by spoken word, actors move across the stage.",
               "The Finale of the show as the glow of the boxes and the TV are the only things left.",
               "Blu speaks a spoken word piece.",
               "A scene takes place within the central boxes as the two other boxes wait to light up.",
               "The show's 'hosts' banter with their contestants in the game show segment of the performance.",
               "An isolated spotlight as a contestant tries to connect",
               "Contestants leaving the frames they've been forced into, while others fall into the roles they are forced into.",
               "Contestants ready themselves for the next round."
              ], 
    credits: ["By: The Cast of Are You Someone to Somebody",
              "Directed by: Lindsay Beamish",
              "Production Electrician: Mia Moore",
              "Scenic Design: Julia Wonkka",
              "Costume Design: Dom Letterii",
              "Sound Design: Miller Koppang",
              "Stage Manager: Alex Tawid Di Maggio",
              "Dramaturg: Clara Livingston"
             ] 
  },
  { 
    id: "one-direction-macbeth-2022", 
    title: "The One Direction Macbeth Musical", 
    role: "Lighting Designer", 
    year: "2022",
    hero: pub("macbeth/machbeth1.jpg"),
    blurb: "The One Direction Macbeth Musical blends Shakespeare’s tragedy with the pop hits of One Direction, creating a surreal mash-up of ambition, fate, and catchy choruses. The lighting design leaned into the humor and drama, shifting quickly between concert-style energy and eerie theatrical tension.", 
    photos: [
      pub("macbeth/machbeth1.jpg"),
      pub("macbeth/machbeth2.jpg"),
      pub("macbeth/machbeth3.jpg"),
      pub("macbeth/machbeth4.jpg"),
      pub("macbeth/machbeth5.jpg")
    ], 
    captions: [
      "Steeped in shadows, the witches speak prophecies to Macbeth.",
      "Macbeth reaches out, back by the beautiful music of One Direction.",
      "Macbeth gets the crown.",
      "Ghosts haunt Macbeth",
      "Macbeth is killed."
              ], 
    credits: ["By: Shakespeare","Directed by: Siena Brolin","Sound Design: Mateo Florez","Choreography: Siena Brolin","Music Direction: Name","Stage Manager: McKenna Tedford-Coles"] },
  { 
    id: "humble-boy-2021", 
    title: "Humble Boy", 
    role: "Lighting Designer", 
    year: "2021", 
    hero: pub("humbleboy/humble6.png"), 
    blurb: "Set in a lush English garden, Humble Boy blends family drama, sharp wit, and a touch of the surreal. As secrets surface and relationships unravel, the characters confront love, loss, and what it means to move forward.", 
    photos: [
      pub("humbleboy/humble1.png"),
      pub("humbleboy/humble2.png"), 
      pub("humbleboy/humble3.png"), 
      pub("humbleboy/humble4.png"), 
      pub("humbleboy/humble5.png"), 
      pub("humbleboy/humble6.png"), 
      pub("humbleboy/humble7.png"), 
      pub("humbleboy/humble8.png"), 
      pub("humbleboy/humble9.png"), 
      pub("humbleboy/humble10.png")
            ], 
    captions: [
      "A quiet moment in the garden before the story begins.", 
      "Felix and Jim share a tense conversation under the apple branches.",
      "The table is set for the dinner that will change everything.",
      "Flora stands ready to welcome her guests.",
      "Flora adds the finishing touches to the dinner table.",
      "The dinner party begins, with tensions already brewing.",
      "Unspoken feelings weigh heavily over the table.",
      "Rosie returns, stirring old memories and unresolved questions.",
      "Flora delivers a toast that’s anything but simple.",
      "The beehive hangs silently, watching over the unfolding drama."
      
    ], 
    credits: ["By: Charlotte Jones","Directed by: Elena Freck","Scenic Design: Bella Pagan","Sound Design: Name","Stage Manager: Name"] },

  { id: "fiddler-2018", 
   title: "Fiddler on the Roof", 
   role: "Lighting Designer", 
   year: "2019", 
   hero: pub("fiddler/fiddler7.jpg"), 
   blurb: "Set in the small Jewish village of Anatevka, Fiddler on the Roof follows Tevye, a poor milkman, as he struggles to balance tradition, family, and faith in a world rapidly changing around him. With humor, heart, and iconic songs, the musical celebrates love, resilience, and the ties that hold a community together.", 
   photos: [
     pub("fiddler/fiddler1.jpg"),
     pub("fiddler/fiddler2.jpg"),
     pub("fiddler/fiddler3.jpg"),
     pub("fiddler/fiddler4.jpg"),
     pub("fiddler/fiddler5.jpg"),
     pub("fiddler/fiddler6.jpg"),
     pub("fiddler/fiddler7.jpg"),
     pub("fiddler/fiddler8.jpg"),
     pub("fiddler/fiddler9.jpg"),
     pub("fiddler/fiddler10.jpg")
   ], 
   captions: [
     "Perchik speaks with Tevye's daughters.",
     "The Constable tells the people of Anatevka that they must leave.",
     "A scary dream finds Tevye in the night.",
     "Tevye confides his dream in Golde",
     "The scary dream intensifies.",
     "Tevye's daughters sing about the perfect match.",
     "Motel and Tzeitel marry.",
     "The men of the village gather.",
     "Tevye talks to Tzeitel as she plans to leave.",
     "The village is cold without its spirit."
   ], 
   credits: ["By: Bock & Harnick","Directed by: Christal McDougal","Scenic Design: Christal McDougal","Costume Design: Lela Myers","Sound Design: Matthew Decicco","Music Direction: Erin Life","Stage Manager: Ruthie Everhart"] },
  
  { 
    id: "rock-of-ages-2018", 
    title: "Rock of Ages", 
    role: "Lighting Designer", 
    year: "2018", 
    hero: pub("rockofages/rock1.jpg"),
    blurb: "Rock of Ages is a high-energy, feel-good jukebox musical set in 1987 on L.A.’s famous Sunset Strip. When a small-town girl meets a big-city dreamer, their love story unfolds against the backdrop of The Bourbon Room, a legendary rock club under threat from corporate developers. Featuring iconic ’80s hits from bands like Journey, Bon Jovi, and Pat Benatar, it’s a loud, hilarious, and unapologetically fun celebration of big hair, big dreams, and even bigger rock anthems.", 
    photos: [
      pub("rockofages/rock1.jpg"),
      pub("rockofages/rock2.jpg"),
      pub("rockofages/rock3.jpg"),
      pub("rockofages/rock4.jpg")
    ], 
    captions: [
      "The dancers bring the heat in a high-energy number that captures the wild spirit of the Sunset Strip.",
      "Corporate suits and construction crews arrive, threatening to tear down The Bourbon Room for a new development.",
      "Lonnie and Dennis celebrate the bourbon room.",
      "Rockers and misfits unite, strutting into the spotlight with swagger and attitude."
    ], 
    credits: ["By: Chris D'Arienzo","Directed by: Christal McDougal","Scenic Design: Christal McDougal","Costume Design: Lela Myers","Sound Design: Matthew Decicco","Music Direction: Erin Life","Stage Manager: Ruthie Everhart"] }

];

const LINKS = { email: "hchkacik@gmail.com", phone: "+1 (970) 531-3977", location: "Brooklyn, NY", resumePdf: "/henry-kacik-resume.pdf" };


const injectFonts = () => {
  const haveFraunces = document.querySelector('link[data-font="fraunces"]');
  const haveInter = document.querySelector('link[data-font="inter"]');
  if(!haveFraunces){ const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap'; l.setAttribute('data-font','fraunces'); document.head.appendChild(l); }
  if(!haveInter){ const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'; l.setAttribute('data-font','inter'); document.head.appendChild(l); }
};

const useDarkMode = () => {
  const [dark, setDark] = useState(true);
  useEffect(() => { const root = document.documentElement; if (dark) root.classList.add('dark'); else root.classList.remove('dark'); }, [dark]);
  return [dark, setDark];
};

const useHashRoute = () => {
  const [route, setRoute] = useState(() => (window.location.hash?.slice(1) || "home"));
  useEffect(() => { const onHash = () => setRoute(window.location.hash?.slice(1) || "home"); window.addEventListener("hashchange", onHash); return () => window.removeEventListener("hashchange", onHash); }, []);
  const navigate = useCallback((r) => { window.location.hash = r; }, []);
  return { route, navigate };
};

const useLazyLoad = (options) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const seenRef = useRef(false);
  useEffect(() => { const node = ref.current; if (!node) return; const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !seenRef.current) { seenRef.current = true; setVisible(true); obs.unobserve(node); } }, options); obs.observe(node); return () => { obs.disconnect(); }; }, [options]);
  return [ref, visible];
};

const CueOverlay = ({ cue }) => (
  <AnimatePresence>
    <motion.div key={`cue-${cue}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-black/82">
      <motion.div aria-hidden className="absolute inset-0" initial={{ opacity: 0.35, scale: 0.9 }} animate={{ opacity: 0, scale: 1.5 }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.08), rgba(255,255,255,0.0) 60%)', mixBlendMode: 'screen' }} />
      <div className="text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, times: [0, 0.1, 0.85, 0.95], ease: 'easeInOut' }} className="font-mono text-sm uppercase tracking-[0.35em] text-white/80">Standby LX {cue}.</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 1.6, times: [0, 0.2, 0.55, 0.9, 0.98], ease: 'easeInOut' }} className="font-mono text-sm uppercase tracking-[0.35em] text-white mt-2">LX {cue}… Go.</motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
);

const PreFadeOverlay = () => (
  <AnimatePresence>
    <motion.div key="prefade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="pointer-events-none fixed inset-0 z-[55] bg-black" />
  </AnimatePresence>
);

const SectionTitle = ({ children }) => {
  const opts = useMemo(() => ({ threshold: 0.2 }), []);
  const [ref, visible] = useLazyLoad(opts);
  return (
    <h2 ref={ref} className="mb-8 uppercase">
      <motion.span initial={{ letterSpacing: "0.35em", opacity: 0 }} animate={visible ? { letterSpacing: "0.06em", opacity: 1 } : {}} transition={{ duration: 0.8, ease: "easeOut" }} style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(2rem,6vw,3.25rem)' }}>{children}</motion.span>
    </h2>
  );
};

const LightboxDetails = ({ active, idx }) => {
  const [open, setOpen] = useState(true);
  if (!active) return null;
  return (
    <div className="mt-3 w-full text-white/90">
      <div className="flex items-center justify-between">
               <button
          onClick={() => setOpen(!open)}
          className="text-xs uppercase tracking-widest border border-white/30 rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
        >
          {open ? 'Hide details' : 'Show details'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden w-full"
          >
            {active.captions && active.captions[idx] && (
              <div className="mt-3 text-sm">{active.captions[idx]}</div>
            )}
            {active.credits && active.credits.length > 0 && (
              <div className="mt-3 overflow-hidden w-full">
                <style>
                  {`@keyframes marquee { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }`}
                </style>
                <div
                  className="flex gap-6 py-2 whitespace-nowrap"
                  style={{ animation: 'marquee 18s linear infinite' }}
                >
                  {[...active.credits, ...active.credits].map((c, i) => (
                    <span
                      key={i}
                      className="text-xs uppercase tracking-widest opacity-80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Nav = ({ route, onNav, lxMode, setLxMode }) => {
  const items = ["home","about","portfolio","resume","contact"];
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full justify-between pt-[max(1rem,env(safe-area-inset-top))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
      <span className="text-2xl text-white mix-blend-difference" style={{ fontFamily: 'Fraunces, serif' }}>Henry Kacik</span>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
        {items.map(it => (
          <button
            key={it}
            onClick={() => onNav(it)}
            className={`uppercase tracking-widest text-sm ${route === it ? "underline" : ''} text-white mix-blend-difference`}
          >
            {it}
          </button>
        ))}
        <button
          onClick={() => setLxMode(!lxMode)}
          aria-label="toggle transitions"
          title={lxMode ? 'LX Mode: theatrical cues on' : 'Smooth Mode: soft fades'}
          className="text-white mix-blend-difference px-2 py-1 border border-white/40 rounded-full"
        >
          {lxMode ? <Play className="h-4 w-4" /> : <Square className="h-4 w-4" />}
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onSeeWork, onNavigate }) => {
  const heroFrames = useMemo(() => PROJECTS.map(p => ({ src: p.hero, title: p.title })), []);
  const [heroIdx, setHeroIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);
  const rawHero = heroFrames[heroIdx]?.src || PROJECTS[0]?.photos?.[0];
  const isHttp = typeof rawHero === 'string' && rawHero.startsWith('http');
  const heroBlocked = isHttp && (rawHero.includes('imgur.com/a/') || rawHero.includes('/gallery/') || rawHero.includes('drive.google.com'));
  const hero = heroBlocked ? PROJECTS[0]?.photos?.[0] : rawHero;
  const currentTitle = heroFrames[heroIdx]?.title || PROJECTS[0]?.title;
  const currentProject = PROJECTS.find(p=>p.title===currentTitle) || PROJECTS[heroIdx] || PROJECTS[0];
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => { const preload = (u) => { const img = new Image(); img.decoding='async'; img.loading='eager'; img.src=u; }; preload(hero); const nextIdx = (heroIdx + 1) % heroFrames.length; if (heroFrames[nextIdx]) preload(heroFrames[nextIdx].src); }, [hero, heroIdx, heroFrames]);

  useEffect(() => { if (!hero) return; const link = document.createElement('link'); link.rel = 'preload'; link.as = 'image'; link.href = hero; document.head.appendChild(link); return () => { try { document.head.removeChild(link); } catch(e){} }; }, [hero]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => { if (!paused) setHeroIdx(i => (i + 1) % heroFrames.length); }, 8000);
    return () => clearInterval(id);
  }, [paused, heroFrames.length, prefersReduced]);

  useEffect(() => { setShaderReady(false); }, [hero]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      {(prefersReduced || !shaderReady) && (
        <motion.img
          src={hero}
          alt="Hero background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      )}
      {!prefersReduced && (
        <AnimatePresence initial={false}>
          <motion.div
            key={heroIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <ParticleHero imageUrl={hero} onReady={() => setShaderReady(true)} onError={() => setShaderReady(false)} />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-28 md:pt-40">
        <h1 className="tracking-tight" style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(2.4rem,7vw,5.5rem)' }}>{ABOUT.headline}</h1>
        <div className="mt-2 text-white/80" style={{ fontSize: 'clamp(1rem,2.2vw,1.25rem)' }}>Featured: {currentTitle}</div>
        {currentProject?.captions && currentProject.captions[0] && (<div className="mt-1 text-white/70 text-sm">{currentProject.captions[0]}</div>)}
        <p className="mt-4 max-w-2xl text-white/85">Design that breathes with the score. Shadow, glow, and a little chaos—on purpose.</p>
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <button onClick={onSeeWork} className="border border-white px-6 py-3 font-mono uppercase tracking-widest hover:bg-white hover:text-black transition">See Portfolio</button>
          <button onClick={() => { const it = PROJECTS.find(p=>p.title===currentTitle) || PROJECTS[0]; try { sessionStorage.setItem('openGalleryId', it.id); } catch(e){} onNavigate('portfolio'); }} className="border border-white/40 px-6 py-3 font-mono uppercase tracking-widest hover:bg-white/10 transition">Open This Project</button>
          <div className="ml-2 flex gap-2">
            {heroFrames.map((_,i)=> (<button key={i} onClick={()=>setHeroIdx(i)} aria-label={`Show ${i+1}`} className={`h-2 w-2 rounded-full ${i===heroIdx? 'bg-white' : 'bg-white/40 hover:bg-white/70'} transition`} />))}
          </div>
        </div>
        <div className="mt-2 text-xs opacity-70">Toggle the icon in the top-right: play = theatrical transitions, stop = smooth fades.</div>
        {currentProject?.credits && currentProject.credits.length>0 && (
          <div className="mt-4 overflow-hidden">
            <style>{`@keyframes marqueeH { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }`}</style>
            <div className="flex gap-6 whitespace-nowrap opacity-70 text-xs" style={{ animation: 'marqueeH 22s linear infinite' }}>
              {[...currentProject.credits, ...currentProject.credits].map((c, i)=> (<span key={i} className="uppercase tracking-widest">{c}</span>))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

const ParticleHero = ({ imageUrl, onReady, onError }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ brush: 0, target: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, true);
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }`;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_tex;
      uniform vec2 u_res;
      uniform vec2 u_texRes;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_brush;
      vec2 coverUv(vec2 uv, vec2 iRes, vec2 tRes){
        float r = iRes.x / iRes.y;
        float tr = tRes.x / tRes.y;
        if(r > tr){
          uv.y = (uv.y - 0.5) * (r / tr) + 0.5;
        } else {
          uv.x = (uv.x - 0.5) * (tr / r) + 0.5;
        }
        return uv;
      }
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      vec3 texRGB(vec2 uv){ return texture2D(u_tex, clamp(uv, 0.0, 1.0)).rgb; }
      float edgeDist(vec2 uv){ vec2 d = min(uv, 1.0 - uv); return min(d.x, d.y); }
      void main(){
        vec2 uv = vUv;
        vec2 texUV = coverUv(uv, u_res, u_texRes);
        texUV = clamp(texUV, 0.0, 1.0);
        vec3 base = texRGB(texUV);
        vec2 mousePos = u_mouse;
        vec2 asp = vec2(u_res.x / u_res.y, 1.0);
        vec2 rel = (uv - mousePos) * asp;
        rel *= vec2(1.9, 1.6);
        float r = length(rel);
        float ang = atan(rel.y, rel.x);
        float angNoise = 0.04 * sin(ang * 6.0 + u_time * 0.5) + 0.02 * sin(ang * 13.0 - u_time * 0.3);
        float rMod = r * (1.0 + angNoise * 0.5);
        float raw = 1.0 - smoothstep(0.06, 0.34, rMod);
        float x = clamp(raw, 0.0, 1.0);
        float spotlight = x*x*x*(x*(x*6.0 - 15.0) + 10.0);
        float edgeNoise = mix(0.94, 1.0, hash(uv*vec2(720.0,540.0) + u_time*0.18));
        float brushMask = clamp(spotlight * edgeNoise, 0.0, 1.0) * u_brush;
        float baseAmt = 0.85;
        float amt = mix(baseAmt, 0.0, brushMask);
        ang = 0.0;
        ang += sin(texUV.y*28.0 + u_time*0.35);
        ang += cos(texUV.x*34.0 - u_time*0.25);
        ang += sin((texUV.x+texUV.y)*18.0 + u_time*0.18);
        vec2 dir = normalize(vec2(cos(ang), sin(ang)));
        vec2 dir2 = vec2(-dir.y, dir.x);
        float stroke = 0.0055 * max(amt, 0.15);
        float stroke2 = 0.0032 * max(amt, 0.12);
        float maxKernel = max(5.0 * stroke, 3.0 * stroke2);
        float guard = smoothstep(0.0, maxKernel * 1.3, edgeDist(texUV));
        stroke *= guard;
        stroke2 *= guard;
        vec3 acc = vec3(0.0); float tot = 0.0;
        for(int i=0;i<11;i++){ float s=float(i)-5.0; float w=exp(-s*s/12.0); acc += texRGB(texUV + dir * s * stroke) * w; tot+=w; }
        vec3 stroke1 = acc / max(tot, 1e-5);
        vec3 acc2 = vec3(0.0); float tot2 = 0.0;
        for(int j=0;j<7;j++){ float s2=float(j)-3.0; float w2=exp(-s2*s2/8.0); acc2 += texRGB(texUV + dir2 * s2 * stroke2) * w2; tot2+=w2; }
        vec3 stroke2c = acc2 / max(tot2, 1e-5);
        vec3 paint = mix(stroke1, stroke2c, 0.35);
        float levels = mix(7.0, 18.0, brushMask);
        paint = floor(paint * levels) / levels;
        float invBrush = 1.0 - brushMask;
        paint = mix(paint, vec3(paint.r*0.9 + paint.g*0.1, paint.g, paint.b*1.12), invBrush*0.65);
        paint += invBrush * 0.07 * vec3(0.05, 0.04, 0.10);
        float sparkle = smoothstep(0.995, 1.0, hash(texUV*vec2(800.0, 600.0) + u_time*0.02));
        vec3 stars = vec3(sparkle) * (1.0 - brushMask) * 0.12;
        vec2 px = 1.0 / u_texRes; float gx=0.0, gy=0.0;
        gx += texRGB(texUV + vec2(-px.x, 0.0)).r - texRGB(texUV + vec2(px.x, 0.0)).r;
        gy += texRGB(texUV + vec2(0.0, -px.y)).r - texRGB(texUV + vec2(0.0, px.y)).r;
        float edge = clamp(length(vec2(gx,gy))*1.6, 0.0, 1.0);
        paint = mix(paint, paint*1.08, edge*0.5);
        vec3 color = mix(base, paint, amt);
        color = mix(color, base, brushMask);
        color += stars;
        float vig = smoothstep(0.85, 0.2, length(uv - 0.5));
        color *= mix(1.0, 0.94, vig*0.3);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      u_tex: { value: null },
      u_res: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_texRes: { value: new THREE.Vector2(1,1) },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5,0.5) },
      u_brush: { value: 0.0 },
    };

    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2,2), mat);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      imageUrl,
      (tex) => {
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        uniforms.u_tex.value = tex;
        const iw = tex.image.naturalWidth || tex.image.width;
        const ih = tex.image.naturalHeight || tex.image.height;
        uniforms.u_texRes.value = new THREE.Vector2(iw, ih);
        renderer.render(scene, camera);
        onReady?.();
      },
      undefined,
      (err) => {
        onError?.(err);
        const fallback = PROJECTS[0]?.photos?.[0];
        if (fallback) {
          loader.load(fallback, (tex)=>{
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            uniforms.u_tex.value = tex;
            const iw = tex.image.naturalWidth || tex.image.width;
            const ih = tex.image.naturalHeight || tex.image.height;
            uniforms.u_texRes.value = new THREE.Vector2(iw, ih);
            onReady?.();
          });
        }
      }
    );

    const onResize = () => { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, true); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); uniforms.u_res.value.set(w, h); };
    onResize();
    window.addEventListener('resize', onResize);

    const onPointer = (e) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        uniforms.u_mouse.value.set(x, y);
        mouseRef.current.target = Math.min(1, mouseRef.current.target + 0.08);
      } else {
        mouseRef.current.target = 0;
      }
    };
    const onLeave = () => { mouseRef.current.target = 0; };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const start = performance.now();
    const tick = () => { uniforms.u_time.value = (performance.now() - start) / 1000; const DECAY = 0.97, RISE = 0.985; mouseRef.current.target = Math.max(0, mouseRef.current.target * DECAY); const b = mouseRef.current.brush, tgt = mouseRef.current.target; mouseRef.current.brush = b < tgt ? tgt - (tgt - b) * RISE : tgt + (b - tgt) * DECAY; uniforms.u_brush.value = mouseRef.current.brush; renderer.render(scene, camera); animRef.current = requestAnimationFrame(tick); };
    tick();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current = null;
      }
      mat.dispose();
      (uniforms.u_tex.value)?.dispose?.();
    };
  }, [imageUrl, onReady, onError]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

const ProjectCard = ({ project }) => {
  const opts = useMemo(() => ({ threshold: 0.2 }), []);
  const [ref, visible] = useLazyLoad(opts);
  const [ratioStr, setRatioStr] = useState('16 / 9');
  const open = useCallback(() => { const ev = new CustomEvent('openGallery', { detail: project }); window.dispatchEvent(ev); }, [project]);
  return (
    <div ref={ref} className="relative flex flex-col md:grid md:grid-cols-12">
     <div
  className="md:col-span-8 overflow-hidden group relative bg-black"
  style={{ aspectRatio: ratioStr }}
>
  {visible && (
    <motion.img
      initial={{opacity:0, scale:1.02}}
      animate={{opacity:1, scale:1}}
      transition={{duration:0.7, ease:'easeOut'}}
      src={project.hero}
      alt={project.title}
      className="w-full h-full"
      style={{ objectFit: 'contain', objectPosition: 'center' }}
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      sizes="(min-width: 1024px) 66vw, 100vw"
      onLoad={(e) => {
        const w = e.target.naturalWidth || 16;
        const h = e.target.naturalHeight || 9;
          setRatioStr(`${w} / ${h}`);
        }}
      />
    )}
       <button
          onClick={open}
          className="absolute bottom-6 right-6 border border-white px-4 py-2 text-sm uppercase hover:bg-white hover:text-black transition"
        >
          Open Gallery
        </button>
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:visible?1:0}} transition={{duration:0.6, delay:0.2}} className="md:col-span-4 flex flex-col justify-center bg-black text-white p-12">
        <h2 className="font-serif text-4xl mb-4">{project.title}</h2>
        <div className="uppercase text-sm tracking-widest mb-4">{project.role} — {project.year}</div>
        <p className="max-w-md text-white/80 mb-6">{project.blurb}</p>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [active, setActive] = useState(null);
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx(i => (i+1) % (active?.photos?.length || 1)), [active]);
  const prev = useCallback(() => setIdx(i => (i-1 + (active?.photos?.length || 1)) % (active?.photos?.length || 1)), [active]);
  const close = useCallback(() => setActive(null), []);
  const [imgLoaded, setImgLoaded] = useState(false);
  const currentSrc = active?.photos ? active.photos[idx] : null;
  useEffect(()=>{ const onKey = (e)=>{ if(!active) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); }; const onOpen = (e) => { if(e.detail){ setActive(e.detail); setIdx(0);} }; window.addEventListener('keydown', onKey); window.addEventListener('openGallery', onOpen); return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('openGallery', onOpen); }; },[active, close, next, prev]);
  useEffect(() => { let id = null; try { id = sessionStorage.getItem('openGalleryId'); } catch(e){} if (id) { const p = PROJECTS.find(p=>p.id===id); if (p) { setActive(p); setIdx(0); } try { sessionStorage.removeItem('openGalleryId'); } catch(e){} } }, []);
  useEffect(() => { setImgLoaded(false); }, [idx, active]);
  useEffect(() => { if (!active || !active.photos || active.photos.length < 2) return; const N = active.photos.length; const prevIdx = (idx - 1 + N) % N; const nextIdx = (idx + 1) % N; [active.photos[prevIdx], active.photos[nextIdx]].forEach((u)=>{ if(!u) return; const im = new Image(); im.decoding='async'; im.loading='eager'; im.src=u; }); }, [active, idx]);
  const touch = useRef({x:0, y:0, active:false});
  const onTouchStart = (e) => { if (!e.touches?.[0]) return; touch.current = { x:e.touches[0].clientX, y:e.touches[0].clientY, active:true }; };
  const onTouchEnd = (e) => { if (!touch.current.active) return; const dx = (e.changedTouches?.[0]?.clientX ?? touch.current.x) - touch.current.x; if (Math.abs(dx) > 40) (dx < 0 ? next() : prev()); touch.current.active = false; };
  return (
    <section className="w-full">
      {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/95 p-2 sm:p-4 overflow-y-auto flex justify-center">
            <div className="max-w-6xl mx-auto">
              <div className="sticky top-0 z-10 mb-3 flex items-center justify-between text-white bg-black/95 pb-3">
                <div className="max-w-[70%]">
                  <div className="text-xs uppercase tracking-[0.2em] opacity-80">{active.role} — {active.year}</div>
                  <div className="text-lg font-semibold">{active.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prev} className="rounded-full border border-white/30 px-3 py-2 text-white"><ChevronLeft className="h-4 w-4"/></button>
                  <button onClick={next} className="rounded-full border border-white/30 px-3 py-2 text-white"><ChevronRight className="h-4 w-4"/></button>
                  <button onClick={close} className="rounded-full border border-white/30 px-3 py-1 text-white">Close</button>
                </div>
              </div>
              <motion.div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 relative inline-grid place-items-center bg-black w-fit mx-auto" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06), rgba(0,0,0,0.0) 70%)' }}>
                {!imgLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                )}
                <AnimatePresence mode="wait">
                  {currentSrc && (
                    <motion.img
                      key={currentSrc}
                      src={currentSrc}
                      alt={active.title + ' ' + (idx + 1)}
                      className="w-auto h-auto max-h-[92svh] max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] object-contain"
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      initial={{opacity:0}}
                      animate={{opacity:1}}
                      exit={{opacity:0}}
                      transition={{duration:0.5}}
                      onLoad={() => setImgLoaded(true)}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
              <LightboxDetails active={active} idx={idx} />
              <div className="mt-3 flex items-center justify-between text-white/80">
                <div className="text-sm">{idx+1} / {active.photos.length}</div>
                <div className="text-xs uppercase tracking-widest opacity-70">Arrow keys to navigate • Esc to close</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = ({ onNavigate }) => (
  <section className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
    <SectionTitle>About</SectionTitle>
    <div className="mx-auto max-w-5xl grid md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-5 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
        <img src={ABOUT.photo} className="w-full h-auto block" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width: 768px) 40vw, 90vw"/>
      </div>
      <div className="md:col-span-7">
        <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: '"Fraunces", serif' }}>{ABOUT.headline}</h3>
        <p className="text-lg leading-relaxed opacity-90">{ABOUT.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#portfolio" onClick={(e)=>{e.preventDefault(); onNavigate('portfolio');}} className="border border-current px-5 py-2 font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">See Work</a>
          <a href="#contact" onClick={(e)=>{e.preventDefault(); onNavigate('contact');}} className="border border-current/50 px-5 py-2 font-mono uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 transition">Get In Touch</a>
        </div>
      </div>
    </div>
  </section>
);

const Resume = () => (
  <section className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
    <SectionTitle>Résumé</SectionTitle>
    <p className="max-w-xl mb-6">Download the full résumé for detailed credits and skills.</p>
    <a href={LINKS.resumePdf} target="_blank" rel="noreferrer" className="border border-current px-6 py-3 font-mono uppercase tracking-widest hover:bg-white hover:text-black transition">Download PDF</a>
  </section>
);

const Contact = () => (
  <section className="py-24 px-6 bg-black text-white">
    <SectionTitle>Contact</SectionTitle>
    <div className="space-y-4 text-lg">
      <div><Mail className="inline mr-2"/>{LINKS.email}</div>
      <div><Phone className="inline mr-2"/>{LINKS.phone}</div>
      <div><MapPin className="inline mr-2"/>{LINKS.location}</div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 pb-[max(3rem,env(safe-area-inset-bottom))] text-sm text-white bg-black">© {new Date().getFullYear()} Henry Kacik — probably running on too much coffee.</footer>
);

export default function HenryKacikSite() {
  const { route } = useHashRoute();
  const [_dark] = useDarkMode();
  const [lxMode, setLxMode] = useState(true);
  const cueRef = useRef(1);
  const [preFade, setPreFade] = useState(false);
  const [showCue, setShowCue] = useState(true);
  const [cueNumber, setCueNumber] = useState(1);
  const [renderRoute, setRenderRoute] = useState(route);
  useEffect(() => { injectFonts(); }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        PROJECTS.forEach(p => {
          [p.hero, ...(p.photos || [])].forEach((u) => {
            if (!u) return;
            const img = new Image();
            img.decoding = 'async';
            img.loading = 'lazy';
            img.src = u;
          });
        });
      });
    }
  }, []);
  const go = useCallback((r) => { if (window.location.hash.slice(1) === r) return; if (lxMode) { setPreFade(true); setRenderRoute(route); setTimeout(() => { window.location.hash = r; }, 700); } else { setPreFade(false); window.location.hash = r; } }, [route, lxMode]);
  useEffect(() => { if (lxMode) { setCueNumber(cueRef.current); const t0 = setTimeout(() => setShowCue(true), 40); const t1 = setTimeout(() => { setShowCue(false); setRenderRoute(route); }, 40 + 1600); const t2 = setTimeout(() => setPreFade(false), 40 + 1600 + 100); cueRef.current = cueRef.current + 1; return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); }; } else { setShowCue(false); setPreFade(false); setRenderRoute(route); } }, [route]);
  const onSeeWork = useCallback(() => go("portfolio"), [go]);
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"' }}>
      {lxMode && preFade && <PreFadeOverlay />}
      {lxMode && showCue && <CueOverlay cue={cueNumber} />}
      {(!showCue) && (
        lxMode ? (
          <motion.div initial={{opacity:0}} animate={{opacity: preFade ? 0 : 1}} transition={{ duration: 0.7, ease: 'easeInOut' }}>
            <Nav route={renderRoute} onNav={go} lxMode={lxMode} setLxMode={setLxMode} />
            <main key={renderRoute}>
              {renderRoute === "home" && <Hero onSeeWork={onSeeWork} onNavigate={go} />}
              {renderRoute === "about" && <About onNavigate={go} />}
              {renderRoute === "portfolio" && <Portfolio />}
              {renderRoute === "resume" && <Resume />}
              {renderRoute === "contact" && <Contact /> }
            </main>
            <Footer />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={renderRoute} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.6, ease:'easeInOut'}}>
              <Nav route={renderRoute} onNav={go} lxMode={lxMode} setLxMode={setLxMode} />
              <main>
                {renderRoute === "home" && <Hero onSeeWork={onSeeWork} onNavigate={go} />}
                {renderRoute === "about" && <About onNavigate={go} />}
                {renderRoute === "portfolio" && <Portfolio />}
                {renderRoute === "resume" && <Resume />}
                {renderRoute === "contact" && <Contact /> }
              </main>
              <Footer />
            </motion.div>
          </AnimatePresence>
        )
      )}
    </div>
  );
}
