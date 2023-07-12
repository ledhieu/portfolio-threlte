<script>
  import { T, useRender, useThrelte, extend } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, Environment, useTexture } from '@threlte/extras'
  import Character from './Character.svelte';
  import Me4 from '$lib/components/models/Me4.svelte'
  import MeWhite from '$lib/components/models/Me_white.svelte'
  import MeBlack from '$lib/components/models/Me_black.svelte'
  import MeshReflectorMaterial from '$lib/MeshReflectorMaterial'
  import * as THREE from 'three'
  import { onMount } from 'svelte';
  import { SSGIEffect, VelocityDepthNormalPass } from "realism-effects"
  import { EffectComposer, EffectPass, RenderPass, NoiseEffect, BloomEffect } from "postprocessing"
  import { darkMode } from '../character';
  import PostProcessingRenderer from './PostProcessingRenderer.svelte';
  import { useFrame } from '@threlte/core'
  import CameraAnimation  from './CameraAnimation.svelte';
  import { get, writable } from 'svelte/store';
  import { interactivity } from '@threlte/extras'
  interactivity()

  let ground, groundMaterial, attachedGround = false;
  let groundColor = new THREE.Color(0xa6a6a6)
  $: groundColor.set($darkMode ? 0x0000000 : 0xa6a6a6)
  const { scene, camera, renderer } = useThrelte();
  
  let ref;
  renderer.toneMapping = THREE.ReinhardToneMapping 
    
  $: {
    if(ground && !attachedGround){
      console.log('new', ground)
      groundMaterial = new MeshReflectorMaterial(renderer, $camera, scene, ground, {
        resolution: 1024,
        blur: [100, 10],
        mirror: 0,
        // roughness: 1,
        mixBlur: 0,
      });
      groundMaterial.color = groundColor
      scene.background = groundColor
      console.log('scene', scene)
      attachedGround = true;
    }
  }

 
  extend({ MeshReflectorMaterial })
  useRender(({ scene, camera }, delta) => {
    if(ground && ground.material)
      ground.material.update()
      renderer.render(scene, camera.current)
  })

  // Point light animation

  let pointLight, pointLightObserver;
  const pointLightKey = writable('default');
  const POINT_LIGHT_STATES = {
    default: { intensity: 0},
    active: { intensity: 3}
  }
  // $: {
  //   pointLightObserver = watchFor(pointLight, POINT_LIGHT_STATES, pointLightKey)
  // }

  // Spotlight 1 animation
  
  let spotLight1, spotLight1Observer;
  const spotLight1Key = writable('default');
  const SPOT_LIGHT_1_STATES = {
    default: { intensity: 0},
    active: { intensity: 30}
  }
  $: {
    console.log('attaching watchfor')
    spotLight1Observer = observe(spotLight1, SPOT_LIGHT_1_STATES, spotLight1Key, { acceleration: 0.005})
  }


  // Spotlight 2 animation
  
  let spotLight2, spotLight2Observer;
  const spotLight2Key = writable('default');
  const SPOT_LIGHT_2_STATES = {
    default: { intensity: 0},
    active: { intensity: 30}
  }
  $: {
    console.log('attaching watchfor')
    spotLight2Observer = observe(spotLight2, SPOT_LIGHT_2_STATES, spotLight2Key, { acceleration: 0.005})
  }

  setTimeout(() => {
    $spotLight1Key = 'active'
    $spotLight2Key = 'active'
  }, 500)
  
  
  
  function observe(ref, stateDictionary, key, props={
      acceleration: 0.02, 
      autoStart: true
  }){
    
    const { acceleration, autoStart } = props
    const { start, stop, started } = useFrame(
        () => {
          if(!ref || !key){
            stop()
            return;
          }
          const entries = Object.entries(stateDictionary[get(key)])
          for(let [_key, _value] of entries){
            // console.log(ref[_key])
            if(ref[_key] == undefined)
              continue;
            ref[_key] += (_value - ref[_key]) * acceleration
            // console.log(ref[_key])
          }
        },
        {
            autostart: autoStart
        }
    )
    return { start, stop, started }
  }
</script>

<PostProcessingRenderer/>
<CameraAnimation/>
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

<!-- Left light -->
<T.SpotLight
  intensity={0}
  position={[ -4,-1, -4]}
  target={ref}
  penumbra={0}
  bind:ref={spotLight1}
  angle={Math.PI/4}
>
  <!-- <T.SpotLightHelper/> -->
</T.SpotLight>

<!-- Right light -->
<T.SpotLight
  intensity={0}
  position={[ 4, -1, -4]}
  penumbra={0}
  bind:ref={spotLight2}
  angle={Math.PI/4}
  target={ref}
>
  <!-- <T.SpotLightHelper/> -->
</T.SpotLight>

<T.PointLight
  position={[0, 3, 4]}
  intensity={0}
  bind:ref={pointLight}
/>


<!-- <T.DirectionalLight
  intensity={1.8}
  position.x={5}
  position.y={10}
/> -->
<!-- <T.AmbientLight intensity={0.26} /> -->

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>

<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/> -->


<MeWhite bind:ref/>
<!-- <MeBlack/> -->

<!-- <Environment path="/" files="studio_small_09_1k.hdr" isBackground={false}/> -->

<T.Mesh bind:ref={ground}
rotation={[-Math.PI/2, 0, 0]}
material={groundMaterial}
>
<!-- Important: $camera and not camera -->
  <T.PlaneBufferGeometry args={[220, 220]}/>
</T.Mesh>
