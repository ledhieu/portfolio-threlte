<script>
    import { getContext } from "svelte";
    import { loading } from '$lib/loading'
    import { shuffle } from '$lib/shuffleText'
    import { fade, fly } from 'svelte/transition'

    const pageState = getContext('pageState')
    const BASE_DELAY = 4000;
    const DELAY_INTERVAL = 500;
</script>

<!-- Intro UI Page -->
<div class="titles absolute left-0 right-0 top-0 bottom-0 m-auto
w-fit h-fit text-center"
>

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

</div>
<!-- End Intro Page -->