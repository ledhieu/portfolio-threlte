<script lang="ts">
    import { T, useRender, useThrelte, extend, } from '@threlte/core'
    import { ContactShadows, Float, Grid, OrbitControls, 
        interactivity, HTML,
        Environment, useTexture } from '@threlte/extras'

    // import Me4 from '$lib/components/models/Me4.svelte'
    // import MeWhite from '$lib/components/models/Me_white.svelte'
    // import MeBlack from '$lib/components/models/Me_black.svelte'
    import BlackKatana from './models/Black_katana.svelte';

    import * as THREE from 'three'

    import { darkMode } from '../character';
    import CustomRenderer from './CustomRenderer.svelte';


    let ground, groundMaterial, groundMounted = false;
    // let groundColor = new THREE.Color(0xa6a6a6)
    const blue = new THREE.Color(0x0B2391)
    const purple = new THREE.Color(0x6D1AC3)
    const teal = new THREE.Color(0x0E7987)
    const grey = new THREE.Color(0x7B7D82)
    const white = new THREE.Color(0xffffff)
    const lightTeal = new THREE.Color(0x6AFFE4)
    const orange = new THREE.Color(0xffb577)
    const darkModeGround = new THREE.Color(0x111111)
    const lightModeGround = new THREE.Color(0xdddddd)
    // let groundColor = new THREE.Color(0x0000000)
    $: groundColor = $darkMode ? darkModeGround : lightModeGround
    $: gridColor = $darkMode ? '#333333' : '#ffffff'
    $: console.log($darkMode)
    const { scene, camera, renderer } = useThrelte();
    
    let ref;
    renderer.toneMapping = THREE.ReinhardToneMapping 
        
    $: {
        if(ground && !groundMounted){
        console.log('new', ground)
        // groundMaterial = new MeshReflectorMaterial(renderer, $camera, scene, ground, {
        //   resolution: 1024,
        //   blur: [100, 10],
        //   mirror: 0,
            
        //   mixBlur: 0,
        //   mixStrength: 1,
        //   minDepthThreshold: 0.85,
        //   color: groundColor,
        //   roughness: 1
        // });
        // groundMaterial.color = groundColor
        scene.background = groundColor
        console.log('scene', scene)
        groundMounted = true;
        }
    }
    $: {
        if(scene)
        scene.background = groundColor
        if(groundMaterial)
        groundMaterial.color = groundColor
    }
</script>
  <CustomRenderer/>
<T.PerspectiveCamera
    makeDefault
    position={[0, 2.5, 3]}
    fov={15}
>
<OrbitControls
  autoRotate
  enableZoom={true}
  enableDamping
  autoRotateSpeed={0}
  target.y={1.5}
/>
</T.PerspectiveCamera>

<HTML
    position.x={0.75}
    scale={0.1}
    transform
    pointerEvents="none"
>
<div class="iframe-container">
  <iframe src="/lottie/hudcircle" width="100%" height="100%"></iframe>
</div>

</HTML>

<T.SpotLight
intensity={22}
position={[ -11,4, -19]}
target={ref}
penumbra={0}
color={$darkMode ? grey : white}
angle={Math.PI/4}
decay={5}
>
<!-- <T.SpotLightHelper/> -->
</T.SpotLight>

<!-- Right light -->
<T.SpotLight
intensity={22}
position={[ 11, 4, -19]}
penumbra={0}
angle={Math.PI/4}
target={ref}
color={$darkMode ? teal : lightTeal}
decay={5}
>
<!-- <T.SpotLightHelper/> -->
</T.SpotLight>



<T.PointLight
position={[0, 0.5, 3]}
intensity={2.5}

/>


<T.DirectionalLight
intensity={1.8}
position.x={5}
position.y={10}
/>
<!-- <T.AmbientLight intensity={0.26} /> -->

<Grid
position.y={-0.001}
cellColor={gridColor}
sectionColor={gridColor}
sectionThickness={0}
fadeDistance={20}
cellSize={1}
/>

<ContactShadows
scale={4}
blur={1}
far={3.5}
opacity={0.6}
/>

  <BlackKatana bind:ref/>
    <T.SphereGeometry args={[0.5]} />
    
   

<style>
    .iframe-container{
        width: 100vw;
        height: 100vh;
    }
</style>