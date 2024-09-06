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
import Arrow from "./Arrow.svelte"
import { throttle, debounce } from 'lodash'
import { goto } from '$app/navigation'

const pageState = getContext('pageState')
const BASE_DELAY = 1000;
const DELAY_INTERVAL = 500;
const darkMode = getContext('darkMode')
const loading = getContext('loading')
const activeProject = getContext('activeProject')
const activeCategory = getContext('activeCategory')

let time = {time: 0}
let opacity = 0;
let layerblur = 30;
let activeCategoryIndex = 0;
let showCategories = false;
let mounted = false;
let uiContainer, scrollY;

onMount(() => {
    console.log('activeProject', $activeProject)
    setTimeout(() => {
        console.log('activeProject', $activeProject)
    }, 1000)
})


$: {
    // onDestroy doesn't work because it would be too late
    // this works, what a hack
    if($pageState != 'adventures'){
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
.then(value => {console.log(value); return value.sort((a, b) => b.count - a.count);})

onMount(() => {
    mounted = true;
})

function handleScroll(){
    scrollY = uiContainer.scrollTop
}

// handle scroll up/down event
let onScroll = () => {}, throttledScroll = () => {}
let nextPageFlag = false, prevPageFlag = false;
onMount(() => {
    // let scrollTop
    // onScroll = (e) => {
    //     e.stopPropagation()
    //     console.log('scroll', e, uiContainer.scrollTop, uiContainer.scrollHeight - uiContainer.clientHeight)
    //     if(e.deltaY > 0){ // scrolldown
    //         // prevPageFlag = false;
    //         // if(uiContainer.scrollTop >= uiContainer.scrollHeight - uiContainer.clientHeight){
    //         //     if(nextPageFlag){
    //         //         goto('/contact'); 
    //         //         $pageState = 'contact'
    //         //     } else {
    //         //         nextPageFlag = true
    //         //     }
    //         //     console.log('next ready', nextPageFlag)
    //         // }
    //     } else{
    //         nextPageFlag = false;
    //         if(uiContainer.scrollTop <= 0){
    //             if(prevPageFlag){
    //                 goto('/weapons'); 
    //                 $pageState = 'weapons'
    //             } else {
    //                 prevPageFlag = true
    //             }
    //             console.log('prev ready', prevPageFlag)
    //         }
    //     }
    //     // scrollTop = uiContainer ? uiContainer.scrollTop : undefined
    // }
    // throttledScroll = throttle((e) => {
    //     onScroll(e)
    // }, 500)
    // setTimeout(() => {
    //     document.addEventListener('wheel', throttledScroll)
    // }, 500)

    // return () => {
    // document.removeEventListener('wheel', throttledScroll)
    // }
})

</script>


<div 
    class="ui-container relative"
    bind:this={uiContainer}
    on:scroll={handleScroll}
    on:click|preventDefault={() => {
        $activeProject = undefined;
        history.pushState({}, "", `/${$pageState}`)
    }}
    class:dark={$darkMode}
    style={`
    opacity: ${opacity};
    filter: blur(${layerblur * 0}px)
`}>
    {#await data}
        <p class="inconsolata">MODE</p>
        <p class="akira uppercase" style="font-size: 32px">
            loading ...
        </p>
    {:then result}
        <!-- <div class="bg-stripes w-[15px] h-[30px]"></div> -->
        <div class="flex flex-col items-stretch w-fit gap-2">
            
            <button class="flex items-start gap-5"
                on:click={() => {showCategories = !showCategories;}}>
                <span 
                    class="akira uppercase title text-left"
                >
                    {$activeCategory ? 
                    $activeCategory.title : 
                    result.filter(category => category.designSide == $darkMode)[0].title}
                </span>
                <!-- <span 
                    class="dropdown-btn block"
                    class:active={showCategories}
                >
                    <Arrow/>
                </span> -->
                <!-- <div style="height: 12px; width: 12px"
                class="arrow"
                class:show={showCategories}>
                    <Arrow/>
                </div> -->
                <div class="flex flex-col h-full justify-between">
                    <!-- <p class="inconsolata">[{$activeCategory && $activeCategory.projects ? $activeCategory.projects.length : 0}]</p> -->
                    <!-- <div style="height: 12px; width: 12px"
                        class="arrow"
                        class:show={showCategories}>
                        <Arrow/>
                    </div> -->
                </div>
            </button>
            <div class="flex items-center gap-5 relative">
                <span>{$activeCategory && $activeCategory.projects ? $activeCategory.projects.length : 0}_FEATURED_PROJECTS</span>
                <div class={`w-full border-b border-solid 
                ${$darkMode ? "border-[#ffffff50]" : "border-[#00000050]"}`}></div>
            </div>
        </div>
        
        <!-- {#if showCategories}
            <div class="flex flex-col card items-start absolute mt-5"
            class:dark={$darkMode}
            style="z-index: 10"
            data-augmented-ui="tl-clip br-clip tr-round bl-round exe border">
                {#each result.filter(category => category.designSide == $darkMode) as category, i}
                    <button class="card-item uppercase font-bold"
                        on:click={() => {$activeCategory = category;
                        showCategories = false}}
                    >
                        {category.title} <span class="opacity-40">({category.projects.length})</span>
                    </button>
                {/each}
            </div>
        {/if} -->

        <div
            class:elevate={uiContainer ? scrollY > 150 : false} 
            class="cards-container flex gap-2 lg:gap-10 w-full overflow-x-auto sticky top-[-40px] z-[1] ">
            {#each result.filter(category => category.designSide == $darkMode) as category, i}
                <button class="card-item uppercase font-bold text-nowrap"
                    on:click={() => {$activeCategory = category;
                    showCategories = false}}
                >
                    {category.title} <span class="opacity-[30%]" style="color: inherit">[{category.projects.length}]</span>
                </button>
            {/each}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
            {#each (
                $activeCategory ? 
                $activeCategory.projects : 
                result.filter(category => category.designSide == $darkMode)[0].projects
                )
                as project, i
            }
                <Card 
                    data={project}
                />
            {/each}
        </div>
    {/await}
</div>

<style>
    .ui-container{
        padding: 10px;
        padding-top: 80px;
        overflow-y: scroll;
        height: 100%;   
        z-index: 1;
        overflow-x: hidden;
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
        background: #ffffff60;
        /* border: 1px solid #ffffff20; */
        backdrop-filter: blur(16px);
        width: fit-content;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffff90;
        --aug-tl: 25px;
        --aug-br: 25px;
        --aug-tr: 10px;
        --aug-bl: 10px;
    }
    .card.dark{
        background: #ffffff20;
        --aug-border-bg: #ffffff40;
        backdrop-filter: blur(6px);
    }
    .cards-container{
        background: #c4c4c500;
        padding: 0px;
        color: #000;
        box-shadow: 0px 0px 60px #00000000;
        transition: 0.3s ease;
        border: 1px solid #ffffff00;
        border-radius: 5px;
    }
    .cards-container.elevate{
        background: #c4c4c5;
        background: #cecece;
        color: #000;
        padding: 5px 15px 5px 15px;
        box-shadow: 0px 0px 60px #000000a0;
        transition: 0.3s ease;
        border: 1px solid #ffffff80;
    }
    .dark .cards-container{
        background: linear-gradient(-90deg, #17233100 0%, #090b1000 100%);
        border: 1px solid #00000000;
        color: #fff;
        transition: 0.3s ease;
    }
    .dark .cards-container.elevate{
        background: linear-gradient(-90deg, #172331 0%, #090b10 100%);
        background: linear-gradient(-90deg, #31465e 0%, #272f44 100%);
        border: 1px solid #00000000;
        color: #fff!important;
        box-shadow: 0px 0px 60px #000000f0;
        transition: 0.3s ease;
    }
    .card-item{
        /* width: 100%; */
        text-align: left;
        /* padding-left: 30px; */
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        text-wrap: nowrap;
        width: max-content;
        color: inherit
    }
    /* .card-item:first-of-type{
        margin-top: 25px;
    }
    .card-item:last-of-type{
        margin-bottom: 25px;
    } */
    /* .card-item:hover{
        background: #ffffff15;
        
        transition: 0.3s ease;
    } */
    .title{
        font-size: 8vw;
        line-height: 7vw;
    }
    .dark .arrow{
        filter: invert(1);
        transition: 0.2s ease;
    }
    .arrow{
        transition: 0.2s ease;
    }
    .show.arrow{
        rotate: -90deg;
        transition: 0.2s ease;
    }

    @media only screen and (min-width: 1024px){
        .ui-container{
            padding: 100px;
            padding-left: 100px;
            padding-top: 65px;
        }
        .title{
            font-size: 8vw;
            line-height: 6.5vw;
        }
    }
</style>




