"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { t } = useLanguage();
  const links = [
    [t.nav.home, "#home"],
    [t.nav.menu, "#menu"],
    [t.nav.story, "#story"],
    [t.nav.space, "#space"],
    [t.nav.contact, "#contact"],
  ];
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand">
          <a href="#home" aria-label="Hà Nội Xưa — início"><Logo /></a>
          <p>{t.footer.descriptor}</p>
        </div>
        <div className="footer__column">
          <p className="footer__label">{t.footer.navigation}</p>
          <nav>{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        </div>
        <div className="footer__column">
          <p className="footer__label">{t.footer.follow}</p>
          <div className="social-pending" aria-label={t.footer.socialPending}><span>IG</span><span>FB</span></div>
          <p className="footer__small">{t.footer.socialPending}</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Hà Nội Xưa. {t.footer.rights}</p>
        <div><span>{t.footer.privacy}</span><a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">{t.footer.complaints}</a></div>
      </div>
    </footer>
  );
}
