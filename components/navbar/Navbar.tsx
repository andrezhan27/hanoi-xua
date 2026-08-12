"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    [t.nav.home, "#home"],
    [t.nav.menu, "#menu"],
    [t.nav.story, "#story"],
    [t.nav.space, "#space"],
    [t.nav.contact, "#contact"],
  ];

  return (
    <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__brand" aria-label="Hà Nội Xưa — início"><Logo compact /></a>
        <nav className="navbar__links" aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="navbar__actions">
          <div className="language-toggle" aria-label="Selecionar idioma">
            {(["pt", "en"] as const).map((item) => (
              <button key={item} onClick={() => setLanguage(item)} aria-pressed={language === item}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="nav-reserve" href="/reservation">{t.nav.reserve}<ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Navegação móvel"
            initial={reducedMotion ? false : { y: -12 }}
            animate={{ y: 0 }}
            exit={{ y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {links.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >{label}<span>0{index + 1}</span></motion.a>
            ))}
            <a className="mobile-menu__reserve" href="/reservation" onClick={() => setOpen(false)}>{t.nav.reserve}<ArrowUpRight size={18} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
