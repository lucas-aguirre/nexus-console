<template>
  <div class="app">
    <header class="top">
      <div class="brand">NEXUS Console</div>
      <nav class="nav">
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/request">Request</RouterLink>
        <RouterLink to="/runs">Runs</RouterLink>
        <RouterLink to="/state">State</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app { min-height: 100vh; background: #0b0f14; color: #e6edf3; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; }
.top { display:flex; gap:16px; align-items:center; padding:12px 16px; border-bottom:1px solid #1f2a37; }
.brand { font-weight: 700; letter-spacing: 0.3px; }
.nav { display:flex; gap:12px; }
a { color:#9aa4af; text-decoration:none; padding:6px 10px; border-radius:8px; }
a.router-link-active { color:#e6edf3; background:#111b2a; border:1px solid #253041; }
.main { padding: 16px; }
</style>
