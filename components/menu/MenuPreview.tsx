"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { dishes } from "@/data/dishes";
import { DishCard } from "./DishCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function MenuPreview() {
  const { language, t } = useLanguage();
  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        <Reveal className="section-intro section-intro--center">
          <SectionLabel>{t.menu.label}</SectionLabel>
          <h2>{t.menu.title}</h2>
          <p>{t.menu.body}</p>
        </Reveal>
        <div className="dish-grid">
          {dishes.map((dish, index) => <DishCard key={dish.image} dish={dish} language={language} index={index} />)}
        </div>
      </div>
    </section>
  );
}
