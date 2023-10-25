<script>
    import { T, useRender, useThrelte, extend, useLoader, useFrame } from '@threlte/core'
    import { getContext } from 'svelte';
    import { TextureLoader } from 'three'
    import * as THREE from 'three'
    import { gsap } from 'gsap'
    import { createTransition } from '@threlte/extras'
    import { cubicOut } from 'svelte/easing'

    const { load } = useLoader(TextureLoader)

    
    const position = [0.21 ,1.67,0.67]
    const range = 0.5
    const base = 1.67
    const activeWeapon = getContext('activeWeapon')
    const pageState = getContext('pageState')
    let time = {time: 0}
    let opacity = 0;
    const BASE_DELAY = 2000;
    const DELAY_INTERVAL = 500;
    let logo;
    
    $: imageUrl = $activeWeapon && $activeWeapon.mainImage ? $activeWeapon.mainImage : '/sveltekit.svg'

    useFrame(() => {
        position[1] = Math.sin(currentTime() / 1000 ) * range / 30 + base
    })

    function currentTime () {
        return Date.now()
    }

    const fadeIn = createTransition((ref) => {
        if (!ref.transparent) ref.transparent = true
        return {
            tick(t) {
                ref.opacity = t
            },
            easing: cubicOut,
            duration: 400,
            delay: 1400
        }
    })
    const fadeOut = createTransition((ref) => {
        if (!ref.transparent) ref.transparent = true
        return {
            tick(t) {
                ref.opacity = t
            },
            easing: cubicOut,
            duration: 400
        }
    })


    $: {
    // onDestroy doesn't work because it would be too late
    // this works, what a hack
        if(logo){
            if($pageState != 'weapons'){
                gsap.to(logo.material, { opacity: 0, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
            }})
        } else {
            // putting the code below in onMount works too, but this looks
            // more consistent
            gsap.to(logo.material, { opacity: 1, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
                }})
            }
        }
    }
</script>

{#await load(imageUrl) then map}
{@const _ = map.encoding = THREE.sRGBEncoding}
<!-- Note for future dumbass mistakes: "emissive" and NOT "emissiveColor" -->
<T.Mesh
    position={position}
    scale={0.2}>
    <T.PlaneGeometry/>
    <T.MeshBasicMaterial
        map={map}
        side={THREE.DoubleSide}
        opacity={0}
        alphaTest={0.5}/>
</T.Mesh>
    {#if $pageState == 'weapons'}
        <T.Mesh
            in={fadeIn}
            out={fadeOut}
            bind:ref={logo}
            position={[position[0], position[1], position[2] - 0.01]}
            scale={0.2}>
            <T.PlaneGeometry/>
            <T.MeshStandardMaterial
                map={map}
                emissiveMap={map}
                emissive={new THREE.Color(0xffffff)}
                side={THREE.DoubleSide}
                emissiveIntensity={2}
                alphaTest={0.5}
                transition={fadeOut}/>
        </T.Mesh>
    {/if}
{/await}
<!-- <T.PointLight
intensity={161.5}
distance={0.5}
position={[0.21 ,1.65,0.8]}
/> -->
