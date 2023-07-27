<script>
  import { T, useRender, useThrelte, extend, useLoader } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, 
    interactivity, HTML,
    Environment, useTexture } from '@threlte/extras'
  import { Editable } from '@threlte/theatre'
  
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  // import Me4 from '$lib/components/models/Me4.svelte'
  // import MeWhite from '$lib/components/models/Me_white.svelte'
  // import MeBlack from '$lib/components/models/Me_black.svelte'
  import BlackKatana from './models/Black_katana.svelte';
  import MeKatana_2ver from './models/Me_katana_2ver.svelte';
  import * as THREE from 'three'
  import PostProcessingRenderer from './PostProcessingRenderer.svelte';
  import CustomRenderer from './CustomRenderer.svelte';
  import { onMount, getContext } from 'svelte';
  import { gsap } from 'gsap'

  const pageState = getContext('pageState')
  const { scene, camera, renderer } = useThrelte();
  const darkMode = getContext('darkMode')

  // Animation section
  let grid;
  let leftLight, rightLight, pointLight, orbitControls
  $: {
    console.log($pageState)
    if(leftLight && rightLight && pointLight && $camera){
      if($pageState == 'loading'){gsap.to($camera.position, { x: 0, y: 1.3, z: -1.8, duration: 4, ease: 'power4.inOut' })
        gsap.to($camera.position, { x: 0, y: 121.3, z: -121.8, duration: 4, ease: 'power4.inOut' })  
        //  fov not working
        gsap.to($camera, { fov: 2, duration: 4, ease: 'power4.inOut' })
        gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 0, duration: 4, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 4, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: 4, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: 4, ease: 'power4.inOut' })
      } else if($pageState == 'intro'){
        gsap.to($camera.position, { x: 0, y: 1.3, z: -1.8, duration: 4, ease: 'power4.inOut' })
        gsap.to($camera, { fov: 35, duration: 4, ease: 'power4.inOut' })
        gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 0, duration: 4, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 4, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: 4, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: 4, ease: 'power4.inOut' })
        gsap.to(ref.rotation, { y: 0, duration: 4, ease: 'power4.inOut' })
        if(hudCircleMesh)
          gsap.to(hudCircleMesh.rotation, { y: 0, duration: 4, ease: 'power4.inOut' })
      } else if ($pageState == 'character'){
        gsap.to($camera.position, { x: 1.2, y: 1, z: 2.8, duration: 4, ease: 'power4.inOut' })
        gsap.to(orbitControls.target, { x: 1.2, y: 1, z: 0, duration: 4, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -29, y: 1, z: -19, duration: 4, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 0, y: 1, z: -19, duration: 4, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 1.5, z: 1.5, duration: 4, ease: 'power4.inOut' })
        gsap.to(ref.rotation, { y: Math.PI/9, duration: 4, ease: 'power4.inOut' })
        if(hudCircleMesh)
          gsap.to(hudCircleMesh.rotation, { y: Math.PI + Math.PI/9, duration: 4, ease: 'power4.inOut' })
      } else {
        target = {x: 0, y: 1.3, z: 0}
      }
    }
  }

  $: {
    if(leftLight && rightLight && pointLight && scene ){
      console.log('gridcolor', gridColor  )
      if($darkMode){
        // orange2
        gsap.to(leftLight.color, { r: 0.7912979403281553, g: 0.057805430183792694, b: 0.007499032040460618, duration: 1, ease: 'power4.inOut'})
        // purple
        gsap.to(rightLight.color, { r: 0.15292615198613213, g: 0.010329823026364548, b: 0.5457244613615395, duration: 1, ease: 'power4.inOut'})
        // purple
        gsap.to(pointLight.color, { r: 0.15292615198613213, g: 0.010329823026364548, b: 0.5457244613615395, duration: 1, ease: 'power4.inOut'})
        // 
        gsap.to(groundColor, { r: 0.0018211619011764706, g: 0, b: 0.008568125615105716, duration: 1, ease: 'power4.inOut'})
        // 
    
        gsap.to(gridColor, { r: 0.266666, g: 0.26666, b: 0.266666, duration: 1, ease: 'power4.inOut', onUpdate: () => {

        }})
      } else {
        // white
        gsap.to(leftLight.color, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut'})
        // orange2
        gsap.to(rightLight.color, { r: 0.7912979403281553, g: 0.057805430183792694, b: 0.007499032040460618, duration: 1, ease: 'power4.inOut'})
        // white
        gsap.to(pointLight.color, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut'})
        //
        gsap.to(groundColor, { r: 0.6038273388475408, g: 0.6038273388475408, b: 0.6038273388475408, duration: 1, ease: 'power4.inOut'})
        //
        gsap.to(gridColor, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut', onUpdate: () => {
          // update loop
        }})
      }
    }
  }

  let hudCircle, hudCircleMesh, hudCircleMaterial, 
  hudCircleTexture, hudGraphTexture;
  const hudGraphElement = getContext('hudGraph')
  const hudCircleElement = getContext('hudCircle')

  $: console.log($hudGraphElement)
  $: console.log($hudCircleElement)

  let ground, groundMaterial, groundMounted = false;
  // let groundColor = new THREE.Color(0xa6a6a6)
  const blue = new THREE.Color(0x0B2391)
  const purple = new THREE.Color(0x6D1AC3)
  const teal = new THREE.Color(0x0E7987)
  const grey = new THREE.Color(0x7B7D82)
  const white = new THREE.Color(0xffffff)
  const lightTeal = new THREE.Color(0x6AFFE4)
  const orange = new THREE.Color(0xffb577)
  const orange2 = new THREE.Color(0xE64415)
  const darkModeGround = new THREE.Color(0x060017)
  const lightModeGround = new THREE.Color(0xcccccc)
  let groundColor = lightModeGround;
  let gridColor = new THREE.Color(0xffffff)
  // let groundColor = new THREE.Color(0x0000000)
  // $: groundColor = $darkMode ? darkModeGround : lightModeGround
  $: console.log($darkMode)
  
  
  let ref;
  renderer.toneMapping = THREE.CineonToneMapping 
    
  // $: {
  //   if(ground && !groundMounted){
  //     console.log('new', ground)
  //     // groundMaterial = new MeshReflectorMaterial(renderer, $camera, scene, ground, {
  //     //   resolution: 1024,
  //     //   blur: [100, 10],
  //     //   mirror: 0,
        
  //     //   mixBlur: 0,
  //     //   mixStrength: 1,
  //     //   minDepthThreshold: 0.85,
  //     //   color: groundColor,
  //     //   roughness: 1
  //     // });
  //     // groundMaterial.color = groundColor
  //     scene.background = groundColor
  //     console.log('scene', scene)
  //     groundMounted = true;
  //   }
  // }
  $: {
    if(scene)
      console.log(scene.background)
      scene.background = groundColor
    if(groundMaterial)
      groundMaterial.color = groundColor
  }

  $: {
    if($hudGraphElement && !hudGraphTexture){
      hudGraphTexture = new THREE.VideoTexture( $hudGraphElement );
      hudGraphTexture.format = THREE.RGBAFormat
    }
  }
  $: {
    if($hudCircleElement && !hudCircleTexture){
      hudCircleTexture = new THREE.VideoTexture( $hudCircleElement );
      // hudTexture.format = THREE.RGBAFormat
    }
  }
  // $: {
  //   if(renderer){
  //     renderer.toneMapping = $darkMode ? THREE.ACESFilmicToneMapping : THREE.ReinhardToneMapping
  //   }
  // }
  onMount(() => {
    window.addEventListener('resize', () => {
      resize()
    })
    resize()

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      $camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight
      $camera.updateProjectionMatrix()
      // renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMapping = THREE.ReinhardToneMapping
    }
  })
  onMount(async () => {
    

    // holy shit what a hack
    const { LottieLoader } = await import ('three/examples/jsm/loaders/LottieLoader')
    const lottieLoader = new LottieLoader()
    lottieLoader.load('/lottie/bodymovin1.json', texture => {
      console.log(texture)
      hudCircle = texture
      
      texture.animation.play()
    })
    
    // const hudPlane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(2, 2),
    //   new THREE.MeshBasicMaterial({ map: hudTexture })
    // )
    // hudPlane.position.y = 1
    // hudPlane.position.z = -1
    // scene.add(hudPlane)

    // const oCanvasImg = renderer.domElement;
    // console.log(oCanvasImg)
		// const oCanvas = document.createElement( 'canvas' );
		// if ( ! oCanvas.getContext ) {
		// 	return;
		// }
		// const oCtx = oCanvas.getContext( '2d' );
		// if ( ! oCtx.getImageData ) {
		// 	return;
		// }
    // let iWidth = window.innerWidth;
    // let iHeight = window.innerHeight
    // document.body.appendChild(oCanvas)
    // oCanvas.style.position = 'fixed'
    // oCanvas.style.zIndex = 10000000
    // oCanvas.style.border = "1px solid black"
    // oCanvas.style.width = iWidth
    // oCanvas.style.height = iHeight
    
    // testRender = () => {
    //   oCtx.clearRect( 0, 0, iWidth, iHeight );
    //   oCtx.drawImage( oCanvasImg, 0, 0, iWidth, iHeight );
    //   const oImgData = oCtx.getImageData( 0, 0, iWidth, iHeight ).data;
      
    //   const polarized = oImgData.map(_ => _ > 10 ? 255 : 0)
  
    // }
    
  
  })
  let testRender = () => {}
  
