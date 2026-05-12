<script>
  import Benachrichtigung from '$lib/components/Benachrichtigung.svelte';
  import { enhance } from '$app/forms';
  let { data, form } = $props();


  const heute = new Date().toISOString().split('T')[0];
</script>

<svelte:head><title>Eintrag hinzufügen – TrackFlow</title></svelte:head>

<div class="header">
  <h1>Eintrag hinzufügen</h1>
  <a href="/dashboard" class="btn-back">← Zurück</a>
</div>

{#if form?.fehler}
  <Benachrichtigung typ="fehler" nachricht="Bitte alle Pflichtfelder ausfüllen." sichtbar={true} />
{/if}

<div class="card">
  <form method="POST" use:enhance>
    <div class="form-group">
      <label for="bereichId">Bereich *</label>
      <select id="bereichId" name="bereichId" value={form?.werte?.bereichId ?? ''}>
        <option value="" disabled>Bereich wählen…</option>
        {#each data.bereiche as bereich}
          <option value={bereich._id}>{bereich.icon} {bereich.name}</option>
        {/each}
      </select>
      {#if form?.fehler?.bereichId}<span class="fehler">{form.fehler.bereichId}</span>{/if}
    </div>

    <div class="form-group">
      <label for="titel">Aktivität / Titel *</label>
      <input id="titel" name="titel" type="text" placeholder="z.B. Laufen, React Kurs, Bewerbung…"
             value={form?.werte?.titel ?? ''} />
      {#if form?.fehler?.titel}<span class="fehler">{form.fehler.titel}</span>{/if}
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="datum">Datum</label>
        <input id="datum" name="datum" type="date" value={form?.werte?.datum ?? heute} />
      </div>
      <div class="form-group">
        <label for="dauer">Dauer (Minuten)</label>
        <input id="dauer" name="dauer" type="number" placeholder="60" min="1"
               value={form?.werte?.dauer ?? ''} />
      </div>
    </div>

    <div class="form-group">
      <label for="notizen">Notizen (optional)</label>
      <textarea id="notizen" name="notizen" placeholder="Was hast du gemacht? Was lief gut?"
                rows="3">{form?.werte?.notizen ?? ''}</textarea>
    </div>

    <div class="form-actions">
      <a href="/dashboard" class="btn-sec">Abbrechen</a>
      <button type="submit" class="btn-primary">Eintrag speichern</button>
    </div>
  </form>
</div>

<style>
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
  h1 { font-size:26px; font-weight:600; letter-spacing:-0.5px; }
  .btn-back { color:#6A6860; text-decoration:none; font-size:13px; }
  .card { background:white; border:0.5px solid rgba(0,0,0,0.07); border-radius:12px; padding:32px 36px; max-width:520px; }
  .form-group { margin-bottom:16px; }
  label { display:block; font-size:11px; font-weight:600; color:#6A6860; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:5px; }
  input, select, textarea {
    width:100%; padding:10px 13px; border:0.5px solid rgba(0,0,0,0.13);
    border-radius:8px; font-family:inherit; font-size:14px;
    color:#1C1B18; background:white; outline:none;
  }
  input:focus, select:focus, textarea:focus { border-color:rgba(0,0,0,0.4); }
  textarea { resize:vertical; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .fehler { font-size:12px; color:#A32D2D; margin-top:4px; display:block; }
  .form-actions { display:flex; gap:10px; margin-top:8px; justify-content:flex-end; }
  .btn-primary { padding:10px 20px; background:#1C1B18; color:white; border:none; border-radius:8px; font-family:inherit; font-size:14px; font-weight:500; cursor:pointer; }
  .btn-sec { padding:10px 20px; background:white; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; font-size:14px; font-weight:500; cursor:pointer; text-decoration:none; color:#1C1B18; }
</style>
