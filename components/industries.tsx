'use client';
import { ArrowUpRight, Building2, Smartphone, Gamepad2, FileCheck2, Fingerprint, ShieldCheck, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const industries = [
  {id:'finance',label:'Financial services',icon:Building2,title:'More relationships.\nLess onboarding friction.',description:'Give customers a straightforward path to your financial services, with identity and due diligence checks shaped around your requirements.',tags:['Digital account opening','Customer due diligence','AML screening'],outcome:'Ready for the next chapter',link:'finance',company:'Your next customer'},
  {id:'telecom',label:'Telecommunications',icon:Smartphone,title:'Make the connection.\nKnow who’s joining.',description:'Bring identity verification into your subscriber journey. Help people access your services through a guided digital experience.',tags:['Subscriber onboarding','Remote identification','Cross-device access'],outcome:'A connection built on trust',link:'telecommunications',company:'Your next subscriber'},
  {id:'gaming',label:'Gaming',icon:Gamepad2,title:'Welcome the player.\nKeep trust in play.',description:'Build an identity journey that supports responsible access, helps detect fraud, and fits your customer verification requirements.',tags:['Player verification','Identity checks','Risk screening'],outcome:'A better start to play',link:'gaming',company:'Your next player'},
];
export function Industries(){return <section className="industries" id="industries"><div className="container">
  <div className="section-heading"><p className="eyebrow">BUILT AROUND YOUR BUSINESS</p><h2>Different industries.<br/>The same need for trust.</h2></div>
  <Tabs defaultValue="finance" className="industry-tabs"><TabsList variant="line" className="industry-tab-list" aria-label="Choose an industry">{industries.map(item=><TabsTrigger className="industry-tab" key={item.id} value={item.id}><item.icon size={19}/>{item.label}</TabsTrigger>)}</TabsList>
    {industries.map(item=><TabsContent key={item.id} value={item.id} className="industry-panel"><div className="industry-copy"><h3>{item.title.split('\n').map((line,i)=><span key={line}>{i>0?<br/>:null}{line}</span>)}</h3><p>{item.description}</p><ul className="industry-tags">{item.tags.map(tag=><li key={tag}><Check size={14}/>{tag}</li>)}</ul><a className="text-link" href={`https://www.blinking.id/industry/${item.link}/`}>Explore {item.label.toLowerCase()} <ArrowUpRight size={18}/></a></div>
      <div className="industry-flow" aria-label={`Example ${item.label} verification journey`}><div className="flow-top"><item.icon size={23}/><span>{item.company}</span></div><div className="flow-line"/><div className="flow-check"><FileCheck2 size={19}/><span>Document verified</span><Check size={16}/></div><div className="flow-check"><Fingerprint size={19}/><span>Person matched</span><Check size={16}/></div><div className="flow-check"><ShieldCheck size={19}/><span>Screening completed</span><Check size={16}/></div><div className="flow-line"/><div className="flow-end"><span>{item.outcome}</span><ArrowUpRight size={18}/></div><p className="flow-caption">An example flow. Configured to your requirements.</p></div>
    </TabsContent>)}
  </Tabs>
</div></section>}
