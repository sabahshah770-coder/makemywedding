import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function CheckBullet({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-700">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-700">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.29a1 1 0 0 1-1.42.006L3.29 9.25a1 1 0 1 1 1.42-1.41l4.04 4.06 6.54-6.58a1 1 0 0 1 1.414-.03Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.floor(value)));
  return (
    <div className="flex items-center gap-1 text-rose-600">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${i < full ? "opacity-100" : "opacity-25"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 0 0 .95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.377 2.454a1 1 0 0 0-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.539 1.118l-3.377-2.454a1 1 0 0 0-1.176 0l-3.377 2.454c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 0 0-.364-1.118L2.09 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 0 0 .95-.69l1.287-3.97Z" />
        </svg>
      ))}
    </div>
  );
}

export default function GeniePage() {
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "ok">("idle");

  const geniePlans = useMemo(
    () => [
      {
        name: "City Wedding",
        price: "₹4,999",
        blurb: "For Mumbai ceremonies & receptions",
        accent: "from-rose-500 to-pink-500",
        features: [
          "Venue shortlist + price comparisons",
          "Vendor matching (caterers, decorators, photo)",
          "Locality-based recommendations",
          "WhatsApp-style support (demo)"
        ]
      },
      {
        name: "Destination Wedding",
        price: "₹9,999",
        blurb: "For outstation planning & logistics",
        accent: "from-fuchsia-500 to-rose-500",
        featured: true,
        features: [
          "Destination venue options + packages",
          "Travel & stay planning checklist",
          "Vendor curation + negotiation help (demo)",
          "Budget tracker & timeline"
        ]
      },
      {
        name: "Signature Plan",
        price: "₹19,999",
        blurb: "Premium white-glove planning",
        accent: "from-rose-600 to-fuchsia-600",
        features: [
          "Concierge planning experience",
          "End-to-end vendor management (demo)",
          "Multiple event itinerary",
          "Priority support + best deals"
        ]
      }
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Aditi S.",
        stars: 5,
        text: "Genie ne 2 din mein venues shortlist karwa diye. Prices clear the aur decision fast ho gaya."
      },
      {
        name: "Rohan M.",
        stars: 5,
        text: "Destination plan ke checklist + vendor suggestions kaafi useful tha. Clean, premium feel."
      },
      {
        name: "Meera P.",
        stars: 4,
        text: "Locality filter ke saath caterers instantly mil gaye. Overall experience smooth aur classy."
      }
    ],
    []
  );

  function submitLead() {
    const digits = leadPhone.replace(/\D/g, "");
    if (digits.length !== 10) return;
    setLeadStatus("ok");
    window.setTimeout(() => setLeadStatus("idle"), 2500);
  }

  return (
    <main className="border-t border-rose-100 bg-gradient-to-b from-rose-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-extrabold text-rose-700 hover:bg-rose-50"
          >
            <span aria-hidden>←</span> Back to Home
          </Link>
          <div className="hidden text-sm font-semibold text-slate-600 md:block">MMW Genie</div>
        </div>

        <div className="mt-6 rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-card backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
                MMW Genie
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold text-rose-700">Premium</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                MMW Genie - The smart way to find venues & vendors
              </h1>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">
                Clean, curated, and budget-smart recommendations — designed to feel premium and fast.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="#pricing"
                className="rounded-xl bg-rose-600 px-5 py-3 text-center text-sm font-extrabold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
              >
                View plans
              </a>
              <button
                onClick={() => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-extrabold text-rose-700 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
              >
                Download app
              </button>
            </div>
          </div>
        </div>

        <div id="pricing" className="mt-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Choose your Genie plan</h2>
              <p className="text-sm text-slate-600">3 clear plans with premium styling and tick-mark features.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {geniePlans.map((p) => (
              <article
                key={p.name}
                className={[
                  "relative overflow-hidden rounded-3xl border bg-white p-6 shadow-card",
                  p.featured ? "border-rose-200 ring-2 ring-rose-200" : "border-rose-100"
                ].join(" ")}
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${p.accent}`} />
                {p.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-extrabold text-white">
                    Most picked
                  </div>
                )}
                <div className="mt-1">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{p.blurb}</div>
                  <div className="mt-4 flex items-end gap-2">
                    <div className="text-3xl font-black tracking-tight text-slate-900">{p.price}</div>
                    <div className="pb-1 text-xs font-semibold text-slate-500">one-time</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {p.features.map((f) => (
                    <CheckBullet key={f}>{f}</CheckBullet>
                  ))}
                </div>

                <button
                  className={[
                    "mt-6 w-full rounded-2xl px-4 py-3 text-sm font-extrabold shadow focus:outline-none focus:ring-4",
                    p.featured
                      ? "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-200"
                      : "bg-rose-50 text-rose-800 hover:bg-rose-100 focus:ring-rose-100"
                  ].join(" ")}
                  onClick={() => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get started
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <section className="rounded-3xl border border-rose-100 bg-white p-8 shadow-card">
            <h2 className="text-xl font-black tracking-tight text-slate-900">Reviews</h2>
            <p className="mt-1 text-sm text-slate-600">Real-sounding testimonials with stars and experience.</p>
            <div className="mt-6 space-y-4">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.name}</div>
                      <div className="mt-1">
                        <Stars value={t.stars} />
                      </div>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-rose-700">Genie user</div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{t.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="lead" className="rounded-3xl border border-rose-100 bg-white p-8 shadow-card">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
              Plan Smart on App
            </div>
            <h2 className="mt-3 text-xl font-black tracking-tight text-slate-900">Get the app link on your phone</h2>
            <p className="mt-1 text-sm text-slate-600">Enter your mobile number to receive a download link. (Demo UI — no SMS sent.)</p>

            <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/40 p-5">
              <label className="text-xs font-semibold text-slate-700">
                Mobile number
                <div className="mt-2 flex gap-3">
                  <div className="inline-flex items-center rounded-xl border border-rose-200 bg-white px-3 text-sm font-bold text-slate-700">
                    +91
                  </div>
                  <input
                    inputMode="numeric"
                    className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-200"
                    placeholder="10-digit number"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />
                </div>
              </label>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  className="rounded-xl bg-rose-600 px-4 py-3 text-sm font-extrabold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={submitLead}
                  disabled={leadPhone.replace(/\D/g, "").length !== 10}
                >
                  Download App
                </button>
                <Link
                  className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-center text-sm font-extrabold text-rose-700 hover:bg-rose-50"
                  to="/"
                >
                  Explore venues
                </Link>
              </div>

              {leadStatus === "ok" && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  Link ready! (Demo) You can now proceed to install the app.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

