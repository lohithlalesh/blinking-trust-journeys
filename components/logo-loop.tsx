import NextImage from 'next/image';
import { FileCheck2, Fingerprint, ShieldCheck } from 'lucide-react';

const markLayers = Array.from({ length: 7 }, (_, index) => index);

export function LogoLoop() {
  return <figure className="hero-logo-stage">
    <figcaption className="sr-only">The Blinking logo symbol rotating through identity, screening, and trusted data signals</figcaption>
    <div className="hero-logo-world" aria-hidden="true">
      <span className="hero-logo-orbit hero-logo-orbit-a"/>
      <span className="hero-logo-orbit hero-logo-orbit-b"/>
      <span className="hero-logo-floor"/>
      <span className="hero-orbit-dot hero-orbit-dot-a"/>
      <span className="hero-orbit-dot hero-orbit-dot-b"/>
      <div className="hero-logo-loop">{markLayers.map(layer => <span className="hero-mark-layer" key={layer}><NextImage src="/brand/blinking-logo.svg" alt="" width="208" height="54"/></span>)}</div>
      <div className="hero-signal hero-signal-identity"><Fingerprint size={18}/><span><small>01</small> Identity</span></div>
      <div className="hero-signal hero-signal-screening"><ShieldCheck size={18}/><span><small>02</small> Screening</span></div>
      <div className="hero-signal hero-signal-data"><FileCheck2 size={18}/><span><small>03</small> Trusted data</span></div>
      <p className="hero-loop-caption"><span/> BLINKING TRUST SIGNAL</p>
    </div>
  </figure>;
}
