<script>
    import LottieCanvas from "../../lib/components/LottieCanvas.svelte";

    let canvas

    $: console.log(canvas)

</script>

<LottieCanvas bind:canvas/>