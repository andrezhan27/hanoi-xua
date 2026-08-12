"use client";

import Image from "next/image";
import { ArrowRight, Lamp, Leaf, Soup } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = [Soup, Leaf, Lamp];

export function Story() {
  const { t } = useLanguage();
  return (
    <section id="story" className="story section">
      <div className="story__background" aria-hidden="true">
        <Image src="/images/hanoi-street.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="container story__grid">
        <Reveal className="story__copy">
          <SectionLabel>{t.story.label}</SectionLabel>
          <h2>{t.story.title}</h2>
          <p className="lead-copy">{t.story.body}</p>
          <p className="story__signature">{t.story.signature}</p>
          <a className="text-link" href="#space">{t.story.cta}<ArrowRight size={17} /></a>
        </Reveal>
        <div className="story__features">
          {t.story.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={feature.title} className="story-feature" delay={index * 0.1}>
                <div className="story-feature__icon"><Icon size={24} strokeWidth={1.5} /></div>
                <div><h3>{feature.title}</h3><p>{feature.body}</p></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
