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
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });

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

    // OLD WAY: automatically dispatch event
    // $: {
    //   if($loading >= 100 && !emitted){
    //     window.dispatchEvent(loadedEvent)
    //   }
    // }
    
    // NEW WAY: dispatch after user click the button
    function loadingFinished(){
      window.dispatchEvent(loadedEvent)
    }

    function onCustomLoaded(){
      $pageState = $page.route.id.split('/')[1].replace('/', '')
      console.log($page)

      // hide = true; app.playVideos(); loadingFinished() 
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
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-0TB0591YF1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-0TB0591YF1');
  </script>
</svelte:head>

<div class="contents"
  class:dark={$darkMode}>
{#if ($loading < 100 || !finishedOnce) || !hide}
<div out:fade={{ duration: 100 }}
class="loading-screen fixed w-full h-full" style="z-index: 1000000">
<!-- <div><Loader/></div> -->

<div class="absolute w-fit h-fit top-0 left-0 right-0 bottom-0 m-auto pt-[160px]">
  
  <!-- {#if $loading < 101}  
  <p class="uppercase font-[akira]"
    style="
    font-size: 25px">Loading...
    <span class="font-[inconsolata] text-xs">[99]</span>
  </p>
  {:else}
    <button class="akira view-btn py-1"
    on:click={() => {hide = true; app.playVideos(); loadingFinished() }}
    style="
    font-size: 25px;"
    data-augmented-ui="tl-clip br-clip tr-round bl-round exe border"
    >VIEW PORTFOLIO →</button>
  {/if} -->

  <div class="flex flex-col w-[80vw] lg:w-[50vw]">
    <div class="flex justify-between w-full items-center">
      <p class="uppercase font-[akira]"
        style="
        font-size: 25px">{$loading < 100 ? 'Loading' : 'Completed'}
      </p>
      {#if $loading < 100}
      <span class="relative mr-auto spinner ml-2"
      style="">∴</span>
      {/if}
      <p>[{Math.round($loading * 100) / 100}%]</p>
      
    </div>
    <div class="loading-bar-container w-full px-[2px] py-[2px] border border-[#00000080]">
      <div class="loading-bar h-[10px] bg-[#000]"
      style={`width: ${Math.round($loading * 100) / 100}%`}></div>
    </div>
    {#if $loading < 100}
      <div class="flex justify-between">
        <p>Downloading...</p>
        <div class="flex flex-col ghost opacity-0 w-[1px] mr-auto">
          <p> </p> 
          <p>Initiating transaction...</p>
          <p>Connection established.</p>
        </div>
        <div class="flex flex-col">
          <p>Linking...</p> 

          {#if $loading > 60}
          <p>Initiating...</p>
          {/if}
          {#if $loading > 80}
          <p>Connected.</p> 
          {/if}
        </div>
      </div>
    {:else}
      <button class=" view-btn py-1"
      on:click={() => {hide = true; app.playVideos(); loadingFinished() }}
      style=""
      data-augmented-ui="tl-clip br-clip tr-round bl-round exe border"
      >CLICK HERE TO ENTER PORTFOLIO →</button>
    {/if}
    
  </div>  
  
  <!-- <div class="w-[100px] h-[8px] bg-[#00000020] "></div> -->
<!-- <div class="w-[150px] mt-1 h-[8px] bg-[#00000020]"></div> -->
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
  
  <App bind:this={app}/>
</div>
</div>

<style>
  
  .loading-screen{
    background: #DCDCDC;
    background: linear-gradient(135deg, #DADBDC, #B6B7B7);
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
    --aug-border-all: 1px;
    --aug-border-bg: #ffffff00;
    --aug-tl: 8px;
    --aug-br: 8px;
    --aug-tr: 2px;
    --aug-bl: 2px;
    transition: 0.2s ease;
    color: #000;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner{
  animation: rotate 1s linear infinite;
  /* padding-top: 9.5px; */
  height: fit-content;
}
</style>