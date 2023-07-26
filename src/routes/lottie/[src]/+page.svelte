<script>
    import { page } from '$app/stores'

    console.log($page)
</script>

<svelte:head>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

</svelte:head>


<lottie-player src={"/lottie/" + $page.params.src + '.json'} 
    background="transparent"  
    speed="2"  
    style="width: 100%; height: 100vh" 
    loop 
    autoplay>
</lottie-player>
