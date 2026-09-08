'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, FileCheck2, Fingerprint, ShieldCheck, SlidersHorizontal, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { title: 'Collect', subtitle: 'Start with the essentials', icon: FileCheck2, heading: 'A first step that feels simple.', description: 'Bring documents and customer details into one guided flow. Ask for the information your business needs, in your own order.', checks: ['Document capture', 'Customer details', 'Custom data fields'], capability: 'Data collection', link: 'https://www.blinking.id/plans/' },
  { title: 'Verify', subtitle: 'Know who is joining', icon: Fingerprint, heading: 'Connect the person to the identity.', description: 'Check the identity document, compare the face, and confirm a real person is present with Blinking Identify.', checks: ['Document checks', 'Biometric matching', 'Liveness detection'], capability: 'Blinking Identify', link: 'https://www.blinking.id/solutions/identify/' },
  { title: 'Review', subtitle: 'Add risk context', icon: ShieldCheck, heading: 'See more before you decide.', description: 'Connect the verified identity to AML and PEP checks, watchlist and media screening, and your own risk rules. Add an agent-led video review when the journey calls for it.', checks: ['AML & PEP screening', 'Watchlist & media review', 'Optional video identification'], capability: 'AML & due diligence', link: '#aml-screening' },
  { title: 'Welcome', subtitle: 'Move forward with confidence', icon: UserCheck, heading: 'One connected customer journey.', description: 'Keep the customer, their documents, and the review together so your team has the context to decide what comes next.', checks: ['Customer management', 'Connected records', 'Your decision process'], capability: 'One platform', link: 'https://www.blinking.id/solutions/identify/' },
];

export function PlatformJourney() {
  const root = useRef<HTMLElement>(null);
  const navigation = useRef<((index: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let started = false;
    const begin = async () => {
      if (started || disposed) return;
      started = true;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = element.querySelector<HTMLElement>('.platform-stage')!;
        const nodes = [...element.querySelectorAll<HTMLElement>('.flow-node')];
        const connectors = [...element.querySelectorAll<HTMLElement>('.flow-connector-fill')];
        const panels = [...element.querySelectorAll<HTMLElement>('.platform-story')];
        element.dataset.motion = 'on';
        gsap.set(nodes.slice(1), { y: 30, opacity: 0.22 });
        gsap.set(connectors, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(panels.slice(1), { opacity: 0, y: 20 });
        let selected = 0;
        const setSelected = (index: number) => {
          if (selected !== index) { selected = index; setActive(index); }
          panels.forEach((panel, i) => {
            panel.inert = i !== index;
            panel.setAttribute('aria-hidden', String(i !== index));
          });
          nodes.forEach((node, i) => node.dataset.status = i < index ? 'complete' : i === index ? 'active' : 'waiting');
        };
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * 2.2}`,
          pin: true, scrub: 0.65, invalidateOnRefresh: true, anticipatePin: 1,
        }});
        timeline.to({}, { duration: 0.4 });
        for (let index = 1; index < steps.length; index += 1) {
          const at = index - 0.45;
          timeline.to(connectors[index - 1], { scaleX: 1, duration: 0.55, ease: 'none' }, at);
          timeline.to(nodes[index], { y: 0, opacity: 1, duration: 0.5 }, at + 0.25);
          timeline.to(panels[index - 1], { opacity: 0, y: -16, duration: 0.25 }, at + 0.3);
          timeline.to(panels[index], { opacity: 1, y: 0, duration: 0.35 }, at + 0.55);
        }
        timeline.to({}, { duration: 0.45 });
        timeline.eventCallback('onUpdate', () => setSelected(Math.min(3, Math.max(0, Math.floor(timeline.time() - 0.1)))));
        setSelected(0);
        navigation.current = index => {
          const trigger = timeline.scrollTrigger;
          if (!trigger) return;
          const time = index === 0 ? 0 : index + 0.35;
          window.scrollTo({ top: trigger.start + (time / timeline.duration()) * (trigger.end - trigger.start), behavior: 'smooth' });
        };
        return () => {
          delete element.dataset.motion;
          navigation.current = null;
          panels.forEach(panel => { panel.inert = false; panel.removeAttribute('aria-hidden'); });
          nodes.forEach(node => delete node.dataset.status);
        };
      });
      media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 799px) and (prefers-reduced-motion: no-preference)', () => {
        const nodes = [...element.querySelectorAll<HTMLElement>('.flow-node')];
        const stories = [...element.querySelectorAll<HTMLElement>('.platform-story')];
        const select = (index: number) => {
          setActive(index);
          nodes.forEach((node, i) => node.dataset.status = i < index ? 'complete' : i === index ? 'active' : 'waiting');
        };
        stories.forEach((story, index) => {
          gsap.fromTo(story, { y: 22 }, { y: 0, ease: 'none', scrollTrigger: { trigger: story, start: 'top 90%', end: 'top 65%', scrub: true } });
          ScrollTrigger.create({ trigger: story, start: 'top 60%', end: 'bottom 60%', onEnter: () => select(index), onEnterBack: () => select(index) });
        });
        return () => nodes.forEach(node => delete node.dataset.status);
      });
      cleanup = () => media.revert();
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); void begin().catch(() => {}); }
    }, { rootMargin: '600px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); };
  }, []);

  const jump = (index: number) => {
    if (navigation.current) navigation.current(index);
    else root.current?.querySelectorAll('.platform-story')[index]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  };

  return <section ref={root} id="solutions" className="platform-section" aria-labelledby="platform-title">
    <div className="platform-stage">
      <div className="container">
        <div className="platform-heading"><h2 id="platform-title">Your journey.<br/>Your rules. <span>One platform.</span></h2><p>Choose the checks you need. Connect them into an experience that feels like your business.</p></div>
        <div className="platform-diagram" aria-label="Example onboarding flow: collect, verify, review, welcome">
          {steps.map((step, index) => <div className="flow-piece" key={step.title}>
            <div className="flow-node"><div className="flow-node-icon"><step.icon size={30} strokeWidth={1.4}/><Check className="flow-node-check" size={14}/></div><span>{step.title}</span><small>{step.subtitle}</small></div>
            {index < 3 ? <div className="flow-connector" aria-hidden="true"><span className="flow-connector-fill"/><ArrowRight size={16}/></div> : null}
          </div>)}
        </div>
        <div className="platform-stories">{steps.map((step, index) => <article id={`platform-${step.title.toLowerCase()}`} className="platform-story" key={step.title}>
          <div><p className="platform-capability">{step.capability}</p><h3>{step.heading}</h3><p>{step.description}</p></div>
          <div className="platform-detail"><ul>{step.checks.map(check => <li key={check}><Check size={16}/>{check}</li>)}</ul><a className="text-link" href={step.link}>Explore {step.capability.toLowerCase()} <ArrowRight size={17}/></a></div>
          <span className="platform-step-number" aria-label={`Step ${index + 1} of 4`}>0{index + 1}<span> / 04</span></span>
        </article>)}</div>
        <div className="platform-bottom"><span><SlidersHorizontal size={17}/> Configured around your requirements</span><nav aria-label="Onboarding steps">{steps.map((step, index) => <Button variant="ghost" key={step.title} onClick={() => jump(index)} className="platform-step-control" aria-label={`Go to ${step.title}`} aria-current={active === index ? 'step' : undefined}>{String(index + 1).padStart(2, '0')}</Button>)}</nav></div>
      </div>
    </div>
  </section>;
}
