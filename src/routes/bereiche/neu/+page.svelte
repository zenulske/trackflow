<script>
  import { goto } from '$app/navigation';

  const icons  = ['🏃','📚','💼','🎯','💡','🎨','🌱','💪','🧠','📊','🎵','✈️','🍎','💰','🤝','🔬','🏋️','📝','🌍','⚽'];
  const farben = [
    {farbe:'#C75228',hell:'#FAECE7'},{farbe:'#2272C0',hell:'#E6F1FB'},
    {farbe:'#0F8A62',hell:'#E1F5EE'},{farbe:'#7B4FBF',hell:'#EDE8FB'},
    {farbe:'#B5410A',hell:'#FDE8D8'},{farbe:'#1A7FA8',hell:'#DBF0F9'},
    {farbe:'#7A6A00',hell:'#FBF5CC'},{farbe:'#A0296B',hell:'#F9E0EE'},
  ];

  let name         = $state('');
  let icon         = $state(icons[0]);
  let gewaehlt     = $state(farben[0]);
  let zielAnzahl   = $state('');
  let zielZeitraum = $state('woche');
  let zielTyp      = $state('eintraege');
  let zielEinheit  = $state('Einträge');  // wird automatisch je nach Typ angepasst
  let laden        = $state(false);
  let fehler       = $state('');

  // Beim Typ-Wechsel: Einheit auf sinnvollen Default setzen
  function setzeTyp(typ) {
    zielTyp = typ;
    if (typ === 'eintraege')      zielEinheit = 'Einträge';
    else if (typ === 'minuten')   zielEinheit = 'Min.';
    else if (typ === 'wert')      zielEinheit = '';  // User muss selbst eingeben
  }

  async function speichern() {
    fehler = '';
    if (!name.trim()) { fehler = 'Name ist erforderlich.'; return; }
    if (zielTyp === 'wert' && zielAnzahl && !zielEinheit.trim()) {
      fehler = 'Bei "Eigener Wert" musst du eine Einheit angeben (z.B. km, Seiten).';
      return;
    }

    laden = true;
    const res = await fetch('/api/bereiche', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, icon,
        farbe:        gewaehlt.farbe,
        farbeHell:    gewaehlt.hell,
        zielAnzahl:   zielAnzahl ? parseInt(zielAnzahl) : null,
        zielZeitraum,
        zielTyp,
        zielEinheit:  zielEinheit.trim() || 'Einträge'
      })
    });
    laden = false;
    if (res.ok) goto('/dashboard');
    else fehler = 'Fehler beim Speichern.';
  }
</script>

<svelte:head><title>Neuer Bereich – TrackFlow</title></svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="fw-bold mb-0">Neuen Bereich erstellen</h1>
  <a href="/dashboard" class="btn btn-outline-secondary btn-sm">
    <i class="bi bi-arrow-left me-1"></i> Zurück
  </a>
</div>

