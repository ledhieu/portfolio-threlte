<script>
    import { getContext, onDestroy, onMount } from "svelte";
    import { shuffle } from '$lib/shuffleText'
    import { blur, fly, slide } from 'svelte/transition'
    import { fade } from '$lib/transitions'
    import { crossfade } from 'svelte/transition';
	  import { flip } from 'svelte/animate';
    import fontSpacing from '$lib/fontspacing.json'
    import { gsap } from 'gsap'
    import { goto } from '$app/navigation'
    import WeaponCard from "./WeaponCard2.svelte";
    import { throttle, debounce } from 'lodash'

    const pageState = getContext('pageState')
    const BASE_DELAY = 600;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')
    const loading = getContext('loading')
    
    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;
    let uiContainer

    let data = fetch('/api/weapons', {
        method: 'GET',
        headers: {
        'content-type': 'application/json'
        }
    }).then(res => res.json())
    .then(value => {console.log(value); return value;})

  $: {
    // onDestroy doesn't work because it would be too late
    // this works, what a hack
    if($pageState != 'weapons'){
      gsap.to(time, { time: 0, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
        opacity = time.time
        layerblur = 30 - time.time * 30
      }})
    } else {
      // putting the code below in onMount works too, but this looks
      // more consistent
      gsap.to(time, { time: 1, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
        opacity = time.time
        layerblur = 30 - time.time * 30
      }})
    }
  }

  $: {
    $darkMode;
    activeCategory = undefined;
  }

  let activeCategory;

  function handleWeaponCategoryChange(category){
    activeCategory = category
  }


  // handle scroll up/down event
  let onScroll = () => {}, throttledScroll = () => {}
  let nextPageFlag = false, prevPageFlag = false;
  onMount(() => {
    // let scrollTop
    // onScroll = (e) => {
    //     e.stopPropagation()
    //     console.log('scroll', e, uiContainer.scrollTop, scrollTop)
    //     if(!uiContainer)
    //         return
    //     if(e.deltaY > 0){ // scrolldown
    //         prevPageFlag = false;
    //         if(uiContainer.scrollTop >= uiContainer.scrollHeight - uiContainer.clientHeight - 20){
    //             if(nextPageFlag){
    //                 goto('/adventures'); 
    //                 $pageState = 'adventures'
    //             } else {
    //                 nextPageFlag = true
    //             }
    //             console.log('next ready', nextPageFlag)
    //         }
    //     } else{
    //         nextPageFlag = false;
    //         if(uiContainer.scrollTop <= 0){
    //             if(prevPageFlag){
    //                 goto('/character'); 
    //                 $pageState = 'character'
    //             } else {
    //                 prevPageFlag = true
    //             }
    //             console.log('prev ready', prevPageFlag)
    //         }
    //     }
    //     // scrollTop = uiContainer ? uiContainer.scrollTop : undefined
    // }
    // throttledScroll = throttle((e) => {
    //     onScroll(e)
    // }, 500)
    // setTimeout(() => {
    //     document.addEventListener('wheel', throttledScroll)
    // }, 500)

    // return () => {
    // document.removeEventListener('wheel', throttledScroll)
    // }
})
</script>

{#key $darkMode}
<div 
    class="ui-container relative"
    class:dark={$darkMode}
    bind:this={uiContainer}
    style={`
    opacity: ${opacity};
    filter: blur(${layerblur}px)
`}>
    {#await data}
        <p class="inconsolata">// MODE</p>
        <p class="akira uppercase" style="font-size: 32px">
            loading ...
        </p>
    {:then result}
        {#if !activeCategory}
            {#each result.filter(category => category.designSide == $darkMode) 
                as weaponCategory, i}
                <button 
                    class="btn gap-3"
                    style=""
                    on:click={() => {
                        handleWeaponCategoryChange(weaponCategory)
                    }}>
                        <p class="font-bold">[{i < 10 ? '0' + i : i}]</p>
                        <p class="font-[akira] title uppercase font-semibold"
                        style="font-stretch: narrow">{weaponCategory.title}</p>
                    </button>
            {/each}
        {:else}
            <button class="block"
                on:click={() => {
                    activeCategory = undefined
                }}>
                ← Back
            </button>
            <p class="title uppercase font-bold akira mt-3 mb-5">
                {activeCategory.title}
            </p>
            <div class="flex flex-wrap gap-5">
                {#each activeCategory.weapons as weapon}
                    <WeaponCard data={weapon}/>
                {/each}
            </div>
        {/if}
    {/await}
</div>
{/key}

<style>
    .ui-container{
        padding: 40px;
        padding-top: 120px;
        overflow-y: scroll;
        height: 100%;   
        z-index: 1;
    }
    .btn{
        display: flex;
        padding-top: 12px;
        padding-bottom: 12px;
        /* border-bottom: 1px solid black; */
        text-align: left;
    }
    .dark .btn{
        /* border-bottom: 1px solid #ffffff80; */
    }
    .title {
        font-size: 22px; 
        line-height: 25px;
        padding-left: 0px;
        transition: 0.2s ease;
    }
    .btn:hover .title{
        padding-left: 10px;
        transition: 0.2s ease;
    }
    @media only screen and (min-width: 512px){
        .ui-container{
            
        }
    }
    @media only screen and (min-width: 1024px){
        .ui-container{
            padding-left: 48vw;
            padding: 170px;
            padding-top: 100px;
        }
        .title{
            font-size: 32px; 
            line-height: 35px;
        }
    }
    @media only screen and (min-width: 1200px){
        .ui-container{
            padding-left: 55vw
        }
    }
</style>