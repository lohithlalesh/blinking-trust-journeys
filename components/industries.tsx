'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, FileCheck2, Fingerprint, Gamepad2, ScanFace, ShieldCheck, Signal, Smartphone, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  {
    id: 'finance', label: 'Financial services', short: 'Finance', icon: Building2,
    heading: 'From application\nto a trusted account.',
    description: 'Bring identity verification and due diligence into digital account opening, before the first transaction.',
    link: 'finance', product: 'Blinking Identify + screening',
    evidence: 'Identity, AML context, and the onboarding record stay connected.',
    stages: [
      { label: 'Capture', detail: 'Identity document', icon: FileCheck2 },
      { label: 'Verify', detail: 'Face + liveness', icon: ScanFace },
      { label: 'Screen', detail: 'AML + PEP checks', icon: ShieldCheck },
      { label: 'Decide', detail: 'Account journey ready', icon: Check },
    ],
  },
  {
    id: 'telecom', label: 'Telecommunications', short: 'Telecom', icon: Smartphone,
    heading: 'From new SIM\nto a trusted subscriber.',
    description: 'Verify the person behind a subscription remotely, and connect the identity check to the activation journey.',
    link: 'telecommunications', product: 'Blinking Identify + data collection',
    evidence: 'One guided path can connect SIM details, identity, and activation.',
    stages: [
      { label: 'Collect', detail: 'SIM + subscriber data', icon: Smartphone },
      { label: 'Verify', detail: 'Document + face', icon: Fingerprint },
      { label: 'Connect', detail: 'Registration rules', icon: Signal },
      { label: 'Activate', detail: 'Subscriber ready', icon: Check },
    ],
  },
  {
    id: 'gaming', label: 'Gaming', short: 'Gaming', icon: Gamepad2,
    heading: 'From registration\nto responsible access.',
    description: 'Put identity and risk checks at the start of the player journey, supporting responsible access and fraud detection.',
    link: 'gaming', product: 'Blinking Identify + due diligence',
    evidence: 'Age, identity, AML context, and payout details support one decision.',
    stages: [
      { label: 'Identify', detail: 'Player + age data', icon: FileCheck2 },
      { label: 'Confirm', detail: 'Face + liveness', icon: ScanFace },
      { label: 'Assess', detail: 'AML + risk rules', icon: ShieldCheck },
      { label: 'Access', detail: 'Player journey ready', icon: UserCheck },
    ],
  },
];

