import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from 'three';

const PLACEHOLDER_HERO = "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80";

const ABOUT = {
  photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1200&auto=format&fit=crop",
  headline: "Hi, I’m Henry — lighting designer.",
  bio: `I design light for theatre, concerts, and the odd warehouse that wants to feel like a poem. Emerson alum, New York–based. I like saturated color, unapologetic contrast, and dimmers that behave. When I’m not plotting cues, I’m chasing good bread and better coffee.`,
};

const PROJECTS = [
  { id: "great-comet-2024", title: "Natasha, Pierre, and the Great Comet of 1812", role: "Lighting Designer", year: "2024", hero: PLACEHOLDER_HERO, blurb: "Immersive, musical chaos rendered in light. Update with specifics later.", photos: ["/images/great-comet-1.jpg","/images/great-comet-2.jpg","/images/great-comet-3.jpg"], captions: ["Hero image","Act I moment","Act II finale"], credits: ["By: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Choreography: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "antony-cleopatra-2024", title: "Antony & Cleopatra", role: "Lighting Designer", year: "2024", hero: PLACEHOLDER_HERO, blurb: "Epic politics and intimacy in contrast. Update later.", photos: ["/images/antony-cleopatra-1.jpg","/images/antony-cleopatra-2.jpg"], captions: ["Hero image","Battle sequence"], credits: ["By: Shakespeare","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Choreography: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "hookman-2023", title: "Hookman", role: "Lighting Designer", year: "2023", hero: PLACEHOLDER_HERO, blurb: "Horror beats with playful shadows. Update later.", photos: ["/images/hookman-1.jpg","/images/hookman-2.jpg"], captions: ["Hero image","Climax"], credits: ["By: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Choreography: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "evvy-awards-2023", title: "The 42nd Annual Evvy Awards", role: "Lighting Designer", year: "2023", hero: PLACEHOLDER_HERO, blurb: "Live broadcast polish and musical variety. Update later.", photos: ["/images/evvys-1.jpg","/images/evvys-2.jpg"], captions: ["Hero image","Musical number"], credits: ["Executive Producer: Name","Director: Name","Scenic Design: Name","Video: Name","Audio: Name","Stage Manager: Name"] },
  { id: "are-you-someone-2022", title: "Are You Someone to Somebody", role: "Lighting Designer", year: "2022", hero: PLACEHOLDER_HERO, blurb: "Chamber piece with delicate color. Update later.", photos: ["/images/ays-1.jpg","/images/ays-2.jpg"], captions: ["Hero image","Intimate scene"], credits: ["By: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Stage Manager: Name"] },
  { id: "one-direction-macbeth-2022", title: "The One Direction Macbeth Musical", role: "Lighting Designer", year: "2022", hero: PLACEHOLDER_HERO, blurb: "Pop satire meets tragedy; bold color story. Update later.", photos: ["/images/odm-1.jpg","/images/odm-2.jpg"], captions: ["Hero image","Concert look"], credits: ["Book: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Choreography: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "humble-boy-2021", title: "Humble Boy", role: "Lighting Designer", year: "2021", hero: PLACEHOLDER_HERO, blurb: "Garden light and family ghosts. Update later.", photos: ["/images/humble-boy-1.jpg","/images/humble-boy-2.jpg"], captions: ["Hero image","Garden dusk"], credits: ["By: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Stage Manager: Name"] },
  { id: "addams-family-2019", title: "The Addams Family", role: "Lighting Designer", year: "2019", hero: PLACEHOLDER_HERO, blurb: "Macabre fun with crisp musical looks. Update later.", photos: ["/images/addams-1.jpg","/images/addams-2.jpg"], captions: ["Hero image","Dinner scene"], credits: ["Book: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "joseph-dreamcoat-2019", title: "Joseph and the Amazing Technicolor Dreamcoat", role: "Lighting & Scenic Designer", year: "2019", hero: PLACEHOLDER_HERO, blurb: "Color-forward design and playful spectacle. Update later.", photos: ["/images/joseph-1.jpg","/images/joseph-2.jpg"], captions: ["Hero image","Go-Go-Go Joseph"], credits: ["By: Lloyd Webber & Rice","Directed by: Name","Scenic Design: Henry Kacik","Costume Design: Name","Sound Design: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "fiddler-2018", title: "Fiddler on the Roof", role: "Lighting Designer", year: "2018", hero: PLACEHOLDER_HERO, blurb: "Warmth and tradition with texture. Update later.", photos: ["/images/fiddler-1.jpg","/images/fiddler-2.jpg"], captions: ["Hero image","Sunrise, Sunset"], credits: ["By: Bock & Harnick","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Music Direction: Name","Stage Manager: Name"] },
  { id: "rock-of-ages-2018", title: "Rock of Ages", role: "Lighting Designer", year: "2018", hero: PLACEHOLDER_HERO, blurb: "Arena-glam riffs and haze; big looks. Update later.", photos: ["/images/roa-1.jpg","/images/roa-2.jpg"], captions: ["Hero image","Finale"], credits: ["By: Name","Directed by: Name","Scenic Design: Name","Costume Design: Name","Sound Design: Name","Music Direction: Name","Stage Manager: Name"] }
];

const LINKS = { email: "henrykacik@gmail.com", phone: "+1 (970) 531-3977", location: "New York, NY", resumePdf: "/henry-kacik-resume.pdf" };

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
    <div className="mt-3 text-white/90">
      <div className="flex items-center justify-between">
        <button onClick={()=>setOpen(!open)} className="text-xs uppercase tracking-widest border border-white/30 rounded-full px-3 py-1 hover:bg-white hover:text-black transition">{open ? 'Hide details' : 'Show details'}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="overflow-hidden">
            {active.captions && active.captions[idx] && (<div className="mt-3 text-sm">{active.captions[idx]}</div>)}
            {active.credits && active.credits.length>0 && (
              <div className="mt-3 whitespace-nowrap overflow-hidden">
                <style>{`@keyframes marquee { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }`}</style>
                <div className="flex gap-6 py-2" style={{ animation: 'marquee 18s linear infinite' }}>
                  {[...active.credits, ...active.credits].map((c, i)=> (<span key={i} className="text-xs uppercase tracking-widest opacity-80">{c}</span>))}
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
    <nav className="fixed top-0 left-0 z-50 flex w-full justify-between px-6 py-4">
      <span className="text-2xl text-white mix-blend-difference" style={{ fontFamily: 'Fraunces, serif' }}>Henry Kacik</span>
      <div className="flex gap-4">
        {items.map(it => (<button key={it} onClick={()=>onNav(it)} className={`uppercase tracking-widest text-sm ${route===it?"underline":''} text-white mix-blend-difference`}>{it}</button>))}
        <button onClick={()=>setLxMode(!lxMode)} aria-label="toggle transitions" title={lxMode ? 'LX Mode: theatrical cues on' : 'Smooth Mode: soft fades'} className="text-white mix-blend-difference px-2 py-1 border border-white/40 rounded-full">{lxMode ? <Play className="h-4 w-4"/> : <Square className="h-4 w-4"/>}</button>
      </div>
    </nav>
  );
};

const Hero = ({ onSeeWork, onNavigate }) => {
  const heroFrames = useMemo(() => PROJECTS.map(p => ({ src: p.hero, title: p.title })), []);
  const [heroIdx, setHeroIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const rawHero = heroFrames[heroIdx]?.src || PROJECTS[0]?.photos?.[0] || PLACEHOLDER_HERO;
  const isHttp = typeof rawHero === 'string' && rawHero.startsWith('http');
  const heroBlocked = isHttp && (rawHero.includes('imgur.com/a/') || rawHero.includes('/gallery/') || rawHero.includes('drive.google.com'));
  const hero = (!isHttp || heroBlocked) ? PLACEHOLDER_HERO : rawHero;
  const currentTitle = heroFrames[heroIdx]?.title || PROJECTS[0]?.title;
  const currentProject = PROJECTS.find(p=>p.title===currentTitle) || PROJECTS[heroIdx] || PROJECTS[0];
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [phase] = useState(prefersReduced ? 'fallback' : 'particles');

  useEffect(() => {
    const preload = (u) => { const img = new Image(); img.decoding='async'; img.loading='eager'; img.src=u; };
    preload(hero);
    const nextIdx = (heroIdx + 1) % heroFrames.length;
    if (heroFrames[nextIdx]) preload(heroFrames[nextIdx].src);
  }, [hero, heroIdx, heroFrames]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => { if (!paused) setHeroIdx(i => (i + 1) % heroFrames.length); }, 8000);
    return () => clearInterval(id);
  }, [paused, heroFrames.length, prefersReduced]);

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      {phase === 'fallback' && (
        <>
          <style>{`@keyframes kenburnsA { 0%{transform:scale(1) translate3d(0,0,0)} 100%{transform:scale(1.08) translate3d(2%, -2%, 0)} } @keyframes kenburnsB { 0%{transform:scale(1.05) translate3d(0,0,0)} 100%{transform:scale(1.1) translate3d(-2%, 2%, 0)} }`}</style>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.0}} className="absolute inset-0" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0" style={{ animation: 'kenburnsA 18s ease-out forwards' }} />
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:.35}} transition={{duration:2.4, delay:.6}} className="absolute inset-0 mix-blend-screen" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0" style={{ animation: 'kenburnsB 22s ease-out forwards' }} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </>
      )}
      {phase === 'particles' && (
        <AnimatePresence initial={false}>
          <motion.div key={heroIdx} className="absolute inset-0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.2, ease:"easeInOut"}}>
            <ParticleHero imageUrl={hero} />
          </motion.div>
        </AnimatePresence>
      )}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }} className="relative z-10 mx-auto max-w-5xl px-6 pt-28 md:pt-40">
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

