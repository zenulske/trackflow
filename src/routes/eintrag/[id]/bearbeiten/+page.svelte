<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
</script>

<svelte:head><title>Eintrag bearbeiten – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="fw-bold mb-0">Eintrag bearbeiten</h1>
  <a href="/bereiche/{data.bereich._id}" class="btn btn-outline-secondary btn-sm">
    <i class="bi bi-arrow-left me-1"></i> Zurück
  </a>
</div>

<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    <form method="POST" use:enhance>

      <!-- Bereich nur als Info, nicht änderbar -->
      <div class="mb-3">
        <label class="form-label fw-medium small">Bereich</label>
        <div class="d-flex align-items-center gap-2 p-2 rounded-3"
             style="background:{data.bereich.farbeHell};border:1px solid {data.bereich.farbe}33;">
          <span class="rounded-2 d-flex align-items-center justify-content-center"
                style="width:32px;height:32px;background:white;font-size:18px;">
            {data.bereich.icon}
          </span>
          <span class="fw-semibold" style="color:{data.bereich.farbe};">{data.bereich.name}</span>
        </div>
      </div>

      <!-- Titel -->
      <div class="mb-3">
        <label for="titel" class="form-label fw-medium small">Aktivität / Titel *</label>
        <input id="titel" name="titel" type="text"
               class="form-control {form?.fehler?.titel ? 'is-invalid' : ''}"
               placeholder="z.B. Laufen, React Kurs, Bewerbung…"
               value={form?.werte?.titel ?? data.eintrag.titel} />
        {#if form?.fehler?.titel}
          <div class="invalid-feedback">{form.fehler.titel}</div>
        {/if}
      </div>

      <!-- Dynamisches Feld je nach zielTyp -->
      {#if data.bereich.zielTyp === 'wert'}
        <div class="mb-3 border border-success rounded-3 p-3 bg-light">
          <label for="wert" class="form-label fw-medium small">
            {data.bereich.zielEinheit || 'Wert'} <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input id="wert" name="wert" type="number" step="0.1" min="0"
                   class="form-control" placeholder="z.B. 5"
                   value={form?.werte?.wert ?? data.eintrag.wert ?? ''} />
            <span class="input-group-text">{data.bereich.zielEinheit || 'Einheit'}</span>
          </div>
          {#if form?.fehler?.wert}
            <div class="text-danger small mt-1">{form.fehler.wert}</div>
          {/if}
        </div>
      {:else if data.bereich.zielTyp === 'minuten'}
        <div class="mb-3 border border-success rounded-3 p-3 bg-light">
          <label for="dauer-req" class="form-label fw-medium small">
            Dauer <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input id="dauer-req" name="dauer" type="number" min="1"
                   class="form-control" placeholder="z.B. 45"
                   value={form?.werte?.dauer ?? data.eintrag.dauer ?? ''} />
            <span class="input-group-text">Minuten</span>
          </div>
        </div>
      {/if}

      <!-- Datum -->
      <div class="mb-3">
        <label for="datum" class="form-label fw-medium small">Datum</label>
        <input id="datum" name="datum" type="date" class="form-control"
               value={form?.werte?.datum ?? data.eintrag.datum} />
      </div>

      <!-- Optionale Dauer wenn nicht 'minuten' -->
      {#if data.bereich.zielTyp !== 'minuten'}
        <div class="mb-3">
          <label for="dauer-opt" class="form-label fw-medium small">
            Dauer (Min.) <span class="text-muted small">— optional</span>
          </label>
          <input id="dauer-opt" name="dauer" type="number" class="form-control"
                 placeholder="z.B. 45" min="1"
                 value={form?.werte?.dauer ?? data.eintrag.dauer ?? ''} />
        </div>
      {/if}

      <!-- Notizen -->
      <div class="mb-4">
        <label for="notizen" class="form-label fw-medium small">Notizen (optional)</label>
        <textarea id="notizen" name="notizen" class="form-control" rows="3"
                  placeholder="Was hast du gemacht? Was lief gut?"
        >{form?.werte?.notizen ?? data.eintrag.notizen ?? ''}</textarea>
      </div>

      <div class="d-flex gap-2 justify-content-end">
        <a href="/bereiche/{data.bereich._id}" class="btn btn-outline-secondary">Abbrechen</a>
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-check-lg me-1"></i> Änderungen speichern
        </button>
      </div>

    </form>
  </div>
</div>
