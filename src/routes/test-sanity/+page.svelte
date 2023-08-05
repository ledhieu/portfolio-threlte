<script>
    import { getContext, onMount } from 'svelte';

    export let data
    const loading = getContext('loading')
    
    $: weapons = data.weapons
    $: console.log(data)
    onMount(() => {
        $loading = 100
    })
</script>

{#if weapons && weapons.length}
<ul>
  {#each weapons as weapon}
	<li>{weapon.name}</li>
  {/each}
</ul>
{:else}
	<p>No weapons found.</p>
{/if}