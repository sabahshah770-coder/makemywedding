import type { Caterer } from "../types";

function formatMoneyINR(value: number) {
  return value.toLocaleString("en-IN");
}

export default function CatererCard({ caterer }: { caterer: Caterer }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">{caterer.name}</div>
          <div className="text-xs text-slate-500">{caterer.locality}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-extrabold text-slate-900">{caterer.rating.toFixed(1)}</div>
          <div className="text-[11px] text-slate-500">{caterer.reviews} reviews</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-[11px] font-semibold text-slate-500">From</div>
          <div className="text-sm font-extrabold text-slate-900">₹{formatMoneyINR(caterer.pricePerPlateFrom)}</div>
          <div className="text-[11px] text-slate-500">per plate</div>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-[11px] font-semibold text-slate-500">Phone</div>
          <a className="text-sm font-extrabold text-brand-700 hover:text-brand-800" href={`tel:${caterer.phone}`}>
            {caterer.phone}
          </a>
          <div className="text-[11px] text-slate-500">tap to call</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {caterer.specialty.slice(0, 3).map((s) => (
          <span key={s} className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-800">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

