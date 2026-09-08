import { ArrowRight, ArrowUpRight, Check, FileSearch, Fingerprint, ShieldCheck, UserCheck } from 'lucide-react';

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
        <figcaption id="aml-visual-caption"><span>SCREENING ENGINE</span><span>IDENTITY IN / CONTEXT OUT</span></figcaption>
        <div className="aml-sculpture">
          <span className="aml-route" aria-hidden="true"><ArrowRight size={18}/></span>
          <div className="aml-identity-token"><span><Fingerprint size={25}/></span><div><small>VERIFIED</small><strong>Identity</strong></div></div>
          <div className="aml-orbit-system" aria-hidden="true">
            <span className="aml-ring aml-ring-a"/>
            <span className="aml-ring aml-ring-b"/>
            <span className="aml-ring aml-ring-c"/>
            <span className="aml-satellite aml-satellite-a"><UserCheck size={18}/></span>
            <span className="aml-satellite aml-satellite-b"><ShieldCheck size={18}/></span>
            <span className="aml-satellite aml-satellite-c"><FileSearch size={18}/></span>
            <span className="aml-core"><ShieldCheck size={45}/><small>SCREEN</small></span>
          </div>
          <div className="aml-decision-token"><span><Check size={20}/></span><div><small>REVIEW CONTEXT</small><strong>Decision ready</strong></div></div>
        </div>
        <ul className="aml-legend">{checks.map(({ title, detail, icon: Icon }) => <li key={title}><Icon size={17}/><span><strong>{title}</strong><small>{detail}</small></span></li>)}</ul>
      </figure>
    </div>
  </section>;
}
