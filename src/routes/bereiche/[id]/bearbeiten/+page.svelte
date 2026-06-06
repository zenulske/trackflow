<script>
  import { enhance } from "$app/forms";
  let { data, form } = $props();

  const icons = [
    "🏃",
    "📚",
    "💼",
    "🎯",
    "💡",
    "🎨",
    "🌱",
    "💪",
    "🧠",
    "📊",
    "🎵",
    "✈️",
    "🍎",
    "💰",
    "🤝",
    "🔬",
    "🏋️",
    "📝",
    "🌍",
    "⚽",
  ];
  const farben = [
    { farbe: "#C75228", hell: "#FAECE7" },
    { farbe: "#2272C0", hell: "#E6F1FB" },
    { farbe: "#0F8A62", hell: "#E1F5EE" },
    { farbe: "#7B4FBF", hell: "#EDE8FB" },
    { farbe: "#B5410A", hell: "#FDE8D8" },
    { farbe: "#1A7FA8", hell: "#DBF0F9" },
    { farbe: "#7A6A00", hell: "#FBF5CC" },
    { farbe: "#A0296B", hell: "#F9E0EE" },
  ];

  let name = $state(data.bereich.name);
  let icon = $state(data.bereich.icon || "🎯");
  let farbe = $state(data.bereich.farbe || "#C75228");
  let farbeHell = $state(data.bereich.farbeHell || "#FAECE7");
  let zielAnzahl = $state(data.bereich.zielAnzahl || "");
  let zielZeitraum = $state(data.bereich.zielZeitraum || "woche");
  let zielTyp = $state(data.bereich.zielTyp || "eintraege");
  let zielEinheit = $state(data.bereich.zielEinheit || "");

  function waehlefarbe(f) {
    farbe = f.farbe;
    farbeHell = f.hell;
  }
  let platzhalterEinheit = $derived(
    zielTyp === "minuten" ? "Min." : "Einträge",
  );
</script>

<svelte:head
  ><title>{data.bereich.name} bearbeiten – TrackFlow</title></svelte:head
>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="fw-bold mb-0">Bereich bearbeiten</h1>
  <a
    href="/bereiche/{data.bereich._id}"
    class="btn btn-outline-secondary btn-sm"
  >
    <i class="bi bi-arrow-left me-1"></i> Zurück
  </a>
</div>

<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    {#if form?.fehler}
      <div class="alert alert-danger py-2 mb-3">{form.fehler}</div>
    {/if}

    <form method="POST" use:enhance>
      <input type="hidden" name="farbe" value={farbe} />
      <input type="hidden" name="farbeHell" value={farbeHell} />
      <input type="hidden" name="icon" value={icon} />
      <input type="hidden" name="zielTyp" value={zielTyp} />

      <div class="mb-3">
        <label for="name" class="form-label fw-medium small">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          class="form-control"
          bind:value={name}
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label fw-medium small d-block">Icon</label>
        <div class="d-flex flex-wrap gap-1">
          {#each icons as ic}
            <button
              type="button"
              onclick={() => (icon = ic)}
              class="btn btn-sm p-1 d-flex align-items-center justify-content-center"
              style="width:38px;height:38px;font-size:18px;{ic === icon
                ? 'border:2px solid #212529;background:#f1f3f5;'
                : 'border:1px solid #dee2e6;'}"
            >
              {ic}
            </button>
          {/each}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-medium small d-block">Farbe</label>
        <div class="d-flex flex-wrap gap-2">
          {#each farben as f}
            <button
              type="button"
              onclick={() => waehlefarbe(f)}
              class="rounded-circle border-0"
              style="width:38px;height:38px;background:{f.farbe};outline:{f.farbe ===
              farbe
                ? '3px solid #212529'
                : 'none'};outline-offset:2px;cursor:pointer;"
            >
            </button>
          {/each}
        </div>
      </div>

      <!-- Vorschau -->
      <div
        class="rounded-3 p-3 d-flex align-items-center gap-3 mb-4"
        style="background:{farbeHell};border:1px solid {farbe}33;"
      >
        <span style="font-size:24px;">{icon}</span>
        <span class="fw-semibold" style="color:{farbe};"
          >{name || "Bereich"}</span
        >
      </div>

      <!-- Ziel -->
      <div class="border rounded-3 p-3 mb-4">
        <label class="form-label fw-medium small mb-3">Ziel</label>
        <div class="mb-3">
          <label class="form-label small text-muted">Was wird gemessen?</label>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-sm flex-fill {zielTyp === 'eintraege'
                ? 'btn-dark'
                : 'btn-outline-secondary'}"
              onclick={() => (zielTyp = "eintraege")}
            >
              <i class="bi bi-list-check me-1"></i> Einträge zählen
            </button>
            <button
              type="button"
              class="btn btn-sm flex-fill {zielTyp === 'minuten'
                ? 'btn-dark'
                : 'btn-outline-secondary'}"
              onclick={() => (zielTyp = "minuten")}
            >
              <i class="bi bi-stopwatch me-1"></i> Minuten addieren
            </button>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col">
            <label class="form-label small text-muted">Zielwert</label>
            <div class="input-group">
              <input
                type="number"
                name="zielAnzahl"
                class="form-control"
                bind:value={zielAnzahl}
                placeholder={zielTyp === "minuten" ? "120" : "5"}
                min="1"
              />
              <span class="input-group-text text-muted small"
                >{platzhalterEinheit}</span
              >
            </div>
          </div>
          <div class="col">
            <label class="form-label small text-muted">Zeitraum</label>
            <select
              name="zielZeitraum"
              class="form-select"
              bind:value={zielZeitraum}
            >
              <option value="woche">pro Woche</option>
              <option value="monat">pro Monat</option>
            </select>
          </div>
        </div>

        <div>
          <label class="form-label small text-muted"
            >Eigene Einheit (optional, z.B. "km", "Seiten")</label
          >
          <input
            type="text"
            name="zielEinheit"
            class="form-control form-control-sm"
            bind:value={zielEinheit}
            placeholder={platzhalterEinheit}
          />
        </div>

        {#if zielAnzahl}
          <div class="mt-3 p-2 rounded bg-light text-muted small text-center">
            Ziel: <strong
              >{zielAnzahl} {zielEinheit || platzhalterEinheit}</strong
            >
            pro {zielZeitraum === "monat" ? "Monat" : "Woche"}
          </div>
        {/if}
      </div>

      <div class="d-flex gap-2 justify-content-end">
        <a href="/bereiche/{data.bereich._id}" class="btn btn-outline-secondary"
          >Abbrechen</a
        >
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-check-lg me-1"></i> Änderungen speichern
        </button>
      </div>
    </form>
  </div>
</div>
