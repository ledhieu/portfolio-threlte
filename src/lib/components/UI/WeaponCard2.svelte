<script>
    import { getContext } from 'svelte'
    import { goto } from '$app/navigation'

    export let data;

    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')
    const activeWeapon = getContext('activeWeapon')
    const activeProject = getContext('activeProject')
    const activeCategory = getContext('activeCategory')

    $: active = $activeWeapon && $activeWeapon._id ? $activeWeapon._id == data._id : false

    function handleClick(){
        $activeWeapon = data
    }
    function handleProjectClick(project){
        // history.pushState({}, "", `/match-history/${project.slug.current}`)
        $pageState = 'match-history';
        $activeProject = project
        goto(`/match-history/${project.slug.current}`)

        console.log(project)
        // window.open(`/match-history/${project.slug.current}`).focus();

        // if(string == '')
        //     scrollY = 0
        // else if (string == 'character')
        //     scrollY = 1000
        // else if (string == 'weapons')
        //     scrollY = 2000
        // else if (string == 'match-history')
        //     scrollY = 3000
    }
</script>

<button class="relative flex flex-col"
on:click={handleClick}
class:col-span-full={active}
class:active={active}>
    <div class="w-min flex flex-col gap-1 justify-start">
        <div data-augmented-ui="all-hex border"
        class="hex"
        class:dark={$darkMode}
        style="">
            <div class="w-full h-full flex">
                <img 
                    class="main-image m-auto h-2/3 w-2/3 object-contain"
                    src={data.mainImage ?? ''}
                    style="
                "/>
                <div data-augmented-ui="all-hex border"
                class="inside-hex">

                </div>

                <div data-augmented-ui="all-hex border"
                class="progress-hex"
                class:clip-1={data.familiarity > 2}
                class:clip-2={data.familiarity >= 5}
                class:clip-3={data.familiarity >= 6}
                class:clip-4={data.familiarity >= 7}
                class:clip-5={data.familiarity >= 8}
                class:clip-6={data.familiarity >= 9}>

                </div>
            </div>
        </div>
        {#if !active}
        <p class="be  uppercase font-bold text-wrap shrink">{data.title}</p>
        {/if}
    </div>
    {#if active}
    <div class="card-container"
    style="">
        <div class="card"
        data-augmented-ui="br-clip b-clip-x
        tr-round exe border"
        style="">
            <div class="text-left flex flex-col h-full p-2 gap-2">
                
                <p class="akira title">{data.title}</p>
                {#if data.description}
                    <p class="description"
                    style="font-size: 13px;
                    line-height: 15px">{data.description ?? ''}</p>
                {/if}
                <div class="bar-container mt-auto lg:mb-2" style="height: 10px">
                    {#each Array(5) as _, i}
                        <div class="bar absolute"
                            class:fill={i < data.familiarity / 2}
                            style={`left: ${i > 0 ? 0 + i * 30 - 10 : 0 + i * 30}px;
                            width: ${i != 0 && i != 4 ? 50 : 40}px`}
                            data-augmented-ui={`border ${i != 0 ? 'bl-clip' : ''}
                        ${i != '4' ? 'tr-clip' : ''} exec`}></div>
                    {/each}
                </div>
                
                <p class="font-bold"><span class="akira">Featured in</span> ({data.projects.length < 10 ? '0' + data.projects.length : data.projects.length})</p>
                <div class="grid grid-cols-4 gap-2 mb-4">
                    {#each data.projects as project}
                        <button class="flex rounded-md overflow-hidden project-img"
                        on:click={() => {handleProjectClick(project)}}>
                            <img 
                                src={project.mainImage ?? ""}
                                style="
                                aspect-ratio: 1/1;
                                object-fit: cover"/>
                        </button>
                    {/each}
                </div>
                
            </div>
            <!-- <div class="grid grid-rows-2"
            style="border-left: 1px solid #ffffff90;
            min-width: 130px">
            </div> -->
           
        </div>
    </div>
{/if}
</button>

<style>
    .bar{
        --aug-border-bg: #ffffffa0;
        --aug-border-all: 1px;
        height: 4px;
        position: absolute;
    }
    .bar.fill{
        background: #fff;
    }
    .hex{
        --aug-all-width: 60px;
        --aug-border-all: 3px;
        --aug-border-bg: #ffffff20;
        background: #CCCDCE;
        background: #B7B7B9;
        background: #ffffff00;
        transition: 0.5s ease;
        /* margin-bottom: 125px; */
        /* margin-left: calc(100% - 30px); */
        /* position: absolute; */
        z-index: 1;
        
    }
    .dark.hex{
        background: #1e2d40;
        background: #ffffff00;
        transition: 0.5s ease;
    }
    .inside-hex{
        --aug-all-width: 50px;
        --aug-border-all: 0.5px;
        --aug-border-bg: #ffffff00;
        left: 0; right: 0; top: 0; bottom: 0;
        margin:auto;
        background: #ffffff20;
        transition: 0.5s ease;
        position: absolute;
    }
    .inside-hex{
        --aug-all-width: 50px;
        --aug-border-all: 0.5px;
        --aug-border-bg: #ffffff00;
        left: 0; right: 0; top: 0; bottom: 0;
        margin:auto;
        background: #ffffff20;
        transition: 0.5s ease;
        position: absolute;
    }
    .dark .inside-hex{
        /* --aug-border-bg: #fffffff0;
        background: #ffffff00;
        transition: 0.5s ease; */
    }
    .progress-hex{
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        margin: auto;
        --aug-all-width: 50px;
        --aug-border-all: 3px;
        --aug-border-bg: #ffffff;
    }
    .card{
        
        /* border: 1px solid #ffffff20; */
        /* backdrop-filter: blur(6px); */
        width: fit-content;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffff60;
        --aug-tl: 25px;
        --aug-br: 25px;
        --aug-tr: 2px;
        --aug-bl: 2px;

        --aug-b-extend1: 50%;
        --aug-b-inset1: -5px;

        --aug-t-extend1: 50%;
        --aug-t-inset1: -5px;

        --aug-r-extend1: 50%;
        --aug-r-inset1: -5px;

        transition: 0.3s ease;
        padding: 5px;
        padding-bottom: 5px;
        width: 100%;
        transition: 0.2s ease;
        background: #ffffff10;
        display: flex;
    }
    .top-container{
        height: fit-content;
        transition: 0.5s ease;
        
    }
    .top-container.active{
        height: fit-content;
        transition: 0.5s ease;
    }
    .card-container{
        height: fit-content;
        top: 5%;
        padding-left: 0px;
        transition: 0.5s ease;
        z-index: -1;
        width: 100%;
    }
    .active .card-container{
        height: fit-content;
        transition: 0.5s ease;
    }
    .title{
        padding-right: 20px;
        line-height: 15px;
    }
    .description{
        padding-right: 20px;
        display: none;
    }
    .active .description{
        display: block;
    }
    .bar-container{
        
        position: relative;
        margin-top: 5px;
    }
    .clip-1{
        clip-path: polygon(50% 0%, 100% 0, 100% 25%, 50% 50%);
    }
    .clip-2{
        clip-path: polygon(50% 0%, 100% 0, 100% 75%, 50% 50%);
    }
    .clip-3{
        clip-path: polygon(50% 0%, 100% 0, 100% 100%, 50% 100%);
    }
    .clip-4{
        clip-path: polygon(50% 0, 100% 0, 100% 69%, 100% 100%, 0 100%, 0 75%, 50% 50%);
    }
    .clip-5{
        clip-path: polygon(54% 0, 100% 0, 100% 69%, 100% 100%, 0 100%, 0 25%, 50% 50%);
    }
    .clip-6{
        clip-path: polygon(54% 0, 100% 0, 100% 100%, 0 100%, 0 0, 15% 0, 54% 54%);
    }
    @media only screen and (min-width: 768px){
        .hex{
            --aug-all-width: 110px;
            margin-bottom: 0px;
            top: 0px;
        }
        .inside-hex{
            --aug-all-width: 90px;
        }
        .progress-hex{
            --aug-all-width: 110px;
        }
        .top-container{
            height: auto;
            min-height: 130px;
        }
        .card-container{
            top: 5%; 
            /* height: 90%;  */
            /* padding-left: 55px */
        }
        .card{
            padding: 5px;
            padding-top: 10px;
            /* padding-bottom: 25px;  */
            padding-left: calc(25px + 10px)
        }
        .title{
            margin-left: 0px;
            padding: 0;
        }
        .description{
            padding: 0;
            display: block;
        }
        .bar-container{
            margin-left: 0px
        }
    }
</style>