<script>
    import { getContext } from 'svelte'

    export let data;

    const pageState = getContext('pageState')
    const darkMode = getContext('darkMode')
    const activeClass = getContext('activeClass')

    $: active = $activeClass && $activeClass._id ? $activeClass._id == data._id : false

    function handleClick(){
        $activeClass = data
    }
</script>

<div
    class="card flex flex-col md:flex-row
    col-span-1 md:col-span-2
    relative gap-5
    justify-between cursor-pointer"
    class:col-span-2={active}
    class:active={active}
    class:dark={$darkMode}
    title={data.title}
    style={`
        background: #ffffff10;
    `}
    on:click={handleClick}
    data-augmented-ui="tl-clip br-clip
    tr-round bl-round exe border">

    <p class="absolute another h-min m-auto"
    style="font-size: 100px; opacity: 0.075; z-index: -1;
    left: 30px;
    bottom: 40%; line-height: 0px;">
        {data.title.split(' ')[0]}
    </p>

    <div
        class="inner p-3 relative"
        data-augmented-ui="tl-clip br-clip
        tr-round bl-round exe"
        style={`background: #ffffff30;
        height: 60px; aspect-ratio: 1;`}>
        <img 
            class="main-image"
            src={data.mainImage ?? ''}
            style="
        "/>
    </div>

</div>

<style>
    .card{
        
        /* border: 1px solid #ffffff20; */
        /* backdrop-filter: blur(6px); */
        width: fit-content;
        --aug-border-all: 1px;
        --aug-border-bg: #ffffffa0;
        --aug-tl: 15px;
        --aug-br: 15px;
        --aug-tr: 5px;
        --aug-bl: 5px;

        --aug-r-extend1: 50%;
        --aug-r-inset1: -2px;

        --aug-t-extend1: 50%;
        --aug-t-inset1: -2px;

        --aug-r-extend1: 50%;
        --aug-r-inset1: -2px;

        transition: 0.3s ease;
        padding: 5px;
        /* padding-bottom: 25px; */
        /* width: 100%; */
        transition: 0.2s ease;
        opacity: 0.64;
    }
    .card:hover, .card.active{
        opacity: 1;
        transition: 0.2s ease;
    }
    .card.dark{
        --aug-border-bg: #ffffff35;
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
        opacity: 0.8;
    }
    .dark .main-image{
        filter: invert(1);
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
    
    @media only screen and (min-width: 768px){
    }
</style>