</script>

<svelte:head>
    <!-- <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> -->

</svelte:head>

<!-- <PostProcessingRenderer/> -->
<CustomRenderer/>
<!-- <CameraAnimation/> -->
<T.PerspectiveCamera
  makeDefault
>
<!-- <Editable name="Camera" transform controls fov/> -->
<OrbitControls
  autoRotate
  enableRotate={false}
  enableZoom={false}
  enablePan={false}
  enableDamping
  autoRotateSpeed={0}
  bind:ref={orbitControls}
/>
</T.PerspectiveCamera>

<!-- <HTML
    position.x={0}
    position.z={-1}
    position.y={1}
    scale={0.1}
    transform
    pointerEvents="none"
>
<div class="iframe-container">
  <lottie-player src={"/lottie/bodymovin1.json"} background="transparent"  speed="2"  style="width: 100%; height: 100vh" loop autoplay></lottie-player>
</div>

</HTML> -->

<!-- HUD Graph -->
<!-- <T.Mesh
  position.y={1}
  position.z={0.5}
  rotation.y={Math.PI}>
  <T.PlaneGeometry args={[5.5, 3.5]}
    />
  <T.MeshStandardMaterial 
    map={hudGraphTexture}
    emissiveMap={hudGraphTexture}
    emissiveColor={0xffffff}
    emissiveIntensity={10.8}
    alphaMap={hudGraphTexture}
    side={THREE.DoubleSide}
    blending={THREE.AdditiveBlending}
    alphaTest={0.1}
    transparent={true}
    />
