import { restaurantInfo } from "@/data/restaurant";

export function ReservationCTA() {
  return (
    <section id="reservation" className="reservation" aria-label="Reservar mesa">
      <iframe
        className="block h-full w-full border-0"
        loading="eager"
        src={restaurantInfo.reservationWidgetUrl}
        title="Ha Noi Xua"
      />
    </section>
  );
}
