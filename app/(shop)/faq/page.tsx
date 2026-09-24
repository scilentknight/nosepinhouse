"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Orders",
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Browse our jewellery collection, select the product you love, and click Add to Cart or Buy Now. Follow the checkout steps to complete your order.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "If you need to change or cancel your order, please contact us as soon as possible. We will do our best to assist you before the order is processed or shipped.",
      },
      {
        question: "How will I know if my order is confirmed?",
        answer:
          "Once your order is successfully placed, you will receive confirmation through the contact information provided during checkout.",
      },
    ],
  },
  {
    category: "Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We offer secure online checkout along with Cash on Delivery where available.",
      },
      {
        question: "Is online payment secure?",
        answer:
          "Yes. Our online checkout is designed to process your payment securely. We do not store your complete card details on our website.",
      },
      {
        question: "Do you offer Cash on Delivery?",
        answer:
          "Yes, Cash on Delivery is available for eligible orders and locations.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "Where do you deliver?",
        answer:
          "We currently deliver jewellery orders within Nepal. Delivery availability may vary depending on your location.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery time depends on your location and order details. Our team will provide the relevant delivery information after your order is placed.",
      },
      {
        question: "Can I track my order?",
        answer:
          "If tracking information is available for your order, it will be shared with you through the contact details provided during checkout.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        question: "Are the products shown on the website available?",
        answer:
          "Product availability is updated regularly. If an item is out of stock, you may see an out-of-stock notice on its product page.",
      },
      {
        question: "Do jewellery pieces look exactly like the photos?",
        answer:
          "We make every effort to display our jewellery as accurately as possible. However, slight differences in color or appearance may occur due to lighting, photography, and individual screen settings.",
      },
      {
        question: "How should I take care of my jewellery?",
        answer:
          "Keep your jewellery away from perfumes, cosmetics, moisture, and harsh chemicals. Store each piece separately in a dry place when not in use.",
      },
    ],
  },
  {
    category: "Returns & Support",
    questions: [
      {
        question: "Can I return or exchange an item?",
        answer:
          "Return or exchange eligibility depends on the product and its condition. Please contact our support team with your order details before sending any item back.",
      },
      {
        question: "What should I do if I receive a damaged item?",
        answer:
          "Please contact us as soon as possible after receiving your order and provide your order details along with clear photographs of the damaged item and packaging.",
      },
      {
        question: "How can I contact NOSEPINHOUSE?",
        answer:
          "You can reach us through email at nosepinhouse2068@gmail.com or contact us through WhatsApp at +977 9861252006.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8DDD2] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-[#48241F] sm:text-lg">
          {question}
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#937902] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pr-8 text-sm leading-7 text-[#6F625D] sm:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EE]">
      {/* Hero */}
      <section className="border-b border-[#E8DDD2] bg-[#F7EFE5]">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#937902]">
            Need to know?
          </p>

          <h1 className="font-serif text-4xl italic text-[#48241F] sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6F625D] sm:text-base">
            Find answers to the most common questions about NOSEPINHOUSE
            jewellery, orders, payments, delivery, and more.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="font-serif text-2xl italic text-[#592D27]">
                    {section.category}
                  </h2>

                  <div className="h-px flex-1 bg-[#E8DDD2]" />
                </div>

                <div className="rounded-2xl border border-[#E8DDD2] bg-white px-5 shadow-soft sm:px-7">
                  {section.questions.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-[#E8DDD2] bg-[#F7EFE5]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#937902]">
            Still have questions?
          </p>

          <h2 className="mt-3 font-serif text-3xl italic text-[#48241F] sm:text-4xl">
            We&apos;re here to help.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6F625D] sm:text-base">
            If you couldn&apos;t find the answer you were looking for, feel free
            to get in touch with our team.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:nosepinhouse2068@gmail.com"
              className="inline-flex items-center justify-center rounded-full bg-[#783F35] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#592D27]"
            >
              Email Us
            </a>

            <a
              href="https://wa.me/9779861252006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#BA8B30] px-7 py-3 text-sm font-medium text-[#783F35] transition-colors hover:bg-[#BA8B30]/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
