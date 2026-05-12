<script>
  import { page } from '$app/stores';
  let { bereiche = [], user = null } = $props();
</script>

<aside class="sidebar">
  <a href="/dashboard" class="logo">
    <div class="logo-mark">TF</div>
    <span class="logo-text">TrackFlow</span>
  </a>

  <nav>
    <p class="nav-label">Übersicht</p>
    <a href="/dashboard" class="nav-item" class:active={$page.url.pathname === '/dashboard'}>
      <span class="nav-icon">⊞</span> Dashboard
    </a>

    <p class="nav-label">Meine Bereiche</p>
    {#each bereiche as bereich}
      <a href="/bereiche/{bereich._id}" class="nav-item"
         class:active={$page.url.pathname === `/bereiche/${bereich._id}`}>
        <span class="nav-icon" style="background:{bereich.farbeHell}">{bereich.icon}</span>
        {bereich.name}
      </a>
    {/each}

    <a href="/bereiche/neu" class="nav-item nav-add">
      <span class="nav-icon nav-icon-dashed">+</span>
      Bereich hinzufügen
    </a>

    <div style="margin-top:12px;">
      <a href="/eintrag/neu" class="nav-item nav-primary">
        <span class="nav-icon nav-icon-dark">+</span>
        Eintrag hinzufügen
      </a>
    </div>
  </nav>

  <!-- User + Logout am unteren Rand -->
  <div class="sidebar-bottom">
    {#if user}
      <div class="user-info">
        <div class="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
        <div>
          <p class="user-name">{user.name}</p>
          <p class="user-email">{user.email}</p>
        </div>
      </div>
      <form method="POST" action="/logout">
        <button type="submit" class="btn-logout">Abmelden</button>
      </form>
    {/if}
  </div>
</aside>

<style>
  .sidebar {
    width:232px; background:white; border-right:0.5px solid rgba(0,0,0,0.07);
    padding:24px 14px; display:flex; flex-direction:column;
    position:fixed; height:100vh; top:0; left:0; overflow-y:auto;
  }
  .logo { display:flex; align-items:center; gap:10px; margin-bottom:28px; padding-left:4px; text-decoration:none; color:inherit; }
  .logo-mark { width:34px; height:34px; background:#1C1B18; border-radius:9px; display:flex; align-items:center; justify-content:center; color:white; font-weight:600; font-size:13px; }
  .logo-text { font-size:18px; font-weight:600; letter-spacing:-0.4px; }
  .nav-label { font-size:10px; font-weight:600; color:#9A9890; letter-spacing:0.09em; text-transform:uppercase; padding:0 10px; margin:14px 0 4px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; color:#6A6860; font-size:13px; font-weight:500; text-decoration:none; transition:all 0.1s; }
  .nav-item:hover, .nav-item.active { background:#EEECEA; color:#1C1B18; }
  .nav-icon { width:28px; height:28px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; background:#EEECEA; }
  .nav-add { color:#9A9890; margin-top:4px; }
  .nav-icon-dashed { background:transparent; border:1.5px dashed rgba(0,0,0,0.13); font-size:18px; font-weight:300; color:#9A9890; }
  .nav-primary { color:#1C1B18; }
  .nav-icon-dark { background:#1C1B18; color:white; font-size:18px; }
  .sidebar-bottom { margin-top:auto; padding-top:14px; border-top:0.5px solid rgba(0,0,0,0.07); }
  .user-info { display:flex; align-items:center; gap:10px; padding:0 6px 10px; }
  .user-avatar { width:32px; height:32px; background:#EEECEA; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:14px; flex-shrink:0; }
  .user-name { font-size:13px; font-weight:500; color:#1C1B18; }
  .user-email { font-size:11px; color:#9A9890; margin-top:1px; }
  .btn-logout { width:100%; padding:8px 10px; background:none; border:0.5px solid rgba(0,0,0,0.13); border-radius:8px; font-family:inherit; font-size:13px; color:#6A6860; cursor:pointer; text-align:left; }
  .btn-logout:hover { background:#EEECEA; color:#1C1B18; }
</style>
