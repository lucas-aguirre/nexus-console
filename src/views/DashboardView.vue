<template>
  <div class="grid">
    <section class="card">
      <h3>Health</h3>
      <div :class="['pill', ok ? 'ok' : 'bad']">{{ ok ? 'ok' : 'fail' }}</div>
      <button @click="loadAll">Refresh</button>
    </section>

    <section class="card">
      <h3>Metrics (recent)</h3>
      <pre>{{ metricsText }}</pre>
    </section>

    <section class="card">
      <h3>Runs (recent)</h3>
      <pre>{{ runsText }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { health, metricsRecent, runsRecent } from "../api/nexus";

const ok = ref(false);
const metricsText = ref("{}");
const runsText = ref("{}");

async function loadAll() {
  try { await health(); ok.value = true; } catch { ok.value = false; }
  try { metricsText.value = JSON.stringify(await metricsRecent(200), null, 2); } catch (e:any) { metricsText.value = String(e); }
  try { runsText.value = JSON.stringify(await runsRecent(20), null, 2); } catch (e:any) { runsText.value = String(e); }
}

onMounted(loadAll);
</script>

<style scoped>
.grid { display:grid; grid-template-columns: 320px 1fr 1fr; gap:12px; }
.card { background:#0f1620; border:1px solid #1f2a37; border-radius:10px; padding:12px; }
pre { background:#0b1220; border:1px solid #253041; border-radius:8px; padding:10px; overflow:auto; max-height: 420px; }
button { margin-top:10px; border:1px solid #253041; background:#111b2a; color:#e6edf3; padding:8px 10px; border-radius:8px; cursor:pointer; }
.pill { display:inline-block; padding:4px 10px; border-radius:999px; border:1px solid #253041; margin: 6px 0; }
.ok { border-color:#1f6feb; }
.bad { border-color:#f85149; }
</style>
