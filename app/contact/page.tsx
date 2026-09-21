import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kyvorn, plus answers on shipping, returns, and sizing.",
};

const FAQS = [
  {
    id: "shipping",
    question: "How long does shipping take?",
    answer:
      "Orders ship within 1-2 business days. Domestic delivery typically takes 3-7 business days depending on location. Tracking is emailed the moment your order ships.",
  },
  {
    id: "shipping-intl",
    question: "Do you ship internationally?",
    answer:
      "Yes. International orders typically arrive within 7-21 business days depending on destination and customs processing. Duties and taxes are calculated at checkout.",
  },
  {
    id: "returns",
    question: "What's your return policy?",
    answer:
      "Unworn, unwashed items in original condition can be returned within 30 days of delivery for a full refund. Start a return from your order confirmation email or by reaching out below.",
  },
  {
    id: "exchanges",
    question: "Can I exchange for a different size?",
    answer:
      "Yes — exchanges are free within 30 days of delivery. Reach out with your order number and the size you need and we'll get it moving.",
  },
  {
    id: "sizing",
    question: "How do your sizes run?",
    answer:
      "True to size, boxy/relaxed fit on tees and hoodies. If you're between sizes and prefer a tighter fit, size down. Full measurements are listed on each product page.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-kyvorn py-16 sm:py-20">
      <div className="mb-14">
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
          <span className="h-px w-8 bg-rust" aria-hidden="true" />
          Get In Touch
        </div>
        <h1 className="font-headline text-5xl uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl">
          Contact
        </h1>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-6 font-headline text-2xl uppercase tracking-wide text-bone">
            Send A Message
          </h2>
          <ContactForm />
          <p className="mt-6 text-sm text-bone-faint">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:support@kyvorn.com"
              className="text-bone underline decoration-rust underline-offset-4 hover:text-rust"
            >
              support@kyvorn.com
            </a>
          </p>
        </div>

        <div>
          <SectionHeading title="Shipping & Returns" />
          <dl className="mt-8 divide-y divide-steel/60">
            {FAQS.map((faq) => (
              <div key={faq.id} id={faq.id} className="scroll-mt-24 py-5">
                <dt className="text-sm font-bold uppercase tracking-wide text-bone">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
