<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  const heute = new Date().toISOString().split('T')[0];

  const startId = form?.werte?.bereichId ?? data.bereiche[0]?._id ?? '';

  let bereichId       = $state(startId);
  let gewaehltBereich = $state(data.bereiche.find(b => b._id === startId) ?? null);

  function bereichWechseln(event) {
    const neueId = event.target.value;
    bereichId = neueId;
    gewaehltBereich = data.bereiche.find(b => b._id === neueId) ?? null;
  }
</script>

<svelte:head><title>Eintrag hinzufügen – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="fw-bold mb-0">Eintrag hinzufügen</h1>
  <a href="/dashboard" class="btn btn-outline-secondary btn-sm">
    <i class="bi bi-arrow-left me-1"></i> Zurück
  </a>
</div>


<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    <form method="POST" use:enhance>

      <div class="mb-3">
        <label for="bereichId" class="form-label fw-medium small">Bereich *</label>
        <select id="bereichId" name="bereichId"
                class="form-select {form?.fehler?.bereichId ? 'is-invalid' : ''}"
                value={bereichId}
                onchange={bereichWechseln}>
          {#each data.bereiche as b}
            <option value={b._id}>{b.icon} {b.name}</option>
          {/each}
        </select>
      </div>

      {#if gewaehltBereich?.zielAnzahl}
        <div class="rounded-3 p-2 mb-3 small d-flex align-items-center gap-2"
             style="background:{gewaehltBereich.farbeHell};border:1px solid {gewaehltBereich.farbe}33;">
          <i class="bi bi-bullseye" style="color:{gewaehltBereich.farbe};"></i>
          <span style="color:{gewaehltBereich.farbe};">
            Ziel: <strong>{gewaehltBereich.zielAnzahl} {gewaehltBereich.zielEinheit}</strong>
            / {gewaehltBereich.zielZeitraum === 'monat' ? 'Monat' : 'Woche'}
          </span>
        </div>
      {/if}

      <div class="mb-3">
        <label for="titel" class="form-label fw-medium small">Aktivität / Titel *</label>
        <input id="titel" name="titel" type="text"
               class="form-control {form?.fehler?.titel ? 'is-invalid' : ''}"
               placeholder="z.B. Laufen, React Kurs, Bewerbung…"
               value={form?.werte?.titel ?? ''} />
        {#if form?.fehler?.titel}
          <div class="invalid-feedback">{form.fehler.titel}</div>
        {/if}
      </div>

      {#if gewaehltBereich?.zielTyp === 'wert'}
        <div class="mb-3 border border-success-subtle rounded-3 p-3 bg-light">
          <label for="wert" class="form-label fw-medium small">
            {gewaehltBereich.zielEinheit || 'Wert'} <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input id="wert" name="wert" type="number" step="0.1" min="0"
                   class="form-control {form?.fehler?.wert ? 'is-invalid' : ''}"
                   placeholder="z.B. 5"
                   value={form?.werte?.wert ?? ''} />
            <span class="input-group-text">{gewaehltBereich.zielEinheit || 'Einheit'}</span>
          </div>
        </div>
      {:else if gewaehltBereich?.zielTyp === 'minuten'}
        <div class="mb-3 border border-success-subtle rounded-3 p-3 bg-light">
          <label for="dauer-req" class="form-label fw-medium small">
            Dauer <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input id="dauer-req" name="dauer" type="number" min="1"
                   class="form-control" placeholder="z.B. 45"
                   value={form?.werte?.dauer ?? ''} />
            <span class="input-group-text">Minuten</span>
          </div>
        </div>
      {/if}

      <div class="mb-3">
        <label for="datum" class="form-label fw-medium small">Datum</label>
        <input id="datum" name="datum" type="date" class="form-control"
               value={form?.werte?.datum ?? heute} />
      </div>

      {#if gewaehltBereich?.zielTyp !== 'minuten'}
        <div class="mb-3">
          <label for="dauer-opt" class="form-label fw-medium small">
            Dauer (Min.) <span class="text-muted small">— optional</span>
          </label>
          <input id="dauer-opt" name="dauer" type="number" class="form-control"
                 placeholder="z.B. 45" min="1"
                 value={form?.werte?.dauer ?? ''} />
        </div>
      {/if}

      <div class="mb-4">
        <label for="notizen" class="form-label fw-medium small">Notizen (optional)</label>
        <textarea id="notizen" name="notizen" class="form-control" rows="3"
                  placeholder="Was hast du gemacht? Was lief gut?"
        >{form?.werte?.notizen ?? ''}</textarea>
      </div>

      <div class="d-flex gap-2 justify-content-end">
        <a href="/dashboard" class="btn btn-outline-secondary">Abbrechen</a>
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-check-lg me-1"></i> Eintrag speichern
        </button>
      </div>

    </form>
  </div>
</div>
