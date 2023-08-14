<script>
import { getContext, onDestroy, onMount } from "svelte";
import { shuffle } from '$lib/shuffleText'
import { blur, fly, slide } from 'svelte/transition'
import { fade } from '$lib/transitions'
import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
import fontSpacing from '$lib/fontspacing.json'
import { gsap } from 'gsap'
import Card from "./Card.svelte";

const pageState = getContext('pageState')
const BASE_DELAY = 2000;
const DELAY_INTERVAL = 500;
const darkMode = getContext('darkMode')
const loading = getContext('loading')

let time = {time: 0}
let opacity = 0;
let layerblur = 30;
let activeCategoryIndex = 0;
let activeCategory;
let showCategories = false;
let activeProject;
let mounted = false;

$: {
    $darkMode;
    activeCategory = undefined;
}


$: {
    // onDestroy doesn't work because it would be too late
    // this works, what a hack
    if($pageState != 'match-history'){
    gsap.to(time, { time: 0, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
        opacity = time.time
        layerblur = 30 - time.time * 30
    }})
    } else {
    // putting the code below in onMount works too, but this looks
    // more consistent
    gsap.to(time, { time: 1, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
        opacity = time.time
        layerblur = 30 - time.time * 30
    }})
    }
}


let data = fetch('/api/projects', {
    method: 'GET',
    headers: {
    'content-type': 'application/json'
    }
}).then(res => res.json())
.then(value => {console.log(value); return value;})

onMount(() => {
    mounted = true;
})

</script>

<div class="ui-container relative">
    {#await data}
        <p class="inconsolata">// MODE</p>
        <p class="akira uppercase" style="font-size: 32px">
            loading ...
        </p>
    {:then result}
        <p class="inconsolata">// MODE</p>
        <button class="flex items-center gap-5"
            on:click={() => {showCategories = !showCategories;
            console.log('clicked', showCategories)}}>
            <span 
                class="akira uppercase"
                style="font-size: 32px"
            >
                {activeCategory ? 
                activeCategory.title : 
                result.filter(category => category.designSide != $darkMode)[0].title}
            </span>
            <span 
                class="dropdown-btn block"
                class:active={showCategories}
            >
                &#x25BC;
            </span>
        </button>
        
        {#if showCategories}
            <div class="flex flex-col card items-start absolute"
            style="z-index: 10"
            augmented-ui="tl-clip br-clip tr-round bl-round exe">
                {#each result.filter(category => category.designSide != $darkMode) as category, i}
                    <button class="card-item uppercase"
                        on:click={() => {activeCategory = category;
                        showCategories = false}}
                    >
                        {category.title} <span class="opacity-40">({category.projects.length})</span>
                    </button>
                {/each}
            </div>
        {/if}

        <div class="grid grid-cols-3 gap-5 mt-10">
            {#each (
                activeCategory ? 
                activeCategory.projects : 
                result.filter(category => category.designSide != $darkMode)[0].projects
                )
                as project, i
            }
                <Card 
                    data={project}
                    on:open={e => {
                        activeProject = e.detail
                        console.log(activeProject)
                    }}
                    on:minimize={
                        e => {
                            activeProject = undefined
                        }
                    }
                />
            {/each}
        </div>
    {/await}
</div>

<style>
    .ui-container{
        padding: 170px;
        padding-top: 120px;
        overflow-y: scroll;
        height: 100%;   
    }
    .dropdown-btn{
        transform:rotate(0deg);
        transition: 0.3s ease;
        transform-origin: top center;
        line-height: 5px;
    }
    .dropdown-btn.active{
        transform:rotate(180deg);
        transition: 0.3s ease;
    }
    .card{
        background: #ffffff20;
        /* border: 1px solid #ffffff20; */
        backdrop-filter: blur(6px);
        width: fit-content;
        --aug-border: 1px;
        --aug-border-bg: #ffffff40;
        --aug-tl: 25px;
        --aug-br: 25px;
        --aug-tr: 10px;
        --aug-bl: 10px;
    }
    .card-item{
        width: 100%;
        text-align: left;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .card-item:first-of-type{
        margin-top: 25px;
    }
    .card-item:last-of-type{
        margin-bottom: 25px;
    }
    .card-item:hover{
        background: #ffffff15;
        
        transition: 0.3s ease;
    }
</style>




