import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { restaurantInfo } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Reservar Mesa | Hà Nội Xưa",
  description: "Reserve a sua mesa no Hà Nội Xưa, em Lisboa.",
};

export default function ReservationPage() {
  return (
    <main className="booking-page">
      <header className="booking-page__header">
        <Link className="booking-page__brand" href="/" aria-label="Hà Nội Xưa — início">
          <Logo compact />
        </Link>
        <Link className="booking-page__back" href="/">
          <ArrowLeft size={17} /> Voltar ao restaurante
        </Link>
      </header>
      <div className="booking-page__frame">
        <iframe
          className="block h-full w-full border-0"
          loading="eager"
          src={restaurantInfo.reservationWidgetUrl}
          title="Ha Noi Xua"
        />
      </div>
    </main>
  );
}
