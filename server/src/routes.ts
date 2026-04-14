import type { Request, Response } from "express";
import { z } from "zod";
import { CATERERS, LOCALITIES, VENUES } from "./data.js";

const venueQuerySchema = z.object({
  locality: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc", "rating_desc"]).optional()
});

const catererQuerySchema = z.object({
  locality: z.string().optional()
});

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function getLocalities(_req: Request, res: Response) {
  res.json([...LOCALITIES]);
}

export function getVenues(req: Request, res: Response) {
  const parsed = venueQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: "Invalid query", details: parsed.error.flatten() });

  const { locality, q, sort } = parsed.data;

  let items = [...VENUES];
  if (locality && locality.trim()) {
    const loc = normalize(locality);
    items = items.filter((v) => normalize(v.locality) === loc);
  }
  if (q && q.trim()) {
    const needle = normalize(q);
    items = items.filter((v) => {
      const hay = `${v.name} ${v.area} ${v.locality} ${v.type} ${v.tags.join(" ")}`.toLowerCase();
      return hay.includes(needle);
    });
  }

  const avgPrice = (v: (typeof items)[number]) => (v.vegPricePerPlate + v.nonVegPricePerPlate) / 2;

  if (sort === "price_asc") items.sort((a, b) => avgPrice(a) - avgPrice(b));
  if (sort === "price_desc") items.sort((a, b) => avgPrice(b) - avgPrice(a));
  if (sort === "rating_desc") items.sort((a, b) => b.rating - a.rating);

  res.json({
    total: items.length,
    items
  });
}

export function getCaterers(req: Request, res: Response) {
  const parsed = catererQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: "Invalid query", details: parsed.error.flatten() });

  const { locality } = parsed.data;
  let items = [...CATERERS];
  if (locality && locality.trim()) {
    const loc = normalize(locality);
    items = items.filter((c) => normalize(c.locality) === loc);
  }

  res.json({
    total: items.length,
    items
  });
}

export function inspectBackend(_req: Request, res: Response) {
  const venueLocalities = Array.from(new Set(VENUES.map((v) => v.locality))).sort();
  const catererLocalities = Array.from(new Set(CATERERS.map((c) => c.locality))).sort();

  res.json({
    ok: true,
    stats: {
      localities: LOCALITIES.length,
      venues: VENUES.length,
      caterers: CATERERS.length
    },
    coverage: {
      venueLocalities,
      catererLocalities
    },
    sample: {
      venue: VENUES[0],
      caterer: CATERERS[0]
    }
  });
}

