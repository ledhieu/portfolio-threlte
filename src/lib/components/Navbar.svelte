<script>
    import { shuffle } from '$lib/shuffleText'
    import { getContext } from 'svelte';

    const pageState = getContext('pageState')

    function handleClick(string){
        history.pushState({}, "", "/" + string)
        $pageState = string
    }
</script>

<div class="flex gap-8">
    <button
        class:active={$pageState == 'intro'}
        on:click={() => { handleClick('intro') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        INTRO 
    </button>
    <button
        class:active={$pageState == 'character'}
        on:click={() => { handleClick('character') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        CHARACTER 
    </button>
    <button 
        class:active={$pageState == 'weapons'}
        on:click={() => { handleClick('weapons') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        WEAPONS
    </button>
    <button
        class:active={$pageState == 'match-history'}
        on:click={() => { handleClick('match-history') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        MATCH HISTORY 
    </button>
</div>

<style>
    * {
        font-family: Inconsolata;
    }
    * {
        opacity: 0.5;
        transition: 0.3s ease;
    }
    *.active{
        opacity: 1;
        transition: 0.3s ease;
    }
</style>