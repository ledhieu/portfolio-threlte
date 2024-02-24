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

<ul
    class=""
    on:click={handleClick}
    class:dark={$darkMode}
    class:active={active}>
    <li></li>
    <li></li>
    <li></li>
</ul>

<style>
    *{
        margin: 0;
        padding: 0;
    }

    ul{
        position: relative;
        width: 40px;
        height: 40px;
        /* margin-top: 6px; */
        /* margin-right: 11px; */
        /* transform: rotate(-90deg); */
        transform: scale(0.7)
    }

    ul li{
        list-style: none;
        position: absolute;
        border: 2px solid #00000080;
        background: #000;
        border-radius: 50%;
        transition: all 0.5s ease;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        transform: scale(.12);
    }
    .dark li{
        border: 2px solid #ffffff80;
        background: #fff;
    }

    ul li:nth-child(1){
        left: -10px;
    }

    ul.active li:nth-child(2){
        transform: scale(1);
        background: transparent;
    }

    ul li:nth-child(3){
        left: 10px;
    }

    ul.active li:nth-child(1){
        width: 160px;
        border-radius: 0;
        transition-delay: 0.2s;
        transform: scale(.10) translate(-310%, 0) rotate(135deg);
    }


    ul.active li:nth-child(3){
        height: 160px;
        border-radius: 0;
        transition-delay: 0.2s;
        transform: scale(.10) translate(-240%, -375%) rotate(135deg);
    }
</style>