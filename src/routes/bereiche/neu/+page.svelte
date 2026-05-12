<script>
  import { goto } from '$app/navigation';

  const icons  = ['🏃','📚','💼','🎯','💡','🎨','🌱','💪','🧠','📊','🎵','✈️','🍎','💰','🤝','🔬'];
  const farben = [
    { farbe:'#C75228', hell:'#FAECE7' }, { farbe:'#2272C0', hell:'#E6F1FB' },
    { farbe:'#0F8A62', hell:'#E1F5EE' }, { farbe:'#7B4FBF', hell:'#EDE8FB' },
    { farbe:'#B5410A', hell:'#FDE8D8' }, { farbe:'#1A7FA8', hell:'#DBF0F9' },
    { farbe:'#7A6A00', hell:'#FBF5CC' }, { farbe:'#A0296B', hell:'#F9E0EE' },
  ];

  let name = '', icon = icons[0], gewaehlteFarbe = farben[0], ziel = '';
  let laden = false, fehler = '';

  async function speichern() {
    fehler = '';
    if (!name.trim()) { fehler = 'Name ist erforderlich.'; return; }
    laden = true;
    const res = await fetch('/api/bereiche', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, icon, farbe: gewaehlteFarbe.farbe, farbeHell: gewaehlteFarbe.hell, ziel })
    });
    laden = false;
    if (res.ok) goto('/dashboard');
    else fehler = 'Fehler beim Speichern. Bitte erneut versuchen.';
  }
</script>

<svelte:head><title>Neuer Bereich – TrackFlow</title></svelte:head>

<div class="header">
  <h1>Neuen Bereich erstellen</h1>
  <a href="/dashboard" class="btn-back">← Zurück</a>
</div>

<div class="card">
  {#if fehler}<div class="fehler-banner">{fehler}</div>{/if}

  <div class="form-group">
    <label>Name *</label>
    <input type="text" bind:value={name} placeholder="z.B. Sprachen, Finanzen, Kreativität…" />
  </div>

  <div class="form-group">
    <label>Icon</label>
    <div class="icon-grid">
      {#each icons as ic}
        <button type="button" class="icon-btn" class:sel={ic === icon} on:click={() => icon = ic}>{ic}</button>
      {/each}
    </div>
  </div>

  <div class="form-group">
    <label>Farbe</label>
    <div class="farb-grid">
      {#each farben as f}
        <button type="button" class="farb-btn" class:sel={f.farbe === gewaehlteFarbe.farbe}
                style="background:{f.farbe}" on:click={() => gewaehlteFarbe = f}></button>
      {/each}
    </div>
  </div>

  <div class="vorschau" style="background:{gewaehlteFarbe.hell}; border-color:{gewaehlteFarbe.farbe}44">
    <span class="vorschau-icon">{icon}</span>
    <span class="vorschau-name" style="color:{gewaehlteFarbe.farbe}">{name || 'Neuer Bereich'}</span>
  </div>

  <div class="form-group">
    <label>Ziel (optional)</label>
    <input type="text" bind:value={ziel} placeholder="z.B. 5 Einheiten / Woche" />
  </div>

  <div class="form-actions">
    <a href="/dashboard" class="btn-sec">Abbrechen</a>
    <button class="btn-primary" on:click={speichern} disabled={laden}>
      {laden ? 'Wird gespeichert…' : 'Bereich erstellen'}
    </button>
  </div>
</div>

<style>
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
  h1 { font-size:26px; font-weight:600; letter-spacing:-0.5px; }
  .btn-back { color:#6A6860; text-decoration:none; font-size:13px; }
  .card { background:white; border:0.5px solid rgba(0,0,0,0.07); border-radius:12px; padding:32px 36px; max-width:520px; }
  .fehler-banner { background:#FCEBEB; color:#791F1F; border:0.5px solid #F09595; border-radius:8px; padding:12px; margin-bottom:20px; font-size:14px; }
  .form-group { margin-bottom:18px; }
  label { display:block; font-size:11px; font-weight:600; color:#6A6860; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px; }
  input { width:100%; padding:10px 13px; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; font-family:inherit; font-size:14px; outline:none; }
  input:focus { border-color:rgba(0,0,0,0.4); }
  .icon-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:6px; }
  .icon-btn { width:38px; height:38px; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; background:none; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; }
  .icon-btn.sel { border:2px solid #1C1B18; background:#EEECEA; }
  .farb-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:8px; }
  .farb-btn { width:38px; height:38px; border-radius:50%; cursor:pointer; border:3px solid transparent; transition:transform 0.1s; }
  .farb-btn:hover, .farb-btn.sel { transform:scale(1.12); border-color:#1C1B18; }
  .vorschau { border-radius:10px; padding:14px 18px; display:flex; align-items:center; gap:12px; margin:4px 0 18px; border:0.5px solid; }
  .vorschau-icon { font-size:22px; }
  .vorschau-name { font-size:16px; font-weight:600; }
  .form-actions { display:flex; gap:10px; margin-top:8px; justify-content:flex-end; }
  .btn-primary { padding:10px 20px; background:#1C1B18; color:white; border:none; border-radius:8px; font-family:inherit; font-size:14px; font-weight:500; cursor:pointer; }
  .btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
  .btn-sec { padding:10px 20px; background:white; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; font-size:14px; font-weight:500; cursor:pointer; text-decoration:none; color:#1C1B18; }
</style>
