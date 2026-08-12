import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo--compact" : ""}`} aria-label="Hà Nội Xưa">
      <span className="brand-logo__icon">
        <Image src="/images/hanoi-logo-icon.png" alt="" width={1254} height={1254} sizes="48px" />
      </span>
      <span className="brand-logo__wordmark">
        <Image src="/images/hanoi-logo-text.png" alt="Hà Nội Xưa" width={2172} height={724} sizes="160px" />
      </span>
    </span>
  );
}
