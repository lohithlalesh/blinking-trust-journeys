import NextImage from 'next/image';
import { ArrowUpRight, ArrowRight, ShieldCheck, LockKeyhole, Fingerprint, FileCheck2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { ScrollJourney } from '@/components/scroll-journey';
import { Industries } from '@/components/industries';
import { PlatformJourney } from '@/components/platform-journey';
import { AmlScreening } from '@/components/aml-screening';
import { PageMotion } from '@/components/page-motion';
import { LogoLoop } from '@/components/logo-loop';

export default function Home() {
  return <>
    <Navigation /><PageMotion />
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">IDENTITY, WITH CONFIDENCE</p>
            <h1 id="hero-title">Real people.<br /><span>Real trust.</span></h1>
            <p className="hero-description">Turn a first interaction into a trusted relationship. Identity verification that puts people first.</p>
            <div className="hero-actions"><a className="cta" href="https://www.blinking.id/contact-us/">Get in touch <ArrowUpRight size={19}/></a><a className="text-link" href="#journey">Explore the journey <ArrowRight size={18}/></a></div>
          </div>
          <LogoLoop />
        </div>
      </section>
      <section className="proof container" aria-label="Blinking customers"><p>Trusted where trust matters most.</p><div className="customer-logos">{[['raiffeisen','Raiffeisen Bank'],['erste','Erste Bank'],['yettel','Yettel'],['aik','AIK Bank'],['a1','A1'],['chip-card','Chip Card']].map(([file,name])=><NextImage key={file} src={`/brand/${file}.png`} alt={name} width="145" height="64"/>)}</div></section>
      <div className="journey-region"><section id="journey" className="intro container"><h2>Every great journey<br/>starts with trust.</h2><p>Verify an identity. Meet face to face. Collect what matters. Three connected ways to build customer confidence.</p></section>
      <ScrollJourney /></div>
      <PlatformJourney />
      <AmlScreening />
      <Industries />
      <section className="privacy container" id="privacy">
        <div className="privacy-mark" aria-hidden="true"><Fingerprint size={100} strokeWidth={.85}/><span className="privacy-ring"/><span className="privacy-ring second"/><span className="privacy-lock"><LockKeyhole size={22}/></span></div>
        <div className="privacy-copy" data-reveal><h2>Identity is personal.<br/><span>Let’s keep it that way.</span></h2><p>Privacy is a principle, not a feature. Blinking’s solutions are developed around privacy by design, with protection built into the customer journey.</p><div className="privacy-points"><span><LockKeyhole size={19}/> Privacy by design</span><span><ShieldCheck size={19}/> Security at the core</span><span><FileCheck2 size={19}/> Due diligence, connected</span></div></div>
      </section>
      <section className="closing"><div className="container closing-inner" data-reveal><p>THE NEXT GREAT JOURNEY IS YOURS.</p><h2>Let’s build it<br/>on trust.</h2><a className="cta" href="https://www.blinking.id/contact-us/">Get in touch <ArrowUpRight size={20}/></a></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a href="#main" aria-label="Blinking home"><NextImage src="/brand/blinking-logo-footer.png" alt="Blinking" width="171" height="55" loading="lazy"/></a><p>Real people. Real trust.</p></div><div><h3>Solutions</h3><a href="https://www.blinking.id/solutions/identify/">Blinking Identify</a><a href="https://www.blinking.id/solutions/id-wallet/">ID Wallet</a><a href="https://www.blinking.id/plans/">Plans</a></div><div><h3>Industries</h3><a href="https://www.blinking.id/industry/finance/">Financial services</a><a href="https://www.blinking.id/industry/telecommunications/">Telecommunications</a><a href="https://www.blinking.id/industry/gaming/">Gaming</a></div><div><h3>Let’s connect</h3><a href="mailto:sales@blinking.id">sales@blinking.id <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/company/blinking-id/">LinkedIn <ArrowUpRight size={13}/></a><a href="https://www.blinking.id/blog/">Insights <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Blinking. All rights reserved.</span><span>Belgrade, Serbia</span><a href="https://www.blinking.id/cookie-policy/">Cookie policy</a></div></div></footer>
  </>;
}