const ParticleHero = ({ imageUrl }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ brush: 0, target: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
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
      vec2 coverUv(vec2 uv, vec2 iRes, vec2 tRes){ float r = iRes.x / iRes.y, tr = tRes.x / tRes.y; if(r > tr) uv.y = (uv.y - 0.5) * (r / tr) + 0.5; else uv.x = (uv.x - 0.5) * (tr / r) + 0.5; return uv; }
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main(){
        vec2 uv = vUv;
        vec2 texUV = coverUv(uv, u_res, u_texRes);
        if(any(lessThan(texUV, vec2(0.0))) || any(greaterThan(texUV, vec2(1.0)))){ gl_FragColor = vec4(0.0); return; }
        vec3 base = texture2D(u_tex, texUV).rgb;
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
        vec3 acc = vec3(0.0); float tot = 0.0; float stroke = 0.0055 * max(amt, 0.15);
        for(int i=0;i<11;i++){ float s=float(i)-5.0; float w=exp(-s*s/12.0); acc += texture2D(u_tex, texUV + dir * s * stroke).rgb * w; tot+=w; }
        vec3 stroke1 = acc / max(tot, 1e-5);
        vec2 dir2 = vec2(-dir.y, dir.x);
        vec3 acc2 = vec3(0.0); float tot2 = 0.0; float stroke2 = 0.0032 * max(amt, 0.12);
        for(int j=0;j<7;j++){ float s2=float(j)-3.0; float w2=exp(-s2*s2/8.0); acc2 += texture2D(u_tex, texUV + dir2 * s2 * stroke2).rgb * w2; tot2+=w2; }
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
        gx += texture2D(u_tex, texUV + vec2(-px.x, 0.0)).r - texture2D(u_tex, texUV + vec2(px.x, 0.0)).r;
        gy += texture2D(u_tex, texUV + vec2(0.0, -px.y)).r - texture2D(u_tex, texUV + vec2(0.0, px.y)).r;
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
      (tex) => { tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.anisotropy = 4; uniforms.u_tex.value = tex; uniforms.u_texRes.value = new THREE.Vector2(tex.image.width, tex.image.height); renderer.render(scene, camera); },
      undefined,
      () => { loader.load(PLACEHOLDER_HERO, (tex)=>{ uniforms.u_tex.value = tex; uniforms.u_texRes.value = new THREE.Vector2(tex.image.width, tex.image.height); }); }
    );

    const onResize = () => { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, true); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); uniforms.u_res.value.set(w, h); };
    onResize();
    window.addEventListener('resize', onResize);

    const onMove = (e) => { const rect = container.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width; const y = 1.0 - (e.clientY - rect.top) / rect.height; uniforms.u_mouse.value.set(x, y); mouseRef.current.target = Math.min(1, mouseRef.current.target + 0.08); };
    window.addEventListener('mousemove', onMove);

    const start = performance.now();
    const tick = () => { uniforms.u_time.value = (performance.now() - start) / 1000; const DECAY = 0.97, RISE = 0.985; mouseRef.current.target = Math.max(0, mouseRef.current.target * DECAY); const b = mouseRef.current.brush, tgt = mouseRef.current.target; mouseRef.current.brush = b < tgt ? tgt - (tgt - b) * RISE : tgt + (b - tgt) * DECAY; uniforms.u_brush.value = mouseRef.current.brush; renderer.render(scene, camera); animRef.current = requestAnimationFrame(tick); };
    tick();

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMove); if (rendererRef.current) { rendererRef.current.dispose(); container.removeChild(rendererRef.current.domElement); rendererRef.current = null; } mat.dispose(); (uniforms.u_tex.value)?.dispose?.(); };
  }, [imageUrl]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

