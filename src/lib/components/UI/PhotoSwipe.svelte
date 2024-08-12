<script>
    import { onMount } from "svelte";
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import 'photoswipe/style.css';
    import imageUrlBuilder from '@sanity/image-url'
    import client from '$lib/sanity/client'
    import { getImageDimensions } from "@sanity/asset-utils";

    export let portableText;
    $: galleryID = portableText.value._key
    $: images = portableText.value.images ?? []
    let innerWidth, innerHeight;

    console.log('gallery', portableText)
    
    onMount(() => {
        let lightbox = new PhotoSwipeLightbox({
          gallery: '#' + 'g' + galleryID,
          children: 'a',
          pswpModule: () => import('photoswipe'),
          initialZoomLevel: 0.9,
          secondaryZoomLevel: 1.6,
          maxZoomLevel: 2.6
        });
        lightbox.init();
        // images.forEach(image => {
        //     console.log(urlFor(image.asset).url())
        // })
    })

    const builder = imageUrlBuilder(client)
    function urlFor(source) {
        let url;
        try{
            url = builder.image(source).url()
        } catch(e){
            console.log('error', e)
        }
        return url
    }
    // function width(imgUrl){
    //     let arr = imgUrl.split('-')
    //     let dimensions = arr[arr.length - 2]
    //     return {
    //         width: dimensions.split('x')[0],
    //         height: dimensions.split('x')[1]
    //     }
    // }
</script>
<svelte:window bind:innerWidth bind:innerHeight/>
    
<div class="pswp-gallery grid grid-cols-2 lg:grid-cols-3 gap-3" 
    id={'g' + galleryID}>
    {#each images as image}
    {@const img = urlFor(image)}
    {@const {width, height} = getImageDimensions(img)}
    <a
            href={img}
            data-pswp-width={innerWidth > innerHeight ? width*innerHeight/height : innerWidth}
            data-pswp-height={innerWidth > innerHeight ? innerHeight : height * innerWidth / width}
            target="_blank"
            rel="noreferrer"
        >
            <img src={img} alt="" />
            </a>
    {/each}
</div>

<style>
    .pswp-gallery *{
        margin-top: 0px;
    }
</style>
    