"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Language } from "@/data/translations";

export function DishCard({
  dish,
  language,
  index,
}: {
  dish: { image: string; name: string; subtitlePt: string; subtitleEn: string };
  language: Language;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      className="dish-card"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.25) }}
    >
      <div className="dish-card__image">
        <Image src={dish.image} alt={`${dish.name} — ${language === "pt" ? dish.subtitlePt : dish.subtitleEn}`} fill sizes="(max-width: 720px) 78vw, (max-width: 1100px) 45vw, 28vw" />
        <span>0{index + 1}</span>
      </div>
      <div className="dish-card__copy">
        <h3>{dish.name}</h3>
        <p>{language === "pt" ? dish.subtitlePt : dish.subtitleEn}</p>
      </div>
    </motion.article>
  );
}