const ProjectCard = ({ project }) => {
  const opts = useMemo(() => ({ threshold: 0.2 }), []);
  const [ref, visible] = useLazyLoad(opts);
  const open = useCallback(() => { const ev = new CustomEvent('openGallery', { detail: project }); window.dispatchEvent(ev); }, [project]);
  return (
    <div ref={ref} className="relative flex flex-col md:grid md:grid-cols-12">
      <div className="md:col-span-8 h-[70vh] overflow-hidden group relative">
        {visible && (
          <motion.img initial={{opacity:0, scale:1.02}} animate={{opacity:1, scale:1}} transition={{duration:0.7, ease:'easeOut'}} src={project.hero} alt={project.title} className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"/>
        )}
        <button onClick={open} className="absolute bottom-6 right-6 border border-white px-4 py-2 text-sm uppercase hover:bg-white hover:text-black transition">Open Gallery</button>
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
  useEffect(()=>{ const onKey = (e)=>{ if(!active) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); }; const onOpen = (e) => { if(e.detail){ setActive(e.detail); setIdx(0);} }; window.addEventListener('keydown', onKey); window.addEventListener('openGallery', onOpen); return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('openGallery', onOpen); }; },[active, close, next, prev]);
  useEffect(() => { let id = null; try { id = sessionStorage.getItem('openGalleryId'); } catch(e){} if (id) { const p = PROJECTS.find(p=>p.id===id); if (p) { setActive(p); setIdx(0); } try { sessionStorage.removeItem('openGalleryId'); } catch(e){} } }, []);
  return (
    <section className="w-full">
      {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-center bg-black/95 p-4">
            <div className="w-full max-w-6xl">
              <div className="mb-3 flex items-center justify-between text-white">
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
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <img src={active.photos[idx]} alt={`${active.title} ${idx+1}`} className="aspect-video w-full object-cover" loading="eager" decoding="async"/>
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
        <img src={ABOUT.photo} alt="Henry Kacik" className="w-full h-full object-cover" loading="lazy"/>
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
  <footer className="py-12 px-6 text-sm text-white bg-black">© {new Date().getFullYear()} Henry Kacik — probably running on too much coffee.</footer>
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
            <motion.div key={renderRoute} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.45, ease:'easeInOut'}}>
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

