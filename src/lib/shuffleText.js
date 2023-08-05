

const  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";


export function shuffle(node, params){
    const delay = (params && params.delay) ?? 0
    const shuffleEveryNFrames = (params && params.everyNFrames) ?? 2
    const shufflesBeforeOrderings = (params && params.shufflesBeforeOrdering) ?? 5
    const shufflesBetweenOrderings = (params && params.shufflesBetweenOrderings) ?? 10
    const from = (params && params.from) ?? node.innerText
    const spaceMapping = (params && params.spaceMapping) ?? false
    let to = node.innerText
    let currentText = ""
    let _shuffles = 0;
    let _raf
    setTimeout(() => {
        requestAnimationFrame(_shuffle)
    }, delay)
    let _frames = 0;
    let maxShuffles = to.length * shufflesBetweenOrderings + shufflesBeforeOrderings
    function _shuffle(){
        _frames += 1
        if(_frames % shuffleEveryNFrames != 0){
            _raf = requestAnimationFrame(_shuffle)
            return
        }
        let currentLength = from.length + Math.round((to.length - from.length) * Math.min(1, Math.max(0, _shuffles - maxShuffles * 0.2) / (maxShuffles * 0.7)))
        currentText = Array.from({ length: currentLength})
            .map((char, i) => {
                // if "from" is defined, gradually 'let go' of characters to the chaos
                if(from != to && _shuffles < shufflesBeforeOrderings){
                    let percentage = _shuffles/shufflesBeforeOrderings
                    if(Math.floor(percentage * currentLength) <= i){
                        let shiftedSpaces = currentLength - from.length
                        return from[clamp(i - shiftedSpaces, 0, from.length - 1)]
                    }
                }
                // put in the "to" characters one by one
                if((_shuffles - shufflesBeforeOrderings)/shufflesBetweenOrderings > i
                    || Math.abs(Math.round(_shuffles - shufflesBeforeOrderings/shufflesBetweenOrderings) - i) <= 1){
                        return to[i]
                } else {
                    let array, index
                    if(spaceMapping 
                        && ((to[i] && spaceMapping[to[i]]) 
                        || (from[i] && spaceMapping[from[i]]))){
                        array = spaceMapping[to[i] && to[i] != ' ' ? to[i].toUpperCase() : from[i].toUpperCase()]
                    } else {
                        array = characters
                    }
                    index = Math.round(Math.random() * array.length) - 1
                    return array[index]
                }
            })
            .join('')
        node.innerText = currentText
        _shuffles += 1
        if(_shuffles > maxShuffles){
            cancelAnimationFrame(_raf)
            return;
        }
        _raf = requestAnimationFrame(_shuffle)
    }
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  };