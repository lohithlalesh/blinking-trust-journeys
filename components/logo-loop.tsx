import { FileCheck2, Fingerprint, ShieldCheck } from 'lucide-react';

export function LogoLoop() {
  return <figure className="hero-logo-stage">
    <figcaption className="sr-only">A Higgsfield 3D film of the Blinking identity symbol moving through identity, screening, and trusted data signals</figcaption>
    <div className="hero-video-world" aria-hidden="true">
      <video className="hero-higgsfield-video" autoPlay loop muted playsInline preload="metadata" poster="/media/higgsfield/hero-3d-poster.jpg" disablePictureInPicture>
        <source src="/media/higgsfield/hero-3d-loop.mp4" type="video/mp4"/>
      </video>
      <span className="hero-video-depth"/>
      <div className="hero-signal hero-signal-identity"><Fingerprint size={18}/><span><small>01</small> Identity</span></div>
      <div className="hero-signal hero-signal-screening"><ShieldCheck size={18}/><span><small>02</small> Screening</span></div>
      <div className="hero-signal hero-signal-data"><FileCheck2 size={18}/><span><small>03</small> Trusted data</span></div>
      <p className="hero-loop-caption"><span/> HIGGSFIELD / 3D TRUST SIGNAL</p>
    </div>
  </figure>;
}
