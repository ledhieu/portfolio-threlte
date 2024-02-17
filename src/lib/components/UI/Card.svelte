<script>
    import { createEventDispatcher } from "svelte";
    import { PortableText } from '@portabletext/svelte'
    import Image from './Image.svelte'
    import { getContext } from 'svelte'
    import Youtube from './Youtube.svelte'
    
    

    export let data;
    let active;
    let cardDOM;
    let titleDOM;
    let imageDOM;

    $: date = data.date ? new Date(data.date) : null
    $: {
        console.log('blocks', data)
    }
    $: {
        active = (data && data.slug && $activeProject && $activeProject.slug) ? $activeProject.slug.current == data.slug.current : false;
    }
    const dispatch = createEventDispatcher()
    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')
    const activeProject = getContext('activeProject')

    // TODO: add [projectState] in routing (maybe done? check again)

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    function handleClick(isMinimizeButton = false){
        if(!data){
            return
        }
        if(!active){
            console.log('click')
            setTimeout(() => {
                imageDOM.scrollIntoView({ block: "center", behaviour: 'smooth'})
            }, 200)
            dispatch('open', data);
            history.pushState({}, "", `/${$pageState}/${data.slug.current}`)
            $activeProject = data
        } else if(isMinimizeButton) {
            dispatch('minimize', data)
            history.pushState({}, "", `/${$pageState}`)
            $activeProject = undefined;
        }
    }
    function handleLinkClick(){
        if(data.url && window){
            window.open(data.url, '_blank');
            return
        }
    }
</script>

