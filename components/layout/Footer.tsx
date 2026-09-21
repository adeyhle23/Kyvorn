import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { InstagramIcon, StravaIcon, TikTokIcon } from "@/components/ui/icons";

const SHOP_LINKS = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=t-shirts", label: "T-Shirts" },
  { href: "/shop?category=hoodies", label: "Hoodies" },
  { href: "/shop?category=hats", label: "Hats" },
];

const SUPPORT_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/contact#shipping", label: "Shipping" },
  { href: "/contact#returns", label: "Returns" },
  { href: "/story", label: "Our Story" },
];

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://strava.com", label: "Strava", Icon: StravaIcon },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-steel/60 bg-charcoal">
      <div className="container-kyvorn grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="font-headline text-2xl tracking-widest text-bone">
            <span className="text-rust">K</span>YVORN
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
            Built through adversity. Apparel for the comeback, not the
            highlight reel.
          </p>
          <div className="mt-6 flex gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-steel text-bone-dim transition-colors hover:border-rust hover:text-rust"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-bone">
            Shop
          </h3>
          <ul className="mt-4 space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-rust"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-bone">
            Support
          </h3>
          <ul className="mt-4 space-y-3">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-rust"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-bone">
            Stay Updated
          </h3>
          <p className="mt-4 text-sm text-bone-dim">
            New drops, race recaps, no noise.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-steel/60">
        <div className="container-kyvorn flex flex-col items-center justify-between gap-2 py-6 text-xs text-bone-faint sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Kyvorn. All rights reserved.</p>
          <p className="uppercase tracking-widest">Built Through Adversity</p>
        </div>
      </div>
    </footer>
  );
}
