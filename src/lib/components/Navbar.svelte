<script>
    import { shuffle } from '$lib/shuffleText'
    import { getContext } from 'svelte';
    import { fade } from 'svelte/transition'
    import Hamburger from './UI/Hamburger2.svelte';
    import { goto } from '$app/navigation';
    import Arrow from './UI/Arrow.svelte';

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

<!-- <div class="hidden lg:flex gap-8">
    <button
        class="item"
        class:active={$pageState == ''}
        on:click={() => {  handleClick('') }}
        use:shuffle={{ shufflesBeforeOrdering: 100 }}>
        HOME 
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
</div> -->

<div class="block "
style="z-index: 10001">
    <!-- <button class="hamburger hamburger--spin js-hamburger"
    on:click={() => {active = !active}}
    class:is-active={active}
    class:dark={$darkMode}>
        <button class="hamburger-box">
          <button class="hamburger-inner"></button>
        </button>
      </button> -->
    <div class="relative button-container"
        class:dark={$darkMode}>
        <div class="shadow"></div>
        <button class="button absolute flex justify-center items-center"
        data-augmented-ui="br-clip tl-round tr-round bl-round exe"
        on:click={() => { active = !active }}>
            
            <Hamburger 
                active={active}
                />
        </button>
    </div>

    

    {#if active}
        <div class="modal w-screen h-screen
        fixed top-0 left-0"
        class:dark={$darkMode}
        transition:fade={{duration: 200}}
        style=" z-index: -1;">
            <div class="flex flex-col items-start h-full">
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == ''}
                    on:click={() => {  handleClick('') }}>
                    <span class="font-bold num">01</span>HOME
                </button>
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'character'}
                    on:click={() => { handleClick('character') }}>
                    <span class="font-bold num">02</span>CHARACTER 
                </button>
                <button     
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'weapons'}
                    on:click={() => { handleClick('weapons') }}>
                    <span class="font-bold num">03</span>WEAPONS
                </button>
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'match-history'}
                    on:click={() => { handleClick('match-history') }}>
                    <span class="font-bold num">04</span>MATCH HISTORY 
                </button>
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'contact'}
                    on:click={() => { handleClick('contact') }}>
                    <span class="font-bold num">05</span>CONTACT
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
        /* opacity: 0.2; */
        transition: 0.3s ease;
        color: #fff;
        padding: 5px;
        padding-right: 40px;
        --aug-br: 30px;
        --aug-tl: 5px;
        --aug-tr: 5px;
        --aug-bl: 5px;
        display: flex;
        align-items: start;
        gap: 10px;
    }
    .item:hover, .item:hover .num{
        /* opacity: 0.5; */
        color: #FF6B00;
        transition: 0.3s ease;
        gap: 25px;
    }
    .dark .item:hover{
        color: #6E18FF
    }
    .item.active{
        opacity: 1;
        background: #FF6B00;
        color: #000;
        transition: 0.3s ease;
    }
    .dark .item.active{
        color: #0e0322;
        background: #6E18FF;
    }
    .modal{
        padding-top: 100px;
        padding-left: 40px;
        background: linear-gradient(90deg, #000000f0 30%, #000000a0)
    }
    .dark.modal{
        background: linear-gradient(90deg, #0e0322f0 30%, #0e032250)
    }
    .modal .item{
        font-family: Akira;
        font-size: 65px;
        line-height: 60px;
    }
    .button{
        background: #FF6B00;
        height: 30px;
        width: 40px;
        --aug-border-all: 2px;
        --aug-border-bg: #ffdcc2d0;
        --aug-bl: 2px;
        --aug-tl: 2px;
        --aug-tr: 2px;
        padding-right: 4px;
    }
    .shadow{
        box-shadow: 5px 0px 14px #FF7B30;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0px;
        transition: 0.3s ease;
    }
    .button-container:hover .shadow{
        box-shadow: 5px 0px 24px #FF7B30;
        transition: 0.3s ease;
    }
    .num{
        font-size: 16px;
        line-height: 25px;
        color: white;
        transition: 0.2s ease;
    }
    .item.active .num{
        color: #000;
        transition: 0.2s ease;
    }
    .dark .item.active .num{
        color: #0e0322;
    }
    @media only screen and (min-width: 1024px){
        .button{
            height: 40px;
            width: 60px;
        }
        .shadow{
            width: 45px;
            height: 40px;
        }
    }
</style>