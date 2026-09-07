'use client';

import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Files, Fingerprint, Pause, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const chapters = [
  {
    id: 'verify-identity', label: 'Verify clients’ identity', shortLabel: 'Identity',
    title: 'Know the person.\nTrust the identity.',
    description: 'Check the document. Match the face. Confirm a real person is present. Give genuine customers a simpler way to get started.',
    checks: ['Document scan & validity check', 'Biometric face matching', 'Liveness & fraud detection'],
    icon: Fingerprint, media: 'identity-hd', frames: 144,
    alt: 'A person within a biometric lens, alongside an identity document',
    detail: 'Document + biometrics', cta: 'Explore identity verification',
  },
  {
    id: 'video-verification', label: 'Video verification', shortLabel: 'Live video',
    title: 'A real conversation.\nA confident decision.',
    description: 'Bring a verification agent face to face with your customer. Review their identity together, wherever they are.',
    checks: ['Live customer–agent video session', 'Manual ID comparison', 'Session scheduling & secure recordings'],
    icon: Video, media: 'video-verification', frames: 144,
    alt: 'A laptop showing a live video verification call between a customer and an agent',
    detail: 'Customer + verification agent', cta: 'Explore video identification',
  },
  {
    id: 'collect-data', label: 'Collect data', shortLabel: 'Data collection',
    title: 'The right information.\nAll in the right place.',
    description: 'Collect documents and customer details in one configurable flow. Organize the information your team needs for due diligence.',
    checks: ['Customer & document management', 'Custom data collection', 'KYC, AML & PEP checks'],
    icon: Files, media: 'data-collection', frames: 120,
    alt: 'Identity, contact, and address documents organizing into a blue folder',
    detail: 'Capture + organize + review', cta: 'Explore configurable flows',
  },
];

function framePath(stage: number, frame: number, mobile: boolean) {
  return `/media/${chapters[stage].media}/frames${mobile ? '-mobile' : ''}/frame-${String(frame + 1).padStart(3, '0')}.webp`;
}

