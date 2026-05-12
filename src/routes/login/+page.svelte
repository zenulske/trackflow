<script>
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<svelte:head><title>Anmelden – TrackFlow</title></svelte:head>

<div class="auth-wrap">
  <div class="auth-card">
    <div class="logo">
      <div class="logo-mark">TF</div>
      <span class="logo-text">TrackFlow</span>
    </div>

    <h1>Willkommen zurück</h1>
    <p class="subtitle">Melde dich an, um deinen Fortschritt zu sehen.</p>

    {#if form?.fehler}
      <div class="fehler-banner">{form.fehler}</div>
    {/if}

    <form method="POST" use:enhance>
      <div class="form-group">
        <label for="email">E-Mail</label>
        <input id="email" name="email" type="email" placeholder="name@beispiel.ch" required />
      </div>
      <div class="form-group">
        <label for="passwort">Passwort</label>
        <input id="passwort" name="passwort" type="password" placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn-primary">Anmelden</button>
    </form>

    <p class="switch">Noch kein Konto? <a href="/register">Jetzt registrieren</a></p>
  </div>
</div>

<style>
  .auth-wrap {
    min-height: 100vh; display: flex;
    align-items: center; justify-content: center;
    background: #F5F4F0;
  }
  .auth-card {
    background: white; border: 0.5px solid rgba(0,0,0,0.13);
    border-radius: 12px; padding: 40px 44px; width: 420px; max-width: 92vw;
  }
  .logo { display:flex; align-items:center; gap:10px; margin-bottom:32px; }
  .logo-mark {
    width:34px; height:34px; background:#1C1B18; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    color:white; font-weight:600; font-size:13px;
  }
  .logo-text { font-size:18px; font-weight:600; letter-spacing:-0.4px; }
  h1 { font-size:22px; font-weight:600; margin-bottom:5px; }
  .subtitle { color:#6A6860; margin-bottom:28px; font-size:14px; }
  .fehler-banner {
    background:#FCEBEB; color:#791F1F; border:0.5px solid #F09595;
    border-radius:8px; padding:12px; margin-bottom:18px; font-size:14px;
  }
  .form-group { margin-bottom:14px; }
  label { display:block; font-size:11px; font-weight:600; color:#6A6860; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:5px; }
  input {
    width:100%; padding:10px 13px; border:0.5px solid rgba(0,0,0,0.13);
    border-radius:8px; font-family:inherit; font-size:14px; outline:none;
  }
  input:focus { border-color:rgba(0,0,0,0.4); }
  .btn-primary {
    width:100%; padding:11px; background:#1C1B18; color:white;
    border:none; border-radius:8px; font-family:inherit;
    font-size:14px; font-weight:500; cursor:pointer; margin-top:6px;
  }
  .btn-primary:hover { opacity:0.85; }
  .switch { text-align:center; margin-top:20px; color:#6A6860; font-size:13px; }
  .switch a { color:#1C1B18; font-weight:500; }
</style>
