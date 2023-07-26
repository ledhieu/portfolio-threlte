<script>
    import { onMount } from "svelte";
    import bodymovin from 'lottie-web'
    import Lottie from "lottie-web";

    export let canvas;

    let mounted = false;
    onMount(() => {
        // console.log(bodymovin)
        // let animation = bodymovin.loadAnimation({
        //     container: document.getElementById('lottie'), // Required
        //     path: '/lottie/bodymovin1.json', // Required
        //     renderer: 'canvas', // Required
        //     loop: true, // Optional
        //     autoplay: true, // Optional
        //     name: "testlottie", // Name for future reference., Optional.
        //     rendererSettings: {
        //         preserveAspectRatio: 'xMidYMid meet',
        //     }
        // })
        // // animation.play()
        // console.log(animation)
        // bodymovin.addEventListener('load', () => {
        //     canvas = animation.renderer.canvasContext
        //     console.log('canvas', canvas)
        // })
        
        mounted = true;
        const player = document.getElementById('player')
        player.addEventListener('ready', (e) => {
            console.log(e)
        })
    })
    
</script>
<svelte:head>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</svelte:head>


<!-- <div id="lottie"></div> -->
{#if mounted}
    <lottie-player
        src="/lottie/bodymovin1.json"
        autoplay
        loop
        id="player"
        >

    </lottie-player>
{/if}
<style>
</style>