<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { hipHop, breakDance, idle } from '../character';
    import { get } from 'svelte/store';

  function toggleIdle(){
    $idle = !$idle
  }
  function toggleHipHop(){
    $hipHop = !$hipHop
  }
  function togglebreakDance(){
    $breakDance = !$breakDance
  }
</script>

<Canvas>
  <Scene />
</Canvas>

<div style="position: fixed; top: 15px; left: 15px">
  <button on:click={toggleIdle}>Idle</button>
  <button on:click={toggleHipHop}>Hip hop</button>
  <button on:click={togglebreakDance}>Break dance</button>
</div>
