<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  let { data, children } = $props();
</script>

{#if data.user}
  <div class="d-flex">
    <Sidebar bereiche={data.bereiche ?? []} user={data.user} />
    <main style="margin-left:250px; padding:2rem; flex:1; min-height:100vh;">
      {@render children()}
    </main>
  </div>
{:else}
  {@render children()}
{/if}
