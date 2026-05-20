<script>
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<svelte:head><title>Anmelden – TrackFlow</title></svelte:head>

<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="card border-0 shadow-sm" style="width:420px;">
    <div class="card-body p-4 p-md-5">
      <div class="d-flex align-items-center gap-2 mb-4">
        <div class="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white"
             style="width:36px;height:36px;background:#212529;font-size:13px;">TF</div>
        <span class="fw-semibold fs-5">TrackFlow</span>
      </div>
      <h1 class="h4 fw-bold mb-1">Willkommen zurück</h1>
      <p class="text-muted mb-4">Melde dich an, um deinen Fortschritt zu sehen.</p>

      {#if form?.fehler}
        <div class="alert alert-danger py-2">{form.fehler}</div>
      {/if}

      <form method="POST" use:enhance>
        <div class="mb-3">
          <label for="email" class="form-label fw-medium small">E-Mail</label>
          <input id="email" name="email" type="email" class="form-control" placeholder="name@beispiel.ch" required />
        </div>
        <div class="mb-4">
          <label for="passwort" class="form-label fw-medium small">Passwort</label>
          <input id="passwort" name="passwort" type="password" class="form-control" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-dark w-100">Anmelden</button>
      </form>

      <p class="text-center text-muted small mt-4 mb-0">
        Noch kein Konto? <a href="/register" class="text-dark fw-medium">Jetzt registrieren</a>
      </p>
    </div>
  </div>
</div>
