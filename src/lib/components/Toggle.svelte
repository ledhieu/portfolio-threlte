<script>
    import { getContext } from "svelte";


    const darkMode = getContext('darkMode')
</script>

<!-- <button 
    class:dark={$darkMode}
    
    class="toggle relative uppercase text-white flex items-center">
    <p class="text-white btn-text">{$darkMode ? 'techieside' : 'designside'}</p>
    <div class="toggle-btn absolute"
    class:animate={animating}></div>
</button> -->
<div style="transform: rotate(-90deg)"
    class="relative"
    class:dark={$darkMode}>
    
    <input 
        bind:checked={$darkMode}
        type="checkbox" 
        class="absolute top-0"
        id="switch" />
    <label for="switch">
        <p class="text-white absolute btn-text uppercase">{$darkMode ? 'techie' : 'design'}</p>
    </label>
    
</div>

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
        background: #FF6B00;
        display: block;
        border-radius: 100px;
        position: relative;
        box-shadow: 0px 0px 24px #FF7B30;
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
        background-color: #6E18FF;
        box-shadow: 0px 0px 24px #6E18FF;
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