<script>
    import App from '$lib/components/App.svelte'
    import { darkMode } from '$lib/character';
    import { getContext, onMount } from 'svelte';
    import { page } from '$app/stores'
  </script>
  

  
  
  <style>
    :global(body) {
      margin: 0;
    }
  
    .app-container {
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgb(13, 19, 32);
      background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    }
  </style>
  