<script>
    import { getContext, onDestroy, onMount } from "svelte";
    import { shuffle } from '$lib/shuffleText'
    import { blur, fly, slide } from 'svelte/transition'
    import { fade } from '$lib/transitions'
    import { crossfade } from 'svelte/transition';
	  import { flip } from 'svelte/animate';
    import fontSpacing from '$lib/fontspacing.json'
    import { gsap } from 'gsap'
    import WeaponCard from "./WeaponCard.svelte";

    const pageState = getContext('pageState')
    const BASE_DELAY = 2000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')
    const loading = getContext('loading')
    
    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;

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

  let activeCategory;

  function handleWeaponCategoryChange(category){
    activeCategory = category
  }
</script>

<div 
    class="ui-container relative"
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
            {#each result.filter(category => category.designSide == !$darkMode) 
                as weaponCategory}
                <button 
                    class="btn"
                    on:click={() => {
                        handleWeaponCategoryChange(weaponCategory)
                    }}>{weaponCategory.title}</button>
            {/each}
        {:else}
            <button class="block"
                on:click={() => {
                    activeCategory = undefined
                }}>
                Back
            </button>
            <p>{activeCategory.title}</p>
            <div class="flex flex-col gap-5">
                {#each activeCategory.weapons as weapon}
                    <WeaponCard data={weapon}/>
                {/each}
            </div>
        {/if}
    {/await}
</div>

<style>
    .ui-container{
        padding: 170px;
        padding-top: 120px;
        overflow-y: scroll;
        height: 100%;   
        z-index: 1;
        padding-left: 58vw
    }
    .btn{
        display: block;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
    }
</style>