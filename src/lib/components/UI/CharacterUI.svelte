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
<div class="w-1/2 h-full absolute right-0 flex flex-col justify-center"
style={`opacity: ${opacity};
filter: blur(${layerblur}px)`}>
  <div class="titles" style="padding-right: 200px">
    <p class="uppercase font-bold mb-3" style="font-size: 20px">LE DUC HIEU // CLASS</p>
    <p class="another uppercase" style="font-size: 130px; line-height: 130px">3D designer</p>
    <p style="line-height: 18px; font-size: 15px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque, est non molestie dignissim, libero diam ornare leo, id rhoncus nulla ipsum non erat. Maecenas blandit nisl leo, quis placerat sem convallis a. Sed dapibus iaculis felis ut pulvinar. Vivamus mattis dignissim turpis non sodales. Sed ex dui, elementum ac enim quis, mattis aliquet elit.</p>
  </div>
</div>
<!-- End Character Page -->