</T.Mesh> -->

<!-- HUD Circle -->
<!-- Custom Blending ref: https://threejs.org/examples/#webgl_materials_blending_custom -->
{#if $pageState == 'character'}
<T.Mesh
  position.y={1}
  position.z={-0.5}
  rotation.y={Math.PI}
  bind:ref={hudCircleMesh}>
  <T.PlaneGeometry args={[6, 3.5]}
    />
  <T.MeshStandardMaterial 
    map={hudCircleTexture}
    emissiveMap={hudCircleTexture}
    emissiveColor={$darkMode ? white : orange2}
    emissiveIntensity={1.1}
    blending={$darkMode ? THREE.NormalBlending : THREE.AdditiveBlending}
    blendEquation={THREE.AddEquation}
    blendSrc={THREE.OneFactor}
    blendDst={THREE.DstAlphaFactor}
    alphaMap={hudCircleTexture}
    side={THREE.DoubleSide}
    alphaTest={0.3}
    color={$darkMode ? white : orange2}
    transparent={true}
    />
</T.Mesh>
{/if}


<!-- Left light -->
<!-- position={[ -11,4, -19]} -->
<T.SpotLight
  intensity={22}
  target={ref}
  penumbra={0}
  angle={Math.PI/4}
  decay={5}
  bind:ref={leftLight}
>
<!-- <Editable name="Left Light" transform controls /> -->
  <!-- <T.SpotLightHelper/> -->
</T.SpotLight>

<!-- Right light -->
<!-- position={[ 11, 4, -19]} -->
<T.SpotLight
  intensity={22}
  penumbra={0}
  angle={Math.PI/4}
  target={ref}
  decay={5}
  bind:ref={rightLight}
>
<!-- <Editable name="Right Light" transform controls /> -->
  <!-- <T.SpotLightHelper/> -->
</T.SpotLight>



<!-- position={[0, 0.5, 3]} -->

<T.PointLight
intensity={$darkMode ? 4 : 1.5}
bind:ref={pointLight}
>
<!-- <Editable name="Point Light" transform controls /> -->
</T.PointLight>


<T.DirectionalLight
  intensity={0}
  position.x={5}
  position.y={10}
/>
<!-- <T.AmbientLight intensity={0.26} /> -->

<Grid
  position.y={-0.001}
  cellColor={gridColor}
  sectionColor={gridColor}
  bind:ref={grid}
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

<MeKatana_2ver bind:ref/>
<!-- <MeBlack/> -->

<!-- <Environment path="/" files="studio_small_09_1k.hdr" isBackground={false}/> -->

<!-- <T.Mesh bind:ref={ground}
rotation={[-Math.PI/2, 0, 0]}
>
  <T.PlaneBufferGeometry args={[220, 220]}/>
  <T.MeshLambertMaterial/>
</T.Mesh> -->

<style>
</style>