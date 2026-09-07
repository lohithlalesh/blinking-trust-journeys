'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Building2, Check, Fingerprint, Gamepad2, ShieldCheck, Smartphone } from 'lucide-react';

const industries = [
  { id: 'finance', label: 'Financial services', icon: Building2, title: 'Open the account.\nKeep the relationship.', description: 'Guide customers from application to account with identity and due diligence checks shaped around your requirements.', tags: ['Digital account opening', 'Customer due diligence', 'AML screening'], outcome: 'Ready for the next chapter', link: 'finance', company: 'Your next customer', accent: 'blue' },
  { id: 'telecom', label: 'Telecommunications', icon: Smartphone, title: 'Make the connection.\nKnow who is joining.', description: 'Bring verification into the subscriber journey so people can access your services through a guided digital experience.', tags: ['Subscriber onboarding', 'Remote identification', 'Cross-device access'], outcome: 'A connection built on trust', link: 'telecommunications', company: 'Your next subscriber', accent: 'mint' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, title: 'Welcome the player.\nKeep trust in play.', description: 'Build an identity journey that supports responsible access, helps detect fraud, and fits your verification requirements.', tags: ['Player verification', 'Identity checks', 'Risk screening'], outcome: 'A better start to play', link: 'gaming', company: 'Your next player', accent: 'navy' },
];

export function Industries() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = root.current;
    const rail = track.current;
    if (!element || !rail || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanup = () => {};
    const begin = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const distance = () => Math.max(0, rail.scrollWidth - element.clientWidth);
        gsap.to(rail, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: element, start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.35}`,
            pin: true, scrub: 1, invalidateOnRefresh: true,
            onUpdate: self => setActive(Math.min(industries.length - 1, Math.round(self.progress * (industries.length - 1)))),
          },
        });
      }, element);
      cleanup = () => context.revert();
    };
    void begin();
    return () => { disposed = true; cleanup(); };
  }, []);

  return <section ref={root} className="industries" id="industries">
    <div className="industries-shell">
      <div className="container industries-head">
        <div><p className="eyebrow">BUILT AROUND YOUR BUSINESS</p><h2>Different industries.<br/>The same need for trust.</h2></div>
        <div className="industry-count"><span>0{active + 1}</span><i/>03</div>
      </div>
      <div className="industry-viewport"><div ref={track} className="industry-track">
        {industries.map((item, index) => { const Icon = item.icon; return <article className={`industry-slide ${active === index ? 'is-active' : ''}`} data-accent={item.accent} key={item.id}>
          <div className="industry-slide-copy"><div className="industry-slide-label"><Icon size={20}/><span>0{index + 1} / {item.label}</span></div><h3>{item.title.split('\n').map((line, lineIndex) => <span key={line}>{lineIndex > 0 ? <br/> : null}{line}</span>)}</h3><p>{item.description}</p><ul>{item.tags.map(tag => <li key={tag}><Check size={14}/>{tag}</li>)}</ul><a className="text-link" href={`https://www.blinking.id/industry/${item.link}/`}>Explore {item.label.toLowerCase()} <ArrowUpRight size={18}/></a></div>
          <div className="industry-use-case" aria-label={`Example ${item.label} verification journey`}><div className="industry-use-top"><span>{item.company}</span><span className="industry-use-live"><i/> FLOW</span></div><div className="industry-use-orbit"><Icon size={38} strokeWidth={1.1}/><span>{item.outcome}</span></div><div className="industry-use-steps"><div><Fingerprint size={16}/><span>Identity</span><Check size={15}/></div><div><ShieldCheck size={16}/><span>Trust checks</span><Check size={15}/></div><div><Icon size={16}/><span>Access</span><Check size={15}/></div></div><p>Configured around the way your team works.</p></div>
        </article>; })}
      </div></div>
      <div className="container industry-scroll-footer"><span>Scroll to explore each use case</span><div className="industry-progress"><span style={{ transform: `scaleX(${(active + 1) / industries.length})` }}/></div><span>0{active + 1} / 03</span></div>
    </div>
  </section>;
}
