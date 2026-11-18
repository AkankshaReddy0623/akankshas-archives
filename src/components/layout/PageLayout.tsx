import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBackLink?: boolean;
  backHref?: string;
  backLabel?: string;
}

export default function PageLayout({
  children,
  title,
  description,
  showBackLink = false,
  backHref = '/',
  backLabel = 'Back',
}: PageLayoutProps) {
  return (
    <div className="pt-24 sm:pt-28 flex-1 flex flex-col">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex-1 flex flex-col w-full">
        {/* Back navigation */}
        {showBackLink && (
          <div className="mb-8">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#E8B923] transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {backLabel}
            </Link>
          </div>
        )}

        {/* Page hero / title section */}
        {title && (
          <header className="mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F0F0F0]">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-lg text-[#A0A0A0] leading-relaxed font-light">
                {description}
              </p>
            )}
          </header>
        )}

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
