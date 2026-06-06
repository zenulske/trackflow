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
  let zielEinheit = $state(data.bereich.zielEinheit || "Einträge");
  let lokalerFehler = $state("");

  function waehlefarbe(f) {
    farbe = f.farbe;
    farbeHell = f.hell;
  }

  function setzeTyp(typ) {
    zielTyp = typ;
    if (typ === "eintraege") zielEinheit = "Einträge";
    else if (typ === "minuten")
      zielEinheit = zielEinheit === "Std." ? "Std." : "Min.";
    else if (typ === "wert") {
      if (
        zielEinheit === "Einträge" ||
        zielEinheit === "Min." ||
        zielEinheit === "Std."
      ) {
        zielEinheit = "";
      }
    }
  }

  function vorSubmit({ formData, cancel }) {
    lokalerFehler = "";

    // Plan A: Validierung
    if ((zielTyp === "wert" || zielTyp === "minuten") && !zielAnzahl) {
      lokalerFehler =
        'Bitte einen Zielwert eingeben — oder wähle "Einträge" wenn du kein Ziel setzen möchtest.';
      cancel();
      return;
    }
    if (zielTyp === "wert" && !zielEinheit.trim()) {
      lokalerFehler =
        'Bei "Eigener Wert" musst du eine Einheit angeben (z.B. km, Seiten).';
      cancel();
      return;
    }

    // Alle Werte explizit setzen (Svelte 5 Workaround)
    formData.set("name", name);
    formData.set("icon", icon);
    formData.set("farbe", farbe);
    formData.set("farbeHell", farbeHell);
    formData.set("zielAnzahl", zielAnzahl);
    formData.set("zielZeitraum", zielZeitraum);
    formData.set("zielTyp", zielTyp);
    formData.set("zielEinheit", zielEinheit);
  }
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
    {#if lokalerFehler}<div class="alert alert-danger py-2 mb-3">
        {lokalerFehler}
      </div>{/if}
    {#if form?.fehler}<div class="alert alert-danger py-2 mb-3">
        {form.fehler}
      </div>{/if}

    <form method="POST" use:enhance={vorSubmit}>
      <div class="mb-3">
        <label for="name" class="form-label fw-medium small">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          class="form-control"
          value={name}
          oninput={(e) => (name = e.currentTarget.value)}
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

      <div
        class="rounded-3 p-3 d-flex align-items-center gap-3 mb-4"
        style="background:{farbeHell};border:1px solid {farbe}33;"
      >
        <span style="font-size:24px;">{icon}</span>
        <span class="fw-semibold" style="color:{farbe};"
          >{name || "Bereich"}</span
        >
      </div>

      <div class="border rounded-3 p-3 mb-4">
        <label class="form-label fw-medium small mb-3">
          Ziel
          {#if zielTyp === "eintraege"}
            <span class="text-muted">(optional)</span>
          {:else}
            <span class="text-danger">*</span>
          {/if}
        </label>

        <div class="mb-3">
          <label class="form-label small text-muted">Was wird gemessen?</label>
          <div class="d-flex gap-2 flex-wrap">
            <button
              type="button"
              class="btn btn-sm flex-fill {zielTyp === 'eintraege'
                ? 'btn-dark'
                : 'btn-outline-secondary'}"
              onclick={() => setzeTyp("eintraege")}
            >
              <i class="bi bi-list-check me-1"></i> Einträge
            </button>
            <button
              type="button"
              class="btn btn-sm flex-fill {zielTyp === 'minuten'
                ? 'btn-dark'
                : 'btn-outline-secondary'}"
              onclick={() => setzeTyp("minuten")}
            >
              <i class="bi bi-stopwatch me-1"></i> Zeit
            </button>
            <button
              type="button"
              class="btn btn-sm flex-fill {zielTyp === 'wert'
                ? 'btn-dark'
                : 'btn-outline-secondary'}"
              onclick={() => setzeTyp("wert")}
            >
              <i class="bi bi-123 me-1"></i> Eigener Wert
            </button>
          </div>
        </div>

        <div class="row g-2 mb-3">
          <div class="col">
            <label class="form-label small text-muted">
              Zielwert
              {#if zielTyp !== "eintraege"}<span class="text-danger">*</span
                >{/if}
            </label>
            <input
              type="number"
              class="form-control"
              value={zielAnzahl}
              oninput={(e) => (zielAnzahl = e.currentTarget.value)}
              placeholder={zielTyp === "minuten"
                ? "120"
                : zielTyp === "wert"
                  ? "30"
                  : "5"}
              min="1"
            />
          </div>
          <div class="col">
            <label class="form-label small text-muted">
              Einheit
              {#if zielTyp === "wert"}<span class="text-danger">*</span>{/if}
            </label>

            {#if zielTyp === "eintraege"}
              <input
                type="text"
                class="form-control bg-light"
                value="Einträge"
                disabled
              />
            {:else if zielTyp === "minuten"}
              <select
                class="form-select"
                value={zielEinheit}
                onchange={(e) => (zielEinheit = e.currentTarget.value)}
              >
                <option value="Min.">Minuten</option>
                <option value="Std.">Stunden</option>
              </select>
            {:else if zielTyp === "wert"}
              <input
                type="text"
                class="form-control"
                value={zielEinheit}
                oninput={(e) => (zielEinheit = e.currentTarget.value)}
                placeholder="z.B. km, Seiten"
              />
            {/if}
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label small text-muted">Zeitraum</label>
          <select
            class="form-select"
            value={zielZeitraum}
            onchange={(e) => (zielZeitraum = e.currentTarget.value)}
          >
            <option value="woche">pro Woche</option>
            <option value="monat">pro Monat</option>
          </select>
        </div>

        {#if zielAnzahl}
          <div class="mt-3 p-2 rounded bg-light text-muted small text-center">
            Ziel: <strong>{zielAnzahl} {zielEinheit || "?"}</strong>
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
