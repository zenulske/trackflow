<script>
  import BereichKarte from '$lib/components/BereichKarte.svelte';
  let { data } = $props();

  // Einträge pro Bereich zählen
  function eintraegeProBereich(bereichId) {
    return data.eintraege.filter(e => e.bereichId === bereichId).length;
  }
</script>

<svelte:head><title>Dashboard – TrackFlow</title></svelte:head>

<div class="header">
  <div>
    <h1>Dashboard</h1>
    <p class="subtitle">Dein Fortschritt im Überblick</p>
  </div>
  <a href="/eintrag/neu" class="btn-primary">+ Eintrag hinzufügen</a>
</div>

{#if data.bereiche.length === 0}
  <div class="leer">
    <p>Noch keine Bereiche angelegt.</p>
    <a href="/bereiche/neu" class="btn-primary" style="display:inline-block; margin-top:12px;">
      Ersten Bereich erstellen
    </a>
  </div>
{:else}
  <div class="karten-grid">
    {#each data.bereiche as bereich}
      <BereichKarte
        {bereich}
        wert={eintraegeProBereich(bereich._id).toString()}
        einheit="Einträge"
        fortschritt={Math.min(eintraegeProBereich(bereich._id) * 10, 100)}
      />
    {/each}
    <a href="/bereiche/neu" class="karte-add">
      <span>+</span>
      <span>Neuen Bereich erstellen</span>
    </a>
  </div>
{/if}

{#if data.eintraege.length > 0}
  <div class="section-header"><h2>Letzte Aktivitäten</h2></div>
  <div class="card">
    {#each data.eintraege as eintrag}
      <div class="aktivitaet">
        <span class="titel">{eintrag.titel}</span>
        <span class="datum">{new Date(eintrag.datum).toLocaleDateString('de-CH')}</span>
      </div>
    {/each}
  </div>
{/if}

<style>
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; }
  h1 { font-size:26px; font-weight:600; letter-spacing:-0.5px; }
  .subtitle { color:#6A6860; font-size:14px; margin-top:4px; }
  .karten-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
  .karte-add {
    border:1.5px dashed rgba(0,0,0,0.13); border-radius:12px;
    padding:20px; display:flex; flex-direction:column; align-items:center;
    justify-content:center; gap:8px; color:#9A9890;
    text-decoration:none; font-size:13px; font-weight:500;
    min-height:148px; transition:all 0.12s;
  }
  .karte-add:hover { border-color:#6A6860; color:#6A6860; background:white; }
  .karte-add span:first-child { font-size:26px; font-weight:300; }
  .leer { text-align:center; padding:60px; color:#6A6860; }
  .section-header { margin:24px 0 12px; }
  h2 { font-size:13px; font-weight:600; color:#9A9890; text-transform:uppercase; letter-spacing:0.07em; }
  .card { background:white; border:0.5px solid rgba(0,0,0,0.07); border-radius:12px; padding:4px 24px; }
  .aktivitaet { display:flex; justify-content:space-between; padding:12px 0; border-bottom:0.5px solid rgba(0,0,0,0.07); }
  .aktivitaet:last-child { border-bottom:none; }
  .titel { font-size:13px; font-weight:500; }
  .datum { font-size:11px; color:#9A9890; }
  .btn-primary {
    padding:9px 18px; background:#1C1B18; color:white;
    border:none; border-radius:8px; font-size:13px; font-weight:500;
    cursor:pointer; text-decoration:none;
  }
</style>
