<script>
    import "../app.postcss";
    
    import Typed from 'typed.js'
    import { shuffle } from '$lib/shuffleText'
    import { fade } from 'svelte/transition'
    import { onDestroy, onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { useProgress } from '@threlte/extras'
    import { tweened } from 'svelte/motion'
    import { page } from '$app/stores'
    import App from '$lib/components/App.svelte'
    import { enhance } from '$app/forms';
    import Loader from '$lib/components/UI/Loader.svelte'

    const { progress, finishedOnce } = useProgress()
    const loading = tweened($progress, {
      duration: 601 // race condition with character model?
    })
    $:  loading.set(!finishedOnce ? $progress * 100 : 100)
    $: {
      console.log('progress', $progress, $finishedOnce)
    }
    let hide = false;
    let app;

    let date = new Date()
    const pageState = writable("loading")
    const darkMode = writable(false)
    const activeWeapon = writable(undefined)
    const activeClass = writable(undefined)
    const activeProject = writable(undefined)
    const activeCategory = writable(undefined)
    
    setContext("pageState", pageState)
    setContext("darkMode", darkMode)
    setContext('loading', loading)
    setContext('activeWeapon', activeWeapon)
    setContext('activeClass', activeClass)
    setContext('activeProject', activeProject)
    setContext('activeCategory', activeCategory)

    let loadedEvent, emitted = false;
    let form;
    $pageState = 'loading'
    $: {
      if($loading >= 100 && !emitted){
        window.dispatchEvent(loadedEvent)
      }
    }

    function onCustomLoaded(){
      $pageState = $page.route.id.split('/')[1].replace('/', '')
      console.log($page)
    }
    function onPopstate(event){
      console.log('popstate', event)
      $pageState = event.target.location.pathname.split('/')[1].replace('/', '')
      const project =  event.target.location.pathname.split('/')[2].replace('/', '')
      if(project)
        $activeProject = { slug: { current: project}}
      else 
        $activeProject = undefined
    }
    
    onMount(async () => {
      loadedEvent = new Event('customLoaded')
      $pageState = 'loading'
      window.addEventListener('customLoaded', onCustomLoaded )
      window.addEventListener('popstate', onPopstate)

      grained('#grained', {
        "animate": true,
        "patternWidth": 138.73,
        "patternHeight": 141.73,
        "grainOpacity": 0.11,
        "grainDensity": 1,
        "grainWidth": 1.1,
        "grainHeight": 1
      })
    })
    // onDestroy(() => {
    //   if(window){
    //     window.removeEventListener('customLoaded', onCustomLoaded)
    //     window.removeEventListener('popstate', onPopstate)
    //   }
    // })

    
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css">
</svelte:head>

<div class="contents"
  class:dark={$darkMode}>
{#if ($loading < 100 || !finishedOnce) || !hide}
<div out:fade={{ duration: 1000 }}
class="loading-screen fixed w-full h-full" style="z-index: 1000000">
<div><Loader/></div>
<div class="absolute w-fit h-fit top-0 left-0 right-0 bottom-0 m-auto">
  {#if $loading < 100}  
  <p class="akira"
    style="margin-top: 140px;
    font-size: 25px">Loading...</p>
  {:else}
    <button class="akira view-btn"
    on:click={() => {hide = true; app.playVideos() }}
    style="margin-top: 140px;
    font-size: 25px;
        padding: 20px;"
    data-augmented-ui="tl-clip br-clip tr-round bl-round exe border"
    >VIEW PORTFOLIO →</button>
  {/if}
    <!-- <p
    style="margin-top: 200px">
      DOWNLOADING {$loading}%
    </p>
    <div class="progress">
      <div class="progress-bar" style={`--progress: ${$loading}`}></div>
      <div class="progress-bar-glow" style={`--progress: ${$loading}`}></div>
    </div>
    <div class="flex justify-between">
      <p style="font-size: 10px" use:shuffle={{
        shufflesBeforeOrdering: 1
      }}>LOADING</p>

      <p style="font-size: 10px" use:shuffle={{
        shufflesBeforeOrdering: 1
      }}>{date.getUTCFullYear()}-{date.getUTCMonth()}-{date.getUTCDate()} {date.getTime()}</p>

      <p style="font-size: 10px" use:shuffle={{
        shufflesBeforeOrdering: 1
      }}>LE DUC HIEU</p>
    </div> -->
  </div>
  
</div>
{/if}
<slot />

<!-- <form bind:this={form} method="POST" action={$page.route.id} 
use:enhance={({formData, cancel}) => {
  cancel()
   return async ({ result, update }) => {
        console.log(result)
      };
}}></form> -->

<div class="app-container">
  <div id="grained" style="width: 100%; height: 100%; position: absolute;
  mix-blend-mode: screen; z-index: 1; pointer-events: none"></div>
  <App bind:this={app}/>
</div>
</div>

<style>
  
  .loading-screen{
    background: #DCDCDC
  }
  .progress{
    width: 300px;
    height: 10px;
    background: #00000010;
    position: relative;
  }
  .progress-bar, .progress-bar-glow{
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--progress) * 1%);
    height: 10px;
    background: #000000;
  }
  .progress-bar-glow{
    width: 40px;
    left: calc(var(--progress) / 2 * 1% - 20px);
    box-shadow: 0px 0px 20px #FF6B00;
    mix-blend-mode: screen;
    filter: blur(20px)
  }
  .view-btn{
    background: #ffffff00;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    --aug-border-all: 1px;
    --aug-border-bg: #ffffff00;
    --aug-tl: 8px;
    --aug-br: 8px;
    --aug-tr: 2px;
    --aug-bl: 2px;
    transition: 0.2s ease;
    color: #000;
}
</style>