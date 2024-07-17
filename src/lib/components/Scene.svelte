<script>
  import { T, useRender, useThrelte, extend, useLoader, useFrame } from '@threlte/core'
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
  import Crystal from './models/Crystal.svelte'
  import * as THREE from 'three'
  import PostProcessingRenderer from './PostProcessingRenderer.svelte';
  import CustomRenderer from './CustomRenderer.svelte';
  import { onMount, getContext } from 'svelte';
  import { gsap } from 'gsap'
  import { CustomEase } from "gsap/dist/CustomEase";
  import Logo from '$lib/components/Logo.svelte'
  import { transitions } from '@threlte/extras'

  gsap.registerPlugin(CustomEase);
  transitions()

  const pageState = getContext('pageState')
  const { scene, camera, renderer } = useThrelte();
  const darkMode = getContext('darkMode')

  let innerWidth;

  // Animation section
  let grid;
  let leftLight, rightLight, pointLight, orbitControls
  $: {
    console.log($pageState)
    if(leftLight && rightLight && pointLight && $camera){
      if($pageState == 'loading'){
        // gsap.to($camera.position, { x: 0, y: 121.3, z: -121.8, duration: 0.001, ease: 'power4.inOut' })  
        // //  needs to update projection matrix
        // gsap.to($camera, { fov: 10, duration: 0.11, ease: 'power4.inOut', onUpdate: () => {
        //   $camera.updateProjectionMatrix()
        // } })
        // gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 0, duration: 0.001, ease: 'power4.inOut' })
        // gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 0.1, ease: 'power4.inOut' })
        // gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: .1, ease: 'power4.inOut' })
        // gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: .1, ease: 'power4.inOut' })
      } else if($pageState == '' ){
        gsap.to($camera.position, { x: 0, y: 1.3, z: -1.8, duration: 4, ease: 'power4.inOut' })
        gsap.to($camera, { fov: 50, duration: 4, ease: 'power4.inOut', onUpdate: () => {
          $camera.updateProjectionMatrix()
        } })
        gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 0, duration: 3, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 3, delay: 0.5, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: 3, delay: 0.5, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: 3, delay: 0.5, ease: 'power4.inOut' })
        gsap.to(ref.rotation, { y: 0, duration: 4, ease: 'power4.inOut' })
      } else if ($pageState == 'character'){
        
        if(innerWidth >= 1024){
          // PC
          gsap.to($camera, { fov: 20, duration: 4, ease: 'power4.inOut', onUpdate: () => {
            $camera.updateProjectionMatrix()
          } })
          gsap.to($camera.position, { x: 2, y: 2, z: 8, duration: 4, ease: 'power4.inOut' })
          gsap.to(orbitControls.target, { x: 1.4, y: 1, z: 0, duration: 3.6, ease: 'power4.inOut' })
        } else {
          // Mobile
          gsap.to($camera, { fov: 20, duration: 4, ease: 'power4.inOut', onUpdate: () => {
            $camera.updateProjectionMatrix()
          } })
          gsap.to($camera.position, { x: 0, y: 2, z: 12, duration: 4, ease: 'power4.inOut' })
          // Look down
          gsap.to(orbitControls.target, { x: 0, y: 0.3, z: 0, duration: 3.6, ease: 'power4.inOut' })
        }
        gsap.to(leftLight.position, { x: -29, y: 1, z: -19, duration: 3.6, delay: 0, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: -19, duration: 3.6, delay: 0, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 1.5, z: 1.5, duration: 3.6, delay: 0, ease: 'power4.inOut' })
        gsap.to(ref.rotation, { y: Math.PI/15, duration: 4, ease: 'power4.inOut' })
      } else if ($pageState == 'weapons'){
        if(innerWidth >= 1024){
          gsap.to($camera.position, { x: -0.2889295559274839, y: 1.6991697557237377, z: 2.252411906431398, duration: 2.2, ease: 'power4.inOut' })
          gsap.to(orbitControls.target, { x: 0.3567704440725213, y: 1.5961697557237375, z: 0.4814119064313902, duration: 2.2, ease: 'power4.inOut' })
        } else {
          gsap.to($camera.position, { x: -0.2889295559274839, y: 1.63, z: 2.252411906431398, duration: 3.2, ease: 'power4.inOut' })
          gsap.to(orbitControls.target, { x: 1.2767704440725213, y: 1.5261697557237375, z: 0.4814119064313902, duration: 2.2, ease: 'power4.inOut' })
        }
        
        gsap.to($camera, { fov: 20, duration: 3, ease: 'power4.inOut', onUpdate: () => {
          $camera.updateProjectionMatrix()
        } })
       
        gsap.to(leftLight.position, { x: -5, y: 1, z: -19, duration: 3.2, delay: 0, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 19, y: 1, z: -19, duration: 3.2, delay: 0, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 1.6, z: 1.2, duration: 3.2, delay: 0, ease: 'power4.inOut' })
        gsap.to(ref.rotation, { y: Math.PI/15, duration: 4, ease: 'power4.inOut' })
      } else if($pageState == 'adventures'){
        gsap.to($camera.position, { x: 0, y: 121.3, z: -121.8, duration: 3.6, ease: 'power4.inOut' })  
        //  needs to update projection matrix
        gsap.to($camera, { fov: 10, duration: 3.6, ease: 'power4.inOut', onUpdate: () => {
          $camera.updateProjectionMatrix()
        } })
        gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 45, duration: 3.6, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 3.6, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: 3.6, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: 3.6, ease: 'power4.inOut' })
      } else if($pageState == 'contact'){
        gsap.to($camera.position, { x: 0, y: 1.3, z: -4.8, duration: 4, ease: 'power4.inOut' })
        gsap.to($camera, { fov: 20, duration: 4, ease: 'power4.inOut', onUpdate: () => {
          $camera.updateProjectionMatrix()
        } })
        gsap.to(orbitControls.target, { x: 0.9, y: 1.3, z: 0, duration: 3, ease: 'power4.inOut' })
        gsap.to(leftLight.position, { x: -9, y: 1, z: 19, duration: 3, delay: 0.5, ease: 'power4.inOut' })
        gsap.to(rightLight.position, { x: 9, y: 1, z: 19, duration: 3, delay: 0.5, ease: 'power4.inOut' })
        gsap.to(pointLight.position, { x: 0, y: 5, z: -2, duration: 3, delay: 0.5, ease: 'power4.inOut' })
      } else {
        gsap.to(orbitControls.target, { x: 0, y: 1.3, z: 0, duration: 3, ease: 'power4.inOut' })
      }
    }
  }

  $: {
    if(hudCircleMesh && scribblesMesh){
      let customEase = CustomEase.create("custom", "M0,0,C0.06,0.093,0.128,0.5,0.128,0.5,0.128,0.5,0.149,0.323,0.178,0.232,0.183,0.215,0.23,0.08,0.23,0.08,0.23,0.08,0.255,0.084,0.256,0.092,0.263,0.159,0.276,0.48,0.308,0.624,0.315,0.658,0.334,0.276,0.373,0.732,0.373,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.434,0.77,0.434,0.77,0.467,0.646,0.436,0.246,0.48,0.274,0.495,0.283,0.503,0.344,0.51,0.425,0.522,0.57,0.53,0.78,0.564,0.866,0.565,0.87,0.6,0.936,0.602,0.94,0.62,0.978,0.641,0.541,0.663,0.56,0.699,0.59,0.691,0.849,0.732,0.982,0.75,1.043,0.753,0.752,0.776,0.714,0.778,0.71,0.787,0.851,0.795,0.886,0.8,0.908,0.818,0.827,0.82,0.828,0.832,0.836,0.831,0.911,0.844,0.924,0.871,0.949,0.862,0.815,0.888,0.828,0.899,0.833,0.897,0.937,0.914,0.968,0.926,0.99,0.942,0.899,0.957,0.906,0.976,0.914,0.993,1,1,1")
      let scribblesEase = CustomEase.create("custom", "M0,0,C0,0,0.095,0.471,0.182,0.558,0.236,0.612,0.276,0.119,0.346,0.156,0.417,0.193,0.358,0.754,0.432,0.83,0.474,0.873,0.504,0.377,0.547,0.35,0.55,0.348,0.597,0.43,0.6,0.432,0.638,0.449,0.592,0.872,0.634,0.912,0.649,0.926,0.649,0.795,0.664,0.75,0.68,0.698,0.712,0.932,0.73,0.938,0.761,0.948,0.749,0.866,0.78,0.874,0.791,0.92,0.806,0.981,0.844,1,0.867,1.011,0.86,0.942,0.886,0.942,0.904,0.941,0.914,0.987,0.936,1,0.963,1.016,1,1,1,1")
      if($pageState == 'character' && $darkMode){
        gsap.to(scribblesMesh.material, { opacity: 1, duration: 1, delay: 0.8, ease: scribblesEase })
        gsap.to(hudCircleMesh.material, { opacity: 0, duration: 1, ease: customEase})
      } else if ($pageState == 'character' && !$darkMode){
        gsap.to(hudCircleMesh.material, { opacity: 1, duration: 1, delay: 0.8, ease: customEase})
        gsap.to(scribblesMesh.material, { opacity: 0, duration: 1, ease: scribblesEase })
      } else {
        gsap.to(scribblesMesh.material, { opacity: 0, duration: 1, ease: scribblesEase })
        gsap.to(hudCircleMesh.material, { opacity: 0, duration: 1, ease: customEase})
      }
    }
  }

  $: {
    if(leftLight && rightLight && pointLight && scene ){
      if($darkMode){
        // orange2
        gsap.to(leftLight.color, { r: 11/255, g: 35/255, b: 145/255, duration: 1, ease: 'power4.inOut'})
        // blue
        gsap.to(rightLight.color, { r: 11/255, g: 35/255, b: 145/255, duration: 1, ease: 'power4.inOut'})
        // blue
        gsap.to(pointLight.color, { r: 5/255, g: 5/255, b: 5/255, duration: 1, ease: 'power4.inOut'})
        gsap.to(pointLight, { intensity: 5, duration: 1, ease: 'power4.inOut'})
        // 
        gsap.to(groundColor, { r: 0.25/255, g: 0.33333/255, b: 0.6666/255, duration: 1, ease: 'power4.inOut'})
        // gsap.to(groundColor, { r: 0.7912979403281553, g: 0.057805430183792694, b: 0.007499032040460618, duration: 1, ease: 'power4.inOut'})
        // 
        // gsap.to(gridColor, { r: 0, g: 0, b: 0,  duration: 1, ease: 'power4.inOut'})
        gsap.to(grid.material.uniforms.uColor1.value, { r: 15/255, g: 23/255, b: 42/255,  duration: 1, ease: 'power4.inOut'})
      } else {
        // white
        gsap.to(leftLight.color, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut'})
        // orange2
        gsap.to(rightLight.color, { r: 0.7912979403281553, g: 0.057805430183792694, b: 0.007499032040460618, duration: 1, ease: 'power4.inOut'})
        // white
        gsap.to(pointLight.color, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut'})
        gsap.to(pointLight, { intensity: 1.5, duration: 1, ease: 'power4.inOut'})
        //
        // old gray color
        gsap.to(groundColor, { r: 0.6038273388475408, g: 0.6098273388475408, b: 0.6168273388475408, duration: 1, ease: 'power4.inOut'})
        // gsap.to(groundColor, { r: 1, g: 1, b: 1, duration: 1, ease: 'power4.inOut'})
        // #B5BDC7 - new light blue gray
        // gsap.to(groundColor, { r: 181/255, g: 189/255, b: 199/255, duration: 1, ease: 'power4.inOut'})
        //
        // gsap.to(gridColor, { r: 0, g: 0, b: 0,  duration: 1, ease: 'power4.inOut'})
        gsap.to(grid.material.uniforms.uColor1.value, { r: 0.7, g: 0.7, b: 0.7,  duration: 1, ease: 'power4.inOut'})
      }
    }
  }

  let hudCircle, hudCircleMesh, hudCircleMaterial, 
  hudCircleTexture, hudGraphTexture;
  let scribblesMesh;
  let scribbleAllTexture,
  scribble1Texture, scribble2Texture,
  scribble3Texture, scribble4Texture,
  scribble5Texture, scribble6Texture
  const hudGraphElement = getContext('hudGraph')
  const hudCircleElement = getContext('hudCircle')
  const scribbleAllElement = getContext('scribbleAll')
  // const scribble1Element = getContext('scribble1')
  // const scribble2Element = getContext('scribble2')
  // const scribble3Element = getContext('scribble3')
  // const scribble4Element = getContext('scribble4')
  // const scribble5Element = getContext('scribble5')
  // const scribble6Element = getContext('scribble6')


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
  const lightModeGround = new THREE.Color(0xcccecf) // true gray
  // const lightModeGround = new THREE.Color(0xB5BDC7) // blue-ish gray
  let groundColor = lightModeGround;
  const darkGrid = new THREE.Color(0x333333)
  const lightGrid = new THREE.Color(0x888888)
  // let groundColor = new THREE.Color(0x0000000)
  // $: groundColor = $darkMode ? darkModeGround : lightModeGround

  
  
  let ref;
  // renderer.toneMapping = THREE.CineonToneMapping 
    
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
  $: {
    if($scribbleAllElement && !scribbleAllTexture){
      scribbleAllTexture = new THREE.VideoTexture( $scribbleAllElement );
      // scribble1Texture.format = THREE.RGBAFormat
    }
  }
  // $: {
  //   if(renderer){
  //     renderer.toneMapping = $darkMode ? THREE.ACESFilmicToneMapping : THREE.ReinhardToneMapping
  //   }
  // }

  useFrame(() => {
    if($camera && orbitControls){
      // console.log($camera.position, orbitControls.target)
    }
  })
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
    // const { LottieLoader } = await import ('three/examples/jsm/loaders/LottieLoader')
    // const lottieLoader = new LottieLoader()
    // lottieLoader.load('/lottie/bodymovin1.json', texture => {
    //   console.log(texture)
    //   hudCircle = texture
      
    //   texture.animation.play()
    // })
    
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
  
</script>

<svelte:head>
    <!-- <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> -->

</svelte:head>

<svelte:window bind:innerWidth></svelte:window>

<!-- <PostProcessingRenderer/> -->
<!-- <CustomRenderer/> -->
<!-- <CameraAnimation/> -->
<T.PerspectiveCamera
  makeDefault
  position={ [0, 121.3, -121.8]}
  fov={10}
>
<!-- <Editable name="Camera" transform controls fov/> -->
<OrbitControls
  autoRotate
  enableRotate={true}
  enableZoom={true}
  enablePan={true}
  enableDamping
  autoRotateSpeed={0}
  fov={10}
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
    emissiveColor={$darkMode ? white : white}
    emissiveIntensity={10.1}
    blending={THREE.AdditiveBlending}
    blendEquation={THREE.AddEquation}
    blendSrc={THREE.OneFactor}
    blendDst={THREE.DstAlphaFactor}
    alphaMap={hudCircleTexture}
    side={THREE.DoubleSide}
    alphaTest={0.3}
    color={$darkMode ? white : white}
    transparent={true}
    opacity={0}
    />
</T.Mesh>

<!-- Scribble 1 -->
  <T.Mesh
    position.x={-0.3}
    position.y={1.5}
    position.z={-0.5}
    rotation.y={Math.PI}
    bind:ref={scribblesMesh}>
    <T.PlaneGeometry args={[5, 3]}
      />
    <T.MeshStandardMaterial 
      map={scribbleAllTexture}
      emissiveMap={scribbleAllTexture}
      emissiveIntensity={10.1}
      side={THREE.DoubleSide}
      blending={THREE.AdditiveBlending}
      alphaMap={scribbleAllTexture}
      alphaTest={0.32}
      color={$darkMode ? white : white}
      transparent={true}
      opacity={0}
      />
  </T.Mesh>


<!-- Left light -->
<!-- position={[ -11,4, -19]} -->
<T.SpotLight
  intensity={22}
  target={ref}
  penumbra={0}
  position={[-9, 1, 19]}
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
  position={[9, 1, 19]}
  target={ref}
  decay={5}
  bind:ref={rightLight}
>
<!-- <Editable name="Right Light" transform controls /> -->
  <!-- <T.SpotLightHelper/> -->
</T.SpotLight>



<!-- position={[0, 0.5, 3]} -->

<T.PointLight
intensity={1.5}
bind:ref={pointLight}
position={[0, 5, 2]}
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
<!-- 
<Crystal
  scale={0.12}
  position={[0.17, 1.68, 0.67 ]}/> -->

<Logo/>
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