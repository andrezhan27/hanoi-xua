"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { restaurantInfo } from "@/data/restaurant";

export function Hero() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="hero">
      <motion.div className="hero__media" initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
        <Image className="hero__image" src="/images/space-1.webp" alt="Sala do restaurante Hà Nội Xưa em Lisboa, com vegetação e um mural de Hanói" fill priority sizes="100vw" />
      </motion.div>
      <div className="hero__overlay" />
      <motion.div
        className="container hero__content"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.14, delayChildren: 0.3 }}
      >
        <motion.h1 variants={reducedMotion ? undefined : variants}>{restaurantInfo.name}</motion.h1>
        <motion.div variants={reducedMotion ? undefined : variants} className="hero__buttons">
          <MagneticButton href="/reservation" className="button button--primary">{t.hero.reserve}<ArrowRight size={18} /></MagneticButton>
          <MagneticButton href="#menu" className="button button--ghost">{t.hero.menu}</MagneticButton>
        </motion.div>
      </motion.div>
      <a className="hero__scroll" href="#story"><span>{t.hero.scroll}</span><ArrowDown size={18} /></a>
    </section>
  );
}
