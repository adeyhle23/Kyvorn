import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import CartButton from "@/components/cart/CartButton";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-steel/60 bg-ink/95 backdrop-blur">
      <div className="container-kyvorn flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-headline text-2xl tracking-widest text-bone sm:text-3xl"
        >
          <span className="text-rust">K</span>YVORN
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-widest text-bone-dim transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
