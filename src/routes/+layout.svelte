<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  let { data } = $props();
</script>

<div class="app">
  <Sidebar bereiche={data.bereiche ?? []} />
  <main class="main">
    <slot />
  </main>
</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(body) {
    font-family: 'DM Sans', -apple-system, sans-serif;
    background: #F5F4F0; color: #1C1B18;
    font-size: 14px; line-height: 1.5;
  }
  .app { display: flex; }
  .main { margin-left: 232px; padding: 40px 44px; flex: 1; min-height: 100vh; }
</style>
