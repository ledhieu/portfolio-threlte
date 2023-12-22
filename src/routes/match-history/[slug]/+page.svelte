<script>
    import App from '$lib/components/App.svelte'
    import { darkMode } from '$lib/character';
    import { getContext, onMount } from 'svelte';

    const pageState = getContext('pageState')
    const activeProject = getContext('activeProject')
    const activeCategory = getContext('activeCategory')

    export let data;

    onMount(() => {
        let projects = fetch('/api/projects', {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(value => {
            console.log('projectsss',value); 
            value.forEach(category => {
                category.projects.forEach(project => {
                    if(!project || !project.slug || !project.slug.current)
                        return
                    setTimeout(() => {
                        if(project.slug.current == data.slug){
                            $activeCategory = category
                            $activeProject = project
                        }
                    }, 100) // race condition with darkMode setting activeCategory to undefined
                })
            })
            console.log('activeCategory', $activeCategory)
            return value;
        })
    })
    

    
  </script>
  
  <!-- <div class="app-container">
    <App />
  </div> -->
  
  
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
  