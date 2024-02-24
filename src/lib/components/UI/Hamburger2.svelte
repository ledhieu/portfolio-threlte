<script>
    import { createEventDispatcher } from "svelte";
    import { getContext } from "svelte";

    export let active = false;
    const dispatch = createEventDispatcher()
    const darkMode = getContext('darkMode')

    function handleClick(){
        dispatch('click', {})
    }
    
</script>

<div class="grid grid-cols-5 grid-rows-5 gap-0 w-full">
    {#each Array.from({length: 25}) as block, i}
        <span 
        class:empty={
            !active ? i < 5 || i >= 20 || (i >= 10 && i < 15) || i % 2 != 1
            : i % 2 != 0 || i == 2 || i == 10 || i == 14 || i == 22
        }
        class="col-span-1"
        style={`transition: 0.2s ease;
        transition-delay: ${0.1 * (i % 3)}s`}></span>
    {/each}
</div>


<style>
    *{
        margin: 0;
        padding: 0;
    }
    span{
        width: 5px; height: 5px;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px #ffffff00;
    }
    .grid:hover span:not(.empty){
        box-shadow: 0px 0px 5px #fff;
    }
    span.empty{
        background-color: #ffffff00;
        box-shadow: 0px 0px 5px #ffffff00;
    }
    .grid{
        height: 25px;
        width: 25px;
    }
</style>