<script>
  let { bereich, fortschritt = 0, wert = '0', einheit = '' } = $props();

</script>

<a href="/bereiche/{bereich._id}" class="karte">
  <p class="tag" style="color:{bereich.farbe}">{bereich.name}</p>
  <p class="wert">{wert} <span class="einheit">{einheit}</span></p>
  <p class="label">{bereich.ziel}</p>
  <div class="bar-bg">
    <div class="bar-fill" style="width:{fortschritt}%; background:{bereich.farbe}"></div>
  </div>
  <div class="meta">
    <span>{fortschritt}%</span>
    <span>Ziel: {bereich.ziel}</span>
  </div>
</a>

<style>
  .karte {
    background: white; border: 0.5px solid rgba(0,0,0,0.07);
    border-radius: 12px; padding: 20px 24px;
    text-decoration: none; color: inherit;
    display: block; transition: transform 0.12s, border-color 0.12s;
  }
  .karte:hover { transform: translateY(-2px); border-color: rgba(0,0,0,0.13); }
  .tag { font-size: 10px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 10px; }
  .wert { font-size: 32px; font-weight: 600; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 3px; }
  .einheit { font-size: 16px; font-weight: 400; color: #6A6860; letter-spacing: 0; }
  .label { font-size: 12px; color: #6A6860; margin-bottom: 14px; }
  .bar-bg { background: #EEECEA; border-radius: 4px; height: 5px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
  .meta { display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; color: #9A9890; }
</style>
