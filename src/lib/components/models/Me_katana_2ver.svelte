<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@1.0.0-next.13 C:\Users\leduc\portfolio-threlte\static\models\me_katana_2ver.glb --root /models/ --printwidth 120 --precision 2
-->

<script>
  import { onDestroy, onMount } from 'svelte'
import { useFrame, useLoader, useThrelte } from '@threlte/core'
import { Group } from 'three'
import { T, forwardEventHandlers } from '@threlte/core'
import { useGltf, useGltfAnimations, useTexture, HTML } from '@threlte/extras'
import * as THREE from 'three'
import { getContext } from 'svelte'
import { gsap } from 'gsap'
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);

export const ref = new Group()

// katana5 is too fast, use 6, actually 6 is too fast, fix later
const gltf = useGltf('/models/me_katana_2ver.glb')
export const { actions, mixer } = useGltfAnimations(gltf, ref)

const component = forwardEventHandlers()
const pageState = getContext('pageState')
const darkMode = getContext('darkMode')

let darkModeMask
$: {
  if(darkModeMask && glowMaterial){
    darkModeMask.material.transparent = true
    let customEase = CustomEase.create("custom", "M0,0,C0.06,0.093,0.128,0.5,0.128,0.5,0.128,0.5,0.149,0.323,0.178,0.232,0.183,0.215,0.23,0.08,0.23,0.08,0.23,0.08,0.255,0.084,0.256,0.092,0.263,0.159,0.276,0.48,0.308,0.624,0.315,0.658,0.334,0.276,0.373,0.732,0.373,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.374,0.73,0.434,0.77,0.434,0.77,0.467,0.646,0.436,0.246,0.48,0.274,0.495,0.283,0.503,0.344,0.51,0.425,0.522,0.57,0.53,0.78,0.564,0.866,0.565,0.87,0.6,0.936,0.602,0.94,0.62,0.978,0.641,0.541,0.663,0.56,0.699,0.59,0.691,0.849,0.732,0.982,0.75,1.043,0.753,0.752,0.776,0.714,0.778,0.71,0.787,0.851,0.795,0.886,0.8,0.908,0.818,0.827,0.82,0.828,0.832,0.836,0.831,0.911,0.844,0.924,0.871,0.949,0.862,0.815,0.888,0.828,0.899,0.833,0.897,0.937,0.914,0.968,0.926,0.99,0.942,0.899,0.957,0.906,0.976,0.914,0.993,1,1,1")
    if($darkMode){
      gsap.to(darkModeMask.material, {opacity: 1, duration: 1, ease: customEase})
      gsap.to(glowMaterial, { emissiveIntensity: 24, duration: 1, ease: 'power4.inOut'})
      gsap.to(glowMaterial.color, { r: 0.1, g: 0.4, b: 1, duration: 1, ease: 'power4.inOut'})
      gsap.to(glowMaterial.emissive, { r: 0.1, g: 0.4, b: 1, duration: 1, ease: 'power4.inOut'})
    } else {
      gsap.to(darkModeMask.material, {opacity: 0, duration: 0.5, ease: customEase})
      gsap.to(glowMaterial, { emissiveIntensity: 0, duration: 1, ease: 'power4.inOut'})
      gsap.to(glowMaterial.color, { r: 0, g: 0, b: 0, duration: 1, ease: 'power4.inOut'})
      gsap.to(glowMaterial.emissive, { r: 0, g: 0, b: 0, duration: 1, ease: 'power4.inOut'})
    }
    console.log('animating opacity')
  }
}
// let currentActionKey = $pageState == '' ? 'Idle' : 
//   $pageState == 'character' ? 'Idle' : 
//   $pageState == 'weapons' ? 'Torch Idle' :
//   $pageState == 'contact' ? 'Happy Idle' :
//   'Happy Idle'
let currentActionKey = 'Happy Idle'
$: {
  if($pageState == ''){
    transitionTo('Happy Idle', 0.5)
  } else if ($pageState == 'character'){
    transitionTo('Fighting Idle', 0.5)
  } else if( $pageState == 'weapons'){
    transitionTo('Torch Idle', 1)
  } else if( $pageState == 'contact') {
    transitionTo('Happy Idle', 0.5)
  } else {
    transitionTo('Happy Idle', 0.5)
  }
  
}
const { scene, camera, renderer } = useThrelte()


