"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const gallery = ["/images/space-1.png", "/images/space-2.png", "/images/space-3.png", "/images/space-4.png"];

export function SpaceGallery() {
  const { t } = useLanguage();
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (next: number) => {
    const normalized = (next + gallery.length) % gallery.length;
    setActive(normalized);
    railRef.current?.children[normalized]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="space" className="space section">
      <div className="container space__grid">
        <Reveal className="space__copy">
          <SectionLabel>{t.space.label}</SectionLabel>
          <h2>{t.space.title}</h2>
          <p className="lead-copy">{t.space.body}</p>
          <div className="gallery-controls">
            <button onClick={() => goTo(active - 1)} aria-label={t.space.previous}><ArrowLeft size={20} /></button>
            <span>{String(active + 1).padStart(2, "0")} <i /> {String(gallery.length).padStart(2, "0")}</span>
            <button onClick={() => goTo(active + 1)} aria-label={t.space.next}><ArrowRight size={20} /></button>
          </div>
        </Reveal>
        <motion.div className="space__gallery" ref={railRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {gallery.map((image, index) => (
            <figure key={image} className={index === 0 ? "space-image space-image--large" : "space-image"}>
              <Image src={image} alt={`${t.space.counter} ${index + 1} — Hà Nội Xưa`} fill sizes="(max-width: 800px) 82vw, 52vw" />
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
