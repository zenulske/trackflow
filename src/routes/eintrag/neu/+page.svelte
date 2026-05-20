<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  const heute = new Date().toISOString().split('T')[0];
</script>

<svelte:head><title>Eintrag hinzufügen – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="fw-bold mb-0">Eintrag hinzufügen</h1>
  <a href="/dashboard" class="btn btn-outline-secondary btn-sm">
    <i class="bi bi-arrow-left me-1"></i> Zurück
  </a>
</div>

{#if form?.fehler && !form?.fehler?.titel && !form?.fehler?.bereichId}
  <div class="alert alert-danger py-2 mb-3">Bitte alle Pflichtfelder ausfüllen.</div>
{/if}

<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    <form method="POST" use:enhance>

      <div class="mb-3">
        <label for="bereichId" class="form-label fw-medium small">Bereich *</label>
        <select id="bereichId" name="bereichId"
                class="form-select {form?.fehler?.bereichId ? 'is-invalid' : ''}">
          <option value="" disabled selected>Bereich wählen…</option>
          {#each data.bereiche as b}
            <option value={b._id} selected={form?.werte?.bereichId === b._id}>
              {b.icon} {b.name}
            </option>
          {/each}
        </select>
        {#if form?.fehler?.bereichId}<div class="invalid-feedback">{form.fehler.bereichId}</div>{/if}
      </div>

      <div class="mb-3">
        <label for="titel" class="form-label fw-medium small">Aktivität / Titel *</label>
        <input id="titel" name="titel" type="text"
               class="form-control {form?.fehler?.titel ? 'is-invalid' : ''}"
               placeholder="z.B. Laufen, React Kurs, Bewerbung…"
               value={form?.werte?.titel ?? ''} />
        {#if form?.fehler?.titel}<div class="invalid-feedback">{form.fehler.titel}</div>{/if}
      </div>

      <div class="row g-3 mb-3">
        <div class="col">
          <label for="datum" class="form-label fw-medium small">Datum</label>
          <input id="datum" name="datum" type="date" class="form-control"
                 value={form?.werte?.datum ?? heute} />
        </div>
        <div class="col">
          <label for="dauer" class="form-label fw-medium small">Dauer (Minuten)</label>
          <input id="dauer" name="dauer" type="number" class="form-control"
                 placeholder="60" min="1" value={form?.werte?.dauer ?? ''} />
        </div>
      </div>

      <div class="mb-4">
        <label for="notizen" class="form-label fw-medium small">Notizen (optional)</label>
        <textarea id="notizen" name="notizen" class="form-control" rows="3"
                  placeholder="Was hast du gemacht? Was lief gut?">{form?.werte?.notizen ?? ''}</textarea>
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
