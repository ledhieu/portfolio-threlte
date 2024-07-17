<script>
    import { createEventDispatcher } from "svelte";
    import { getContext } from "svelte";
    
    export { klass as class}

    const dispatch = createEventDispatcher()
    const darkMode = getContext('darkMode')
    let klass;
</script>

<button
    on:click={() => {dispatch('click', {})}}
    class={`${klass} button w-fit m-auto`}
    class:dark={$darkMode}
    data-augmented-ui="br-clip tl-round tr-round bl-round exe
    border"
    >
    <slot></slot>
</button>

<style>
    .button{
      padding: 10px;
      padding-left: 25px;
      padding-right: 25px;
      mix-blend-mode: screen;
      --aug-border-all: 1px;
      --aug-border-bg: var(--light-primary);
      --aug-bl: 2px;
      --aug-tl: 2px;
      --aug-tr: 2px;
      background: rgba(var(--light-primary-rgb), 0.625);
        transition: 0.1s ease;
  }
  .dark.button{
    --aug-border-bg: var(--dark-primary);
    background: rgba(var(--dark-primary-rgb), 0.625);
  }
  .button:hover{
    background: var(--light-primary);
    transition: 0.1s ease;
  }
  .dark.button:hover{
    background: var(--dark-primary)
  }
</style>