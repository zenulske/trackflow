<script>
  let { typ = 'erfolg', nachricht = '', sichtbar = false } = $props();


  const farben = {
    erfolg: { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    fehler:  { bg: '#FCEBEB', text: '#791F1F', border: '#F09595' },
    info:    { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' }
  };
  let farbe = $derived(farben[typ]);
</script>

{#if sichtbar && nachricht}
  <div class="banner" style="background:{farbe.bg}; color:{farbe.text}; border-color:{farbe.border}">
    {nachricht}
  </div>
{/if}

<style>
  .banner {
    padding: 12px 16px; border-radius: 8px;
    border: 0.5px solid; font-size: 14px;
    font-weight: 500; margin-bottom: 20px;
  }
</style>
