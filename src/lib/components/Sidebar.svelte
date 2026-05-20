<script>
  import { page } from '$app/stores';
  let { bereiche = [], user = null } = $props();
</script>

<nav class="sidebar d-flex flex-column p-3 bg-white border-end"
     style="width:240px; position:fixed; height:100vh; overflow-y:auto;">

  <a href="/dashboard" class="d-flex align-items-center gap-2 mb-4 text-decoration-none text-dark">
    <div class="logo-mark">TF</div>
    <span class="fw-semibold fs-5">TrackFlow</span>
  </a>

  <small class="text-uppercase text-muted fw-semibold mb-1 px-2">Übersicht</small>
  <a href="/dashboard" class="nav-link rounded mb-1 px-2 py-2"
     class:active={$page.url.pathname === '/dashboard'}>
    ⊞ Dashboard
  </a>

  <small class="text-uppercase text-muted fw-semibold mb-1 mt-3 px-2">Meine Bereiche</small>
  {#each bereiche as bereich}
    <a href="/bereiche/{bereich._id}" class="nav-link rounded mb-1 px-2 py-2 d-flex align-items-center gap-2"
       class:active={$page.url.pathname === `/bereiche/${bereich._id}`}>
      <span class="icon-badge" style="background:{bereich.farbeHell}">{bereich.icon}</span>
      {bereich.name}
    </a>
  {/each}

  <a href="/bereiche/neu" class="nav-link rounded mb-1 px-2 py-2 text-muted">
    <span class="icon-badge-dashed">+</span> Bereich hinzufügen
  </a>

  <a href="/eintrag/neu" class="btn btn-dark mt-2 d-flex align-items-center gap-2">
    <span>+</span> Eintrag hinzufügen
  </a>

  <div class="mt-auto pt-3 border-top">
    {#if user}
      <div class="d-flex align-items-center gap-2 px-2 mb-2">
        <div class="avatar">{user.name?.charAt(0).toUpperCase()}</div>
        <div>
          <div class="fw-medium small">{user.name}</div>
          <div class="text-muted" style="font-size:11px">{user.email}</div>
        </div>
      </div>
      <form method="POST" action="/logout">
        <button class="btn btn-outline-secondary btn-sm w-100">Abmelden</button>
      </form>
    {/if}
  </div>
</nav>

<style>
  .logo-mark {
    width:34px; height:34px; background:#1C1B18; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    color:white; font-weight:600; font-size:13px;
  }
  .nav-link { color: #6A6860; }
  .nav-link:hover, .nav-link.active { background: #EEECEA; color: #1C1B18; }
  .icon-badge {
    width:26px; height:26px; border-radius:6px;
    display:inline-flex; align-items:center; justify-content:center; font-size:14px;
  }
  .icon-badge-dashed {
    width:26px; height:26px; border-radius:6px;
    display:inline-flex; align-items:center; justify-content:center;
    border: 1.5px dashed rgba(0,0,0,0.2); font-size:16px;
  }
  .avatar {
    width:32px; height:32px; background:#EEECEA; border-radius:50%;
    display:flex; align-items:center; justify-content:center; font-weight:600;
  }
</style>