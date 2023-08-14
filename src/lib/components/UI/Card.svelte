<script>
    import { createEventDispatcher } from "svelte";
    import {PortableText} from '@portabletext/svelte'
    import Image from './Image.svelte'
    import { getContext } from 'svelte'
    
    

    export let data;

    $: date = new Date(data.date)
    export let active = false;
    const dispatch = createEventDispatcher()
    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')


    // TODO: add [projectState] in routing

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
</script>

<div class="relative"
    class:col-span-3={active}>
    <div 
        class:active={active}
        class="card flex flex-col relative h-full"
        style={`
            background: #ffffff10;
        `}
        data-augmented-ui="tl-clip br-clip b-clip-x r-clip-x
        tr-round bl-round exe border"
        >   
        {#if active}
            <button on:click={() => {
                active = false;
                dispatch('minimize', data)
                history.pushState({}, "", `/${$pageState}`)
            }}
                class="text-white text-left mb-10">
                <p>{"<"} MINIMIZE</p>
            </button>
        {/if}
        {#if data.mainImage}
            <img 
                src={data.mainImage}
                class="w-full">

            <!-- Background glow -->
            <img 
                src={data.mainImage}
                class="w-full absolute"
                style={`z-index: -10;
                padding: 30px;
                transform: scale(1.1);
                top: 0px; left: 0px;
                filter: blur(20px) ${!$darkMode ? 
                    'brightness(2) opacity(10%)'
                : ''};`}>
        {/if}
        <p class="akira mt-5"
            style="font-size: 32px; line-height: 32px;"
        >
            {data.title ?? ""}
        </p>
        {#if active}
            <p class="" style="">{month[date.getMonth()].substring(0, 3)} {date.getFullYear()} | a site</p>
        {/if}

        <p class="absolute another h-min m-auto"
        style="font-size: 200px; opacity: 0.07; z-index: -1;
        bottom: 35%; line-height: 0px;">
            {data.title.split(' ')[0]}
        </p>

        <div class="mt-3">
        {#if data.roles}
            {#each data.roles as role}
                <p style="line-height: 18px;">// {role}</p>
            {/each}
        {:else}
            <p>// no role</p>
        {/if}
        </div>

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
            <div class="portable-text">
                <PortableText
                    value={data.body}
                    components={{
                        types: {
                            image: Image
                        }
                    }}
                />
            </div>
        {/if}

        
        <div class="w-full flex justify-between mt-auto pt-10">
            {#if !active}
            <div class="inconsolata uppercase">
                {month[date.getMonth()].substring(0, 3)} {date.getFullYear()}
            </div>
            {/if}

            <button
                on:click={() => {
                    if(!active){
                        dispatch('open', data);
                        history.pushState({}, "", `/${$pageState}/${data.slug.current}`)
                    } else {
                        dispatch('minimize', data)
                        history.pushState({}, "", `/${$pageState}`)
                    }
                       
                    active = !active;
                }}
                class="view-btn"
                data-augmented-ui="tl-clip br-clip tr-round bl-round exe border">
                {#if !active}
                    VIEW {">"}
                {:else}
                    {"<"} MINIMIZE
                {/if}
            </button>
        </div>
        
    </div>
</div>

<style>
    .badge{
        background: #FF6B00;
        border-radius: 50px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 11px;
    }
    .card{
        
        /* border: 1px solid #ffffff20; */
        backdrop-filter: blur(6px);
        width: fit-content;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffff30;
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
        padding: 30px;
        width: 100%;
        transition: 0.2s ease;
    }
    .card.active{
        padding: 50px;
        transition: 0.2s ease;
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
    }
    .view-btn:hover{
        background: #ffffff20;
        transition: 0.2s ease;
    }
    :global(.portable-text *){
        margin-top: 30px;
    }
</style>