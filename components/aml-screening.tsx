import { ArrowUpRight, FileSearch, ShieldCheck, UserCheck } from 'lucide-react';

const checks = [
  { title: 'AML & PEP', detail: 'Screening context', icon: UserCheck },
  { title: 'Watchlists', detail: 'Relevant matches', icon: ShieldCheck },
  { title: 'Media', detail: 'Background context', icon: FileSearch },
];

export function AmlScreening() {
  return <section id="aml-screening" className="aml-section" aria-labelledby="aml-title">
    <div className="container aml-grid">
      <div className="aml-copy" data-reveal>
        <p className="eyebrow">AML &amp; DUE DILIGENCE</p>
        <h2 id="aml-title">An identity check is the start.<br/><span>Context completes the picture.</span></h2>
        <p>Connect verified customer data with AML and PEP checks, watchlist and media screening, and your risk rules. Keep the evidence together so your team can review the full context behind a decision.</p>
        <a className="text-link" href="https://www.blinking.id/solutions/identify/">Explore identity and screening <ArrowUpRight size={18}/></a>
      </div>
      <figure className="aml-visual" data-reveal aria-labelledby="aml-visual-caption">
        <figcaption id="aml-visual-caption"><span>IDENTITY SIGNAL</span><span>SCREENING CONTEXT</span></figcaption>
        <div className="aml-video-frame">
          <video className="aml-higgsfield-video" autoPlay loop muted playsInline preload="metadata" poster="/media/higgsfield/hero-3d-poster.jpg" aria-hidden="true" disablePictureInPicture>
            <source src="/media/higgsfield/hero-3d-loop.mp4" type="video/mp4"/>
          </video>
          <div className="aml-video-status"><span><ShieldCheck size={19}/></span><div><small>CONNECTED REVIEW</small><strong>Screening context assembled</strong></div></div>
        </div>
        <ul className="aml-legend">{checks.map(({ title, detail, icon: Icon }) => <li key={title}><Icon size={17}/><span><strong>{title}</strong><small>{detail}</small></span></li>)}</ul>
      </figure>
    </div>
  </section>;
}
