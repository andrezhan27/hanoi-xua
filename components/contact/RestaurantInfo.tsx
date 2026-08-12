"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function RestaurantInfo() {
  const { t } = useLanguage();
  const items = [
    { icon: Clock3, label: t.info.hours, primary: t.info.hoursValue },
    { icon: MapPin, label: t.info.location, primary: t.info.addressValue, secondary: t.info.mapsPending },
    { icon: Phone, label: t.info.contact, primary: t.info.phoneValue, secondary: t.info.emailValue, secondIcon: Mail },
  ];

  return (
    <section id="contact" className="info section">
      <div className="container">
        <Reveal className="info__heading">
          <SectionLabel>{t.info.label}</SectionLabel>
          <h2>{t.info.title}</h2>
        </Reveal>
        <div className="info__grid">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="info-item" key={item.label} delay={index * 0.08}>
                <Icon size={23} strokeWidth={1.5} />
                <p className="info-item__label">{item.label}</p>
                <p className="info-item__primary">{item.primary}</p>
                {item.secondary && <p className="info-item__secondary">{item.secondary}</p>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