$: {
    if($actions && $actions[currentActionKey]){
        // if(currentActionKey == 'Land To Stand'){
        //     $actions[currentActionKey].loop = THREE.LoopOnce
        // }
         if(currentActionKey == 'Break Dance'){
            $actions[currentActionKey].loop = THREE.LoopPingPong
        }
        
        $actions[currentActionKey].play()
    }
}

$: {
  console.log('actions', $actions)
}

function transitionTo(nextActionKey, duration = 1) {
  const currentAction = $actions[currentActionKey]
  const nextAction = $actions[nextActionKey]
  if (!nextAction || currentAction === nextAction) return
  // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
  nextAction.enabled = true
  if (currentAction) {
    currentAction.crossFadeTo(nextAction, duration, false)
  }
  // Not sure why I need this but the source code does not
  nextAction.play()
    currentActionKey = nextActionKey
}

onDestroy(() => {
  scene.remove($gltf)
})

let bodyMaterial, glovesMaterial, hairMaterial, eyeLeftMaterial, eyeRightMaterial,
teethMaterial, footwearMaterial, kneeMaterial, hoodieMaterial, headMaterial,
bottomMaterial
let glowMaterial
let leftEyeBone, rightEyeSkeleton, leftEyeMesh, rightEyeMesh
const darkModeMaskMaterial = new THREE.MeshStandardMaterial({ color: 0x121212})
// const whiteHairMaterial = new THREE.MeshStandardMaterial({ color: 0x888888})

onMount(() => {
  gltf.then(gltf => {

    // materials
    const body = gltf.materials['Wolf3D_Body.008']
    const gloves = gltf.materials.gloves
    const hair = gltf.materials['Wolf3D_Hair.009']
    const eyeLeft = gltf.materials['Wolf3D_Eye.009']
    const eyeRight = gltf.materials['Wolf3D_Eye.009']
    const teeth = gltf.materials['Wolf3D_Teeth.008']
    const footwear = gltf.materials['Wolf3D_Outfit_Footwear.012']
    const knee = gltf.materials.knee
    const hoodie = gltf.materials['Wolf3D_Outfit_Top.010']
    const head = gltf.materials['Wolf3D_Skin.013']
    const bottom = gltf.materials['Wolf3D_Outfit_Bottom.014']
    const glow = gltf.materials.glow
    

    bodyMaterial = body;
    glovesMaterial = gloves;
    hairMaterial = hair;
    eyeLeftMaterial = eyeLeft
    eyeRightMaterial = eyeRight
    teethMaterial = teeth;
    footwearMaterial = footwear
    kneeMaterial = knee
    hoodieMaterial = hoodie
    headMaterial = head
    bottomMaterial = bottom
    glowMaterial = glow

    // bodyMaterial = new THREE.MeshToonMaterial({ map: body.map });
    // glovesMaterial = new THREE.MeshToonMaterial({ map: gloves.map, color: gloves.color });
    // eyeLeftMaterial = eyeLeft
    // eyeRightMaterial = eyeRight
    // teethMaterial = teeth;
    // footwearMaterial = new THREE.MeshToonMaterial({
    //   map: footwear.map,
    // })
    // kneeMaterial = new THREE.MeshToonMaterial({ 
    //   map: knee.map, 
    //   color: new THREE.Color(0x222222)
    // })
    // console.log(hoodie)
    // hoodieMaterial = new THREE.MeshToonMaterial({
    //   map: hoodie.map,
    //   color: new THREE.Color(0x111111)
    // })
    // headMaterial = head
    // bottomMaterial = new THREE.MeshToonMaterial({ 
    //   // map: bottom.map,
    //   color: new THREE.Color(0x222222)
    // })
    // headMaterial = new THREE.MeshToonMaterial({
    //   map: head.map
    // })
    // hairMaterial = new THREE.MeshToonMaterial({
    //   map: hair.map
    // })
    glowMaterial.emissiveIntensity = 10
    console.log(glow)
    glowMaterial = new THREE.MeshLambertMaterial({
      ...glow,
    })
  })
})

