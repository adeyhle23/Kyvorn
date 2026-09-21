import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-kyvorn flex flex-col items-center gap-6 py-32 text-center">
      <p className="font-headline text-8xl text-rust">404</p>
      <h1 className="font-headline text-4xl uppercase tracking-tight text-bone">
        Wrong Turn
      </h1>
      <p className="max-w-md text-bone-dim">
        That page doesn&apos;t exist. Let&apos;s get you back on route.
      </p>
      <Link
        href="/"
        className="mt-2 bg-rust px-8 py-4 font-headline text-lg uppercase tracking-wide text-ink hover:bg-rust-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
