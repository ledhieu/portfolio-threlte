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

<button class="relative top-container"
on:click={handleClick}
class:active={active}>
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
    style="">
        <div class="card flex h-full"
        data-augmented-ui="br-clip b-clip-x
        tr-round exe border"
        style="">
            <div class="text-left flex flex-col h-full p-2">
                <p class="akira title">{data.title}</p>
                <p class="description"
                style="font-size: 13px;
                line-height: 15px">{data.description ?? ''}</p>
                <div class="bar-container mt-auto lg:mb-2" style="height: 10px">
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
        --aug-all-width: 60px;
        --aug-border-all: 1px;
        --aug-border-bg: #fff;
        background: #CCCDCE;
        transition: 0.5s ease;
        margin-bottom: 125px;
        margin-left: calc(100% - 30px);
    }
    .dark.hex{
        background: #18043B;
        transition: 0.5s ease;
    }
    .inside-hex{
        --aug-all-width: 50px;
        --aug-border-all: 0.5px;
        --aug-border-bg: #ffffff00;
        left: 0; right: 0; top: 0; bottom: 0;
        margin:auto;
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
        padding-bottom: 5px;
        width: 100%;
        transition: 0.2s ease;
        background: #ffffff10;

    }
    .top-container{
        height: 80px;
        transition: 0.5s ease;
    }
    .top-container.active{
        height: 200px;
        transition: 0.5s ease;
    }
    .card-container{
        height: 80px;
        top: 5%;
        padding-left: 0px;
        transition: 0.5s ease;
    }
    .active .card-container{
        height: 200px;
        transition: 0.5s ease;
    }
    .title{
        padding-right: 20px;
    }
    .description{
        padding-right: 20px;
        display: none;
    }
    .active .description{
        display: block;
    }
    .bar-container{
        margin-left: -72px;
        position: relative;
    }
    @media only screen and (min-width: 768px){
        .hex{
            --aug-all-width: 110px;
            margin-bottom: 0px;
        }
        .inside-hex{
            --aug-all-width: 90px;
        }
        .top-container{
            height: auto
        }
        .card-container{
            top: 5%; 
            height: 90%; 
            padding-left: 55px
        }
        .card{
            padding: 5px;
            padding-bottom: 25px; 
            padding-left: calc(55px + 10px)
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
            margin-left: 0;
        }
    }
</style>