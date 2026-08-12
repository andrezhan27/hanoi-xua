export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`section-label ${light ? "section-label--light" : ""}`}><span />{children}</p>;
}