export function Industries() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const navigation = useRef<((index: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = root.current;
    const view = viewport.current;
    if (!element || !view) return;
    let disposed = false;
    let started = false;
    let cleanup: (() => void) | undefined;
    const rail = view.querySelector<HTMLElement>('.sector-track')!;
    const slides = [...rail.querySelectorAll<HTMLElement>('.sector-slide')];
    let selected = 0;
    const select = (index: number) => {
      if (selected !== index) {
        selected = index;
        setActive(index);
      }
    };
    const onScroll = () => {
      if (navigation.current || slides.length < 2) return;
      const step = slides[1].offsetLeft - slides[0].offsetLeft;
      select(Math.max(0, Math.min(industries.length - 1, Math.round(view.scrollLeft / step))));
    };
    view.addEventListener('scroll', onScroll, { passive: true });

    const begin = async () => {
      if (disposed || started) return;
      started = true;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
        view.scrollLeft = 0;
        element.dataset.motion = 'on';
        const sources = slides.map(slide => slide.querySelector<HTMLElement>('.film-source')!);
        const proofs = slides.map(slide => slide.querySelector<HTMLElement>('.film-proof')!);
        const risks = slides.map(slide => slide.querySelector<HTMLElement>('.film-risk')!);
        const results = slides.map(slide => slide.querySelector<HTMLElement>('.film-result')!);
        const paths = slides.map(slide => [...slide.querySelectorAll<HTMLElement>('.film-path')]);
        const scans = slides.map(slide => slide.querySelector<HTMLElement>('.film-scanline')!);
        const labelTimes: number[] = [];

        gsap.set(sources, { opacity: 0.68, y: 0, z: 0 });
        gsap.set([...proofs, ...risks, ...results], { opacity: 0, y: 20, rotateX: -9 });
        gsap.set(paths.flat(), { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
        gsap.set(scans, { opacity: 0, top: '8%' });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: () => `+=${window.innerHeight * 5.4}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        slides.forEach((slide, index) => {
          if (index > 0) {
            timeline.to(rail, {
              x: () => -(slides[index].offsetLeft - slides[0].offsetLeft),
              duration: 0.72,
              ease: 'power2.inOut',
            });
          }
          labelTimes[index] = timeline.duration();
          timeline.to(sources[index], { opacity: 1, y: -5, z: 34, duration: 0.28, ease: 'power2.out' });
          timeline.to(scans[index], { opacity: 0.8, top: '76%', duration: 1.25, ease: 'none' }, '<');
          timeline.to(paths[index][0], { opacity: 1, scaleX: 1, duration: 0.25, ease: 'none' }, '<0.16');
          timeline.to(proofs[index], { opacity: 1, y: 0, rotateX: 0, duration: 0.36, ease: 'power2.out' }, '<0.08');
          timeline.to(paths[index][1], { opacity: 1, scaleX: 1, duration: 0.25, ease: 'none' });
          timeline.to(risks[index], { opacity: 1, y: 0, rotateX: 0, duration: 0.36, ease: 'power2.out' }, '<0.08');
          timeline.to(results[index], { opacity: 1, y: 0, rotateX: 0, duration: 0.38, ease: 'back.out(1.4)' });
          timeline.to(scans[index], { opacity: 0, duration: 0.18 }, '<');
          timeline.to({}, { duration: 0.3 });
        });

        timeline.eventCallback('onUpdate', () => {
          const time = timeline.time();
          let index = 0;
          labelTimes.forEach((labelTime, candidate) => { if (time >= labelTime - 0.2) index = candidate; });
          select(index);
        });

        navigation.current = index => {
          const trigger = timeline.scrollTrigger;
          if (!trigger) return;
          const progress = labelTimes[index] / timeline.duration();
          window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: 'smooth' });
        };

        return () => {
          delete element.dataset.motion;
          navigation.current = null;
        };
      });

      cleanup = () => media.revert();
    };

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        void begin().catch(() => {});
      }
    }, { rootMargin: '600px' });
    observer.observe(element);

    return () => {
      disposed = true;
      observer.disconnect();
      view.removeEventListener('scroll', onScroll);
      cleanup?.();
    };
  }, []);

  const jump = (index: number) => {
    const next = Math.max(0, Math.min(industries.length - 1, index));
    if (navigation.current) navigation.current(next);
    else {
      const view = viewport.current;
      const slides = view?.querySelectorAll<HTMLElement>('.sector-slide');
      if (view && slides?.length) view.scrollTo({ left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return <section ref={root} id="industries" className="sectors" aria-labelledby="sectors-title">
    <div className="container sectors-shell">
      <div className="sectors-heading"><p className="eyebrow">TRUST IN MOTION</p><h2 id="sectors-title">Different industries.<br/><span>The same need for trust.</span></h2></div>
      <nav className="sector-navigation" aria-label="Industry examples">{industries.map((item, index) => <Button key={item.id} variant="ghost" className="sector-nav-button" onClick={() => jump(index)} aria-current={active === index ? 'true' : undefined}><item.icon size={19}/><span>{item.short}</span></Button>)}</nav>
      <div ref={viewport} className="sector-viewport">
        <div className="sector-track">{industries.map((item, index) => <article className="sector-slide" data-sector={item.id} key={item.id} aria-labelledby={`sector-${item.id}`}>
          <div className="sector-copy"><p className="sector-label">{item.label}</p><h3 id={`sector-${item.id}`}>{item.heading.split('\n').map((line, lineIndex) => <span key={line}>{lineIndex ? <br/> : null}{line}</span>)}</h3><p>{item.description}</p><div className="sector-product"><Check size={16}/>{item.product}</div><a className="text-link" onFocus={() => { if (index !== active) jump(index); }} href={`https://www.blinking.id/industry/${item.link}/`}>Explore {item.label.toLowerCase()} <ArrowUpRight size={18}/></a></div>
          <figure className="sector-film" aria-label={`${item.label} onboarding sequence`}>
            <figcaption><span>LIVE JOURNEY / 0{index + 1}</span><span>Scroll to progress</span></figcaption>
            <div className="film-scene">
              <span className="film-grid" aria-hidden="true"/>
              <span className="film-scanline" aria-hidden="true"/>
              <div className="film-node film-source"><span className="film-icon">{createElement(item.stages[0].icon, { size: 25, strokeWidth: 1.5 })}</span><em>01</em><strong>{item.stages[0].label}</strong><small>{item.stages[0].detail}</small></div>
              <span className="film-path film-path-a" aria-hidden="true"><ArrowRight size={18}/></span>
              <div className="film-node film-proof"><span className="film-icon">{createElement(item.stages[1].icon, { size: 25, strokeWidth: 1.5 })}</span><em>02</em><strong>{item.stages[1].label}</strong><small>{item.stages[1].detail}</small></div>
              <span className="film-path film-path-b" aria-hidden="true"><ArrowRight size={18}/></span>
              <div className="film-node film-risk"><span className="film-icon">{createElement(item.stages[2].icon, { size: 25, strokeWidth: 1.5 })}</span><em>03</em><strong>{item.stages[2].label}</strong><small>{item.stages[2].detail}</small></div>
              <div className="film-result"><span className="film-result-icon">{createElement(item.stages[3].icon, { size: 20 })}</span><span><em>OUTCOME</em><strong>{item.stages[3].label}</strong><small>{item.stages[3].detail}</small></span></div>
            </div>
            <p className="film-evidence">{item.evidence}</p>
          </figure>
        </article>)}</div>
      </div>
      <div className="sector-footer"><span>{String(active + 1).padStart(2, '0')} <span>/ {String(industries.length).padStart(2, '0')}</span></span><div><Button variant="outline" size="icon-lg" className="sector-arrow" onClick={() => jump(active - 1)} disabled={active === 0} aria-label="Previous industry"><ArrowLeft size={19}/></Button><Button variant="outline" size="icon-lg" className="sector-arrow" onClick={() => jump(active + 1)} disabled={active === industries.length - 1} aria-label="Next industry"><ArrowRight size={19}/></Button></div></div>
    </div>
  </section>;
}
