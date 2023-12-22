<script>
    import { getContext } from 'svelte'

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
        history.pushState({}, "", `/match-history/`)
        $pageState = 'match-history';
        $activeProject = project
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

<button
    class="card flex flex-col md:flex-row
    col-span-1 md:col-span-2
    relative gap-5
    justify-between cursor-pointer"
    class:col-span-2={active}
    class:active={active}
    class:dark={$darkMode}
    on:click={handleClick}
    data-augmented-ui="tl-clip br-clip b-clip-x
    tr-round bl-round exe border">

    <p class="absolute another h-min m-auto"
    style="font-size: 100px; opacity: 0.045; z-index: -1;
    left: 30px;
    bottom: 40%; line-height: 0px;">
        {data.title.split(' ')[0]}
    </p>

    <div
        class="inner p-3 relative"
        data-augmented-ui="tl-clip br-clip
        tr-round bl-round exe"
        style={`background: #ffffff10;
        height: 80px; aspect-ratio: 1;`}>
        <img 
            class="main-image"
            src={data.mainImage ?? ''}
            style="
        "/>
    </div>

    <div class="flex flex-col info-container flex-1
    gap-2 md:gap-0
    font-bold ">
        <div class="flex flex-col md:flex-row uppercase">
            <p class="label">Name</p>
            <p>{data.title}</p>
        </div>
        <div class="flex flex-col md:flex-row uppercase">
            <p class="label">familiarity</p>
            <div class="progress-bg">
                <div class="progress-bar"
                style={`width: ${data.familiarity / 10 * 100}%`}></div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row uppercase">
            <p class="label">fondness</p>
            <div class="progress-bg">
                <div class="progress-bar"
                style={`width: ${data.fondness / 10 * 100}%`}></div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row uppercase">
            <p class="label">featured projects</p>
            <p>{data.projects ? data.projects.length : 0}</p>
        </div>

        <!-- Expanded -->
        {#if active}
            <div class="grid grid-cols-4 gap-2 mt-3">
                {#each data.projects as project}
                    <button class="flex rounded-md overflow-hidden project-img"
                    on:click={() => {handleProjectClick(project)}}>
                        <img 
                            src={project.mainImage}
                            style="
                            aspect-ratio: 1/1;
                            object-fit: cover"/>
                    </button>
                {/each}
            </div>
            <div class="flex mt-3">
                <p class="label flex-shrink-0 uppercase">description</p>
                <p class="font-normal"
                style="letter-spacing: -0.5px;">{data.description ?? ''}</p>
            </div>
        {/if}
    </div>
</button>

<style>
    *{
        text-align: left;
    }
    .card{
        
        /* border: 1px solid #ffffff20; */
        /* backdrop-filter: blur(6px); */
        width: fit-content;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffff60;
        --aug-tl: 25px;
        --aug-br: 25px;
        --aug-tr: 10px;
        --aug-bl: 10px;

        --aug-b-extend1: 50%;
        --aug-b-inset1: -5px;

        --aug-t-extend1: 50%;
        --aug-t-inset1: -5px;

        --aug-r-extend1: 50%;
        --aug-r-inset1: -5px;

        transition: 0.3s ease;
        padding: 15px;
        padding-bottom: 25px;
        width: 100%;
        transition: 0.2s ease;
        background: #ffffff10;
    }
    .card.dark{
        --aug-border-bg: #ffffff30;
    }
    .card:hover{
        background: #ffffff29;
        transition: 0.2s ease;
    }
    .label{
        width: 180px;
        font-size: 12px;
        font-weight: 300;
    }
    .info-container{
        display: none;
    }
    .active .info-container{
        display: flex;
    }
    .info-container * {
        line-height: 17px;
    }
    .inner{
        --aug-tr: 5px;
        --aug-bl: 5px;
    }
    .glow{
        /* backdrop-filter: blur(15px) saturate(3); */
    }
    .main-image{
        height: 100%; 
        aspect-ratio: 1;
    }
    .progress-bg{
        background: #00000009;
        position: relative;
        height: 7px;
        width: 100%;
        flex-grow: 0;
        flex-shrink: 1;
        margin: auto;
        margin-left: 0;
    }
    .dark .progress-bg{
        background: #ffffff19;
    }
    .progress-bar{
        background: #00000012;
        mix-blend-mode: screen;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .dark .progress-bar{
        background: #ffffff;
    }
    .project-img{
        border: 1px solid #ffffff89
    }
    .dark .project-img{
        border: 1px solid #ffffff49;
    }
    @media only screen and (min-width: 768px){
        .info-container{
            display: flex;
        }
        .main-image{
            height: fit-content; 
            aspect-ratio: 1;
        }
        .progress-bg{
            width: 50%;
        }
        .label{
            font-size: 16px;
            font-weight: 600;
        }
    }
</style>