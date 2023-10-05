<script>
    import { T, useRender, useThrelte, extend, useLoader, useFrame } from '@threlte/core'
    import { getContext } from 'svelte';
    import { TextureLoader } from 'three'
    import * as THREE from 'three'

    const { load } = useLoader(TextureLoader)
    
    const position = [0.21 ,1.67,0.67]
    const range = 0.5
    const base = 1.67
    const activeWeapon = getContext('activeWeapon')
    
    $: imageUrl = $activeWeapon && $activeWeapon.mainImage ? $activeWeapon.mainImage : '/sveltekit.svg'

    useFrame(() => {
        position[1] = Math.sin(currentTime() / 1000 ) * range / 30 + base
    })

    function currentTime () {
        return Date.now()
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
        alphaTest={0.5}/>
</T.Mesh>
<T.Mesh
    position={[position[0], position[1], position[2] - 0.01]}
    scale={0.2}>
    <T.PlaneGeometry/>
    <T.MeshStandardMaterial
        map={map}
        emissiveMap={map}
        emissive={new THREE.Color(0xffffff)}
        side={THREE.DoubleSide}
        emissiveIntensity={600000}
        alphaTest={0.5}/>
</T.Mesh>
{/await}
<!-- <T.PointLight
intensity={161.5}
distance={0.5}
position={[0.21 ,1.65,0.8]}
/> -->
