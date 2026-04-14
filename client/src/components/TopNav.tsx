import { Link, NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow">
              <span className="text-sm font-black">MMW</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">Make My Wedding</div>
              <div className="text-xs text-slate-500">Mumbai wedding venue directory</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a className="hover:text-slate-900" href="/#venues">
            Venues
          </a>
          <NavLink className={({ isActive }) => (isActive ? "font-semibold text-slate-900" : "hover:text-slate-900")} to="/genie">
            Genie
          </NavLink>
          <a className="hover:text-slate-900" href="/#caterers">
            Caterers
          </a>
          <a className="hover:text-slate-900" href="/api/docs" target="_blank" rel="noreferrer">
            Backend Inspect (Docs)
          </a>
        </nav>
      </div>
    </header>
  );
}

