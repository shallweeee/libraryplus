interface HeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Hero({ title, subtitle, className }: HeroProps) {
  return (
    <div
      className={`from-background to-primary/10 flex flex-col items-center justify-center rounded-md bg-gradient-to-t py-20 ${className}`}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      {subtitle && <p className="text-foreground text-2xl font-light">{subtitle}</p>}
    </div>
  );
}
