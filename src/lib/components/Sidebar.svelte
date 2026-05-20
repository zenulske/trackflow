<script>
  import { page } from '$app/stores';
  let { bereiche = [], user = null } = $props();
</script>

<nav class="d-flex flex-column p-3 bg-white border-end"
     style="width:250px; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; z-index:100;">

  <a href="/dashboard" class="d-flex align-items-center gap-2 mb-4 text-decoration-none">
    <div class="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white"
         style="width:36px;height:36px;background:#212529;font-size:13px;">TF</div>
    <span class="fw-semibold fs-5 text-dark">TrackFlow</span>
  </a>

  <small class="text-uppercase text-muted fw-semibold px-2 mb-1" style="font-size:10px;letter-spacing:.08em;">Übersicht</small>
  <a href="/dashboard"
     class="d-flex align-items-center gap-2 px-2 py-2 rounded text-decoration-none mb-1 nav-link-item"
     class:aktiv={$page.url.pathname === '/dashboard'}>
    <i class="bi bi-grid"></i> Dashboard
  </a>

  <small class="text-uppercase text-muted fw-semibold px-2 mb-1 mt-3" style="font-size:10px;letter-spacing:.08em;">Meine Bereiche</small>
  {#each bereiche as b}
    <a href="/bereiche/{b._id}"
       class="d-flex align-items-center gap-2 px-2 py-2 rounded text-decoration-none mb-1 nav-link-item"
       class:aktiv={$page.url.pathname === `/bereiche/${b._id}`}>
      <span class="rounded-2 d-flex align-items-center justify-content-center"
            style="width:26px;height:26px;background:{b.farbeHell};font-size:14px;">{b.icon}</span>
      {b.name}
    </a>
  {/each}

  <a href="/bereiche/neu"
     class="d-flex align-items-center gap-2 px-2 py-2 rounded text-decoration-none mb-1 text-secondary nav-link-item">
    <span class="rounded-2 d-flex align-items-center justify-content-center"
          style="width:26px;height:26px;border:1.5px dashed #ccc;font-size:18px;">+</span>
    Bereich hinzufügen
  </a>

  <a href="/eintrag/neu" class="btn btn-dark d-flex align-items-center justify-content-center gap-2 mt-3">
    <i class="bi bi-plus-lg"></i> Eintrag hinzufügen
  </a>

  <div class="mt-auto pt-3 border-top">
    <a href="/profil"
       class="d-flex align-items-center gap-2 px-2 py-2 rounded text-decoration-none mb-2 nav-link-item"
       class:aktiv={$page.url.pathname === '/profil'}>
      <div class="rounded-circle bg-light d-flex align-items-center justify-content-center fw-semibold flex-shrink-0"
           style="width:32px;height:32px;">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <div class="overflow-hidden">
        <div class="fw-medium small text-truncate text-dark">{user?.name}</div>
        <div class="text-muted text-truncate" style="font-size:11px;">{user?.email}</div>
      </div>
    </a>
    <form method="POST" action="/logout">
      <button class="btn btn-outline-secondary btn-sm w-100">
        <i class="bi bi-box-arrow-right me-1"></i> Abmelden
      </button>
    </form>
  </div>
</nav>

<style>
  .nav-link-item { color: #6c757d; font-size: 13px; font-weight: 500; transition: background .1s; }
  .nav-link-item:hover { background: #f1f3f5; color: #212529; }
  .nav-link-item.aktiv { background: #f1f3f5; color: #212529; }
</style>
