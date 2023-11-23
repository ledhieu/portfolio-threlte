<script>
    import { blur, fly, slide } from 'svelte/transition'
    import { getContext } from 'svelte';
    import { gsap } from 'gsap'
    import ClassCard from './ClassCard.svelte';

    const pageState = getContext('pageState')
    const BASE_DELAY = 2000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')
    const activeClass = getContext('activeClass')

    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;

    let data = fetch('/api/character', {
        method: 'GET',
        headers: {
        'content-type': 'application/json'
        }
    }).then(res => res.json())
    .then(value => {console.log(value); return value;})

    $: {
      // console.log(data)
        if(!$activeClass){
          data.then(classes => {
            $activeClass = classes[0]
          })
        }
    }

    $: {
      // on darkMode change
      $darkMode;
      data.then(classes => {
        $activeClass = classes.filter(
          c => c.designSide == !$darkMode
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
</script>

<!-- Character Page -->
<div class="w-full lg:w-1/2 h-full absolute right-0 flex flex-col justify-center"
style={`opacity: ${opacity};
filter: blur(${layerblur}px)`}>
  <div 
    class:dark={$darkMode}
    class="absolute lg:relative h-fit w-full lg:w-fit bottom-0 left-0
    pt-10 p-8 lg:p-0
    character-bg">
    <div class="titles mt-auto md:mt-0" style="">
      <p class="uppercase font-bold mb-3 subtitle">LE DUC HIEU // CLASS</p>
      <p class="another uppercase title" style="">{$activeClass ? $activeClass.title : 'Class title'}</p>
      
      <div class="flex gap-3 mb-5">
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
  .bg-title{
    font-size: 100px;
    color: #00000008;
    user-select: none;
    transition: 3s ease;
  }
  .dark.bg-title{
    color: #BE47F610;
    transition: 3s ease;
  }
  .titles{
    padding-right: 0px;
  }
  .title{
    font-size: 80px; 
    line-height: 70px
  }
  .subtitle{
    font-size: 14px;
  }
  .character-bg{
    background: #ffffffe6;
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
      font-size: 130px; 
      line-height: 110px
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
  }
</style>