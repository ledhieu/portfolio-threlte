<script>
    import { PUBLIC_SANITY_URL } from '$env/static/public'
    import imageUrlBuilder from '@sanity/image-url'
    import client from '$lib/sanity/client'

    export let portableText;

    $: console.log('image', portableText)

    const builder = imageUrlBuilder(client)
    function urlFor(source) {
        if(!source)
            return undefined
        return builder.image(source) ? builder.image(source).url() : undefined
    }
    // console.log(urlFor(portableText.value).url())
</script>

<img src={urlFor(portableText.value)}
    class="py-10 px-20"/>