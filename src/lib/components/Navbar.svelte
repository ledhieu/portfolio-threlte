<script>
    import { shuffle } from '$lib/shuffleText'
    import { getContext } from 'svelte';

    const pageState = getContext('pageState')

    function handleClick(string){
        history.pushState({}, "", "/" + (string == 'intro' ? '' : string))
        $pageState = string;
        // if(string == '')
        //     scrollY = 0
        // else if (string == 'character')
        //     scrollY = 1000
        // else if (string == 'weapons')
        //     scrollY = 2000
        // else if (string == 'match-history')
        //     scrollY = 3000
    }
    let scrollY
</script>

<div class="flex gap-8">
    <button
        class:active={$pageState == ''}
        on:click={() => {  handleClick('') }}
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
        use:shuffle={{ shufflesBeforeOrdering: 1 }}>
        MATCH HISTORY 
    </button>
</div>

<svelte:window bind:scrollY></svelte:window>

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