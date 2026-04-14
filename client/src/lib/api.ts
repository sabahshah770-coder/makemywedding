import type { Caterer, ListResponse, Venue } from "../types";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export function fetchLocalities() {
  return getJson<string[]>("/api/localities");
}

export function fetchVenues(params: { locality?: string; q?: string; sort?: string }) {
  const url = new URL("/api/venues", window.location.origin);
  for (const [k, v] of Object.entries(params)) {
    if (v && v.trim()) url.searchParams.set(k, v);
  }
  return getJson<ListResponse<Venue>>(url.pathname + url.search);
}

export function fetchCaterers(params: { locality?: string }) {
  const url = new URL("/api/caterers", window.location.origin);
  if (params.locality && params.locality.trim()) url.searchParams.set("locality", params.locality);
  return getJson<ListResponse<Caterer>>(url.pathname + url.search);
}