<div class="relative"
    class:col-span-3={active}>
    <button 
        bind:this={cardDOM}
        class:active={active}
        class:dark={$darkMode}
        class="card flex flex-col relative h-full cursor-pointer"
        on:click|preventDefault|stopPropagation={() => {handleClick(false)}}
        data-augmented-ui="tl-clip br-clip b-clip-x r-clip-x
        tr-round bl-round exe border"
        >   
        {#if active}
            <button on:click|stopPropagation={() => {handleClick(true)}}
                class="text-white text-left mb-10">
                <p>{"<"} MINIMIZE</p>
            </button>
        {/if}
        {#if data.mainImage}
            <div class="w-full aspect-video object-cover overflow-hidden">
                <img 
                    bind:this={imageDOM}
                    src={data.mainImage}
                    class="main-image object-cover w-full h-full">
            </div>
            <!-- Background glow -->
            <img 
                src={data.mainImage}
                class="w-full absolute aspect-video object-cover"
                style={`z-index: -10;
                padding: 30px;
                transform: scale(1.1);
                top: 0px; left: 0px;
                mix-blend-mode: screen;
                filter: blur(20px) ${!$darkMode ? 
                    'brightness(2) opacity(10%)'
                : ''};`}>
        {/if}
        
        <div class="content-container">
            <p class="absolute another h-min m-auto"
            style="font-size: 200px; opacity: 0.05; z-index: -1;
            bottom: 35%; line-height: 0px;">
                {data.title.split(' ')[0]}
            </p>

            <p class="akira mt-5 title text-left"
                style=""
                bind:this={titleDOM}
            >
                {data.title ?? ""}
            </p>
            <!-- {#if active}
                {#if date}
                    <p class="" style="">{month[date.getMonth()].substring(0, 3)} {date.getFullYear()} | a site</p>
                {:else}
                    <p>WORK IN PROGRESS</p>
                {/if}
            {/if}

            <div class="mt-3 text-left">
            {#if data.roles}
                {#each data.roles as role}
                    <p style="line-height: 18px;">// {role}</p>
                {/each}
            {:else}
                <p>// no role</p>
            {/if}
            </div> -->

            {#if active}
            <table class="text-left">
                <tr>
                    <td class="title-cell">Project type</td>
                    <td class="be">----------</td>
                    <td>{data.type}</td>
                </tr>
                <tr>
                    <td class="title-cell">Date</td>
                    <td class="be">----------</td>
                    <td>
                        {#if date}
                            <p class="" style="">{month[date.getMonth()].substring(0, 3)} {date.getFullYear()}</p>
                        {:else}
                            <p>WORK IN PROGRESS</p>
                        {/if}
                    </td>
                </tr>
                <tr>
                    <td class="title-cell">Roles</td>
                    <td class="be">----------</td>
                    <td>
                        {#if data.roles}
                            {#each data.roles as role}
                                <p style="line-height: 18px;">{role}</p>
                            {/each}
                        {:else}
                            <p>no role</p>
                        {/if}
                    </td>
                </tr>
            </table>
            {/if}

            <div class="flex gap-3 flex-wrap w-full mt-4">
                {#each data.weapons as weapon}
                    <button class="badge">
                        {weapon.title}
                    </button>
                {/each}
            </div>

            {#if active && data.body}
                <!-- {#each data.body as block}
                    {#if block._type == 'block'}
                        {#each block.children as child}
                            <svelte:component this={child._type}
                            >
                                {#if child.text}
                                    {child.text}
                                {/if}
                            </svelte:component>
                        {/each}
                    {:else if block._type == 'image'}
                        <img src={block.asset._ref}/>
                    {/if}
                {/each} -->
                <div class="portable-text w-full text-left">
                    <PortableText
                        value={data.body}
                        components={{
                            types: {
                                image: Image,
                                youtube: Youtube
                            }
                        }}
                    />
                </div>
            {/if}
        </div>
        
        <div class="w-full flex justify-between mt-auto button-container">
            {#if !active}
            <div class="inconsolata uppercase">
                {#if date}
                    {month[date.getMonth()].substring(0, 3)} {date.getFullYear()}
                {:else}
                    WORK IN PROGRESS
                {/if}
            </div>
            {/if}

            <button
                on:click|stopPropagation={data.url && data.url != '' && !active ? handleLinkClick : () => {handleClick(true)}}
                class="view-btn"
                class:url-btn={data.url && data.url != '' && !active}
                data-augmented-ui="tl-clip br-clip tr-round bl-round exe border">
                {#if !active}
                    {#if data.url && data.url != ''}
                        VISIT SITE {">"}
                    {:else}
                        VIEW {">"}
                    {/if}
                {:else}
                    {"<"} MINIMIZE
                {/if}
            </button>
            <!-- Opened card visit site link -->
            {#if data.url && data.url != '' && active }
                <button
                class="view-btn"
                on:click={handleLinkClick}
                class:url-btn={true}
                data-augmented-ui="tl-clip br-clip tr-round bl-round exe border">
                    VISIT SITE {">"}
                </button>
            {/if}
        </div>
        
    </button>
</div>

<style>
    .badge{
        background: #FF6B00;
        border-radius: 50px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 13px;
        color: white;
    }
    .card{
        
        /* border: 1px solid #ffffff20; */
        backdrop-filter: blur(6px);
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
        /* padding: 25px; */
        width: 100%;
        transition: 0.2s ease;
        background: #ffffff10;
    }
    .card.dark{
        --aug-border-bg: #ffffff30;
    }
    .card.active{
        padding: 30px;
        transition: 0.2s ease;
    }
    .card:hover{
        background: #ffffff29;
        transition: 0.2s ease;
    }
    .main-image{
        transform: scale(1);
        transition: 0.2s ease;
    }
    .card:hover .main-image{
        transform: scale(1.05);
        transition: 0.2s ease;
    }
    .content-container{
        padding: 15px;
        padding-top: 0px;
        /* padding-bottom: 0px; */
    }
    .button-container{
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 25px;
    }
    .view-btn{
        background: #ffffff10;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffff30;
        --aug-tl: 8px;
        --aug-br: 8px;
        --aug-tr: 2px;
        --aug-bl: 2px;
        transition: 0.2s ease;
        font-size: 12px;
    }
    .view-btn:hover{
        background: #ffffff20;
        transition: 0.2s ease;
    }
    .url-btn{
        background: #000000f0;
        color: #ffffffd0;
    }
    .url-btn:hover{
        background: #000000ff;
        color: #ffffffff
    }
    .dark .url-btn{
        background: #ffffff20;
    }
    .dark .url-btn:hover{
        background: #ffffff50;
    }

    :global(.portable-text *){
        margin-top: 30px;
    }
    .title{
        font-size: 18px; 
        line-height: 16px;
    }
    .title-cell{
        text-transform: uppercase;
        font-weight: bold;
        vertical-align: top;
        width: 120px;
    }
    .be{
        letter-spacing: -4px;
        font-weight: 400;
    }
    td.be{
        padding-right: 20px;
    }
    table{
        text-transform: uppercase;
    }
    td {
        vertical-align: top;
    }
    @media only screen and (min-width: 1024px){
        .title{
            font-size: 32px; 
            line-height: 32px;
        }
        .content-container{
            padding: 25px;
            padding-top: 0px;
            /* padding-bottom: 0px; */
        }
        .button-container{
            padding-left: 25px;
            padding-right: 25px;
            padding-bottom: 35px;
        }
        .active .button-container{
            padding-top: 30px;
        }
        .card.active{
            /* padding: 50px; */
            transition: 0.2s ease;
        }
        
    }
</style>