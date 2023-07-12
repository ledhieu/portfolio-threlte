<script>
    import { onDestroy } from 'svelte'
    import { useThrelte } from '@threlte/core'
    import { GLTF, useGltfAnimations } from '@threlte/extras'
    import { hipHop, breakDance, idle } from '$lib/character.js'
    import * as THREE from 'three'
  
    let currentActionKey = 'Idle'
    const { scene, camera, renderer } = useThrelte()
  
    const { gltf, actions } = useGltfAnimations()

    $: console.log(gltf, actions)
  
    $: {
        if($actions && $actions[currentActionKey]){
            if(currentActionKey == 'Break Dance'){
                $actions[currentActionKey].loop = THREE.LoopPingPong
            }
            
            $actions[currentActionKey].play()
        }
    }
  
    const unsubIdle = idle.subscribe(() => {
      console.log('transition to idle')
      transitionTo('Idle', 0.3)
    })
  
    const unsubHipHop = hipHop.subscribe(() => {
      console.log('transition to hip hop')
      transitionTo('Hip Hop Dance', 0.3)
    })
  
    const unsubBreakDance = breakDance.subscribe(() => {
      console.log('transition to break dance')
      transitionTo('Break Dance', 0.3)
    })
  
    function transitionTo(nextActionKey, duration = 1) {
      const currentAction = $actions[currentActionKey]
      const nextAction = $actions[nextActionKey]
      if (!nextAction || currentAction === nextAction) return
      // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
      nextAction.enabled = true
      if (currentAction) {
        currentAction.crossFadeTo(nextAction, duration, true)
      }
      // Not sure why I need this but the source code does not
      nextAction.play()
      currentActionKey = nextActionKey
    }
  
    onDestroy(() => {
      // We unsubscribe otherwise we'd have old subscriptions still active
      unsubIdle()
      unsubHipHop()
      unsubBreakDance()
      scene.remove($gltf)
    })
  </script>
  
<slot></slot>
  