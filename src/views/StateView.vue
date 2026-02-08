<template>
  <section class="card">
    <h3>State</h3>
    <div class="row">
      <button @click="loadHot">HOT</button>
      <button @click="loadFull">FULL</button>
    </div>

    <h4>HOT</h4>
    <pre>{{ hot }}</pre>

    <h4>FULL</h4>
    <pre>{{ full }}</pre>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { stateHot, stateFull } from "../api/nexus";

const hot = ref("{}");
const full = ref("{}");

async function loadHot() {
  try { hot.value = JSON.stringify(await stateHot(), null, 2); }
  catch (e:any) { hot.value = String(e); }
}

async function loadFull() {
  try { full.value = JSON.stringify(await stateFull(), null, 2); }
  catch (e:any) { full.value = String(e); }
}

loadHot();
</script>

<style scoped>
.card { background:#0f1620; border:1px solid #1f2a37; border-radius:10px; padding:12px; }
.row { display:flex; gap:10px; margin-bottom:10px; }
button { border:1px solid #253041; background:#111b2a; color:#e6edf3; padding:8px 10px; border-radius:8px; cursor:pointer; }
pre { background:#0b1220; border:1px solid #253041; border-radius:8px; padding:10px; overflow:auto; max-height: 520px; }
h4 { margin: 10px 0 6px; color:#9aa4af; font-size: 12px; }
</style>
