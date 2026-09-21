import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container-kyvorn flex flex-col items-center gap-6 py-32 text-center">
      <p className="font-headline text-8xl text-rust">404</p>
      <h1 className="font-headline text-4xl uppercase tracking-tight text-bone">
        This One Didn&apos;t Make It
      </h1>
      <p className="max-w-md text-bone-dim">
        The product you&apos;re looking for doesn&apos;t exist or has been
        retired. Check the shop for what&apos;s currently available.
      </p>
      <Link
        href="/shop"
        className="mt-2 bg-rust px-8 py-4 font-headline text-lg uppercase tracking-wide text-ink hover:bg-rust-light"
      >
        Back to Shop
      </Link>
    </div>
  );
}
