'use client';
import NextImage from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus();}};
    document.addEventListener('keydown',close);
    return ()=>document.removeEventListener('keydown',close);
  },[open]);
  return <header className="navigation"><a className="skip-link" href="#main">Skip to content</a><div className="container nav-inner">
    <a className="brand" href="#main" aria-label="Blinking home"><NextImage src="/brand/blinking-logo.svg" alt="Blinking" width="160" height="47"/></a>
    <nav aria-label="Main navigation" id="main-navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
      <a href="#solutions" onClick={()=>setOpen(false)}>Solutions</a><a href="#aml-screening" onClick={()=>setOpen(false)}>AML</a><a href="#industries" onClick={()=>setOpen(false)}>Industries</a><a href="#privacy" onClick={()=>setOpen(false)}>Why Blinking</a><a href="https://www.blinking.id/blog/">Insights <ArrowUpRight size={12}/></a>
    </nav>
    <a className="cta nav-cta" href="https://www.blinking.id/contact-us/">Get in touch <ArrowUpRight size={17}/></a>
    <Button ref={toggle} variant="ghost" className="menu-toggle" size="icon-lg" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>
  </div></header>;
}
