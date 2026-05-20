<script>
  import BereichKarte from '$lib/components/BereichKarte.svelte';
  let { data } = $props();

  function eintraegeProBereich(id) {
    return data.eintraege.filter(e => e.bereichId === id).length;
  }
</script>

<svelte:head><title>Dashboard – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-start mb-4">
  <div>
    <h1 class="fw-bold mb-1">Dashboard</h1>
    <p class="text-muted mb-0">Dein Fortschritt im Überblick</p>
  </div>
  <a href="/eintrag/neu" class="btn btn-dark">
    <i class="bi bi-plus-lg me-1"></i> Eintrag hinzufügen
  </a>
</div>

{#if data.bereiche.length === 0}
  <div class="card border-0 shadow-sm text-center py-5">
    <div class="card-body">
      <i class="bi bi-grid-3x3-gap display-4 text-muted mb-3"></i>
      <p class="text-muted fs-5">Noch keine Bereiche angelegt.</p>
      <a href="/bereiche/neu" class="btn btn-dark mt-2">
        <i class="bi bi-plus-lg me-1"></i> Ersten Bereich erstellen
      </a>
    </div>
  </div>
{:else}
  <div class="row g-3 mb-4">
    {#each data.bereiche as bereich}
      <div class="col-md-4">
        <BereichKarte
          {bereich}
          wert={eintraegeProBereich(bereich._id).toString()}
          einheit="Einträge"
          fortschritt={Math.min(eintraegeProBereich(bereich._id) * 10, 100)}
        />
      </div>
    {/each}
    <div class="col-md-4">
      <a href="/bereiche/neu" class="card border-dashed h-100 text-decoration-none d-flex align-items-center justify-content-center text-muted"
         style="min-height:140px; border:2px dashed #dee2e6 !important;">
        <div class="text-center">
          <i class="bi bi-plus-circle fs-3 mb-2 d-block"></i>
          <span class="small">Neuen Bereich erstellen</span>
        </div>
      </a>
    </div>
  </div>

  {#if data.eintraege.length > 0}
    <h6 class="text-uppercase text-muted fw-semibold mb-3" style="font-size:11px;letter-spacing:.08em;">Letzte Aktivitäten</h6>
    <div class="card border-0 shadow-sm">
      <ul class="list-group list-group-flush">
        {#each data.eintraege as e}
          {@const bereich = data.bereiche.find(b => b._id === e.bereichId)}
          <li class="list-group-item d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-2">
              {#if bereich}
                <span class="rounded-2 d-flex align-items-center justify-content-center"
                      style="width:28px;height:28px;background:{bereich.farbeHell};font-size:15px;flex-shrink:0;">
                  {bereich.icon}
                </span>
              {/if}
              <div>
                <div class="fw-medium small">{e.titel}</div>
                {#if bereich}<div class="text-muted" style="font-size:11px;">{bereich.name}</div>{/if}
              </div>
            </div>
            <span class="text-muted small">{new Date(e.datum).toLocaleDateString('de-CH')}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
{/if}
