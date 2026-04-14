import type { Venue } from "../types";

function formatMoneyINR(value: number) {
  return value.toLocaleString("en-IN");
}

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img className="h-full w-full object-cover" src={venue.imageUrl} alt={venue.name} loading="lazy" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
          {venue.type}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold leading-snug text-slate-900">{venue.name}</div>
            <div className="text-xs text-slate-500">
              {venue.locality} • {venue.area}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-extrabold text-slate-900">{venue.rating.toFixed(1)}</div>
            <div className="text-[11px] text-slate-500">{venue.reviews} reviews</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <div className="text-[11px] font-semibold text-slate-500">Veg</div>
            <div className="text-sm font-extrabold text-slate-900">₹{formatMoneyINR(venue.vegPricePerPlate)}</div>
            <div className="text-[11px] text-slate-500">per plate</div>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <div className="text-[11px] font-semibold text-slate-500">Non‑veg</div>
            <div className="text-sm font-extrabold text-slate-900">₹{formatMoneyINR(venue.nonVegPricePerPlate)}</div>
            <div className="text-[11px] text-slate-500">per plate</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {venue.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-800">
              {t}
            </span>
          ))}
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
            {venue.capacityMin}–{venue.capacityMax} pax
          </span>
        </div>
      </div>
    </article>
  );
}