export function ScrollJourney() {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useRef(false);
  const controller = useRef<((retry?: boolean) => void) | null>(null);
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
    const ctx = surface.getContext('2d');
    if (!ctx) return;
    let disposed = false;
    let cleanupMotion: (() => void) | undefined;
    let animationFrame = 0;
    let started = false;
    let stage = 0;
    let target = 0;
    let lastDrawn = '';
    let errors = 0;
    const cache = new Map<string, HTMLImageElement>();
    const inFlight = new Map<string, HTMLImageElement>();
    const failedFrames = new Set<string>();
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const stride = mobile ? 2 : 1;
    const cacheLimit = mobile ? 12 : 16;
    surface.width = mobile ? 768 : 1200;
    surface.height = surface.width;
    surface.style.opacity = '0';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const prune = () => {
      if (cache.size <= cacheLimit) return;
      const cost = (key: string) => {
        const [segment, frame] = key.split(':').map(Number);
        return segment === stage ? Math.abs(frame - target) : 10000;
      };
      [...cache.keys()].sort((a,b)=>cost(b)-cost(a))
        .slice(0,cache.size-cacheLimit).forEach(key=>cache.delete(key));
    };
    const render = () => {
      if (disposed || paused.current) return;
      const keys = [...cache.keys()].filter(key=>key.startsWith(`${stage}:`));
      const nearest = keys.sort((a,b)=>Math.abs(Number(a.split(':')[1])-target)-Math.abs(Number(b.split(':')[1])-target))[0];
      if (!nearest || lastDrawn === nearest) return;
      const img = cache.get(nearest);
      if (!img) return;
      ctx.clearRect(0,0,surface.width,surface.height);
      ctx.drawImage(img,0,0,surface.width,surface.height);
      lastDrawn = nearest;
      surface.style.opacity = '1';
      setReady(true);
      setFailed(false);
      prune();
    };
    const scheduleRender = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(render);
    };
    const load = (segment: number, frame: number) => {
      const key = `${segment}:${frame}`;
      if (disposed || frame < 0 || frame >= chapters[segment].frames || cache.has(key) || inFlight.has(key) || failedFrames.has(key) || inFlight.size >= 5) return;
      const img = new Image();
      img.decoding = 'async';
      inFlight.set(key,img);
      img.onload = () => {
        inFlight.delete(key);
        if (disposed) return;
        cache.set(key,img);
        prune();
        scheduleRender();
        pump();
      };
      img.onerror = () => {
        inFlight.delete(key);
        failedFrames.add(key);
        if (!disposed && segment === stage && ++errors >= 3) setFailed(true);
        if (!disposed) pump();
      };
      img.src = framePath(segment,frame,mobile);
    };
    function pump() {
      if (disposed || paused.current) return;
      const rounded = Math.min(chapters[stage].frames-stride,Math.round(target/stride)*stride);
      [0,1,-1,2,-2,3,-3,4,-4].forEach(offset=>load(stage,rounded+offset*stride));
    }
    const update = (next: number, progress: number) => {
      if (disposed) return;
      if (next !== stage) {
        stage = next;
        errors = 0;
        lastDrawn = '';
        surface.style.opacity = '0';
        setActive(next);
        setReady(false);
        setFailed(false);
      }
      target = Math.round(Math.max(0,Math.min(1,progress))*(chapters[stage].frames-1));
      pump();
      scheduleRender();
    };
    controller.current = (retry = false) => { if(retry){failedFrames.clear();errors=0;setFailed(false);} pump(); scheduleRender(); };
    const begin = async () => {
      if (started || disposed) return;
      started = true;
      if (reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      // Each clip follows its own chapter, so live review and data collection
      // never inherit the biometric clip's timing or imagery.
      const chapterLine = () => {
        if (!window.matchMedia('(max-width: 767px)').matches) return window.innerHeight * .52;
        const visualHeight = root.querySelector('.journey-visual')?.getBoundingClientRect().height ?? 340;
        const line = Math.min(window.innerHeight - 32, visualHeight + 104);
        root.style.setProperty('--chapter-anchor', `${line - 2}px`);
        return line;
      };
      const context = gsap.context(()=>{
        root.querySelectorAll<HTMLElement>('.journey-chapter').forEach((element,index)=>{
          ScrollTrigger.create({
            trigger:element, start:()=>`top ${chapterLine()}px`, end:()=>`bottom ${chapterLine()}px`,
            onEnter:self=>update(index,self.progress),
            onEnterBack:self=>update(index,self.progress),
            onUpdate:self=>{if(self.isActive)update(index,self.progress);},
            onLeave:()=>{if(index===chapters.length-1)update(index,1);},
            onLeaveBack:()=>{if(index===0)update(0,0);},
          });
        });
      },root);
      cleanupMotion=()=>context.revert();
      pump();
      // Posters are small, and preloading them avoids a blank frame at a chapter boundary.
      chapters.slice(1).forEach(chapter=>{const poster=new Image();poster.src=`/media/${chapter.media}/poster.webp`;});
    };
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting))void begin().catch(()=>{if(!disposed)setFailed(true);});
    },{rootMargin:'500px'});
    observer.observe(root);
    return ()=>{
      disposed=true;
      observer.disconnect();
      cleanupMotion?.();
      cancelAnimationFrame(animationFrame);
      controller.current=null;
      inFlight.forEach(img=>{img.onload=null;img.onerror=null;img.src='';});
      inFlight.clear();cache.clear();
    };
  },[reduceMotion]);

  const togglePause=()=>{paused.current=!paused.current;setPaused(paused.current);controller.current?.();};
  const StageIcon=chapters[active].icon;
  return <div ref={section} className={`journey container${reduceMotion?' reduced-journey':''}`}>
    <div className="journey-copy">{chapters.map((chapter,index)=><article key={chapter.id} className="journey-chapter" id={chapter.id}>
      <div className="chapter-label"><span>{String(index+1).padStart(2,'0')}</span>{chapter.label}</div>
      <h3>{chapter.title.split('\n').map((line,i)=><span key={line}>{i>0?<br/>:null}{line}</span>)}</h3>
      <p>{chapter.description}</p><ul>{chapter.checks.map(check=><li key={check}><Check size={16}/>{check}</li>)}</ul>
      <a className="text-link" href="https://www.blinking.id/solutions/identify/">{chapter.cta} <ArrowRight size={17}/></a>
      <NextImage className="chapter-static-media" src={`/media/${chapter.media}/poster.webp`} alt={chapter.alt} width={1200} height={1200} loading="lazy"/>
    </article>)}</div>
    <div className="journey-visual"><div className="journey-sticky">
      <div className="sequence-art" data-stage={active}>
        <div className="sequence-pixels"><NextImage src={`/media/${chapters[active].media}/poster.webp`} alt={chapters[active].alt} width={1200} height={1200} loading="lazy"/><canvas ref={canvas} aria-hidden="true"/></div>
        <div className="sequence-status"><StageIcon size={17}/><span>{chapters[active].label}</span></div>
        {!reduceMotion && (!failed || isPaused)?<Button variant="ghost" size="icon-lg" className="motion-toggle" disabled={!ready && !isPaused} onClick={togglePause} aria-label={isPaused?'Resume scroll animation':'Pause scroll animation'} aria-pressed={isPaused}>{isPaused?<Play size={16}/>:<Pause size={16}/>}</Button>:null}
      </div>
      <div className="sequence-detail"><StageIcon size={17}/>{chapters[active].detail}</div>
      <nav className="chapter-nav" aria-label="Verification services">{chapters.map((chapter,index)=><a key={chapter.id} className={index===active?'active':''} href={`#${chapter.id}`} aria-current={index===active?'step':undefined}><chapter.icon size={19}/><span>{chapter.shortLabel}</span><span className="chapter-progress"/></a>)}</nav>
      {failed?<div className="sequence-note">Showing the still image. <Button variant="link" className="retry-animation" onClick={()=>controller.current?.(true)}>Retry animation</Button></div>:null}
    </div></div>
  </div>;
}
