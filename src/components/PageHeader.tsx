export default function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-green via-brand-green-dark to-[#5b6e2c] text-white">
      <div className="container-content py-14 lg:py-20">
        {kicker ? (
          <p className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold">{kicker}</p>
        ) : null}
        <h1 className="h-display text-3xl lg:text-5xl mt-2 max-w-3xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-white/90">{subtitle}</p> : null}
      </div>
    </section>
  );
}
