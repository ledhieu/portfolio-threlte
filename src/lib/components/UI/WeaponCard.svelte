<script>
    import { getContext } from 'svelte'

    export let data;

    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')
    const activeWeapon = getContext('activeWeapon')

    $: active = $activeWeapon && $activeWeapon._id ? $activeWeapon._id == data._id : false

    function handleClick(){
        $activeWeapon = data
    }
</script>

<div
    class="card flex relative gap-5
    justify-between cursor-pointer"
    class:active={active}
    class:dark={$darkMode}
    style={`
        background: #ffffff10;
    `}
    on:click={handleClick}
    data-augmented-ui="tl-clip br-clip b-clip-x
    tr-round bl-round exe border">
    <div
        class="inner p-3 relative"
        data-augmented-ui="tl-clip br-clip
        tr-round bl-round exe"
        style={`background: #ffffff10;
        height: 80px; aspect-ratio: 1;`}>
        <img 
            class="glow"
            src={data.mainImage ?? ''}
            style="height: fit-content; aspect-ratio: 1;
        "/>
    </div>
        
    <div class="flex flex-col info-container flex-1
    font-bold uppercase">
        <div class="flex">
            <p class="label">Name</p>
            <p>{data.title}</p>
        </div>
        <div class="flex">
            <p class="label">familiarity</p>
            <div class="progress-bg">
                <div class="progress-bar"
                style={`width: ${data.familiarity / 10 * 100}%`}></div>
            </div>
        </div>
        <div class="flex">
            <p class="label">fondness</p>
            <div class="progress-bg">
                <div class="progress-bar"
                style={`width: ${data.fondness / 10 * 100}%`}></div>
            </div>
        </div>
        <div class="flex">
            <p class="label">featured projects</p>
            <p>{data.projects ? data.projects.length : 0}</p>
        </div>

        <!-- Expanded -->
        {#if active}
            <div class="grid grid-cols-4 gap-2 mt-3">
                {#each data.projects as project}
                    <div class="flex rounded-md overflow-hidden project-img">
                        <img 
                            src={project.mainImage}
                            style="
                            aspect-ratio: 1/1;
                            object-fit: cover"/>
                    </div>
                {/each}
            </div>
            <div class="flex mt-3">
                <p class="label">description</p>
                <p>{data.description ?? ''}</p>
            </div>
        {/if}
    </div>
</div>

<style>
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
    }
    .card.dark{
        --aug-border-bg: #ffffff30;
    }
    .label{
        width: 180px;
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
    .progress-bg{
        background: #00000009;
        position: relative;
        height: 7px;
        width: 50%;
        flex-grow: 0;
        flex-shrink: 1;
        margin: auto;
        margin-left: 0;
    }
    .dark .progress-bg{
        background: #ffffff19;
    }
    .progress-bar{
        background: #00000020;
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
</style>