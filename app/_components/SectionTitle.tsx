export function SectionTitle({
  eyebrow,
  title,
  desc,
  light = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <p className="text-xs font-bold tracking-[0.3em] text-gold-dark">{eyebrow}</p>
      <h2 className={`mt-3 font-serif text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 leading-relaxed ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"} ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
