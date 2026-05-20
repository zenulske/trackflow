<script>
  let { bereich, aktuell = 0, fortschritt = 0 } = $props();
</script>

<a href="/bereiche/{bereich._id}" class="card border-0 shadow-sm h-100 text-decoration-none text-dark">
  <div class="card-body">
    <div class="d-flex align-items-center gap-2 mb-3">
      <span class="rounded-2 d-flex align-items-center justify-content-center"
            style="width:36px;height:36px;background:{bereich.farbeHell};font-size:20px;">
        {bereich.icon}
      </span>
      <span class="fw-semibold small text-uppercase" style="color:{bereich.farbe};letter-spacing:.06em;">
        {bereich.name}
      </span>
    </div>

    <!-- Aktueller Wert / Ziel -->
    <div class="fw-bold mb-1" style="font-size:28px;letter-spacing:-1px;line-height:1.1;">
      {aktuell}
      {#if bereich.zielAnzahl}
        <span class="fs-6 fw-normal text-muted">/ {bereich.zielAnzahl}</span>
      {/if}
    </div>

    <div class="text-muted small mb-3">
      {bereich.zielAnzahl
        ? `Einträge diese${bereich.zielZeitraum === 'monat' ? 'n Monat' : ' Woche'}`
        : 'Einträge total'}
    </div>

    <!-- Fortschrittsbalken -->
    {#if bereich.zielAnzahl}
      <div class="progress mb-1" style="height:6px;">
        <div class="progress-bar" style="width:{fortschritt}%;background:{bereich.farbe};transition:width .3s;"></div>
      </div>
      <div class="d-flex justify-content-between">
        <span class="text-muted" style="font-size:11px;">{fortschritt}%</span>
        <span class="text-muted" style="font-size:11px;">Ziel: {bereich.zielAnzahl} / {bereich.zielZeitraum === 'monat' ? 'Monat' : 'Woche'}</span>
      </div>
    {:else}
      <div class="text-muted" style="font-size:11px;">Kein Ziel definiert</div>
    {/if}
  </div>
</a>
