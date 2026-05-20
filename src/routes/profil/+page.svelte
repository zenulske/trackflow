<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
</script>

<svelte:head><title>Profil – TrackFlow</title></svelte:head>

<div class="mb-4">
  <h1 class="fw-bold mb-1">Mein Profil</h1>
  <p class="text-muted">Persönliche Daten und Passwort verwalten</p>
</div>

<!-- Profil-Infos -->
<div class="card border-0 shadow-sm mb-4" style="max-width:520px;">
  <div class="card-body p-4">
    <h5 class="fw-semibold mb-4">Persönliche Daten</h5>

    {#if form?.aktion === 'profil' && form?.erfolg}
      <div class="alert alert-success py-2">{form.erfolg}</div>
    {/if}

    <form method="POST" action="?/updateProfil" use:enhance>
      <div class="mb-3">
        <label for="name" class="form-label fw-medium small">Name</label>
        <input id="name" name="name" type="text"
               class="form-control {form?.aktion === 'profil' && form?.fehler?.name ? 'is-invalid' : ''}"
               value={form?.aktion === 'profil' ? (form?.werte?.name ?? data.user.name) : data.user.name} />
        {#if form?.aktion === 'profil' && form?.fehler?.name}
          <div class="invalid-feedback">{form.fehler.name}</div>
        {/if}
      </div>

      <div class="mb-4">
        <label for="email" class="form-label fw-medium small">E-Mail</label>
        <input id="email" name="email" type="email"
               class="form-control {form?.aktion === 'profil' && form?.fehler?.email ? 'is-invalid' : ''}"
               value={form?.aktion === 'profil' ? (form?.werte?.email ?? data.user.email) : data.user.email} />
        {#if form?.aktion === 'profil' && form?.fehler?.email}
          <div class="invalid-feedback">{form.fehler.email}</div>
        {/if}
      </div>

      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-check-lg me-1"></i> Änderungen speichern
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Passwort ändern -->
<div class="card border-0 shadow-sm" style="max-width:520px;">
  <div class="card-body p-4">
    <h5 class="fw-semibold mb-4">Passwort ändern</h5>

    {#if form?.aktion === 'passwort' && form?.erfolg}
      <div class="alert alert-success py-2">{form.erfolg}</div>
    {/if}

    <form method="POST" action="?/updatePasswort" use:enhance>
      <div class="mb-3">
        <label for="aktuell" class="form-label fw-medium small">Aktuelles Passwort</label>
        <input id="aktuell" name="aktuell" type="password"
               class="form-control {form?.aktion === 'passwort' && form?.fehler?.aktuell ? 'is-invalid' : ''}"
               placeholder="••••••••" />
        {#if form?.aktion === 'passwort' && form?.fehler?.aktuell}
          <div class="invalid-feedback">{form.fehler.aktuell}</div>
        {/if}
      </div>

      <div class="mb-3">
        <label for="neu" class="form-label fw-medium small">Neues Passwort</label>
        <input id="neu" name="neu" type="password"
               class="form-control {form?.aktion === 'passwort' && form?.fehler?.neu ? 'is-invalid' : ''}"
               placeholder="Mind. 8 Zeichen" />
        {#if form?.aktion === 'passwort' && form?.fehler?.neu}
          <div class="invalid-feedback">{form.fehler.neu}</div>
        {/if}
      </div>

      <div class="mb-4">
        <label for="bestaetigung" class="form-label fw-medium small">Passwort bestätigen</label>
        <input id="bestaetigung" name="bestaetigung" type="password"
               class="form-control {form?.aktion === 'passwort' && form?.fehler?.bestaetigung ? 'is-invalid' : ''}"
               placeholder="Passwort wiederholen" />
        {#if form?.aktion === 'passwort' && form?.fehler?.bestaetigung}
          <div class="invalid-feedback">{form.fehler.bestaetigung}</div>
        {/if}
      </div>

      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-dark">
          <i class="bi bi-lock me-1"></i> Passwort ändern
        </button>
      </div>
    </form>
  </div>
</div>
