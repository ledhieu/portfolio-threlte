<script>
    import App from '$lib/components/App.svelte'
    import { Canvas } from '@threlte/core'
    import TestScene from '../../lib/components/TestScene.svelte';
    import Scene from '../../lib/components/Scene.svelte';
  </script>
  
  <div>
    <Canvas>
       <Scene/>
    </Canvas>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
    }
  
    div {
      width: 100vw;
      height: 100vh;
      position: absolute;
      background: rgb(13, 19, 32);
      background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    }
  </style>
  
  