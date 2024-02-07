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

<button class="relative">
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
            class="inside-hex absolute">

            </div>
        </div>
    </div>
    <div class="card-container absolute z-[-1] w-full"
    style="top: 5%; height: 90%; left: 55px">
        <div class="card flex h-full"
        data-augmented-ui="br-clip b-clip-x
        tr-round exe border"
        style="padding: 0; padding-left: calc(55px + 10px)">
            <div class="text-left flex flex-col h-full p-2">
                <p class="akira">{data.title}</p>
                <p style="font-size: 13px;
                line-height: 15px">{data.description ?? ''}</p>
                <div class="mt-auto mb-2" style="height: 10px">
                    {#each Array(5) as _, i}
                        <div class="bar absolute"
                            class:fill={i < data.familiarity / 2}
                            style={`left: ${i > 0 ? 75 + i * 30 - 10 : 75 + i * 30}px;
                            width: ${i != 0 && i != 4 ? 50 : 40}px`}
                            data-augmented-ui={`border ${i != 0 ? 'bl-clip' : ''}
                        ${i != '4' ? 'tr-clip' : ''} exec`}></div>
                    {/each}
                </div>
            </div>
            <!-- <div class="grid grid-rows-2"
            style="border-left: 1px solid #ffffff90;
            min-width: 130px">
            </div> -->
           
        </div>
</div>
</button>

<style>
    .bar{
        --aug-border-bg: #ffffffa0;
        --aug-border-all: 1px;
        height: 4px
    }
    .bar.fill{
        background: #fff;
    }
    .hex{
        --aug-all-width: 110px;
        --aug-border-all: 1px;
        --aug-border-bg: #fff;
        background: #CCCDCE;
        transition: 0.5s ease;
    }
    .dark.hex{
        background: #18043B;
        transition: 0.5s ease;
    }
    .inside-hex{
        --aug-all-width: 90px;
        --aug-border-all: 0.5px;
        --aug-border-bg: #ffffff00;
        top: calc((110px - 88px)/2);
        left: calc((110px - 91px)/2);
        background: #ffffff30;
        transition: 0.5s ease;
    }
    .dark .inside-hex{
        --aug-border-bg: #fffffff0;
        background: #ffffff00;
        transition: 0.5s ease;
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
        padding-bottom: 25px;
        width: 100%;
        transition: 0.2s ease;
        background: #ffffff10;

    }
</style>