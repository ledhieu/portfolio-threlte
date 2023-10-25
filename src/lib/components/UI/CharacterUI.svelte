<script>
    import { blur, fly, slide } from 'svelte/transition'
    import { getContext } from 'svelte';
    import { gsap } from 'gsap'

    const pageState = getContext('pageState')
    const BASE_DELAY = 2000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')

    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;

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
    class="absolute lg:relative h-fit w-full bottom-0 left-0
    pt-10 p-8 lg:p-0
    character-bg">
    <div class="titles mt-auto md:mt-0" style="">
      <p class="uppercase font-bold mb-3 subtitle">LE DUC HIEU // CLASS</p>
      <p class="another uppercase title" style="">3D designer</p>
      <p style="line-height: 18px; font-size: 15px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque, est non molestie dignissim, libero diam ornare leo, id rhoncus nulla ipsum non erat. </p>
    </div>
  </div>
</div>
<!-- End Character Page -->

<style>
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
  }
</style>