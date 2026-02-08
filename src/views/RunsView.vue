<template>
  <section class="card">
    <h3>Runs</h3>
    <div class="row">
      <input type="number" v-model.number="n" min="1" max="200" />
      <button @click="load">Carregar</button>
    </div>
    <pre>{{ out }}</pre>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { runsRecent } from "../api/nexus";

const n = ref(50);
const out = ref("{}");

async function load() {
  try { out.value = JSON.stringify(await runsRecent(n.value), null, 2); }
  catch (e:any) { out.value = String(e); }
}
load();
</script>

<style scoped>
.card { background:#0f1620; border:1px solid #1f2a37; border-radius:10px; padding:12px; }
.row { display:flex; gap:10px; align-items:center; margin-bottom:10px; }
input { width:120px; border-radius:8px; border:1px solid #253041; background:#0b1220; color:#e6edf3; padding:8px; }
button { border:1px solid #253041; background:#111b2a; color:#e6edf3; padding:8px 10px; border-radius:8px; cursor:pointer; }
pre { background:#0b1220; border:1px solid #253041; border-radius:8px; padding:10px; overflow:auto; max-height: 700px; }
</style>
