import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Vite proxy -> http://localhost:8000
  timeout: 120_000,
});

export type MetricsRecent = {
  rows: number;
  ollama_call_ms: { count: number; p50: number | null; p95: number | null; max: number | null };
  prompt_chars: { count: number; min: number | null; max: number | null };
  repair: { raw: number; repair: number; rate: number };
};

export type RunsRecent = {
  count: number;
  runs: Array<{
    trace_id: string;
    model?: string;
    prompt_chars?: number | null;
    suffixes: string[];
    stage_ms: Record<string, number>;
    ts_first?: number | null;
    ts_last?: number | null;
  }>;
};

export async function health() {
  const r = await api.get("/health");
  return r.data;
}

export async function metricsRecent(n = 200): Promise<MetricsRecent> {
  const r = await api.get(`/metrics/recent?n=${n}`);
  return r.data;
}

export async function runsRecent(n = 50): Promise<RunsRecent> {
  const r = await api.get(`/runs/recent?n=${n}`);
  return r.data;
}

export async function stateHot() {
  const r = await api.get("/state/hot");
  return r.data;
}

export async function stateFull() {
  const r = await api.get("/state");
  return r.data;
}

export async function ingest(user_input: string) {
  const r = await api.post("/ingest", { user_input });
  return r.data;
}

export async function ingestLoop(user_input: string) {
  const r = await api.post("/ingest_loop", { user_input });
  return r.data;
}
