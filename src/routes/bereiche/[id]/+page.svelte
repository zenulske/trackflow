<script>
  import { goto, invalidateAll } from "$app/navigation";
  let { data } = $props();

  let zuLoeschen = $state(null);
  let bereichLoeschen = $state(false);
  let laden = $state(false);

  let einheit = $derived(
    data.bereich.zielEinheit ||
      (data.bereich.zielTyp === "minuten" ? "Min." : "Einträge"),
  );
  let zeitraum = $derived(
    data.bereich.zielZeitraum === "monat" ? "Monat" : "Woche",
  );

  let maxWert = $derived(
    Math.max(
      data.bereich.zielAnzahl ?? 0,
      ...data.verlauf.map((v) => v.aktuell),
    ) || 1,
  );

  function eintragModalOeffnen(eintrag) {
    zuLoeschen = eintrag;
  }
  function eintragModalSchliessen() {
    if (!laden) zuLoeschen = null;
  }

  async function eintragLoeschenBestaetigt() {
    if (!zuLoeschen) return;
    laden = true;
    const res = await fetch(`/api/eintraege/${zuLoeschen._id}`, {
      method: "DELETE",
    });
    laden = false;
    if (res.ok) {
      zuLoeschen = null;
      await invalidateAll();
    }
  }

  function bereichModalOeffnen() {
    bereichLoeschen = true;
  }
  function bereichModalSchliessen() {
    if (!laden) bereichLoeschen = false;
  }

  async function bereichLoeschenBestaetigt() {
    laden = true;
    const res = await fetch(`/api/bereiche/${data.bereich._id}`, {
      method: "DELETE",
    });
    laden = false;
    if (res.ok) goto("/dashboard");
  }
</script>

<svelte:head><title>{data.bereich.name} – TrackFlow</title></svelte:head>

