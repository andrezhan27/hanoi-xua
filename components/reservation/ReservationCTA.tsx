"use client";

import Image from "next/image";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ReservationCTA() {
  const { t } = useLanguage();
  return (
    <section id="reservation" className="reservation-card section">
      <div className="container">
        <Reveal className="reservation-card__inner">
          <Image
            className="reservation-card__image"
            src="/images/space-2.webp"
            alt=""
            fill
            sizes="(max-width: 600px) calc(100vw - 40px), 1360px"
          />
          <div className="reservation-card__overlay" aria-hidden="true" />
          <div className="reservation-card__content">
            <UtensilsCrossed size={28} strokeWidth={1.4} />
            <SectionLabel light>{t.reservation.label}</SectionLabel>
            <h2>{t.reservation.title}</h2>
            <p>{t.reservation.body}</p>
            <a className="button button--cream" href="/reservation">
              {t.reservation.button}<ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
