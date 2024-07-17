<script>
    import { shuffle } from '$lib/shuffleText'
    import { getContext } from 'svelte';
    import { fade } from 'svelte/transition'
    import Hamburger from './UI/Hamburger2.svelte';
    import { goto } from '$app/navigation';
    import Arrow from './UI/Arrow.svelte';
    import { onMount } from 'svelte'

    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')

    let hover;
    let characterData, weaponsData, projectsData

    onMount(() => {
        characterData = fetch('/api/character', {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(value => {console.log(value); return value;})

        weaponsData = fetch('/api/weapons', {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(value => {console.log(value); return value;})

        projectsData = fetch('/api/projects', {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(value => {console.log(value); return value.sort((a, b) => b.count - a.count);})

    })
    
    function setHover(value){
        setTimeout(() => {
            hover = value
        }, 1)
    }
    

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
        // else if (string == 'adventures')
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
        class:active={$pageState == 'adventures'}
        on:click={() => { handleClick('adventures') }}
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
            style=" z-index: -1;"
        >
            <div class="flex flex-col items-start h-full">
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == ''}
                    on:click={() => {  handleClick('') }}>
                    <span class="font-bold num">01</span>HOME<div
                    class="arrow w-[12px] h-[12px]"><Arrow/></div>
                </button>
                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'character'}
                    on:mouseenter={() => {setHover('character')}}
                    on:mouseout={() => {setHover('')}}
                    on:click={() => { handleClick('character') }}>
                    <span class="font-bold num">02</span>
                    CHARACTER
                    <div
                    class="arrow w-[12px] h-[12px]"><Arrow/></div>
                </button>
                {#if hover == 'character' || ($pageState == 'character' )}
                <div class="carousel"
                    style="font-size: 15px">
                    {#each Array.from({length: 2}) as _}
                        <div class="flex array">
                            {#await characterData then classes}
                                {#each classes.filter(klass => klass.designSide == $darkMode) as charItem}
                                <span class="avant"
                                class:text-orange={!$darkMode}
                                class:text-purple={$darkMode}
                                style="font-family: Akira; text-transform: uppercase"> {charItem.title} ▪&nbsp;</span>
                                {/each}
                            {/await}
                        </div>
                    {/each}
                </div>
                {/if}
                
                <button     
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'weapons'}
                    on:mouseenter={() => {setHover('weapons')}}
                    on:mouseout={() => {setHover('')}}
                    on:click={() => { handleClick('weapons') }}>
                    <span class="font-bold num">03</span>WEAPONS<div style=""
                    class="arrow w-[12px] h-[12px]"><Arrow/></div>
                </button>
                {#if hover == 'weapons' || ($pageState == 'weapons' )}
                <div class="carousel"
                    style="font-size: 15px">
                    {#each Array.from({length: 2}) as _}
                        <div class="flex array">
                            {#await weaponsData then weaponCategories}
                                {#each weaponCategories.filter(c => c.designSide == $darkMode) as item}
                                <span class="avant"
                                class:text-orange={!$darkMode}
                                class:text-purple={$darkMode}
                                style="font-family: Akira; text-transform: uppercase"> {item.title} ▪&nbsp;</span>
                                {/each}
                            {/await}
                        </div>
                    {/each}
                </div>
                {/if}


                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'adventures'}
                    on:mouseenter={() => {setHover('adventures')}}
                    on:mouseout={() => {setHover('')}}
                    on:click={() => { handleClick('adventures') }}>
                    <span class="font-bold num">04</span>MATCH HISTORY <div style=""
                    class="arrow w-[12px] h-[12px]"><Arrow/></div>
                </button>
                {#if hover == 'adventures' || ($pageState == 'adventures' )}
                <div class="carousel"
                    style="font-size: 15px">
                    {#each Array.from({length: 2}) as _}
                        <div class="flex array">
                            {#await projectsData then projectCategories}
                                {#each projectCategories.filter(c => c.designSide == $darkMode) as item}
                                <span class="avant"
                                class:text-orange={!$darkMode}
                                class:text-purple={$darkMode}
                                style="font-family: Akira; text-transform: uppercase"> {item.title} ▪&nbsp;</span>
                                {/each}
                            {/await}
                        </div>
                    {/each}
                </div>
                {/if}


                <button
                    class="item"
                    data-augmented-ui="br-clip tl-round tr-round bl-round exe"
                    class:active={$pageState == 'contact'}
                    on:click={() => { handleClick('contact') }}>
                    <span class="font-bold num">05</span>CONTACT<div style="height: 12px; width: 12px"
                    class="arrow"><Arrow/></div>
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
    .text-orange{
        color: var(--light-primary);
    }
    .text-purple{
        color: var(--dark-primary);
    }
    .arrow{
        filter: invert(1);
        padding-top: 8px;
    }
    .item {
        /* opacity: 0.2; */
        transition: 0.3s ease;
        color: #fff;
        padding: 5px;
        padding-right: 40px;
        padding-bottom: 0px;
        margin-top: 5px;
        --aug-br: 30px;
        --aug-tl: 5px;
        --aug-tr: 5px;
        --aug-bl: 5px;
        display: flex;
        align-items: start;
        gap: 10px;
        background: #ffffff00;
    }
    .item:hover, .item:hover .num{
        /* opacity: 0.5; */
        color: var(--light-primary);
        transition: 0.3s ease;
    }
    .item:hover .num{
        margin-right: 15px;
    }
    .dark .item:hover, .dark .item:hover .num{
        color: var(--dark-primary)
    }
    .item.active{
        opacity: 1;
        background: var(--light-primary);
        color: #000;
        transition: 0.3s ease;
    }
    .dark .item.active{
        color: #0e0322;
        background: var(--dark-primary);
    }
    .modal{
        padding-top: 100px;
        padding-left: 25px;
        background: linear-gradient(90deg, #000000f0 30%, #000000a0)
    }
    .dark.modal{
        background: linear-gradient(90deg, #0e0322f0 30%, #0e032250)
    }
    .modal .item{
        font-family: Akira; text-transform: uppercase;
        font-size: 30px;
        line-height: 26px;
        text-align: left;
    }
    .button{
        background: var(--light-primary);
        height: 35px;
        width: 45px;
        --aug-border-all: 2px;
        --aug-border-bg: #ffdcc2d0;
        --aug-bl: 2px;
        --aug-tl: 2px;
        --aug-tr: 2px;
        padding-right: 4px;
    }
    .dark .button{
        background: var(--dark-primary);
    }
    .shadow{
        box-shadow: 5px 0px 14px var(--light-primary);
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0px;
        transition: 0.3s ease;
    }
    .dark .shadow{
        box-shadow: 5px 0px 14px var(--dark-primary);
    }
    .button-container:hover .shadow{
        box-shadow: 5px 0px 24px var(--light-primary);
        transition: 0.3s ease;
    }
    .dark.button-container:hover .shadow{
        box-shadow: 5px 0px 14px var(--dark-primary);
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
    .carousel{
        width: calc(100vw - 50px);
        overflow: hidden;
        white-space: nowrap;
        pointer-events: none;
    }
    .carousel span{
        min-width: fit-content;
    }
    .carousel .array{
        animation: 20s slide infinite linear;
        display: inline-block;
        pointer-events: none;
    }
    @keyframes slide{
        from{
            transform: translateX(0)
        }
        to {
            transform: translateX(-100%);
        }
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
        .modal{
            padding-left: 40px;
        }
        .modal .item{
            font-size: 75px;
            line-height: 65px;
        }
        .carousel{
            width: 600px;
        }
    }
</style>