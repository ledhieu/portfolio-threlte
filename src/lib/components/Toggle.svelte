<script>
    import { getContext } from "svelte";

    let used = false;
    const darkMode = getContext('darkMode')
    const activeCategory = getContext('activeCategory')
    const pageState = getContext('pageState')

    function clearCategory(){
        $activeCategory = undefined
    }

    $:{
        $darkMode;
        if($darkMode && !used){
            used = true;
        }
    }

</script>

<!-- <button 
    class:dark={$darkMode}
    
    class="toggle relative uppercase text-white flex items-center">
    <p class="text-white btn-text">{$darkMode ? 'techieside' : 'visualside'}</p>
    <div class="toggle-btn absolute"
    class:animate={animating}></div>
</button> -->
<div style="transform: rotate(-90deg)"
    class="relative"
    class:dark={$darkMode}>
    
    <input 
        bind:checked={$darkMode}
        on:change={clearCategory}
        type="checkbox" 
        class="absolute top-0"
        id="switch" />
    <label for="switch">
        <p class="text-white absolute btn-text uppercase">{!$darkMode ? 'coding' : 'visual'}</p>
    </label>
    
</div>

{#if !used && ($pageState == '' || $pageState == 'character')}
<div class="absolute hidden lg:block"
style="left: -40px; top: 10px;">
    <img class=""
    src={"/arrow2-01.png"}
    style={`
    height: 80px`}>
    <p class="text-white passionate pointer-events-none"
    style="font-size: 25px; margin-left: -15px; margin-top: 2px">
    Switch</p>
</div>
{/if}



<style>
    .btn-text{
        top: 6px;
        pointer-events: none;
        left: 55px;
        opacity: 1;
        transition: left 0.5s ease, opacity 0.5s ease 0.4s;
    }
    .dark .btn-text{
        left: 20px;
        opacity: 1;
        transition: left 0.5s ease, opacity 0.5s ease 0.4s;
    }
    label:active .btn-text{
        opacity: 0;
        transition: 0.1s ease;
    }
    input[type=checkbox]{
        height: 0;
        width: 0;
        visibility: hidden;
    }

    label {
        cursor: pointer;
        width: 120px;
        height: 35px;
        background: var(--light-primary);
        display: block;
        border-radius: 100px;
        position: relative;
        box-shadow: 0px 0px 24px var(--light-primary);
        transition: background-color 0.5s ease, box-shadow 0.5s ease;
    }

    label:after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 40px;
        height: 25px;
        background: #fff;
        border-radius: 90px;
        transition: 0.5s;
    }

    input:checked + label {
        background-color: var(--dark-primary);
        background-color: #182430;
        box-shadow: 0px 0px 24px var(--dark-primary);
        box-shadow: 0px 0px 24px #567899;
        transition: background-color 0.5s ease, box-shadow 0.5s ease;
    }

    input:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
    }

    label:active:after {
        width: 70px;
        transition: 0.2s;
    }
</style>