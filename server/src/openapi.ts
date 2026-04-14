export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Make My Wedding API",
    version: "0.1.0",
    description:
      "Backend for Make My Wedding (Mumbai). Use /api/inspect + /api/docs to inspect data and endpoints."
  },
  servers: [{ url: "http://localhost:4000" }],
  paths: {
    "/api/localities": {
      get: {
        summary: "List Mumbai localities",
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "array", items: { type: "string" } } } }
          }
        }
      }
    },
    "/api/venues": {
      get: {
        summary: "Search venues",
        parameters: [
          { name: "locality", in: "query", schema: { type: "string" } },
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "sort", in: "query", schema: { type: "string", enum: ["price_asc", "price_desc", "rating_desc"] } }
        ],
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/caterers": {
      get: {
        summary: "List caterers (optionally filtered by locality)",
        parameters: [{ name: "locality", in: "query", schema: { type: "string" } }],
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/inspect": {
      get: {
        summary: "Inspect backend seed data + health",
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    }
  }
} as const;

