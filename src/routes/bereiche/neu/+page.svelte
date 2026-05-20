<script>
  import { goto } from '$app/navigation';

  const icons  = ['🏃','📚','💼','🎯','💡','🎨','🌱','💪','🧠','📊','🎵','✈️','🍎','💰','🤝','🔬','🏋️','📝','🌍','⚽'];
  const farben = [
    {farbe:'#C75228',hell:'#FAECE7'},{farbe:'#2272C0',hell:'#E6F1FB'},
    {farbe:'#0F8A62',hell:'#E1F5EE'},{farbe:'#7B4FBF',hell:'#EDE8FB'},
    {farbe:'#B5410A',hell:'#FDE8D8'},{farbe:'#1A7FA8',hell:'#DBF0F9'},
    {farbe:'#7A6A00',hell:'#FBF5CC'},{farbe:'#A0296B',hell:'#F9E0EE'},
  ];

  let name = '', icon = icons[0], gewaehlt = farben[0], ziel = '';
  let laden = false, fehler = '';

  async function speichern() {
    fehler = '';
    if (!name.trim()) { fehler = 'Name ist erforderlich.'; return; }
    laden = true;
    const res = await fetch('/api/bereiche', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, icon, farbe: gewaehlt.farbe, farbeHell: gewaehlt.hell, ziel })
    });
    laden = false;
    if (res.ok) goto('/dashboard');
    else fehler = 'Fehler beim Speichern. Bitte erneut versuchen.';
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
             placeholder="z.B. Sprachen, Finanzen, Kreativität…" />
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
          <button type="button" onclick={() => gewaehlt = f}
                  class="rounded-circle border-0"
                  style="width:38px;height:38px;background:{f.farbe};outline:{f.farbe === gewaehlt.farbe ? '3px solid #212529' : 'none'};outline-offset:2px;cursor:pointer;">
          </button>
        {/each}
      </div>
    </div>

    <!-- Vorschau -->
    <div class="rounded-3 p-3 d-flex align-items-center gap-3 mb-3"
         style="background:{gewaehlt.hell};border:1px solid {gewaehlt.farbe}33;">
      <span style="font-size:24px;">{icon}</span>
      <span class="fw-semibold" style="color:{gewaehlt.farbe};">{name || 'Neuer Bereich'}</span>
    </div>

    <div class="mb-4">
      <label for="ziel" class="form-label fw-medium small">Ziel (optional)</label>
      <input id="ziel" type="text" class="form-control" bind:value={ziel}
             placeholder="z.B. 5 Einheiten / Woche" />
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
