<script>
    import { getContext } from 'svelte'
    import { gsap } from 'gsap'
    import { blur, fly, fade } from 'svelte/transition'
    import { enhance, applyAction } from '$app/forms';

    const pageState = getContext('pageState')
    const BASE_DELAY = 1000;
    const DELAY_INTERVAL = 500;
    const darkMode = getContext('darkMode')

    let time = {time: 0}
    let opacity = 0;
    let layerblur = 30;
    let sent = false;

    $: {
      // onDestroy doesn't work because it would be too late
      // this works, what a hack
      if($pageState != 'contact'){
        gsap.to(time, { time: 0, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
          opacity = time.time
          layerblur = 30 - time.time * 30
        }})
      } else {
        // putting the code below in onMount works too, but this looks
        // more consistent
        gsap.to(time, { time: 1, duration: 1, ease: 'power4.inOut', delay: BASE_DELAY/1000, onUpdate: () => {
          opacity = time.time
          layerblur = 30 - time.time * 30
        }})
      }
    }
</script>

<div class="ui-container"
style={`opacity: ${opacity};
filter: blur(${layerblur}px)`}>
    <div
        class="card h-full flex flex-col
        relative gap-5
        justify-between
        "
        class:dark={$darkMode}
        style={`
            background: #ffffff10;
        `}
        data-augmented-ui="tl-clip br-clip b-clip-x
        tr-round bl-round exe border">

        <p class="absolute another h-min m-auto"
        style="font-size: 300px; opacity: 0.025; z-index: -1;
        left: 30px;
        bottom: 40%; line-height: 0px;">
            contact me
        </p>
        {#if !sent}
        <div class="flex flex-col gap-10 h-full">
            <div>
                <div class="akira"
                style="font-size: 50px; line-height: 50px">
                    Contact me
                </div>
                <a class="link" href="mailto:jason.dhieu@gmail.com">jason.dhieu@gmail.com</a><span>, or send me a message here</span>
            </div>
            <form class="flex flex-col info-container flex-1
                gap-8 md:gap-8
                font-bold uppercase"
                method="POST" 
                action="/api/contact"
                use:enhance={({ formData, action }) => {
                    console.log(formData)
                    return async ({ result, update }) => {
                        console.log(result)
                        if(result.type != 'success'){
                            alert(JSON.stringify(result.data))
                        } else {
                            alert('Sent', result)
                        }
                    }
                }
            }>
                <input placeholder="Your name">
                <input placeholder="Your email">
                <input placeholder="Share your thoughts">
                <button class="btn"
                type="button"
                on:click={() => {sent = true}}
                style="font-weight: 400"
                data-augmented-ui="tl-clip br-clip exe">
                    Send me a message
                </button>
            </form>
        </div>
        {:else}
        <div class="flex flex-col gap-10 h-full">
            <div>
                <div class="akira"
                style="font-size: 50px; line-height: 50px">
                    THANK YOU
                </div>
                <div class="">Your message has been received. I will get back to you as soon as I can</div>
            </div>
            <button class="btn"
                on:click={() => { sent = false }}
                style="font-weight: 400"
                data-augmented-ui="tl-clip br-clip exe">
                ← Send me another message
            </button>
        </div>
        {/if}
    </div>
</div>


<style>
    .ui-container{
        padding: 50px;
        padding-top: 120px;
        overflow-y: scroll;
        height: 100%;   
        z-index: 1;
        overflow-x: hidden;
    }
    input{
        background: none;
        border-bottom: 1px solid #00000030;
        display: block;
        transition: 0.2s ease;
    }
    input::placeholder{
        color: black;
        font-weight: 400;
        transition: 0.2s ease;
    }
    .dark input{
        border-bottom: 1px solid #ffffff30;
        transition: 0.2s ease;
    }
    .dark input::placeholder{
        color: white;
        transition: 0.2s ease;
    }
    .btn{
        background: #000;
        color: white;
        padding: 10px;
        text-transform: uppercase;
        --aug-tl: 7px;
        --aug-br: 7px;
        transition: 0.2s ease;
    }
    .dark .btn{
        background: #ffffff20;
        transition: 0.2s ease;
    }
    .card{
        
        /* border: 1px solid #ffffff20; */
        /* backdrop-filter: blur(6px); */
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
        padding: 25px;
        width: 60%;
        padding-bottom: 25px;
        transition: 0.2s ease;
        backdrop-filter: blur(7px);
    }
    .card.dark{
        --aug-border-bg: #ffffff30;
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
    @media only screen and (min-width: 768px){
        .ui-container{
            padding: 150px;
        }
        .info-container{
            display: flex;
        }
        .main-image{
            height: fit-content; 
            aspect-ratio: 1;
        }
        .progress-bg{
            width: 50%;
        }
        .label{
            font-size: 16px;
            font-weight: 600;
        }
        .card{
            padding: 40px;
        }
    }
</style>