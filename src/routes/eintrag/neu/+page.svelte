<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  const heute = new Date().toISOString().split('T')[0];

  let bereichId       = $state(form?.werte?.bereichId ?? data.bereiche[0]?._id ?? '');
  let gewaehltBereich = $state(null);

  // $effect garantiert dass dies bei jeder Änderung von bereichId neu berechnet wird
  $effect(() => {
    gewaehltBereich = data.bereiche.find(b => b._id === bereichId) ?? data.bereiche[0] ?? null;
  });
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

      <!-- Bereich -->
      <div class="mb-3">
        <label for="bereichId" class="form-label fw-medium small">Bereich *</label>
        <select
          id="bereichId"
          name="bereichId"
          class="form-select {form?.fehler?.bereichId ? 'is-invalid' : ''}"
          bind:value={bereichId}>
          {#each data.bereiche as b}
            <option value={b._id}>{b.icon} {b.name}</option>
          {/each}
        </select>
        {#if form?.fehler?.bereichId}
          <div class="invalid-feedback">{form.fehler.bereichId}</div>
        {/if}
      </div>

      <!-- Titel -->
      <div class="mb-3">
        <label for="titel" class="form-label fw-medium small">Aktivität / Titel *</label>
        <input
          id="titel"
          name="titel"
          type="text"
          class="form-control {form?.fehler?.titel ? 'is-invalid' : ''}"
          placeholder="z.B. Laufen, React Kurs, Bewerbung…"
          value={form?.werte?.titel ?? ''} />
        {#if form?.fehler?.titel}
          <div class="invalid-feedback">{form.fehler.titel}</div>
        {/if}
      </div>

      <!-- DYNAMISCHES FELD je nach zielTyp -->
      {#if gewaehltBereich?.zielTyp === 'wert'}
        <!-- Eigener Wert (z.B. km, Seiten) -->
        <div class="mb-3">
          <label for="wert" class="form-label fw-medium small">
            {gewaehltBereich.zielEinheit || 'Wert'} <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input
              id="wert"
              name="wert"
              type="number"
              step="0.1"
              min="0"
              class="form-control {form?.fehler?.wert ? 'is-invalid' : ''}"
              placeholder="z.B. 5"
              value={form?.werte?.wert ?? ''} />
            <span class="input-group-text">{gewaehltBereich.zielEinheit || 'Einheit'}</span>
          </div>
          {#if form?.fehler?.wert}
            <div class="text-danger small mt-1">{form.fehler.wert}</div>
          {/if}
        </div>

      {:else if gewaehltBereich?.zielTyp === 'minuten'}
        <!-- Dauer prominent als Pflichtfeld -->
        <div class="mb-3">
          <label for="dauer" class="form-label fw-medium small">
            Dauer <span class="text-danger">*</span>
          </label>
          <div class="input-group">
            <input
              id="dauer"
              name="dauer"
              type="number"
              class="form-control {form?.fehler?.dauer ? 'is-invalid' : ''}"
              placeholder="z.B. 45"
              min="1"
              value={form?.werte?.dauer ?? ''} />
            <span class="input-group-text">Minuten</span>
          </div>
          {#if form?.fehler?.dauer}
            <div class="text-danger small mt-1">{form.fehler.dauer}</div>
          {/if}
        </div>
      {/if}

      <!-- Datum -->
      <div class="mb-3">
        <label for="datum" class="form-label fw-medium small">Datum</label>
        <input
          id="datum"
          name="datum"
          type="date"
          class="form-control"
          value={form?.werte?.datum ?? heute} />
      </div>

      <!-- Optionale Dauer wenn nicht schon oben gezeigt -->
      {#if gewaehltBereich?.zielTyp !== 'minuten'}
        <div class="mb-3">
          <label for="dauer-opt" class="form-label fw-medium small">
            Dauer (Min.) <span class="text-muted small">— optional</span>
          </label>
          <input
            id="dauer-opt"
            name="dauer"
            type="number"
            class="form-control"
            placeholder="z.B. 45"
            min="1"
            value={form?.werte?.dauer ?? ''} />
        </div>
      {/if}

      <!-- Notizen -->
      <div class="mb-3">
        <label for="notizen" class="form-label fw-medium small">Notizen (optional)</label>
        <textarea
          id="notizen"
          name="notizen"
          class="form-control"
          rows="3"
          placeholder="Was hast du gemacht? Was lief gut?"
        >{form?.werte?.notizen ?? ''}</textarea>
      </div>

      <!-- Info-Hinweis je nach Zieltyp -->
      {#if gewaehltBereich?.zielAnzahl}
        <div class="alert alert-light py-2 mb-3 small border">
          <i class="bi bi-info-circle me-1"></i>
          {#if gewaehltBereich.zielTyp === 'eintraege'}
            Dieser Eintrag zählt als <strong>1 von {gewaehltBereich.zielAnzahl}</strong>
            {gewaehltBereich.zielEinheit || 'Einträgen'} / {gewaehltBereich.zielZeitraum === 'monat' ? 'Monat' : 'Woche'}.
          {:else if gewaehltBereich.zielTyp === 'minuten'}
            Die Minuten werden zum Ziel von <strong>{gewaehltBereich.zielAnzahl} Min.</strong>
            / {gewaehltBereich.zielZeitraum === 'monat' ? 'Monat' : 'Woche'} addiert.
          {:else if gewaehltBereich.zielTyp === 'wert'}
            Der Wert wird zum Ziel von <strong>{gewaehltBereich.zielAnzahl} {gewaehltBereich.zielEinheit}</strong>
            / {gewaehltBereich.zielZeitraum === 'monat' ? 'Monat' : 'Woche'} addiert.
          {/if}
        </div>
      {/if}

      <div class="d-flex gap-2 justify-content-end">
        <a href="/dashboard" class="btn btn-outline-secondary">Abbrechen</a>
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-check-lg me-1"></i> Eintrag speichern
        </button>
      </div>

    </form>
  </div>
</div>
