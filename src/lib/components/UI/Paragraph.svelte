<script>
    import { PUBLIC_SANITY_URL } from '$env/static/public'
    import imageUrlBuilder from '@sanity/image-url'
    import client from '$lib/sanity/client'

    export let portableText;

    $: console.log('paragraph', portableText)
    // console.log(urlFor(portableText.value).url())
</script>
