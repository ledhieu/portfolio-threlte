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
  import ProjectsUI from './UI/ProjectsUI.svelte';
  import WeaponsUI from './UI/WeaponsUI.svelte';
  import ContactUI from './UI/ContactUI.svelte';

  const pageState = getContext('pageState')
  const darkMode = getContext('darkMode')
  const d = new Date()
  const loading = getContext('loading')

  let scrollY;
  let innerWidth;
  let mobile;

  $: mobile = mounted ? (innerWidth < 1024 ? true : false) : false

  // $: {
  //   if(scrollY < 1000){
  //     $pageState = 'intro'
  //   } else if(scrollY < 2000){
  //     $pageState = 'character'
  //   } else if (scrollY < 3000){
  //     $pageState = 'weapons'
  //     // runReverse()
  //   } else {
  //     $pageState = 'adventures'
  //     // runReverse()
  //   }
  // }

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

    // grained('#grained', {
    //   "animate": true,
    //   "patternWidth": 138.73,
    //   "patternHeight": 141.73,
    //   "grainOpacity": 0.11,
    //   "grainDensity": 1,
    //   "grainWidth": 1.1,
    //   "grainHeight": 1
    // })
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

  export function playVideos(){
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
    // console.log(isPlaying)
    video.setAttribute("playsinline", true);
    playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        isPlaying = true
        // console.log('playing video', video)
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
    // window.addEventListener('customLoaded', () => {
    //   setTimeout(run, 1000)
    // })
  })

  $: {
    console.log('pageState', $pageState)
  }
  function run(){
    if(topLeftLottie)
      topLeftLottie.play()
    if(bottomRightLottie)
      bottomRightLottie.play()
    if(hudCircleLottie)
      hudCircleLottie.play()
    // console.log(sequence)
    // if(sequence)
    //   sequence.play()
  }

  function runReverse(){
    if(topLeftLottie){
      topLeftLottie.setSpeed(-1)
      topLeftLottie.play()
    }
    if(bottomRightLottie){
      bottomRightLottie.setSpeed(-1)
      bottomRightLottie.play()
    }
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

<svelte:window bind:scrollY bind:innerWidth></svelte:window>

<div class="fixed"
style={`
  z-index: 10000;
  top: ${ !mobile ? '20px' : '10px'};
  left: ${ mounted ? (!mobile ? 20 : 10) : 5000 }px;
  right: ${ mobile ? '10px' : 'auto' }`}>
  <Navbar/>
</div>

<div class="fixed toggle-container" style="">
  <Toggle/>
 </div>

<!-- <div class="fixed left-0 m-auto right-0
hidden lg:flex gap-3
text-center w-fit"
style="z-index: 9999; top: 20px; color: #FF6B00;
letter-spacing: -1px; 
font-size: 15px">
  <div class="pointer-events-none line-container relative" 
    style="width: 30px;">
    <div class="line" style="width: 30px"></div>
    <div class="tip"></div>
  </div>
  <span class="akira">LE DUC HIEU</span>
  <div class="pointer-events-none line-container relative" 
    style="width: 30px; transform: rotate(180deg)">
    <div class="line "style="width: 30px"></div>
    <div class="tip"></div>
  </div>
</div> -->

<div class="fixed"
style={`
  width: 100%;
  height: 100%;
`}>
<!-- <Studio enabled={dev}></Studio> -->
<!-- <div class="absolute w-full"
style="background: linear-gradient(180deg, #F2F4F7, #F2F4F700);
height: 100px">

</div> -->
<Canvas dpr={1} rendererParameters={{powerPreference: 'high-performance'
  
}}>
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
  <video style="display:none" bind:this={hudCircleElement} playsinline autoplay loop autoresume 
  muted="muted"
  src="/mp4/hudcirclebackdrop_orange.mp4">
  </video>
  <video muted="muted"
  style="display:none" bind:this={scribbleAllElement} playsinline controls autoplay loop autoresume
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
    <!-- <button on:click={() => {$darkMode = !$darkMode}}>{$darkMode ? 'dark' : 'light'}</button>
    <button on:click={playVideos}>play</button> -->
    <!-- {mobile} -->
  </div>

  <!-- UI -->
  <div class="absolute top-0 w-full h-full"
  class:loaded={$loading >= 100}>
    {#if LottiePlayer}
    <!-- Bottom right -->
    <div 
      class="pointer-events-none"
      style={`filter: invert(${lottieInvert}%); 
      position: absolute;
      transform: rotate(180deg); 
      right: 0px;
      bottom: 0px;
      z-index: 1000`}
    >
      <!-- <LottiePlayer
        src={"/lottie/corner.json"}
        autoplay={false}
        bind:this={topLeftLottie}
        loop={false}
        renderer="svg"
        controls={false}
        background="transparent"
        width={mobile ? window.innerHeight/3 : window.innerHeight/2}
        height={mobile ? window.innerHeight/3 : window.innerHeight/2}
        style={`
          pointer-events: none;
        `}
      accessors /> -->
      <!-- Date -->
      <div class="absolute w-max hidden lg:block"
        class:text-black={$darkMode}
        style="
        transform: rotate(180deg);
        font-size: 12px;
        left: 360px;
        bottom: 315px">
        <span>■</span>
        <span>{d.getFullYear().toString().substr(2)}.{d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}</span>
        <span>■</span>
        <span>{d.getDate()}.{d.getHours()}</span>
        <span>■</span>
        <span>{d.getMinutes()}.{d.getSeconds()}</span>
      </div>
      <div class="absolute hidden lg:block"
        style="transform: rotate(90deg);
        font-size: 12px;
        top: 260px;
        left: 10px;"
        class:text-white={$darkMode}>
        PORTFOLIO
      </div>
    </div>
    <!--Top left -->
    <div style={`filter: invert(${lottieInvert}%);
    z-index: 1000`}
    class="relative">
      <!-- <LottiePlayer
        src={"/lottie/corner.json"}
        bind:this={bottomRightLottie}
        autoplay={false}
        loop={false}
        renderer="svg"
        controls={false}
        background="transparent"
        width={mobile ? window.innerHeight/3 : window.innerHeight/2}
        height={mobile ? window.innerHeight/3 : window.innerHeight/2}
        style={`
          position: absolute;
          pointer-events: none;
        `}
      accessors /> -->
      <div class="absolute hidden lg:block"
        style="transform: rotate(-90deg);
        bottom: 0px;
        font-size: 12px;
        top: 260px;
        left: -15px;"
        class:text-white={$darkMode}>
        LE DUC HIEU
      </div>
    </div>
      {#if $loading >= 100 && $pageState == 'intro'}
        <video muted="muted" loop bind:this={hudCircleLottie}
        style="mix-blend-mode: screen; width: 100%; height: 100%;
        pointer-events: none;">
          <source src="/mp4/HUD Circle 15.mp4"/>
        </video>
      {/if}
    {/if}

    <!-- Little text button -->
    <div class="absolute pill bottom-[10px] lg:bottom-[20px] 
    left-[10px] lg:left-[20px]"
    class:dark={$darkMode}>
      2930938
    </div>

    <!-- Left line -->
    <div class="pointer-events-none absolute line-container top-0 bottom-0 m-auto left-0" 
    style={`width: ${mobile ? (innerWidth < 512 ? 20 : 40) : 50}px`}>
          <div class="line"></div>
          <div class="tip"></div>
    </div>
    <!-- Right line -->
    <div class="pointer-events-none absolute line-container top-0 bottom-0 m-auto right-0" 
    style={`width: ${mobile ? (innerWidth < 512 ? 20 : 40) : 50}px; transform: rotate(180deg)`}>
          <div class="line"></div>
          <div class="tip"></div>
    </div>

    <!-- QR Code -->
    <div class="pointer-events-none hidden lg:block
    absolute right-[10px] top-[10px] lg:right-[20px] lg:top-[20px] flex-col items-center">
      <img class="" src="/orns/barcode.svg"
      style={`filter: invert(${$darkMode ? 1 : 0});
      width: 100px`}>
      <!-- <span class="text-right" use:shuffle
      style="font-size: 12px">
        {d.getDate()}{d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}{d.getFullYear()}</span> -->
    </div>

    
    <div id="grained" 
    class="hidden lg:block"
    style="width: 100%; height: 100%; position: absolute;
  mix-blend-mode: screen; z-index: 1; pointer-events: none"></div>
    
    {#if $loading >= 100 && $pageState == ''}
      <IntroUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'character'}
      
      <CharacterUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'adventures'}
      <ProjectsUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'weapons'}
      <WeaponsUI/>
    {/if}
    {#if $loading >= 100 && $pageState == 'contact'}
      <ContactUI/>
    {/if}

    <!-- Glowing stuffs -->
    {#if $darkMode}
      <div class="pointer-events-none absolute"
      style="width: 700px; height: 700px; background:#111111;
      border-radius: 500px; mix-blend-mode: screen;
      left: -300px; top: -300px;
      opacity: 0.5;
      z-index: 0;
      pointer-events: none;
      filter: blur(200px)"
      transition:fade={{duration: 1000}}>

      </div>
      <div class="pointer-events-none absolute"
      style="width: 1000px; height: 1000px; background:var(--dark-primary);
      border-radius: 500px; mix-blend-mode: screen;
      right: -300px; bottom : -300px;
      z-index: 0;
      opacity: 0.5;
      pointer-events: none;
      filter: blur(400px)"
      transition:fade={{duration: 1000}}>

      </div>
    {:else}
      <div class="pointer-events-none absolute"
        style="width: 700px; height: 700px; background:#ffffffbf;
        border-radius: 500px; mix-blend-mode: normal;
        left: -300px; top: -300px;
        opacity: 0.4;
        z-index: 0;
        pointer-events: none;
        filter: blur(200px)"
        transition:fade={{duration: 1000}}>
      </div>
      <div class="pointer-events-none absolute"
        style="width: 1000px; height: 1000px; background:#00000090;
        border-radius: 500px; mix-blend-mode: normal;
        right: -300px; bottom : -300px;
        z-index: 0;
        opacity: 0.5;
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
    /* height: 5000px; */
    overflow-x: hidden
  }
  .pill{
    border: 1px solid black;
    border-radius: 40px;
    padding: 3px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 12px;
    transition: 0.2s ease;
  }
  .dark.pill{
    border: 1px solid white;
    transition: 0.2s ease;
  }
  .text-black, .text-black *{
    color: black!important;;
  }
  .toggle-container{
    top: 170px; 
    z-index: 1001;
    right: -35px;
  }
  .logo{
    transition: 0.2s ease;
  }
  .dark.logo{
    filter: invert(1);
    transition: 0.2s ease;
  }
  @media only screen and (min-width: 1024px){
    .toggle-container{
      top: 170px; 
      right: -20px;
    }
  }
  
  
</style>