<!-- Header -->
<div class="d-flex justify-content-between align-items-start mb-4">
  <div class="d-flex align-items-center gap-3">
    <span
      class="rounded-3 d-flex align-items-center justify-content-center"
      style="width:48px;height:48px;background:{data.bereich
        .farbeHell};font-size:26px;"
    >
      {data.bereich.icon}
    </span>
    <div>
      <h1 class="fw-bold mb-0">{data.bereich.name}</h1>
      <p class="text-muted mb-0 small">
        {#if data.bereich.zielAnzahl}
          Ziel: {data.bereich.zielAnzahl} {einheit} / {zeitraum}
        {:else}
          Kein Ziel definiert
        {/if}
      </p>
    </div>
  </div>
  <div class="d-flex gap-2 flex-wrap justify-content-end">
    <a href="/eintrag/neu" class="btn btn-outline-secondary btn-sm">
      <i class="bi bi-plus-lg me-1"></i> Eintrag
    </a>
    <a
      href="/bereiche/{data.bereich._id}/bearbeiten"
      class="btn btn-outline-secondary btn-sm"
    >
      <i class="bi bi-pencil me-1"></i> Bearbeiten
    </a>
    <button class="btn btn-outline-danger btn-sm" onclick={bereichModalOeffnen}>
      Löschen
    </button>
  </div>
</div>

<!-- Fortschritt -->
{#if data.bereich.zielAnzahl}
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-medium">Fortschritt diese {zeitraum}</span>
        <span class="fw-bold" style="color:{data.bereich.farbe};">
          {data.fortschritt.aktuell} / {data.bereich.zielAnzahl}
          {einheit}
        </span>
      </div>
      <div class="progress mb-1" style="height:8px;">
        <div
          class="progress-bar"
          style="width:{data.fortschritt.prozent}%;background:{data.bereich
            .farbe};"
        ></div>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <span class="text-muted small"
          >{data.fortschritt.prozent}% erreicht</span
        >
        {#if data.fortschritt.prozent >= 100}
          <span class="text-success small fw-semibold">🎉 Ziel erreicht!</span>
        {/if}
      </div>
    </div>
  </div>

  <!-- Verlaufs-Chart -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-semibold mb-0">
          Verlauf der letzten 6 {data.bereich.zielZeitraum === "monat"
            ? "Monate"
            : "Wochen"}
        </h6>
        <span class="badge bg-light text-muted small"
          >Ziel: {data.bereich.zielAnzahl} {einheit}</span
        >
      </div>
      <div class="chart-container">
        {#each data.verlauf as v (v.start)}
          <div
            class="chart-spalte"
            title="{v.aktuell} {einheit} – {v.prozent}%"
          >
            <div class="chart-wert" class:erreicht={v.erreicht}>
              {v.aktuell}
            </div>
            <div class="chart-balken-bereich">
              <div
                class="chart-ziel-linie"
                style="bottom:{(data.bereich.zielAnzahl / maxWert) * 100}%;"
              ></div>
              <div
                class="chart-balken"
                class:aktuell={v.istAktuell}
                style="height:{(v.aktuell / maxWert) * 100}%;
                          background:{v.erreicht
                  ? data.bereich.farbe
                  : data.bereich.farbeHell};
                          border-color:{data.bereich.farbe};"
              ></div>
            </div>
            <div class="chart-label" class:aktuell={v.istAktuell}>
              {v.label}
            </div>
          </div>
        {/each}
      </div>
      <div class="d-flex justify-content-center gap-3 mt-3">
        <div class="d-flex align-items-center gap-1 small text-muted">
          <span
            style="display:inline-block;width:14px;height:10px;background:{data
              .bereich.farbe};border-radius:2px;"
          ></span>
          Ziel erreicht
        </div>
        <div class="d-flex align-items-center gap-1 small text-muted">
          <span
            style="display:inline-block;width:14px;height:10px;background:{data
              .bereich.farbeHell};border:1px solid {data.bereich
              .farbe};border-radius:2px;"
          ></span>
          Nicht erreicht
        </div>
        <div class="d-flex align-items-center gap-1 small text-muted">
          <span
            style="display:inline-block;width:14px;height:2px;background:#9A9890;border-top:1px dashed #6A6860;"
          ></span>
          Ziel-Linie
        </div>
      </div>
    </div>
  </div>
{/if}

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
        {Math.round(
          (data.eintraege.reduce((s, e) => s + (e.dauer || 0), 0) / 60) * 10,
        ) / 10}
      </div>
      <div class="text-muted small">Stunden total</div>
    </div>
  </div>
</div>

<!-- Einträge -->
<div class="d-flex justify-content-between align-items-center mb-3">
  <h6
    class="text-uppercase text-muted fw-semibold mb-0"
    style="font-size:11px;letter-spacing:.08em;"
  >
    Einträge
  </h6>
  <a href="/eintrag/neu" class="btn btn-dark btn-sm">
    <i class="bi bi-plus-lg me-1"></i> Neu
  </a>
</div>

<div class="card border-0 shadow-sm">
  {#if data.eintraege.length === 0}
    <div class="card-body text-center py-5 text-muted">
      <i class="bi bi-journal-plus fs-3 d-block mb-2"></i>
      Noch keine Einträge.
      <a href="/eintrag/neu" class="d-block mt-2 text-dark fw-medium"
        >Ersten Eintrag hinzufügen →</a
      >
    </div>
  {:else}
    <ul class="list-group list-group-flush">
      {#each data.eintraege as e (e._id)}
        <li
          class="list-group-item d-flex justify-content-between align-items-center py-3 gap-3 flex-wrap"
        >
          <div class="flex-grow-1 overflow-hidden" style="min-width:0;">
            <div class="fw-medium">{e.titel}</div>
            {#if e.notizen}<div class="text-muted small text-truncate">
                {e.notizen}
              </div>{/if}
          </div>

          <div class="text-end text-nowrap small text-muted">
            <div>{new Date(e.datum).toLocaleDateString("de-CH")}</div>
            {#if e.dauer || e.wert}
              <div style="font-size:11px;">
                {#if e.wert}{e.wert} {data.bereich.zielEinheit || ""}{/if}
                {#if e.wert && e.dauer}
                  ·
                {/if}
                {#if e.dauer}{e.dauer} min{/if}
              </div>
            {/if}
          </div>

          <div class="d-flex gap-1">
            <a
              href="/eintrag/{e._id}/bearbeiten"
              class="btn btn-sm btn-outline-secondary"
            >
              Bearbeiten
            </a>
            <button
              class="btn btn-sm btn-outline-danger"
              onclick={() => eintragModalOeffnen(e)}
            >
              Löschen
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Modal: Eintrag löschen -->
{#if zuLoeschen}
  <div
    class="modal-backdrop"
    onclick={eintragModalSchliessen}
    role="button"
    tabindex="-1"
    onkeydown={(e) => e.key === "Escape" && eintragModalSchliessen()}
  ></div>
  <div class="modal-dialog-custom" role="dialog" aria-modal="true">
    <div class="card border-0 shadow-lg">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-2">Eintrag löschen?</h5>
        <p class="text-muted mb-4">
          Möchtest du den Eintrag <strong>«{zuLoeschen.titel}»</strong> wirklich
          löschen? Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
        <div class="d-flex gap-2 justify-content-end">
          <button
            class="btn btn-outline-secondary"
            onclick={eintragModalSchliessen}
            disabled={laden}>Abbrechen</button
          >
          <button
            class="btn btn-danger"
            onclick={eintragLoeschenBestaetigt}
            disabled={laden}
          >
            {#if laden}<span class="spinner-border spinner-border-sm me-2"
              ></span>{/if}
            Ja, löschen
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Modal: Bereich löschen -->
{#if bereichLoeschen}
  <div
    class="modal-backdrop"
    onclick={bereichModalSchliessen}
    role="button"
    tabindex="-1"
    onkeydown={(e) => e.key === "Escape" && bereichModalSchliessen()}
  ></div>
  <div class="modal-dialog-custom" role="dialog" aria-modal="true">
    <div class="card border-0 shadow-lg">
      <div class="card-body p-4">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span
            class="rounded-2 d-flex align-items-center justify-content-center"
            style="width:36px;height:36px;background:{data.bereich
              .farbeHell};font-size:20px;"
          >
            {data.bereich.icon}
          </span>
          <h5 class="fw-bold mb-0">Bereich löschen?</h5>
        </div>
        <p class="text-muted mb-2">
          Möchtest du den Bereich <strong>«{data.bereich.name}»</strong> wirklich
          löschen?
        </p>
        {#if data.eintraege.length > 0}
          <div class="alert alert-warning py-2 small mb-4">
            <i class="bi bi-exclamation-triangle me-1"></i>
            <strong>Achtung:</strong> Alle {data.eintraege.length} Einträge dieses
            Bereichs werden ebenfalls gelöscht.
          </div>
        {:else}
          <p class="text-muted small mb-4">
            Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
        {/if}
        <div class="d-flex gap-2 justify-content-end">
          <button
            class="btn btn-outline-secondary"
            onclick={bereichModalSchliessen}
            disabled={laden}>Abbrechen</button
          >
          <button
            class="btn btn-danger"
            onclick={bereichLoeschenBestaetigt}
            disabled={laden}
          >
            {#if laden}<span class="spinner-border spinner-border-sm me-2"
              ></span>{/if}
            Ja, löschen
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .chart-container {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    height: 180px;
    padding: 0 4px;
  }
  .chart-spalte {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  .chart-wert {
    font-size: 12px;
    font-weight: 600;
    color: #6a6860;
    margin-bottom: 4px;
    height: 18px;
  }
  .chart-wert.erreicht {
    color: #1c1b18;
  }
  .chart-balken-bereich {
    flex: 1;
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #e8e6e2;
  }
  .chart-balken {
    width: 100%;
    border-radius: 4px 4px 0 0;
    border: 1px solid;
    transition: height 0.3s ease;
    min-height: 2px;
  }
  .chart-balken.aktuell {
    box-shadow:
      0 0 0 2px white,
      0 0 0 3px currentColor;
  }
  .chart-ziel-linie {
    position: absolute;
    left: -4px;
    right: -4px;
    height: 0;
    border-top: 1.5px dashed #9a9890;
    z-index: 1;
  }
  .chart-label {
    font-size: 11px;
    color: #9a9890;
    margin-top: 6px;
    font-weight: 500;
  }
  .chart-label.aktuell {
    color: #1c1b18;
    font-weight: 700;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    animation: fadeIn 0.15s ease;
  }
  .modal-dialog-custom {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 460px;
    z-index: 1050;
    animation: slideIn 0.2s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
</style>