</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group name="mech_me_-_animation">
      <T.Group name="Armature022">
        <T is={gltf.nodes.Hips} />
        <T is={gltf.nodes.Ctrl_Master} />
        <T is={gltf.nodes.Ctrl_ArmPole_IK_Left} />
        <T is={gltf.nodes.Ctrl_Hand_IK_Left} />
        <T is={gltf.nodes.Ctrl_ArmPole_IK_Right} />
        <T is={gltf.nodes.Ctrl_Hand_IK_Right} />
        <T is={gltf.nodes.Ctrl_Foot_IK_Left} />
        <T is={gltf.nodes.Ctrl_LegPole_IK_Left} />
        <T is={gltf.nodes.Ctrl_Foot_IK_Right} />
        <T is={gltf.nodes.Ctrl_LegPole_IK_Right} />
        <T.Group name="Wolf3D_Body006">
          <T.SkinnedMesh
            name="Wolf3D_Body005"
            geometry={gltf.nodes.Wolf3D_Body005.geometry}
            material={gltf.materials['Wolf3D_Body.008']}
            skeleton={gltf.nodes.Wolf3D_Body005.skeleton}
          />
          <T.SkinnedMesh
            name="Wolf3D_Body005_1"
            geometry={gltf.nodes.Wolf3D_Body005_1.geometry}
            material={gltf.materials.gloves}
            skeleton={gltf.nodes.Wolf3D_Body005_1.skeleton}
          />
          <T.SkinnedMesh
            name="Wolf3D_Body005_2"
            geometry={gltf.nodes.Wolf3D_Body005_2.geometry}
            material={glowMaterial}
            skeleton={gltf.nodes.Wolf3D_Body005_2.skeleton}
          />
        </T.Group>
        <T.SkinnedMesh
          name="Wolf3D_Hair005"
          geometry={gltf.nodes.Wolf3D_Hair005.geometry}
          material={gltf.materials['Wolf3D_Hair.009']}
          skeleton={gltf.nodes.Wolf3D_Hair005.skeleton}
        />
        <T.SkinnedMesh
          name="EyeLeft005"
          geometry={gltf.nodes.EyeLeft005.geometry}
          material={gltf.materials['Wolf3D_Eye.009']}
          skeleton={gltf.nodes.EyeLeft005.skeleton}
          morphTargetDictionary={gltf.nodes.EyeLeft005.morphTargetDictionary}
          morphTargetInfluences={gltf.nodes.EyeLeft005.morphTargetInfluences}
        />
        <T.SkinnedMesh
          name="EyeRight005"
          geometry={gltf.nodes.EyeRight005.geometry}
          material={gltf.materials['Wolf3D_Eye.009']}
          skeleton={gltf.nodes.EyeRight005.skeleton}
          morphTargetDictionary={gltf.nodes.EyeRight005.morphTargetDictionary}
          morphTargetInfluences={gltf.nodes.EyeRight005.morphTargetInfluences}
        />
        <T.SkinnedMesh
          name="Wolf3D_Teeth005"
          geometry={gltf.nodes.Wolf3D_Teeth005.geometry}
          material={gltf.materials['Wolf3D_Teeth.008']}
          skeleton={gltf.nodes.Wolf3D_Teeth005.skeleton}
          morphTargetDictionary={gltf.nodes.Wolf3D_Teeth005.morphTargetDictionary}
          morphTargetInfluences={gltf.nodes.Wolf3D_Teeth005.morphTargetInfluences}
        />
      </T.Group>
      <T.Group name="glasses04objcleanermaterialmergergles" />
      <T.Group name="Wolf3D_Head017" />
      <T.Group name="Wolf3D_Head018" />
      <T.SkinnedMesh
        name="Wolf3D_Outfit_Footwear009"
        geometry={gltf.nodes.Wolf3D_Outfit_Footwear009.geometry}
        material={gltf.materials['Wolf3D_Outfit_Footwear.012']}
        skeleton={gltf.nodes.Wolf3D_Outfit_Footwear009.skeleton}
      />
      <T.SkinnedMesh
        name="Skin_ZSphere1_23002"
        geometry={gltf.nodes.Skin_ZSphere1_23002.geometry}
        material={gltf.materials.knee}
        skeleton={gltf.nodes.Skin_ZSphere1_23002.skeleton}
      />
      <T.Group name="Plane001">
        <T.SkinnedMesh
          name="Plane001_1"
          geometry={gltf.nodes.Plane001_1.geometry}
          material={gltf.materials['Wolf3D_Outfit_Top.010']}
          skeleton={gltf.nodes.Plane001_1.skeleton}
        />
        <T.SkinnedMesh
          name="Plane001_2"
          geometry={gltf.nodes.Plane001_2.geometry}
          material={glowMaterial}
          skeleton={gltf.nodes.Plane001_2.skeleton}
        />
      </T.Group>
      <T.SkinnedMesh
        name="Skin_ZSphere1_23004"
        geometry={gltf.nodes.Skin_ZSphere1_23004.geometry}
        material={gltf.materials.knee}
        skeleton={gltf.nodes.Skin_ZSphere1_23004.skeleton}
      />
      <T.Group name="Skin_ZSphere1_23006">
        <T.SkinnedMesh
          name="Mesh074"
          geometry={gltf.nodes.Mesh074.geometry}
          material={gltf.materials['Wolf3D_Outfit_Bottom.014']}
          skeleton={gltf.nodes.Mesh074.skeleton}
        />
        <T.SkinnedMesh
          name="Mesh074_1"
          geometry={gltf.nodes.Mesh074_1.geometry}
          material={glowMaterial}
          skeleton={gltf.nodes.Mesh074_1.skeleton}
        />
      </T.Group>
      <T.Group name="Skin_ZSphere1_23007">
        <T.SkinnedMesh
          name="Mesh075"
          geometry={gltf.nodes.Mesh075.geometry}
          material={gltf.materials['Wolf3D_Outfit_Bottom.014']}
          skeleton={gltf.nodes.Mesh075.skeleton}
        />
        <T.SkinnedMesh
          name="Mesh075_1"
          geometry={gltf.nodes.Mesh075_1.geometry}
          material={glowMaterial}
          skeleton={gltf.nodes.Mesh075_1.skeleton}
        />
      </T.Group>
      <T.SkinnedMesh
        name="Skin_ZSphere1_23008"
        geometry={gltf.nodes.Skin_ZSphere1_23008.geometry}
        material={gltf.materials['Wolf3D_Outfit_Bottom.014']}
        skeleton={gltf.nodes.Skin_ZSphere1_23008.skeleton}
      />
      <T.SkinnedMesh
        name="Skin_ZSphere1_23009"
        geometry={gltf.nodes.Skin_ZSphere1_23009.geometry}
        material={gltf.materials['Wolf3D_Outfit_Bottom.014']}
        skeleton={gltf.nodes.Skin_ZSphere1_23009.skeleton}
      />
      <!-- <T.SkinnedMesh
        name="Plane003"
        geometry={gltf.nodes.Plane003.geometry}
        material={gltf.materials.katana}
        skeleton={gltf.nodes.Plane003.skeleton}
      /> -->
      <T.Group name="glasses">
        <T.SkinnedMesh
          name="Object_0001"
          geometry={gltf.nodes.Object_0001.geometry}
          material={gltf.materials['6666.001']}
          skeleton={gltf.nodes.Object_0001.skeleton}
        />
        <T.SkinnedMesh
          name="Object_0001_1"
          geometry={gltf.nodes.Object_0001_1.geometry}
          material={gltf.materials['7777.001']}
          skeleton={gltf.nodes.Object_0001_1.skeleton}
        />
        <T.SkinnedMesh
          name="Object_0001_2"
          geometry={gltf.nodes.Object_0001_2.geometry}
          material={gltf.materials['kanagu.001']}
          skeleton={gltf.nodes.Object_0001_2.skeleton}
        />
        <T.SkinnedMesh
          name="Object_0001_3"
          geometry={gltf.nodes.Object_0001_3.geometry}
          material={gltf.materials['steel01.001']}
          skeleton={gltf.nodes.Object_0001_3.skeleton}
        />
        <T.SkinnedMesh
          name="Object_0001_4"
          geometry={gltf.nodes.Object_0001_4.geometry}
          material={gltf.materials['steel2.001']}
          skeleton={gltf.nodes.Object_0001_4.skeleton}
        />
      </T.Group>
      <T.SkinnedMesh
        name="Mask3_blinn1_0"
        geometry={gltf.nodes.Mask3_blinn1_0.geometry}
        material={darkModeMaskMaterial}
        skeleton={gltf.nodes.Mask3_blinn1_0.skeleton}
        bind:ref={darkModeMask}
      />
      <!-- ^ Old: gltf.materials.blinn1 -->
      <T.Group name="Wolf3D_Head007">
        <T.SkinnedMesh
          name="Wolf3D_Head014_1"
          geometry={gltf.nodes.Wolf3D_Head014_1.geometry}
          material={gltf.materials['Wolf3D_Skin.013']}
          skeleton={gltf.nodes.Wolf3D_Head014_1.skeleton}
          morphTargetDictionary={gltf.nodes.Wolf3D_Head014_1.morphTargetDictionary}
          morphTargetInfluences={gltf.nodes.Wolf3D_Head014_1.morphTargetInfluences}
        />
        <T.SkinnedMesh
          name="Wolf3D_Head014_2"
          geometry={gltf.nodes.Wolf3D_Head014_2.geometry}
          material={gltf.materials.crease}
          skeleton={gltf.nodes.Wolf3D_Head014_2.skeleton}
          morphTargetDictionary={gltf.nodes.Wolf3D_Head014_2.morphTargetDictionary}
          morphTargetInfluences={gltf.nodes.Wolf3D_Head014_2.morphTargetInfluences}
        />
      </T.Group>
      <!-- <T.SkinnedMesh
        name="Wolf3D_Head008"
        geometry={gltf.nodes.Wolf3D_Head008.geometry}
        material={gltf.materials['Wolf3D_Skin.013']}
        skeleton={gltf.nodes.Wolf3D_Head008.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head008.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head008.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head009"
        geometry={gltf.nodes.Wolf3D_Head009.geometry}
        material={gltf.materials['Wolf3D_Skin.013']}
        skeleton={gltf.nodes.Wolf3D_Head009.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head009.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head009.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head010"
        geometry={gltf.nodes.Wolf3D_Head010.geometry}
        material={gltf.materials['Wolf3D_Skin.013']}
        skeleton={gltf.nodes.Wolf3D_Head010.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head010.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head010.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head011"
        geometry={gltf.nodes.Wolf3D_Head011.geometry}
        material={gltf.materials['Wolf3D_Skin.013']}
        skeleton={gltf.nodes.Wolf3D_Head011.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head011.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head011.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head012"
        geometry={gltf.nodes.Wolf3D_Head012.geometry}
        material={gltf.materials['Wolf3D_Skin.013']}
        skeleton={gltf.nodes.Wolf3D_Head012.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head012.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head012.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head013"
        geometry={gltf.nodes.Wolf3D_Head013.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head013.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head013.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head013.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head014"
        geometry={gltf.nodes.Wolf3D_Head014.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head014.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head014.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head014.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head015"
        geometry={gltf.nodes.Wolf3D_Head015.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head015.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head015.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head015.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head016"
        geometry={gltf.nodes.Wolf3D_Head016.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head016.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head016.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head016.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head019"
        geometry={gltf.nodes.Wolf3D_Head019.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head019.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head019.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head019.morphTargetInfluences}
      />
      <T.SkinnedMesh
        name="Wolf3D_Head020"
        geometry={gltf.nodes.Wolf3D_Head020.geometry}
        material={gltf.materials.mask}
        skeleton={gltf.nodes.Wolf3D_Head020.skeleton}
        morphTargetDictionary={gltf.nodes.Wolf3D_Head020.morphTargetDictionary}
        morphTargetInfluences={gltf.nodes.Wolf3D_Head020.morphTargetInfluences}
      /> -->
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
