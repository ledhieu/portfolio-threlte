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
  import { fade, fly } from 'svelte/transition'
  import { Theatre, Project, Sheet, Studio } from '@threlte/theatre'
  import introState from '$lib/theatre/Intro.theatre-project-state.json'
  import characterState from '$lib/theatre/ToCharacter.theatre-project-state.json'
  import { dev } from '$app/environment';
  import IntroUI from '$lib/components/UI/IntroUI.svelte'
  import CharacterUI from './UI/CharacterUI.svelte';
  import Toggle from '$lib/components/Toggle.svelte'
  import { gsap } from 'gsap'

  const pageState = getContext('pageState')
  const darkMode = getContext('darkMode')
  const d = new Date()
  const loading = getContext('loading')

  let scrollY;

  $: {
    if(scrollY < 1000){
      $pageState = 'intro'
    } else if(scrollY < 2000){
      $pageState = 'character'
    } else if (scrollY < 3000){
      $pageState = 'weapons'
    }
  }

  // const hudGraph = writable({})
  const hudCircle = writable({})
  const scribbleAll = writable({})
  // const scribble1 = writable({})
  // const scribble2 = writable({})
  // const scribble3 = writable({})
  // const scribble4 = writable({})
  // const scribble5 = writable({})
  // const scribble6 = writable({})
  // let hudGraphElement
  let hudCircleElement
  let scribbleAllElement
  // let scribble1Element
  // let scribble2Element
  // let scribble3Element
  // let scribble4Element
  // let scribble5Element
  // let scribble6Element
  // setContext('hudGraph', hudGraph)
  setContext('hudCircle', hudCircle)
  setContext('scribbleAll', scribbleAll)
  // setContext('scribble1', scribble1)
  // setContext('scribble2', scribble2)
  // setContext('scribble3', scribble3)
  // setContext('scribble4', scribble4)
  // setContext('scribble5', scribble5)
  // setContext('scribble6', scribble6)
  onMount(() => {
    // hudGraph.set(hudGraphElement)
    // hudGraphElement.load()
    hudCircle.set(hudCircleElement)
    hudCircleElement.load()
    scribbleAll.set(scribbleAllElement)
    scribbleAllElement.load()
    // scribble1.set(scribble1Element)
    // scribble1Element.load()
    // scribble2.set(scribble2Element)
    // scribble2Element.load()
    // scribble3.set(scribble3Element)
    // scribble3Element.load()
    // scribble4.set(scribble4Element)
    // scribble4Element.load()
    // scribble5.set(scribble5Element)
    // scribble5Element.load()
    // scribble6.set(scribble6Element)
    // scribble6Element.load()

    window.onfocus = playVideos
    playVideos()
  })
  
  $: {
    if(mounted && scribbleAllElement && hudCircleElement){
      if($darkMode){
        play(scribbleAllElement)
      } else {
        play(hudCircleElement)
      }
    }
  }

  function playVideos(){
    console.log('playing videos')
    play(hudCircleElement)
    play(scribbleAllElement)
    // play(scribble1Element)
    // play(scribble2Element)
    // play(scribble3Element)
    // play(scribble4Element)
    // play(scribble5Element)
    // play(scribble6Element)
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
        console.log('playing video', video)
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
        console.log(error)
      });
    } else {
      console.log('cannot play')
    }
  }

  // Lottie section
  let mounted = false;
  
  let sequence, sequence2
  onMount(async () => {
      mounted = true;
      const module = await import("@lottiefiles/svelte-lottie-player");
      LottiePlayer = module.LottiePlayer;
      // $loading += 20
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
  
  let lottieStyle = { invert: 0} // lottieStyle is ghost
  let lottieInvert = 0 // lottieInvert is used
  $: {
    if(topLeftLottie && bottomRightLottie){
      if($darkMode){
        gsap.to(lottieStyle, {invert: 100, duration: 1, ease: 'power4.inOut', onUpdate: () => {
          lottieInvert = lottieStyle.invert
        }})
      } else {
        gsap.to(lottieStyle, {invert: 0, duration: 1, ease: 'power4.inOut', onUpdate: () => {
          lottieInvert = lottieStyle.invert
        } })
      }
      console.log('lottieStyle', lottieStyle)
      setTimeout(() => {
        console.log('lottieStyle', lottieStyle)
      }, 1000)
    }
  }
</script>

<svelte:window bind:scrollY></svelte:window>

<div class="fixed"
style={`
  z-index: 10000;
  top: 20px;
  left: ${ mounted ? window.innerHeight / 2 + 10 : 500 }px`}>
  <Navbar/>
</div>

<div class="fixed"
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
  <!-- <video style="display: none" bind:this={hudGraphElement} autoplay muted loop autoresume>
    <source src="/mp4/hudgraph.mp4">
  </video> -->
  <!-- Note: mute allows autoplay but will make the video pausable to save power -->
  <!-- Note2: the video must have audio for it to be prioritized by the browser -->
  <video style="display:none" bind:this={hudCircleElement} controls autoplay loop autoresume 
  src="/mp4/hudcirclebackdrop_orange.mp4">
  </video>
  <video style="display:none" bind:this={scribbleAllElement} controls autoplay loop autoresume
  src="/mp4/sequence_all_audio.mp4">
  </video>
  <!-- </video>
  <video style="display: none" bind:this={scribble2Element} autoplay muted loop autoresume>
    <source src="/mp4/scribble2.mp4">
  </video>
  <video style="display: none" bind:this={scribble3Element} autoplay muted loop autoresume>
    <source src="/mp4/scribble3.mp4">
  </video>
  <video style="display: none" bind:this={scribble4Element} autoplay muted loop autoresume>
    <source src="/mp4/scribble4.mp4">
  </video>
  <video style="display: none" bind:this={scribble5Element} autoplay muted loop autoresume>
    <source src="/mp4/scribble5.mp4">
  </video>
  <video style="display: none" bind:this={scribble6Element} autoplay muted loop autoresume>
    <source src="/mp4/scribble6.mp4">
  </video> -->

  <div style="position: fixed; top: 15px; left: 15px">
    <button on:click={() => {$darkMode = !$darkMode}}>{$darkMode ? 'dark' : 'light'}</button>
    <button on:click={playVideos}>play</button>
  </div>

  <!-- UI -->
  <div class="absolute top-0 w-full h-full"
  class:loaded={$loading >= 100}>
    {#if LottiePlayer}
    <div style={`filter: invert(${lottieInvert}%); 
      position: absolute;
      transform: rotate(180deg); 
      right: 0px;
      bottom: 0px;`}
    >
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
          
        `}
      accessors />
    </div>
    <div style={`filter: invert(${lottieInvert}%);`}>
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
    </div>
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

    <div class="absolute right-12 top-12 flex flex-col items-center">
      <img class="" src="/barcode.svg"
      style={`filter: invert(${lottieInvert}%)`}>
      <span class="text-center" use:shuffle>
        {d.getDate()}{d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}{d.getFullYear()}</span>
    </div>

    <div class="absolute right-0" style="top: 170px; z-index: 10000">
     <Toggle/>
    </div>
    

    {#if $loading >= 100 && $pageState == 'intro'}
      <IntroUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'character'}
      
      <CharacterUI/>
    {/if}

    {#if $darkMode}
      <div class="absolute"
      style="width: 700px; height: 700px; background:#FF6B00;
      border-radius: 500px; mix-blend-mode: screen;
      left: -300px; top: -300px;
      opacity: 0.7;
      z-index: 10000;
      pointer-events: none;
      filter: blur(200px)"
      transition:fade={{duration: 1000}}>

      </div>
      <div class="absolute"
      style="width: 1000px; height: 1000px; background:#6E18FF;
      border-radius: 500px; mix-blend-mode: screen;
      right: -300px; bottom : -300px;
      z-index: 10000;
      opacity: 0.8;
      pointer-events: none;
      filter: blur(400px)"
      transition:fade={{duration: 1000}}>

      </div>
    {/if}
  </div>
</div>


<style>
  :global(canvas){
    width: 100% !important;
    height: 100% !important;
  }
  :global(body){
    height: 4000px;
    overflow-x: hidden
  }
  
</style>