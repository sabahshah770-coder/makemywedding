import { useEffect, useMemo, useState } from "react";
import CatererCard from "../components/CatererCard";
import VenueCard from "../components/VenueCard";
import { fetchCaterers, fetchLocalities, fetchVenues } from "../lib/api";
import type { Caterer, Venue } from "../types";

type LoadState<T> =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; data: T };

export default function HomePage() {
  const [localities, setLocalities] = useState<LoadState<string[]>>({ kind: "idle" });
  const [venues, setVenues] = useState<LoadState<Venue[]>>({ kind: "idle" });
  const [caterers, setCaterers] = useState<LoadState<Caterer[]>>({ kind: "idle" });

  const [selectedLocality, setSelectedLocality] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const [sort, setSort] = useState<string>("rating_desc");

  const headline = useMemo(() => {
    if (selectedLocality) return `Top Wedding Venues in ${selectedLocality}`;
    return "Top Wedding Venues in Mumbai";
  }, [selectedLocality]);

  useEffect(() => {
    let cancelled = false;
    setLocalities({ kind: "loading" });
    fetchLocalities()
      .then((data) => {
        if (cancelled) return;
        setLocalities({ kind: "ready", data });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLocalities({ kind: "error", message: e instanceof Error ? e.message : "Failed to load localities" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function runVenueSearch(next?: { locality?: string; q?: string; sort?: string }) {
    setVenues({ kind: "loading" });
    try {
      const res = await fetchVenues({
        locality: next?.locality ?? selectedLocality,
        q: next?.q ?? q,
        sort: next?.sort ?? sort
      });
      setVenues({ kind: "ready", data: res.items });
    } catch (e: unknown) {
      setVenues({ kind: "error", message: e instanceof Error ? e.message : "Failed to load venues" });
    }
  }

  async function loadCaterersOneClick() {
    setCaterers({ kind: "loading" });
    try {
      const res = await fetchCaterers({ locality: selectedLocality || undefined });
      setCaterers({ kind: "ready", data: res.items });
      document.getElementById("caterers")?.scrollIntoView({ behavior: "smooth" });
    } catch (e: unknown) {
      setCaterers({ kind: "error", message: e instanceof Error ? e.message : "Failed to load caterers" });
    }
  }

  useEffect(() => {
    runVenueSearch({ sort: "rating_desc" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                WedMeGood-style directory • Mumbai focus
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Find venues, compare prices, shortlist fast.
              </h1>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-600">
                Search by locality, see per-plate pricing, and instantly pull a caterers list for the same area.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="text-sm font-extrabold text-slate-900">Search venues</div>

              <div className="mt-4 grid gap-3">
                <label className="text-xs font-semibold text-slate-600">
                  Locality
                  <div className="mt-1">
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                    >
                      <option value="">All Mumbai</option>
                      {localities.kind === "ready" &&
                        localities.data.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                    </select>
                  </div>
                  {localities.kind === "loading" && <div className="mt-1 text-[11px] text-slate-500">Loading…</div>}
                  {localities.kind === "error" && <div className="mt-1 text-[11px] text-rose-600">{localities.message}</div>}
                </label>

                <label className="text-xs font-semibold text-slate-600">
                  Keyword
                  <div className="mt-1">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                      placeholder="e.g. banquet, lawn, rooftop…"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                    />
                  </div>
                </label>

                <label className="text-xs font-semibold text-slate-600">
                  Sort
                  <div className="mt-1">
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="rating_desc">Best rated</option>
                      <option value="price_asc">Price: low to high</option>
                      <option value="price_desc">Price: high to low</option>
                    </select>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-extrabold text-white shadow hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
                    onClick={() => runVenueSearch()}
                  >
                    Search
                  </button>
                  <button
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                    onClick={loadCaterersOneClick}
                    title="One-click caterers list"
                  >
                    Caterers (1‑click)
                  </button>
                </div>

                <div className="text-[11px] text-slate-500">
                  Backend inspect:{" "}
                  <a className="font-semibold text-brand-700 hover:text-brand-800" href="/api/inspect" target="_blank" rel="noreferrer">
                    /api/inspect
                  </a>{" "}
                  •{" "}
                  <a className="font-semibold text-brand-700 hover:text-brand-800" href="/api/docs" target="_blank" rel="noreferrer">
                    /api/docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="venues" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">{headline}</h2>
            <p className="text-sm text-slate-600">WedMeGood-like cards with pricing + capacity highlights.</p>
          </div>
        </div>

        <div className="mt-6">
          {venues.kind === "loading" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-card">
              Loading venues…
            </div>
          )}
          {venues.kind === "error" && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">{venues.message}</div>
          )}
          {venues.kind === "ready" && venues.data.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-card">
              No venues found. Try clearing the keyword or switching localities.
            </div>
          )}
          {venues.kind === "ready" && venues.data.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venues.data.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="caterers" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Caterers {selectedLocality ? `in ${selectedLocality}` : "in Mumbai"}
              </h2>
              <p className="text-sm text-slate-600">One click from the homepage search box.</p>
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                onClick={loadCaterersOneClick}
              >
                Load caterers
              </button>
              <a className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50" href="#venues">
                Back to venues
              </a>
            </div>
          </div>

          <div className="mt-6">
            {caterers.kind === "idle" && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                Click <span className="font-semibold">Caterers (1‑click)</span> to instantly load a list.
              </div>
            )}
            {caterers.kind === "loading" && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Loading caterers…</div>
            )}
            {caterers.kind === "error" && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">{caterers.message}</div>
            )}
            {caterers.kind === "ready" && caterers.data.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No caterers found for this locality yet.
              </div>
            )}
            {caterers.kind === "ready" && caterers.data.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {caterers.data.map((c) => (
                  <CatererCard key={c.id} caterer={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-extrabold text-slate-900">Make My Wedding</div>
              <div className="text-xs">Demo directory for Mumbai • WedMeGood-style layout inspiration</div>
            </div>
            <div className="flex gap-4 text-xs">
              <a className="font-semibold text-brand-700 hover:text-brand-800" href="/api/docs" target="_blank" rel="noreferrer">
                API Docs
              </a>
              <a className="font-semibold text-brand-700 hover:text-brand-800" href="/api/inspect" target="_blank" rel="noreferrer">
                API Inspect
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

