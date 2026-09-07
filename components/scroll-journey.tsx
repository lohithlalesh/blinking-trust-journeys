'use client';
import NextImage from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, FileCheck2, Fingerprint, Pause, Play, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const chapters = [
  { id: 'document', label: 'Verify the document', title: 'A simple hello.\nA stronger first check.', description: 'Start with an ID. Scan the document and check its validity, with a flow that feels natural from the very first tap.', checks: ['Document scanning & OCR', 'ID validity checks', 'Proof of address'], icon: FileCheck2 },
  { id: 'person', label: 'Meet the person', title: 'There’s a real person\nbehind every ID.', description: 'Connect the document to the person holding it. Biometric matching and liveness checks help you welcome genuine customers.', checks: ['Biometric face matching', 'Liveness detection', 'Video identification when needed'], icon: Fingerprint },
  { id: 'decision', label: 'Build the relationship', title: 'Make the checks.\nOpen the possibilities.', description: 'Bring identity, screening, and customer data together. Give your team the context to make a confident onboarding decision.', checks: ['AML & PEP screening', 'Custom due diligence', 'One configurable journey'], icon: ShieldCheck },
];
const FRAME_COUNT = 90;
const framePath = (index: number, mobile: boolean) => `/media/frames${mobile ? '-mobile' : ''}/frame-${String(index + 1).padStart(3, '0')}.webp`;

export function ScrollJourney() {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useRef(false);
  const targetFrame = useRef(0);
  const [isPaused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = section.current;
    const surface = canvas.current;
    if (!root || !surface) return;
    let disposed = false;
    let cleanupMotion: (() => void) | undefined;
    let animationFrame = 0;
    const cache = new Map<number, HTMLImageElement>();
    const inFlight = new Set<number>();
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const stride = mobile ? 2 : 1;
    let lastDrawn = -1;
    let started = false;
    let startedLoads = 0;
    let currentFrame = 0;
    const ctx = surface.getContext('2d');
    surface.width = mobile ? 480 : 720;
    surface.height = surface.width;
    const draw = () => {
      if (disposed || !ctx || paused.current) return;
      const rounded = Math.round(targetFrame.current / stride) * stride;
      const target = Math.min(FRAME_COUNT - 1, rounded);
      const closest = cache.has(target) ? target : [...cache.keys()].sort((a,b)=>Math.abs(a-target)-Math.abs(b-target))[0];
      if (closest === undefined || lastDrawn === closest) return;
      const img = cache.get(closest);
      if (!img) return;
      ctx.drawImage(img, 0, 0, surface.width, surface.height);
      lastDrawn = closest;
      currentFrame = closest;
      surface.style.opacity = '1';
      // Retain a bounded decoded-image working set rather than all 90 full frames.
      if (cache.size > (mobile ? 14 : 24)) {
        const oldest = [...cache.keys()].sort((a,b)=>Math.abs(b-currentFrame)-Math.abs(a-currentFrame));
        oldest.slice(0,cache.size-(mobile?14:24)).forEach(key=>cache.delete(key));
      }
    };
    const loadFrame = (index: number) => {
      if (disposed || index < 0 || index >= FRAME_COUNT || cache.has(index) || inFlight.has(index) || inFlight.size >= 5) return;
      inFlight.add(index);
      const img = new Image();
      img.onload = () => {
        inFlight.delete(index);
        if (disposed) return;
        cache.set(index,img);
        setReady(true);
        setFailed(false);
        draw();
        loadNearTarget();
      };
      img.onerror = () => { inFlight.delete(index); if (!disposed && ++startedLoads >= 3 && !cache.size) setFailed(true); };
      img.src = framePath(index,mobile);
    };
    function loadNearTarget() {
      if (disposed) return;
      const target = Math.min(FRAME_COUNT - stride,Math.round(targetFrame.current / stride)*stride);
      // Demand loading prioritizes the current scroll position. The browser caches
      // compressed files; decoded images are kept only near the current chapter.
      [0,stride,-stride,stride*2,-stride*2,stride*3,-stride*3].forEach(offset=>loadFrame(target+offset));
    }
    const begin = async () => {
      if (started || disposed) return;
      started = true;
      if (reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      loadNearTarget();
      const context = gsap.context(() => {
        ScrollTrigger.create({
          trigger:root, start:'top 50%', end:'bottom 80%',
          onUpdate:self=>{
            targetFrame.current = Math.round(self.progress*(FRAME_COUNT-1));
            if (!paused.current) {
              loadNearTarget();
              cancelAnimationFrame(animationFrame);
              animationFrame = requestAnimationFrame(draw);
            }
          },
        });
        root.querySelectorAll<HTMLElement>('.journey-chapter').forEach((element,index)=>{
          ScrollTrigger.create({trigger:element,start:'top 55%',end:'bottom 55%',onEnter:()=>setActive(index),onEnterBack:()=>setActive(index)});
        });
      },root);
      cleanupMotion=()=>context.revert();
    };
    const observer = new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)) void begin().catch(()=>{if(!disposed)setFailed(true);});},{rootMargin:'400px'});
    observer.observe(root);
    return ()=>{disposed=true;observer?.disconnect();cleanupMotion?.();cancelAnimationFrame(animationFrame);cache.clear();};
  }, [reduceMotion]);

  const togglePause = () => { paused.current = !paused.current; setPaused(paused.current); };
  return <div ref={section} className={`journey container${reduceMotion ? ' reduced-journey' : ''}`}>
    <div className="journey-copy">{chapters.map((chapter,index)=><article key={chapter.id} className="journey-chapter" id={chapter.id}>
      <div className="chapter-label"><span>{String(index+1).padStart(2,'0')}</span>{chapter.label}</div>
      <h3>{chapter.title.split('\n').map((line,i)=><span key={line}>{i>0?<br/>:null}{line}</span>)}</h3>
      <p>{chapter.description}</p><ul>{chapter.checks.map(check=><li key={check}><Check size={16}/>{check}</li>)}</ul>
      <a className="text-link" href="https://www.blinking.id/solutions/identify/">Explore Blinking Identify <ArrowRight size={17}/></a>
    </article>)}</div>
    <div className="journey-visual"><div className="journey-sticky">
      <div className="sequence-art">
        <NextImage src="/media/identity-hero.webp" alt="A human identity framed by Blinking’s biometric lens" width="720" height="720" loading="lazy"/>
        <canvas ref={canvas} aria-hidden="true"/>
        <div className="sequence-status"><ShieldCheck size={16}/><span>{chapters[active].label}</span></div>
        {!reduceMotion && ready && !failed ? <Button variant="ghost" size="icon-lg" className="motion-toggle" onClick={togglePause} aria-label={isPaused?'Resume scroll animation':'Pause scroll animation'} aria-pressed={isPaused}>{isPaused?<Play size={15}/>:<Pause size={15}/>}</Button>:null}
      </div>
      <nav className="chapter-nav" aria-label="Verification journey stages">{chapters.map((chapter,index)=><a key={chapter.id} className={index===active?'active':''} href={`#${chapter.id}`} aria-current={index===active?'step':undefined}><chapter.icon size={18}/><span>{index===0?'Document':index===1?'Person':'Decision'}</span><span className="chapter-progress"/></a>)}</nav>
      <span className="sequence-note">{failed?'The journey is shown as a still image.':reduceMotion?'Your motion preference is respected.':'Illustrating a journey built around your customer.'}</span>
    </div></div>
  </div>;
}
