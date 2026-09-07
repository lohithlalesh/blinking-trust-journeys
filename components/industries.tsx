'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, FileCheck2, Fingerprint, Gamepad2, ScanFace, ShieldCheck, Signal, Smartphone, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  { id: 'finance', label: 'Financial services', short: 'Finance', icon: Building2, heading: 'An account opening.\nA relationship beginning.', description: 'Bring identity verification and due diligence into digital account opening, before the first transaction.', link: 'finance', example: 'Digital account opening', product: 'Blinking Identify + screening', result: 'Ready for your onboarding decision', steps: [{ label: 'Capture an ID', detail: 'Document checks', icon: FileCheck2 }, { label: 'Match the customer', detail: 'Biometrics & liveness', icon: ScanFace }, { label: 'Review the risk', detail: 'AML & PEP screening', icon: ShieldCheck }] },
  { id: 'telecom', label: 'Telecommunications', short: 'Telecom', icon: Smartphone, heading: 'A new subscriber.\nA trusted connection.', description: 'Verify the person behind a subscription remotely, and connect the identity check to your activation journey.', link: 'telecommunications', example: 'Remote subscriber onboarding', product: 'Blinking Identify + data collection', result: 'Verified identity for subscriber activation', steps: [{ label: 'Collect subscriber details', detail: 'A guided digital flow', icon: Smartphone }, { label: 'Verify their identity', detail: 'Document + face match', icon: Fingerprint }, { label: 'Connect the record', detail: 'Ready for your activation process', icon: Signal }] },
  { id: 'gaming', label: 'Gaming', short: 'Gaming', icon: Gamepad2, heading: 'A real player.\nA better start to play.', description: 'Put identity and risk checks at the start of the player journey, supporting responsible access and fraud detection.', link: 'gaming', example: 'Player identity verification', product: 'Blinking Identify + due diligence', result: 'Identity context for responsible player access', steps: [{ label: 'Identify the player', detail: 'Document verification', icon: FileCheck2 }, { label: 'Confirm a real person', detail: 'Biometrics & liveness', icon: ScanFace }, { label: 'Assess access', detail: 'Your rules and risk review', icon: UserCheck }] },
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
    const select = (index: number) => { if (selected !== index) { selected = index; setActive(index); } };
    const onScroll = () => {
      if (navigation.current) return;
      const step = slides[1].offsetLeft - slides[0].offsetLeft;
      select(Math.max(0, Math.min(2, Math.round(view.scrollLeft / step))));
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
        const distance = () => rail.scrollWidth - view.clientWidth;
        const tween = gsap.to(rail, { x: () => -distance(), ease: 'none',
          onUpdate: () => select(Math.max(0, Math.min(2, Math.round(-Number(gsap.getProperty(rail, 'x')) / (distance() / 2))))),
          scrollTrigger: { trigger: element, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true },
        });
        navigation.current = index => {
          view.scrollLeft = 0;
          const trigger = tween.scrollTrigger;
          if (trigger) window.scrollTo({ top: trigger.start + index / 2 * (trigger.end - trigger.start), behavior: 'smooth' });
        };
        return () => { delete element.dataset.motion; navigation.current = null; };
      });
      cleanup = () => media.revert();
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); void begin().catch(() => {}); }
    }, { rootMargin: '600px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); view.removeEventListener('scroll', onScroll); cleanup?.(); };
  }, []);

  const jump = (index: number) => {
    if (navigation.current) navigation.current(index);
    else {
      const view = viewport.current;
      const slides = view?.querySelectorAll<HTMLElement>('.sector-slide');
      if (view && slides) view.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return <section ref={root} id="industries" className="sectors" aria-labelledby="sectors-title">
    <div className="container sectors-shell">
      <div className="sectors-heading"><h2 id="sectors-title">Different industries.<br/><span>The same need for trust.</span></h2></div>
      <nav className="sector-navigation" aria-label="Industry examples">{industries.map((item, index) => <Button key={item.id} variant="ghost" className="sector-nav-button" onClick={() => jump(index)} aria-current={active === index ? 'true' : undefined}><item.icon size={19}/><span>{item.short}</span></Button>)}</nav>
      <div ref={viewport} className="sector-viewport">
        <div className="sector-track">{industries.map((item, index) => <article className="sector-slide" data-sector={item.id} key={item.id} aria-labelledby={`sector-${item.id}`}>
          <div className="sector-copy"><p className="sector-label">{item.label}</p><h3 id={`sector-${item.id}`}>{item.heading.split('\n').map((line, i) => <span key={line}>{i ? <br/> : null}{line}</span>)}</h3><p>{item.description}</p><div className="sector-product"><Check size={16}/>{item.product}</div><a className="text-link" onFocus={() => { if (index !== active) jump(index); }} href={`https://www.blinking.id/industry/${item.link}/`}>Explore {item.label.toLowerCase()} <ArrowUpRight size={18}/></a></div>
          <figure className="sector-diagram"><figcaption>Example journey <span>{item.example}</span></figcaption><div className="sector-symbol"><item.icon size={90} strokeWidth={1}/><span>{item.label}</span></div><ol>{item.steps.map((step, i) => <li key={step.label}><span className="sector-step-icon"><step.icon size={21} strokeWidth={1.5}/></span><div><strong>{step.label}</strong><small>{step.detail}</small></div><span className="sector-step-index">0{i + 1}</span></li>)}</ol><div className="sector-result"><ArrowRight size={18}/>{item.result}</div></figure>
        </article>)}</div>
      </div>
      <div className="sector-footer"><span>{String(active + 1).padStart(2, '0')} <span>/ 03</span></span><div><Button variant="outline" size="icon-lg" className="sector-arrow" onClick={() => jump(active - 1)} disabled={active === 0} aria-label="Previous industry"><ArrowLeft size={19}/></Button><Button variant="outline" size="icon-lg" className="sector-arrow" onClick={() => jump(active + 1)} disabled={active === 2} aria-label="Next industry"><ArrowRight size={19}/></Button></div></div>
    </div>
  </section>;
}
