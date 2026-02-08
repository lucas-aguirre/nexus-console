<template>
  <section class="card">
    <h3>Request</h3>
    <label>Modo</label>
    <select v-model="mode">
      <option value="ingest">/ingest</option>
      <option value="loop">/ingest_loop</option>
    </select>

    <label>Texto</label>
    <textarea v-model="text"></textarea>

    <div class="row">
      <button @click="send" :disabled="busy">{{ busy ? "Enviando..." : "Enviar" }}</button>
    </div>

    <label>Resposta</label>
    <pre>{{ out }}</pre>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ingest, ingestLoop } from "../api/nexus";

const mode = ref<"ingest"|"loop">("ingest");
const text = ref("Crie uma task: revisar arquitetura do NEXUS e listar próximos passos.");
const out = ref("{}");
const busy = ref(false);

async function send() {
  busy.value = true;
  try {
    const data = mode.value === "loop" ? await ingestLoop(text.value) : await ingest(text.value);
    out.value = JSON.stringify(data, null, 2);
  } catch (e:any) {
    out.value = String(e);
  } finally {
    busy.value = false;
  }
}
</script>

<style scoped>
.card { max-width: 900px; background:#0f1620; border:1px solid #1f2a37; border-radius:10px; padding:12px; }
label { display:block; margin:10px 0 6px; color:#9aa4af; font-size: 12px; }
select, textarea { width:100%; box-sizing:border-box; border-radius:8px; border:1px solid #253041; background:#0b1220; color:#e6edf3; padding:10px; }
textarea { min-height: 140px; resize: vertical; }
.row { margin-top:10px; }
button { border:1px solid #253041; background:#111b2a; color:#e6edf3; padding:8px 10px; border-radius:8px; cursor:pointer; }
pre { margin-top:8px; background:#0b1220; border:1px solid #253041; border-radius:8px; padding:10px; overflow:auto; max-height: 520px; }
</style>
