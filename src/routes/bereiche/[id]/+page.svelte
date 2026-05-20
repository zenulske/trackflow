<script>
  import { goto } from '$app/navigation';
  let { data } = $props();
  let bestaetigen = false;

  async function loeschen() {
    if (!bestaetigen) { bestaetigen = true; return; }
    await fetch(`/api/bereiche/${data.bereich._id}`, { method: 'DELETE' });
    goto('/dashboard');
  }
</script>

<svelte:head><title>{data.bereich.name} – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-start mb-4">
  <div class="d-flex align-items-center gap-3">
    <span class="rounded-3 d-flex align-items-center justify-content-center"
          style="width:48px;height:48px;background:{data.bereich.farbeHell};font-size:26px;">
      {data.bereich.icon}
    </span>
    <div>
      <h1 class="fw-bold mb-0">{data.bereich.name}</h1>
      <p class="text-muted mb-0 small">Ziel: {data.bereich.ziel || '—'}</p>
    </div>
  </div>
  <div class="d-flex gap-2">
    <a href="/eintrag/neu" class="btn btn-outline-secondary btn-sm">
      <i class="bi bi-plus-lg me-1"></i> Eintrag
    </a>
    {#if bestaetigen}
      <button class="btn btn-danger btn-sm" onclick={loeschen}>Wirklich löschen?</button>
    {:else}
      <button class="btn btn-outline-danger btn-sm" onclick={loeschen}>
        <i class="bi bi-trash"></i>
      </button>
    {/if}
  </div>
</div>

<!-- Stats -->
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">
    <div class="card border-0 shadow-sm text-center p-3">
      <div class="fw-bold fs-3">{data.eintraege.length}</div>
      <div class="text-muted small">Einträge total</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="card border-0 shadow-sm text-center p-3">
      <div class="fw-bold fs-3">
        {Math.round(data.eintraege.reduce((s,e) => s+(e.dauer||0),0)/60*10)/10}
      </div>
      <div class="text-muted small">Stunden total</div>
    </div>
  </div>
</div>

<!-- Einträge -->
<div class="d-flex justify-content-between align-items-center mb-3">
  <h6 class="text-uppercase text-muted fw-semibold mb-0" style="font-size:11px;letter-spacing:.08em;">Einträge</h6>
  <a href="/eintrag/neu" class="btn btn-dark btn-sm">
    <i class="bi bi-plus-lg me-1"></i> Neu
  </a>
</div>

<div class="card border-0 shadow-sm">
  {#if data.eintraege.length === 0}
    <div class="card-body text-center py-5 text-muted">
      <i class="bi bi-journal-plus fs-3 d-block mb-2"></i>
      Noch keine Einträge.
      <a href="/eintrag/neu" class="d-block mt-2 text-dark fw-medium">Ersten Eintrag hinzufügen →</a>
    </div>
  {:else}
    <ul class="list-group list-group-flush">
      {#each data.eintraege as e}
        <li class="list-group-item d-flex justify-content-between align-items-start py-3">
          <div>
            <div class="fw-medium">{e.titel}</div>
            {#if e.notizen}<div class="text-muted small">{e.notizen}</div>{/if}
          </div>
          <div class="text-end text-nowrap ms-3">
            <div class="text-muted small">{new Date(e.datum).toLocaleDateString('de-CH')}</div>
            {#if e.dauer}<div class="text-muted" style="font-size:11px;">{e.dauer} min</div>{/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
