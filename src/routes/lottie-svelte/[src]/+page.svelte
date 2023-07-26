<!-- App.svelte -->
<script>
    import { page } from '$app/stores'
    import { PlayMode } from '@lottiefiles/svelte-lottie-player';
    import { onMount } from 'svelte';

    let controlsLayout = [
      'previousFrame',
      'playpause',
      'stop',
      'nextFrame',
      'progress',
      'frame',
      'loop',
      'spacer',
      'background',
      'snapshot',
      'zoom',
      'info',
    ];
    let LottiePlayer, lottiePlayer;
    let direction = 1;

    onMount(async () => {
        const module = await import("@lottiefiles/svelte-lottie-player");
        LottiePlayer = module.LottiePlayer;
    });
    $: console.log($page.params.src)

    function playBackwards(){
        let _lottiePlayer = lottiePlayer.getLottie()
        
        lottiePlayer.stop()
        lottiePlayer.setDirection(-1)
        lottiePlayer.setSpeed(-1)
        // _lottiePlayer.playDirection = - _lottiePlayer.playDirection
        console.log(lottiePlayer)
        console.log(_lottiePlayer)
        
        lottiePlayer.play()
    }
</script>

{#if LottiePlayer}
  <LottiePlayer
    src={'/lottie/' + $page.params.src + ".json"}
    autoplay={false}
    loop={false}
    count={0}
    renderer="svg"
    controls={true}]
    background="transparent"
    height={600}
    mode={PlayMode.Bounce}
    bind:this={lottiePlayer}
    accessors
    width={600} />
{/if}

<div style="position: fixed; left: 15px ; top: 15px">
    <button on:click={playBackwards}>toggle</button>
</div>