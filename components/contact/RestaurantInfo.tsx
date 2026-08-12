"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { restaurantInfo } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function RestaurantInfo() {
  const { t } = useLanguage();
  const items: Array<{
    icon: LucideIcon;
    label: string;
    primary: string;
    primaryHref?: string;
    secondary?: string;
    secondaryHref?: string;
  }> = [
    { icon: Clock3, label: t.info.hours, primary: t.info.hoursValue },
    { icon: MapPin, label: t.info.location, primary: restaurantInfo.address, secondary: t.info.maps, secondaryHref: restaurantInfo.googleMapsUrl },
    { icon: Phone, label: t.info.contact, primary: restaurantInfo.phone, primaryHref: restaurantInfo.phoneHref },
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
                <p className="info-item__primary">
                  {item.primaryHref ? <a href={item.primaryHref}>{item.primary}</a> : item.primary}
                </p>
                {item.secondary && (
                  <p className="info-item__secondary">
                    {item.secondaryHref ? <a href={item.secondaryHref} target="_blank" rel="noopener noreferrer">{item.secondary}</a> : item.secondary}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
