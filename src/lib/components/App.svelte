<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { darkMode } from '../character';
  import { writable } from 'svelte/store';
  import { getContext, onMount } from 'svelte';
  import { setContext } from 'svelte';
  import { page } from '$app/stores'
  import { shuffle } from '$lib/shuffleText'
  import Navbar from './Navbar.svelte';
  import Typed from 'typed.js'
  import { loading } from '$lib/loading'
  import { fade, fly } from 'svelte/transition'
  import { Theatre, Project, Sheet, Studio } from '@threlte/theatre'
  import introState from '$lib/theatre/Intro.theatre-project-state.json'
  import characterState from '$lib/theatre/ToCharacter.theatre-project-state.json'
  import { dev } from '$app/environment';

  const pageState = getContext('pageState')
  $: {
    $pageState;
    // console.log(sequence)
    // if(sequence)
    //   sequence.play()
  }

  const hudGraph = writable({})
  const hudCircle = writable({})
  let hudGraphElement, hudCircleElement
  setContext('hudGraph', hudGraph)
  setContext('hudCircle', hudCircle)
  onMount(() => {
    hudGraph.set(hudGraphElement)
    hudGraphElement.load()
    hudCircle.set(hudCircleElement)
    hudCircleElement.load()
    window.onfocus = playVideos
    playVideos()
  })

  function playVideos(){
    play(hudCircleElement)
  }

  function play(video){
    let isPlaying = video.currentTime > 0 && !video.paused && !video.ended 
        && video.readyState > video.HAVE_CURRENT_DATA;
    let playPromise
    console.log(isPlaying)
    playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        isPlaying = true
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  }

  // Lottie section
  let mounted = false;
  const BASE_DELAY = 4000;
  const DELAY_INTERVAL = 500;
  let sequence, sequence2
  onMount(async () => {
      mounted = true;
      const module = await import("@lottiefiles/svelte-lottie-player");
      LottiePlayer = module.LottiePlayer;
      $loading += 20
  });
  onMount(() => {
    window.addEventListener('customLoaded', () => {
      setTimeout(run, 1000)
    })
  })
  function run(){
    topLeftLottie.play()
    bottomRightLottie.play()
    if(hudCircleLottie)
      hudCircleLottie.play()
    // console.log(sequence)
    // if(sequence)
    //   sequence.play()
  }
  let LottiePlayer, topLeftLottie, bottomRightLottie, hudCircleLottie
</script>

<div class="fixed"
style={`
  z-index: 1000;
  top: 20px;
  left: ${ mounted ? window.innerHeight / 2 + 10 : 500 }px`}>
  <Navbar/>
</div>

<div class="relative"
style={`
  width: 100%;
  height: 100%;
`}>
<Studio enabled={dev}></Studio>

<Canvas>
  <!-- <Project config={{ state: characterState }} name="Portfolio">
    <Sheet name={'character'} bind:sequence> -->
      <Scene />
    <!-- </Sheet>
  </Project> -->
  <!-- <Theatre>
    <Scene/>
  </Theatre> -->
