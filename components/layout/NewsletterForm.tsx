"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Stub: wire this up to Shopify's customerCreate mutation or an ESP
    // (Klaviyo, Mailchimp) once one is chosen. See README.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="text-sm text-bone-dim">
        You&apos;re on the list. First drop notice lands in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-0">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full min-w-0 border border-steel bg-charcoal px-4 py-2.5 text-sm text-bone placeholder:text-bone-faint focus:border-rust"
      />
      <button
        type="submit"
        className="shrink-0 bg-rust px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-rust-light"
      >
        Join
      </button>
    </form>
  );
}
