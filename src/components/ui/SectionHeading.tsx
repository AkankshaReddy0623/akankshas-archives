interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  alignment?: 'left' | 'center' | 'right';
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  alignment = 'left',
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignmentClasses[alignment]} mb-12 md:mb-16`}>
      {label && (
        <span className="mb-4 block font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
          {label}
        </span>
      )}
      <h2 className="font-serif text-off-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-muted-grey md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
