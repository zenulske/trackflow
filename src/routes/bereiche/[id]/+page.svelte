<script>
  import { goto } from '$app/navigation';
  import Benachrichtigung from '$lib/components/Benachrichtigung.svelte';
  let { data } = $props();

  let loeschenBestaetigt = false;

  async function bereichLoeschen() {
    if (!loeschenBestaetigt) { loeschenBestaetigt = true; return; }
    await fetch(`/api/bereiche/${data.bereich._id}`, { method: 'DELETE' });
    goto('/dashboard');
  }
</script>

<svelte:head><title>{data.bereich.name} – TrackFlow</title></svelte:head>

<div class="header">
  <div>
    <h1>{data.bereich.icon} {data.bereich.name}</h1>
    <p class="subtitle">Ziel: {data.bereich.ziel || '—'}</p>
  </div>
  <div class="actions">
    <a href="/eintrag/neu" class="btn-sec">+ Eintrag</a>
    {#if loeschenBestaetigt}
      <button class="btn-danger" on:click={bereichLoeschen}>Wirklich löschen?</button>
    {:else}
      <button class="btn-danger-soft" on:click={() => loeschenBestaetigt = true}>Löschen</button>
    {/if}
  </div>
</div>

<div class="stats-grid">
  <div class="stat-card">
    <p class="stat-label">Einträge total</p>
    <p class="stat-wert">{data.eintraege.length}</p>
  </div>
  <div class="stat-card">
    <p class="stat-label">Gesamtdauer</p>
    <p class="stat-wert">{Math.round(data.eintraege.reduce((s,e) => s + (e.dauer||0), 0) / 60 * 10)/10} <span>h</span></p>
  </div>
</div>

<div class="card">
  <div class="section-header">
    <h2>Einträge</h2>
    <a href="/eintrag/neu" class="btn-sec" style="font-size:12px; padding:6px 12px;">+ Neu</a>
  </div>
  {#if data.eintraege.length === 0}
    <p class="leer">Noch keine Einträge. <a href="/eintrag/neu">Ersten Eintrag hinzufügen →</a></p>
  {:else}
    {#each data.eintraege as eintrag}
      <div class="eintrag">
        <div>
          <p class="eintrag-titel">{eintrag.titel}</p>
          {#if eintrag.notizen}<p class="eintrag-notizen">{eintrag.notizen}</p>{/if}
        </div>
        <div style="text-align:right">
          <p class="eintrag-datum">{new Date(eintrag.datum).toLocaleDateString('de-CH')}</p>
          {#if eintrag.dauer}<p class="eintrag-dauer">{eintrag.dauer} min</p>{/if}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; }
  h1 { font-size:26px; font-weight:600; letter-spacing:-0.5px; }
  .subtitle { color:#6A6860; margin-top:4px; font-size:14px; }
  .actions { display:flex; gap:8px; align-items:center; }
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:22px; }
  .stat-card { background:white; border:0.5px solid rgba(0,0,0,0.07); border-radius:12px; padding:16px 18px; }
  .stat-label { font-size:11px; color:#6A6860; margin-bottom:6px; }
  .stat-wert { font-size:28px; font-weight:600; letter-spacing:-1px; }
  .stat-wert span { font-size:14px; font-weight:400; color:#6A6860; }
  .card { background:white; border:0.5px solid rgba(0,0,0,0.07); border-radius:12px; padding:20px 24px; }
  .section-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
  h2 { font-size:11px; font-weight:600; color:#9A9890; text-transform:uppercase; letter-spacing:0.07em; }
  .leer { color:#9A9890; font-size:13px; padding:12px 0; }
  .leer a { color:#1C1B18; }
  .eintrag { display:flex; justify-content:space-between; padding:12px 0; border-bottom:0.5px solid rgba(0,0,0,0.07); }
  .eintrag:last-child { border-bottom:none; }
  .eintrag-titel { font-size:14px; font-weight:500; }
  .eintrag-notizen { font-size:12px; color:#6A6860; margin-top:2px; }
  .eintrag-datum { font-size:11px; color:#9A9890; }
  .eintrag-dauer { font-size:11px; color:#9A9890; margin-top:2px; }
  .btn-sec { padding:8px 16px; background:white; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; text-decoration:none; color:#1C1B18; }
  .btn-danger { padding:8px 14px; background:#A32D2D; color:white; border:none; border-radius:8px; font-size:13px; cursor:pointer; font-family:inherit; }
  .btn-danger-soft { padding:8px 14px; background:none; border:0.5px solid #F09595; border-radius:8px; font-size:13px; color:#A32D2D; cursor:pointer; font-family:inherit; }
</style>
