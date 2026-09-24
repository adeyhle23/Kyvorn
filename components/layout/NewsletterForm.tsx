"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/supabase/actions";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("pending");
    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-bone-dim">
        You&apos;re on the list. First drop notice lands in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <div className="flex gap-0">
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
          disabled={status === "pending"}
          className="shrink-0 bg-rust px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-rust-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "pending" ? "Joining…" : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-rust-light" role="alert">
          Couldn&apos;t subscribe: {errorMessage}
        </p>
      )}
    </form>
  );
}
