<script>
    import { getContext, onMount } from "svelte";
    import { loading } from '$lib/loading'
    import { shuffle } from '$lib/shuffleText'
    import { fade, fly, slide } from 'svelte/transition'
    import { crossfade } from 'svelte/transition';
	  import { flip } from 'svelte/animate';
    import fontSpacing from '$lib/fontspacing.json'

    const pageState = getContext('pageState')
    const BASE_DELAY = 4000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')

    const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 1000),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

  onMount(() => {
    console.log('spacing', fontSpacing)
  })

</script>

<!-- Intro UI Page -->
<div class="titles absolute left-0 right-0 top-0 bottom-0 m-auto
w-fit h-fit text-center"
style="transition: 0.5s ease"
>

  <h2 style="font-family: Another;
    font-size: 128px;
    line-height: 98px;
    top: -90px;
    "
    id="hieusportfolio"
    class="text-white uppercase absolute left-0 right-0 m-auto">
    Hieu's portfolio
  </h2>

  
  <h1 style="
  letter-spacing: -5%;
  line-height: 98px;
  font-size: 108px"
  id="designside"
  class="absolute uppercase akira"
  >
    <!-- {#if !$darkMode}
    <span in:fade={{duration: 1, delay: DELAY_INTERVAL * 2}}>de</span><span in:fade={{duration: 1, delay: DELAY_INTERVAL * 3}}>si<span style="color: #FF6B00; mix-blend-mode:screen">gn</span></span><span in:fade={{duration: 1, delay: DELAY_INTERVAL * 4}}>side</span>
    {:else} -->
    {#key $darkMode}
    <span use:shuffle={{
      shufflesBeforeOrdering: 40,
      from: $darkMode ? 'designside' : 'techieside',
      spaceMapping: fontSpacing,
      log: true
    }} style="color: #FF6B00; mix-blend-mode:screen">{$darkMode ? 'techieside' : 'designside'}</span>
    {/key}
  </h1>

  <!-- Ghost title to keep the spacing -->
  <h1 style="
  letter-spacing: -5%;
  line-height: 98px;
  font-size: 108px;
  opacity: 0"
  class="uppercase akira"
  >{$darkMode ? 'techieside' : 'designside'}
  </h1>
  <div class="flex absolute w-full justify-between">
      {#key $darkMode}
      <p use:shuffle={{
          shufflesBeforeOrdering: 80,
          from: $darkMode ? 'graphics design' : 'full-stack'
        }}
        class="uppercase font-bold"
        style="font-size: 12px; font-family: Inconsolata">
          {$darkMode ? 'full-stack' : 'graphics design'}
      </p>
      <p 
        use:shuffle={{
          shufflesBeforeOrdering: 80,
          from: $darkMode ? 'ux/ui design' : 'development'
        }}
        class="uppercase font-bold"
        style="font-size: 12px; font-family: Inconsolata">
        {$darkMode ? 'development' : 'ux/ui design'}
      </p>
      {/key}
  </div>

</div>
<!-- End Intro Page -->