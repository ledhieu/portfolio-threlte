<script>
    import { shuffle } from '$lib/shuffleText'
    import { getContext } from 'svelte';
    import { fade } from 'svelte/transition'
    import Hamburger from './UI/Hamburger.svelte';
    import { goto } from '$app/navigation';

    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')

    function handleClick(string){
        // history.pushState({}, "", "/" + (string == 'intro' ? '' : string))
        goto("/" + (string == 'intro' ? '' : string))
        $pageState = string;
        active = false;
        // if(string == '')
        //     scrollY = 0
        // else if (string == 'character')
        //     scrollY = 1000
        // else if (string == 'weapons')
        //     scrollY = 2000
        // else if (string == 'match-history')
        //     scrollY = 3000
    }
    let scrollY;
    let active = false;
</script>

<div class="hidden lg:flex gap-8">
    <button
        class="item"
        class:active={$pageState == ''}
        on:click={() => {  handleClick('') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        INTRO 
    </button>
    <button
        class="item"
        class:active={$pageState == 'character'}
        on:click={() => { handleClick('character') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        CHARACTER 
    </button>
    <button     
        class="item"
        class:active={$pageState == 'weapons'}
        on:click={() => { handleClick('weapons') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        WEAPONS
    </button>
    <button
        class="item"
        class:active={$pageState == 'match-history'}
        on:click={() => { handleClick('match-history') }}
        use:shuffle={{ shufflesBeforeOrdering: 1 }}>
        MATCH HISTORY 
    </button>
    <button
        class="item"
        class:active={$pageState == 'contact'}
        on:click={() => { handleClick('contact') }}
        use:shuffle={{ shufflesBeforeOrdering: 1 }}>
        CONTACT
    </button>
</div>

<div class="block lg:hidden"
style="z-index: 10001">
    <!-- <button class="hamburger hamburger--spin js-hamburger"
    on:click={() => {active = !active}}
    class:is-active={active}
    class:dark={$darkMode}>
        <button class="hamburger-box">
          <button class="hamburger-inner"></button>
        </button>
      </button> -->
    
        <Hamburger 
            active={active}
            on:click={() => { active = !active }}/>
    

    {#if active}
        <div class="modal w-screen h-screen
        fixed top-0 left-0"
        transition:fade={{duration: 400}}
        style="background: #ffffff20; z-index: -1;
        backdrop-filter: blur(10px)">
            <div class="flex flex-col justify-center h-full">
                <button
                    class="item"
                    class:active={$pageState == ''}
                    on:click={() => {  handleClick('') }}>
                    INTRO 
                </button>
                <button
                    class="item"
                    class:active={$pageState == 'character'}
                    on:click={() => { handleClick('character') }}>
                    CHARACTER 
                </button>
                <button     
                    class="item"
                    class:active={$pageState == 'weapons'}
                    on:click={() => { handleClick('weapons') }}>
                    WEAPONS
                </button>
                <button
                    class="item"
                    class:active={$pageState == 'match-history'}
                    on:click={() => { handleClick('match-history') }}>
                    MATCH HISTORY 
                </button>
                <button
                    class="item"
                    class:active={$pageState == 'contact'}
                    on:click={() => { handleClick('contact') }}>
                    CONTACT
                </button>
            </div>
        </div>
    {/if}
</div>



<svelte:window bind:scrollY></svelte:window>

<style>
    * {
        font-family: Inconsolata;
    }
    .item {
        opacity: 0.2;
        transition: 0.3s ease;
        
    }
    .item.active{
        opacity: 1;
        transition: 0.3s ease;
    }
    .modal .item{
        font-family: Akira;
        font-size: 25px;
    }
</style>