</Canvas>

  <!-- Video for HUD in scene -->
  <video 
    style="display: none"
    bind:this={hudGraphElement} 
    autoplay 
    loop 
    autoresume>
    <source src="/mp4/hudgraph.mp4">
  </video>
  <video 
    style="display: none"
    bind:this={hudCircleElement} 
    autoplay 
    muted
    loop 
    autoresume>
    <source src="/mp4/hudcirclebackdrop_orange.mp4">
  </video>

  <div style="position: fixed; top: 15px; left: 15px">
    <button on:click={() => {$darkMode = !$darkMode}}>{$darkMode ? 'dark' : 'light'}</button>
    <button on:click={playVideos}>play</button>
  </div>

  <!-- UI -->
  <div class="absolute top-0 w-full h-full"
  class:loaded={$loading >= 100}
  style="pointer-events: none">
    {#if LottiePlayer}
      <LottiePlayer
        src={"/lottie/corner.json"}
        autoplay={false}
        bind:this={topLeftLottie}
        loop={false}
        renderer="svg"
        controls={false}
        background="transparent"
        width={window.innerHeight/2}
        height={window.innerHeight/2}
        style={`
          position: absolute;
          transform: rotate(180deg); 
          right: 0px;
          bottom: 0px;
        `}
      accessors />

      <LottiePlayer
        src={"/lottie/corner.json"}
        bind:this={bottomRightLottie}
        autoplay={false}
        loop={false}
        renderer="svg"
        controls={false}
        background="transparent"
        width={window.innerHeight/2}
        height={window.innerHeight/2}
        style={`
          position: absolute;
        `}
      accessors />
        
      {#if $loading >= 100 && $pageState == 'intro'}
        <video muted loop bind:this={hudCircleLottie}
        style="mix-blend-mode: screen; width: 100%; height: 100%;">
          <source src="/mp4/HUD Circle 15.mp4"/>
        </video>
      {/if}
    {/if}
    <div class="absolute line-container top-0 bottom-0 m-auto left-0" 
    style="width: calc(50vw - 600px)">
          <div class="line"></div>
          <div class="tip"></div>
    </div>

    <div class="absolute line-container top-0 bottom-0 m-auto right-0" 
    style="width: calc(50vw - 600px); transform: rotate(180deg)">
          <div class="line"></div>
          <div class="tip"></div>
    </div>

    <!-- Intro UI Page -->
    <div class="titles absolute left-0 right-0 top-0 bottom-0 m-auto
    w-fit h-fit text-center"
    >
    {#if $loading >= 100 && $pageState == 'intro'}
      <h2 style="font-family: Another;
        font-size: 128px;
        line-height: 98px;
        top: -90px;
        "
        id="hieusportfolio"
        in:fade={{duration: 1, delay: BASE_DELAY}}
        out:fade={{ duration: 1, delay: 1000 }}
        class="text-white uppercase absolute left-0 right-0 m-auto">
        Hieu's portfolio
      </h2>

      <h1 style="
      letter-spacing: -5%;
      line-height: 98px;
      font-size: 128px"
      id="designside"
      class="absolute uppercase akira"
      in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL}}
      >
        <span in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL * 2}}>de</span><span in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL * 3}}>si<span style="color: #FF6B00; mix-blend-mode:screen">gn</span></span><span in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL * 4}}>side</span>
      </h1>

      <!-- Ghost title to keep the spacing -->
      <h1 style="font-family: Akira;
      letter-spacing: -5%;
      line-height: 98px;
      font-size: 128px;
      opacity: 0"
      >
        DESIGNSIDE
      </h1>
      <div class="flex absolute w-full justify-between">
          <p use:shuffle={{
              shufflesBeforeOrdering: 240
            }}
            in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL * 5}}
            class="uppercase font-bold"
            style="font-size: 12px; font-family: Inconsolata">
              graphics design
          </p>
          <p 
            use:shuffle={{
              shufflesBeforeOrdering: 240
            }}
            in:fade={{duration: 1, delay: BASE_DELAY + DELAY_INTERVAL * 6}}
            class="uppercase font-bold"
            style="font-size: 12px; font-family: Inconsolata">
              ux/ui design
          </p>
      </div>
    {/if}
    </div>
    <!-- End Intro Page -->

    <!-- Character Page -->
    <div class="w-1/2 h-full absolute right-0 flex flex-col justify-center">
      <div class="titles" style="padding-right: 200px">
        <p class="uppercase font-bold mb-3" style="font-size: 20px">LE DUC HIEU // CLASS</p>
        <p class="another uppercase" style="font-size: 130px; line-height: 130px">3D designer</p>
        <p style="line-height: 18px; font-size: 15px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque, est non molestie dignissim, libero diam ornare leo, id rhoncus nulla ipsum non erat. Maecenas blandit nisl leo, quis placerat sem convallis a. Sed dapibus iaculis felis ut pulvinar. Vivamus mattis dignissim turpis non sodales. Sed ex dui, elementum ac enim quis, mattis aliquet elit.</p>
      </div>
    </div>
    <!-- End Character Page -->
  </div>
</div>


<style>
  :global(canvas){
    width: 100% !important;
    height: 100% !important;
  }
  
</style>