<script>
    import { blur, fly, slide } from 'svelte/transition'
    import { getContext, onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap'
    import ClassCard from './ClassCard.svelte';
    import { goto } from '$app/navigation'
    import Arrow from './Arrow.svelte'
    import Button from './Button.svelte';
    import { throttle } from 'lodash'


    const pageState = getContext('pageState')
    const BASE_DELAY = 2000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')
    const activeClass = getContext('activeClass')

    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;
    let onScroll = () => {}, throttledScroll = () => {}

    let data = fetch('/api/character', {
        method: 'GET',
        headers: {
        'content-type': 'application/json'
        }
    }).then(res => res.json())
    .then(value => {console.log(value); return value;})

    // $: {
    //   // console.log(data)
    //     if(!$activeClass){
    //       data.then(classes => {
    //         $activeClass = classes[0]
    //       })
    //     }
    // }

    $: {
      // on darkMode change
      $darkMode;
      data.then(classes => {
        $activeClass = classes.filter(
          c => c.designSide == $darkMode
        )[0]
      })
    }

    $: {
      // onDestroy doesn't work because it would be too late
      // this works, what a hack
      if($pageState != 'character'){
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

    onMount(() => {
      onScroll = (e) => {
        e.stopPropagation()
        console.log('scroll', e)
        if(e.deltaY > 0){ // scrolldown
          goto('/weapons'); 
          $pageState = 'weapons'
        } else if(e.deltaY < 0){
          goto('/'); 
          $pageState = ''
        }
      }
      throttledScroll = throttle(onScroll, 2000)
      setTimeout(() => {
        document.addEventListener('wheel', throttledScroll)
      }, 2000)

      return () => {
        document.removeEventListener('wheel', throttledScroll)
      }
    })
</script>

<!-- Character Page -->
<div class="w-full lg:w-1/2 h-full absolute right-0 flex flex-col justify-center"
style={`opacity: ${opacity};
filter: blur(${layerblur * 0}px)`}>
  <div 
    class:dark={$darkMode}
    class="absolute lg:relative h-fit w-full lg:w-fit bottom-0 left-0
    pt-10 p-8 lg:p-0
    character-bg">
    <div class="titles mt-auto md:mt-0" style="">
      <p class="uppercase font-bold  subtitle">CLASS</p>
      <p class="akira uppercase title" style="">{$activeClass ? $activeClass.title : 'Class title'}</p>
      <div class="absolute top-0"
      style="font-size: 100px">
        <!-- Ink splash 1 -->
        <!-- <h2 style="font-family: Drips;
        "
        class="uppercase absolute left-0 right-0 m-auto
        ink-1">
        -*+*+,-
        </h2> -->
        {#if $activeClass && $activeClass.title.length > 15 && false}
        <!-- Ink splash 2 -->
        <h2 style="font-family: Drips;
          "
          class="uppercase absolute left-0 right-0 m-auto
          ink-2">
          -+-,-*,+
        </h2>
        {/if}
      </div>
      
      <div class="flex gap-3 mb-5 mt-5">
        {#await data then classes}
          {#each classes.filter(c => c.designSide == $darkMode) as klass}
            <ClassCard data={klass}/>
          {/each}
        {/await}
      </div>

      <p class="font-bold uppercase" 
        style="line-height: 18px; font-size: 15px">
        {#if $activeClass && $activeClass.title}
          {$activeClass.title}
        {:else}
          Class title
        {/if}
      </p>
      

      <p style="line-height: 18px; font-size: 15px">
        {#if $activeClass && $activeClass.description}
          {$activeClass.description}
        {:else}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque, est non molestie dignissim, libero diam ornare leo, id rhoncus nulla ipsum non erat. 
        {/if}
      </p>

      <Button
        class="mt-5"
        on:click={() => {goto('/adventures'); $pageState = 'adventures'}}
      >
        <div><span class="font-bold text-white">
          MY ADVENTURES</span><div style="height: 7px; width: 7px;
          transform: rotate(-90deg); filter: invert(1)" 
          class="arrow inline-block pt-4 ml-0 pl-0 mr-2">
            <Arrow/>
          </div>
        </div>
      </Button>
    </div>
    
  </div>
</div>
<div class="
hidden lg:block
akira bg-title uppercase absolute left-0
pointer-events-none"
style={`bottom: 100px;
opacity: ${opacity};
filter: blur(${layerblur}px)`}
class:dark={$darkMode}>
  {#if $darkMode}
    visualside
  {:else}
    codingside
  {/if}
</div>
<!-- End Character Page -->

<style>
  .ink-1{
    font-size: 66px;
    line-height: 38px;
    top: 50px;
  }
  .ink-2{
    font-size: 63px;
    line-height: 18px;
    top: 190px;
  }
  .orange-title{
    letter-spacing: -5%;
    line-height: 38px;
    font-size: 48px;
  }
  .bg-title{
    font-size: 100px;
    color: #00000008;
    user-select: none;
    transition: 3s ease;
  }
  .dark.bg-title{
    color: #4793f610;
    transition: 3s ease;
  }
  .titles{
    padding-right: 0px;
  }
  .title{
    font-size: 28px; 
    line-height: 26px
  }
  .subtitle{
    font-size: 14px;
  }
  .character-bg{
    background: #ccccced0;
    transition: 0.4s ease;
    border-radius: 30px 30px 0px 0px;
    box-shadow: 0px -11px 50px -7px #00000030;
  }
  .dark.character-bg{
    background: #000000e6;
    transition: 0.4s ease;
  }
  @media only screen and (min-width: 1024px){
    .bg-title{
      font-size: 320px;
      left: -150px;
      line-height: 250px;
    }
    .titles{
      padding-right: 200px;
    }
    .title{
      font-size: 60px; 
      line-height: 50px
    }
    .subtitle{
      font-size: 20px;
    }
    .character-bg{
      background: #ffffff00;
      transition: 0.4s ease;
      box-shadow: 0px -11px 50px -7px #00000000;
    }
    .dark.character-bg{
      background: #00000000;
    }
    .orange-title{
      letter-spacing: -5%;
      line-height: 98px;
      font-size: 108px;
    }
  }
</style>