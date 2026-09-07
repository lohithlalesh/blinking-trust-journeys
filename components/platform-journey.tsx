'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Files, Fingerprint, Video } from 'lucide-react';

const steps = [
  {
    number: '01', label: 'Blinking Identify', title: 'Make a great first impression.',
    description: 'Start with document capture, biometric matching, and the checks your team needs to welcome a real customer.',
    tags: ['Document checks', 'Biometrics', 'AML'], icon: Fingerprint,
    href: 'https://www.blinking.id/solutions/identify/', nodes: ['Document', 'Face match', 'Decision'],
  },
  {
    number: '02', label: 'Video verification', title: 'Bring a human touch to the moment that matters.',
    description: 'Add a secure, face-to-face review when a customer or your team needs more context before moving forward.',
    tags: ['Live review', 'ID comparison', 'Secure session'], icon: Video,
    href: 'https://www.blinking.id/solutions/identify/', nodes: ['Customer', 'Agent review', 'Approved'],
  },
  {
    number: '03', label: 'Collect data', title: 'Keep the right information connected.',
    description: 'Configure the flow around your due diligence process, then keep the customer, document, and review data together.',
    tags: ['Custom fields', 'KYC / AML', 'Review ready'], icon: Files,
    href: 'https://www.blinking.id/plans/', nodes: ['Customer data', 'Due diligence', 'One record'],
  },
];

export function PlatformJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanup = () => {};
    const begin = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        element.querySelectorAll<HTMLElement>('.platform-step').forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step, start: 'top 61%', end: 'bottom 39%',
            onEnter: () => setActive(index), onEnterBack: () => setActive(index),
          });
        });
        gsap.fromTo(element.querySelector('.platform-rail-fill'), { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 30%', end: 'bottom 70%', scrub: 1 },
        });
      }, element);
      cleanup = () => context.revert();
    };
    void begin();
    return () => { disposed = true; cleanup(); };
  }, []);

  const current = steps[active];
  const ActiveIcon = current.icon;
  return <div ref={root} className="platform-journey">
    <div className="platform-steps">
      <div className="platform-rail" aria-hidden="true"><span className="platform-rail-fill"/></div>
      {steps.map((step, index) => <article className={`platform-step${active === index ? ' is-active' : ''}`} key={step.number}>
        <div className="platform-step-kicker"><span>{step.number}</span>{step.label}</div>
        <h3>{step.title}</h3><p>{step.description}</p>
        <div className="platform-tags">{step.tags.map(tag => <span key={tag}><Check size={13}/>{tag}</span>)}</div>
        <a className="text-link" href={step.href}>Explore this flow <ArrowRight size={17}/></a>
      </article>)}
    </div>
    <aside className="platform-console" aria-live="polite">
      <div className="platform-console-card" data-step={active}>
        <div className="platform-console-top"><span>BLINKING / FLOW 0{active + 1}</span><span className="platform-console-live"><i/> LIVE JOURNEY</span></div>
        <div className="platform-console-visual">
          <div className="platform-console-orbit orbit-a"/><div className="platform-console-orbit orbit-b"/>
          <div className="platform-console-core"><ActiveIcon size={36} strokeWidth={1.1}/><span>{current.label}</span></div>
          {current.nodes.map((node, index) => <div className={`platform-node node-${index + 1}`} key={node}><span>{String(index + 1).padStart(2, '0')}</span>{node}</div>)}
        </div>
        <div className="platform-console-bottom"><div><small>Now showing</small><strong>{current.label}</strong></div><span>{String(active + 1).padStart(2, '0')} / 03</span></div>
      </div>
      <div className="platform-console-note">One platform. The controls to shape every step.</div>
    </aside>
  </div>;
}
