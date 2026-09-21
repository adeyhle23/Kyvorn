"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-kyvorn flex flex-col items-center gap-6 py-32 text-center">
      <p className="font-headline text-6xl text-rust">Error</p>
      <h1 className="font-headline text-4xl uppercase tracking-tight text-bone">
        Something Broke
      </h1>
      <p className="max-w-md text-bone-dim">
        That&apos;s on us, not you. Try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 bg-rust px-8 py-4 font-headline text-lg uppercase tracking-wide text-ink hover:bg-rust-light"
      >
        Try Again
      </button>
    </div>
  );
}
