"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/supabase/actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");
    const result = await submitContactMessage(form);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-steel bg-charcoal px-6 py-10 text-center">
        <p className="font-headline text-2xl uppercase text-bone">
          Message Sent
        </p>
        <p className="mt-2 text-sm text-bone-dim">
          We&apos;ll get back to you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-bone-dim"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border border-steel bg-charcoal px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-rust"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-bone-dim"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border border-steel bg-charcoal px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-rust"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-bone-dim"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-steel bg-charcoal px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-rust"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-rust-light" role="alert">
          Something went wrong sending your message: {errorMessage}. Please
          try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full bg-rust py-4 font-headline text-lg uppercase tracking-wide text-ink transition-colors hover:bg-rust-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {status === "pending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
