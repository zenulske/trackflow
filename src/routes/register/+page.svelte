<script>
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<svelte:head><title>Registrieren – TrackFlow</title></svelte:head>

<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="card border-0 shadow-sm" style="width:420px;">
    <div class="card-body p-4 p-md-5">
      <div class="d-flex align-items-center gap-2 mb-4">
        <div class="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white"
             style="width:36px;height:36px;background:#212529;font-size:13px;">TF</div>
        <span class="fw-semibold fs-5">TrackFlow</span>
      </div>
      <h1 class="h4 fw-bold mb-1">Konto erstellen</h1>
      <p class="text-muted mb-4">Beginne heute, deinen Fortschritt zu tracken.</p>

      <form method="POST" use:enhance>
        <div class="mb-3">
          <label for="name" class="form-label fw-medium small">Name</label>
          <input id="name" name="name" type="text" class="form-control {form?.fehler?.name ? 'is-invalid' : ''}"
                 placeholder="Max Mustermann" value={form?.werte?.name ?? ''} required />
          {#if form?.fehler?.name}<div class="invalid-feedback">{form.fehler.name}</div>{/if}
        </div>
        <div class="mb-3">
          <label for="email" class="form-label fw-medium small">E-Mail</label>
          <input id="email" name="email" type="email" class="form-control {form?.fehler?.email ? 'is-invalid' : ''}"
                 placeholder="name@beispiel.ch" value={form?.werte?.email ?? ''} required />
          {#if form?.fehler?.email}<div class="invalid-feedback">{form.fehler.email}</div>{/if}
        </div>
        <div class="mb-4">
          <label for="passwort" class="form-label fw-medium small">Passwort</label>
          <input id="passwort" name="passwort" type="password" class="form-control {form?.fehler?.passwort ? 'is-invalid' : ''}"
                 placeholder="Mind. 8 Zeichen" required />
          {#if form?.fehler?.passwort}<div class="invalid-feedback">{form.fehler.passwort}</div>{/if}
        </div>
        <button type="submit" class="btn btn-dark w-100">Konto erstellen</button>
      </form>

      <p class="text-center text-muted small mt-4 mb-0">
        Bereits registriert? <a href="/login" class="text-dark fw-medium">Anmelden</a>
      </p>
    </div>
  </div>
</div>
