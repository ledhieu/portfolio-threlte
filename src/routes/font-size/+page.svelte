<script>
    import { onMount } from "svelte";
    import { loading } from '$lib/loading'

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const charactersArray = characters.split('')
    let dictionary = {}, mappedCharacters = [], mappedCharactersDictionary = {},
    dictionaryArray = []
    let range = 0.05
    let mounted = false

    onMount(() => {
        $loading = 100
        const charEls = document.getElementsByClassName('character')
        console.log(charEls)
        mounted = true
        let max = -10000, min = 1000000
        for(let charEl of charEls){
            let w = charEl.clientWidth + 1
            let char = charEl.innerText
            if(w < min)
                min = w
            if(w > max)
                max = w
            dictionary[char] = w
            let _obj = {}
            _obj[char] = w
            dictionaryArray.push(_obj)
        }
        // normalize
        dictionaryArray = dictionaryArray.map(obj => {
            let key = Object.keys(obj)[0]
            let value = Object.values(obj)[0]
            let _obj = {}
            _obj[key] = (value - min)/(max - min)
            return _obj
        })
        
        console.log(dictionary)
        console.log(dictionaryArray)

        // Object.entries(dictionary).forEach(([key, value]) => {
        //     mapping[key] = 
        // })
        

    })

    $: if(mounted){
        mappedCharacters = dictionaryArray.map(obj => {
            let key = Object.keys(obj)[0]
            let value = Object.values(obj)[0]
            let _obj = {}
            // filter characters with roughly the same spacing,
            // we really only need and array of characters so
            // the value will be mapped out
            _obj[key] = dictionaryArray.filter(_ => {
                let _value = Object.values(_)[0]
                return Math.abs(value - _value) <= range
            }).map(_ => {
                let _key = Object.keys(_)[0]
                return _key
            })
            return _obj
        })
        console.log(mappedCharacters)
        
        // convert to dictionary
        mappedCharacters.forEach(obj => {
            let key = Object.keys(obj)[0]
            let value = Object.values(obj)[0]
            mappedCharactersDictionary[key] = value
        })
        console.log(JSON.stringify(mappedCharacters))
        console.log(JSON.stringify(mappedCharactersDictionary))
    }
</script>

<input type="range" bind:value={range} min="0" max="1" step={0.01}>
<input type="number" bind:value={range}>
<br><br>
{#each characters as character}
    <p class="akira character">{character}</p>
{/each}

{#each mappedCharacters as item}
    <p class="akira">{Object.keys(item)[0]}
        {#each Object.values(item) as c}
            <span class="akira">{c}</span>
        {/each}
    </p>
    
{/each}

{JSON.stringify(mappedCharactersDictionary)}

<style>
    .character{
        position: absolute;
        height: auto;
        width: auto;
        white-space: nowrap; /* Thanks to Herb Caudill comment*/ 
    }
</style>
