<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { shuffle } from '$lib/shuffleText'
  import { blur, fly, slide } from 'svelte/transition'
  import { fade } from '$lib/transitions'
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import fontSpacing from '$lib/fontspacing.json'
  import { gsap } from 'gsap'

  const pageState = getContext('pageState')
  const BASE_DELAY = 2000;
  const DELAY_INTERVAL = 500;
  const darkMode = getContext('darkMode')
  const loading = getContext('loading')

  let time = {time: 0}
  let opacity = 0;
  let layerblur = 30;

  $: {
    // onDestroy doesn't work because it would be too late
    // this works, what a hack
    if($pageState != ''){
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


</script>

<!-- Intro UI Page -->
<div class="titles absolute left-0 right-0 top-0 bottom-0 m-auto
w-fit h-fit text-center"
style="transition: 0.5s ease"
>

  <h2 style="font-family: Another;
    "
    id="hieusportfolio"
    transition:blur={{ amount: 10, duration: 1000, delay: BASE_DELAY }}
    class="text-white uppercase absolute left-0 right-0 m-auto
    white-title">
    Hieu's portfolio
  </h2>
  <!-- Ink splash 1 -->
  <h2 style="font-family: Drips;
    "
    transition:blur={{ amount: 10, duration: 1000, delay: BASE_DELAY }}
    class="text-white uppercase absolute left-0 right-0 m-auto
    ink-1">
    -*+*+,-
  </h2>
  <!-- Ink splash 2 -->
  <h2 style="font-family: Drips;
    "
    transition:blur={{ amount: 10, duration: 1000, delay: BASE_DELAY }}
    class="text-white uppercase absolute left-0 right-0 m-auto
    ink-2">
    \{`[`}\
  </h2>
  <!-- <h2 style="font-family: Ink;
    font-size: 138px;
    line-height: 98px;
    top: -20px;
    "
    transition:blur={{ amount: 10, duration: 1000, delay: BASE_DELAY }}
    class="text-white uppercase absolute left-0 right-0 m-auto">
    @.*+
  </h2> -->

  
  <h1 style=""
  id="visualside"
  class="absolute uppercase akira orange-title"
  >
    <!-- {#if !$darkMode}
    <span in:fade={{duration: 1, delay: DELAY_INTERVAL * 2}}>de</span><span in:fade={{duration: 1, delay: DELAY_INTERVAL * 3}}>si<span style="color: #FF6B00; mix-blend-mode:screen">gn</span></span><span in:fade={{duration: 1, delay: DELAY_INTERVAL * 4}}>side</span>
    {:else} -->
    {#key $darkMode}
    <span use:shuffle={{
      shufflesBeforeOrdering: 40,
      from: !$darkMode ? 'coding&side' : 'visual&side',
      spaceMapping: fontSpacing,
      log: true
    }} 
    style={`color: #FF6B00; mix-blend-mode:screen; opacity: ${opacity};
    filter: blur(${layerblur}px)`}>{@html $darkMode ? 
      'visual&side' : 
      'coding&side'}</span>
    {/key}
  </h1>

  <!-- Ghost title to keep the spacing -->
  <h1 style="
  
  opacity: 0"
  class="uppercase akira orange-title"
  >{@html !$darkMode ? 'coding<br class="block lg:hidden">side' : 'visual<br class="block lg:hidden">side'}
  </h1>
  <!-- End ghost title -->
  <div class="flex absolute w-full justify-between">
      {#key $darkMode}
      <p use:shuffle={{
          shufflesBeforeOrdering: 80,
          from: !$darkMode ? 'graphics design' : 'full-stack'
        }}
        class="uppercase font-bold sub-text"
        style={`font-size: 12px; font-family: Inconsolata;
        opacity: ${opacity};
        filter: blur(${layerblur}px)`}>
          {!$darkMode ? 'full-stack' : 'graphics design'}
      </p>
      <p 
        use:shuffle={{
          shufflesBeforeOrdering: 80,
          from: !$darkMode ? 'ux/ui design' : 'development'
        }}
        class="uppercase font-bold sub-text"
        style={`font-size: 12px; font-family: Inconsolata;
          opacity: ${opacity};
          filter: blur(${layerblur}px)`}>
        {!$darkMode ? 'development' : 'ux/ui design'}
      </p>
      {/key}
  </div>

</div>
<!-- End Intro Page -->

<style>
  .orange-title{
    letter-spacing: -5%;
    line-height: 38px;
    font-size: 48px;
  }
  .white-title{
    font-size: 65px;
    line-height: 55px;
    top: -100px;
  }
  .ink-1{
    font-size: 36px;
    line-height: 38px;
    top: -100px;
  }
  .ink-2{
    font-size: 13px;
    line-height: 18px;
    top: -80px;
  }
  .sub-text{
    color: white;
  }
  @media only screen and (min-width: 1024px){
    .orange-title{
      letter-spacing: -5%;
      line-height: 98px;
      font-size: 108px;
    }
    .white-title{
      font-size: 128px;
      line-height: 98px;
      top: -90px;
    }
    .ink-1{
      font-size: 78px;
      line-height: 98px;
      top: -60px;
    }
    .ink-2{
      font-size: 38px;
      line-height: 98px;
      top: -30px;
    }
    .sub-text{
      color: inherit
    }
  }
  
</style>