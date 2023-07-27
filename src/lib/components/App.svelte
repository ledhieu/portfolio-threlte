<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
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
  import IntroUI from '$lib/components/UI/IntroUI.svelte'
  import CharacterUI from './UI/CharacterUI.svelte';

  const pageState = getContext('pageState')
  const darkMode = getContext('darkMode')
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
<!-- <Studio enabled={dev}></Studio> -->

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

    {#if $loading >= 100 && $pageState == 'intro'}
      <IntroUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'character'}
      <CharacterUI/>
    {/if}
  </div>
</div>


<style>
  :global(canvas){
    width: 100% !important;
    height: 100% !important;
  }
  
</style>