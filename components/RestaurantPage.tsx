"use client";

import { LanguageProvider } from "@/context/LanguageProvider";
import { Navbar } from "./navbar/Navbar";
import { Hero } from "./hero/Hero";
import { Story } from "./story/Story";
import { MenuPreview } from "./menu/MenuPreview";
import { SpaceGallery } from "./space/SpaceGallery";
import { RestaurantInfo } from "./contact/RestaurantInfo";
import { ReservationCTA } from "./reservation/ReservationCTA";
import { Footer } from "./footer/Footer";

export function RestaurantPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <MenuPreview />
        <SpaceGallery />
        <RestaurantInfo />
        <ReservationCTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
