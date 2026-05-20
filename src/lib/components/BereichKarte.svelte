<script>
  let { bereich, fortschritt = 0, wert = '0', einheit = '' } = $props();
</script>

<a href="/bereiche/{bereich._id}" class="card border-0 shadow-sm h-100 text-decoration-none text-dark" style="transition:.15s;">
  <div class="card-body">
    <div class="d-flex align-items-center gap-2 mb-3">
      <span class="rounded-2 d-flex align-items-center justify-content-center"
            style="width:36px;height:36px;background:{bereich.farbeHell};font-size:20px;">{bereich.icon}</span>
      <span class="fw-semibold small text-uppercase" style="color:{bereich.farbe};letter-spacing:.06em;">{bereich.name}</span>
    </div>
    <div class="fw-bold mb-1" style="font-size:28px;letter-spacing:-1px;line-height:1.1;">
      {wert} <span class="fs-6 fw-normal text-muted">{einheit}</span>
    </div>
    <div class="text-muted small mb-3">Ziel: {bereich.ziel || '—'}</div>
    <div class="progress" style="height:5px;">
      <div class="progress-bar" style="width:{fortschritt}%;background:{bereich.farbe};"></div>
    </div>
    <div class="d-flex justify-content-between mt-1">
      <span class="text-muted" style="font-size:11px;">{fortschritt}%</span>
    </div>
  </div>
</a>
