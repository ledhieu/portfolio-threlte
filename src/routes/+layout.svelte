<script>
    import "../app.postcss";
    
    import Typed from 'typed.js'
    import { shuffle } from '$lib/shuffleText'
    import { fade } from 'svelte/transition'
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { useProgress } from '@threlte/extras'
    import { tweened } from 'svelte/motion'
    import { page } from '$app/stores'
    import App from '$lib/components/App.svelte'
    import { enhance } from '$app/forms';

    const { progress, finishedOnce } = useProgress()
    const loading = tweened($progress, {
      duration: 800
    })
    $:  loading.set(!finishedOnce ? $progress * 100 : 100)
    

    let date = new Date()
    const pageState = writable("loading")
    const darkMode = writable(false)
    const activeWeapon = writable(undefined)
    
    setContext("pageState", pageState)
    setContext("darkMode", darkMode)
    setContext('loading', loading)
    setContext('activeWeapon', activeWeapon)

    let loadedEvent, emitted = false;
    let form;

    onMount(() => {
      loadedEvent = new Event('customLoaded')
      $pageState = 'loading'
    })

    $: {
      if($loading >= 100 && !emitted){
        window.dispatchEvent(loadedEvent)
      }
    }
    
    onMount(async () => {
        window.addEventListener('customLoaded', () => {
            $pageState = $page.route.id.replace('/', '')
            console.log($page)
        })

        console.log($page.route.id)

        
    })

    
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css">
</svelte:head>

<div class="contents"
  class:dark={$darkMode}>
{#if $loading < 100 && !finishedOnce}
<div out:fade={{ duration: 1000 }}
class="loading-screen fixed w-full h-full" style="z-index: 1000000">
  <div class="absolute w-fit h-fit top-0 left-0 right-0 bottom-0 m-auto">
    <p>
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
    </div>
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
  <App />
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
</style>