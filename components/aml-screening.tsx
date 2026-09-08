import { ArrowUpRight, Check, FileSearch, Fingerprint, ShieldCheck, UserCheck } from 'lucide-react';

const checks = [
  { title: 'Verified identity', detail: 'Start from document, biometric, and liveness evidence.', icon: Fingerprint },
  { title: 'AML & PEP screening', detail: 'Add watchlist and politically exposed person checks.', icon: UserCheck },
  { title: 'Media & background context', detail: 'Bring relevant screening results into the review.', icon: FileSearch },
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
      <div className="aml-visual" data-reveal aria-label="Identity evidence moving through AML screening to a review result">
        <span className="aml-plane" aria-hidden="true"/>
        <div className="aml-input-card"><span><Fingerprint size={25}/></span><div><small>VERIFIED RECORD</small><strong>Customer identity</strong></div><Check size={18}/></div>
        <div className="aml-screening-stack">{checks.map(({ title, detail, icon: Icon }, index) => <div className="aml-check" key={title}><span><Icon size={21}/></span><div><em>0{index + 1}</em><strong>{title}</strong><small>{detail}</small></div><Check size={16}/></div>)}</div>
        <div className="aml-output-card"><ShieldCheck size={25}/><div><small>REVIEW CONTEXT</small><strong>One connected decision record</strong></div></div>
      </div>
    </div>
  </section>;
}