<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    {#if fehler}<div class="alert alert-danger py-2 mb-3">{fehler}</div>{/if}

    <div class="mb-3">
      <label for="name" class="form-label fw-medium small">Name *</label>
      <input id="name" type="text" class="form-control" bind:value={name}
             placeholder="z.B. Sport, Lernen, Karriere…" />
    </div>

    <div class="mb-3">
      <label class="form-label fw-medium small d-block">Icon</label>
      <div class="d-flex flex-wrap gap-1">
        {#each icons as ic}
          <button type="button" onclick={() => icon = ic}
                  class="btn btn-sm p-1 d-flex align-items-center justify-content-center"
                  style="width:38px;height:38px;font-size:18px;{ic === icon ? 'border:2px solid #212529;background:#f1f3f5;' : 'border:1px solid #dee2e6;'}">
            {ic}
          </button>
        {/each}
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label fw-medium small d-block">Farbe</label>
      <div class="d-flex flex-wrap gap-2">
        {#each farben as f}
          <button type="button" onclick={() => gewaehlt = f} class="rounded-circle border-0"
                  style="width:38px;height:38px;background:{f.farbe};outline:{f.farbe === gewaehlt.farbe ? '3px solid #212529' : 'none'};outline-offset:2px;cursor:pointer;">
          </button>
        {/each}
      </div>
    </div>

    <div class="rounded-3 p-3 d-flex align-items-center gap-3 mb-4"
         style="background:{gewaehlt.hell};border:1px solid {gewaehlt.farbe}33;">
      <span style="font-size:24px;">{icon}</span>
      <span class="fw-semibold" style="color:{gewaehlt.farbe};">{name || 'Neuer Bereich'}</span>
    </div>

    <div class="border rounded-3 p-3 mb-4">
      <label class="form-label fw-medium small mb-3">Ziel (optional)</label>

      <!-- Typ -->
      <div class="mb-3">
        <label class="form-label small text-muted">Was wird gemessen?</label>
        <div class="d-flex gap-2 flex-wrap">
          <button type="button"
                  class="btn btn-sm flex-fill {zielTyp === 'eintraege' ? 'btn-dark' : 'btn-outline-secondary'}"
                  onclick={() => setzeTyp('eintraege')}>
            <i class="bi bi-list-check me-1"></i> Einträge
          </button>
          <button type="button"
                  class="btn btn-sm flex-fill {zielTyp === 'minuten' ? 'btn-dark' : 'btn-outline-secondary'}"
                  onclick={() => setzeTyp('minuten')}>
            <i class="bi bi-stopwatch me-1"></i> Zeit
          </button>
          <button type="button"
                  class="btn btn-sm flex-fill {zielTyp === 'wert' ? 'btn-dark' : 'btn-outline-secondary'}"
                  onclick={() => setzeTyp('wert')}>
            <i class="bi bi-123 me-1"></i> Eigener Wert
          </button>
        </div>
      </div>

      <!-- Zielwert + Einheit -->
      <div class="row g-2 mb-3">
        <div class="col">
          <label class="form-label small text-muted">Zielwert</label>
          <input type="number" class="form-control" bind:value={zielAnzahl}
                 placeholder={zielTyp === 'minuten' ? '120' : zielTyp === 'wert' ? '30' : '5'} min="1" />
        </div>

        <div class="col">
          <label class="form-label small text-muted">Einheit</label>

          {#if zielTyp === 'eintraege'}
            <!-- Fix: einfach Einträge, kein Eingabefeld -->
            <input type="text" class="form-control bg-light" value="Einträge" disabled />

          {:else if zielTyp === 'minuten'}
            <!-- Dropdown: Min. oder Std. -->
            <select class="form-select" bind:value={zielEinheit}>
              <option value="Min.">Minuten</option>
              <option value="Std.">Stunden</option>
            </select>

          {:else if zielTyp === 'wert'}
            <!-- Freier Text -->
            <input type="text" class="form-control" bind:value={zielEinheit}
                   placeholder="z.B. km, Seiten" />
          {/if}
        </div>
      </div>

      <!-- Zeitraum -->
      <div class="mb-2">
        <label class="form-label small text-muted">Zeitraum</label>
        <select class="form-select" bind:value={zielZeitraum}>
          <option value="woche">pro Woche</option>
          <option value="monat">pro Monat</option>
        </select>
      </div>

      {#if zielAnzahl}
        <div class="mt-3 p-2 rounded bg-light text-muted small text-center">
          Ziel: <strong>{zielAnzahl} {zielEinheit || '?'}</strong> pro {zielZeitraum === 'monat' ? 'Monat' : 'Woche'}
        </div>
      {/if}
    </div>

    <div class="d-flex gap-2 justify-content-end">
      <a href="/dashboard" class="btn btn-outline-secondary">Abbrechen</a>
      <button class="btn btn-dark" onclick={speichern} disabled={laden}>
        {#if laden}<span class="spinner-border spinner-border-sm me-2"></span>{/if}
        Bereich erstellen
      </button>
    </div>
  </div>
</div>
