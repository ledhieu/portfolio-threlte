<script>
    import { PUBLIC_SANITY_URL } from '$env/static/public'
    import imageUrlBuilder from '@sanity/image-url'
    import client from '$lib/sanity/client'

    export let portableText;

    $: console.log(portableText)

    const builder = imageUrlBuilder(client)
    function urlFor(source) {
        return builder.image(source)
    }
    console.log(urlFor(portableText.value).url())
</script>

<img src={urlFor(portableText.value).url()}
    class="py-10 px-20"/>