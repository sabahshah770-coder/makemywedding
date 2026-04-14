import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { openapi } from "./openapi.js";
import { getCaterers, getLocalities, getVenues, inspectBackend } from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/localities", getLocalities);
app.get("/api/venues", getVenues);
app.get("/api/caterers", getCaterers);
app.get("/api/inspect", inspectBackend);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Make My Wedding API running on http://localhost:${port}/api`);
});

