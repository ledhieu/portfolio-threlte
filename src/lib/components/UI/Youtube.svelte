<script>
    import { PUBLIC_SANITY_URL } from '$env/static/public'

    export let portableText;

    $: console.log('yt url', portableText)
</script>

<div class="w-full relative" style="aspect-ratio: 16/9">
    <iframe 
        class="absolute w-full h-full"
        width="100%" height="100%" src={portableText.value.url} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
    </iframe>
</div>