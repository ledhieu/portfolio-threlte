
import { loading } from '$lib/loading'

const  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

let _loading = 0
loading.subscribe(value => {
    _loading = value
})
export function shuffle(node, params){
    const delay = (params && params.delay) ?? 0
    const shuffleEveryNFrames = (params && params.everyNFrames) ?? 2
    const shufflesBeforeOrderings = (params && params.shufflesBeforeOrdering) ?? 5
    const shufflesBetweenOrderings = (params && params.shufflesBetweenOrderings) ?? 10
    let sourceText = node.innerText
    let currentText = ""
    let _shuffles = 0;
    let _raf
    setTimeout(() => {
        requestAnimationFrame(_shuffle)
    }, delay)
    let _frames = 0;
    function _shuffle(){
        _frames += 1
        if(_frames % shuffleEveryNFrames != 0){
            _raf = requestAnimationFrame(_shuffle)
            return
        }
        currentText = Array.from({ length: sourceText.length})
            .map((char, i) => {
                if((_shuffles - shufflesBeforeOrderings)/shufflesBetweenOrderings > i)
                    return sourceText[i]
                else
                    return characters[Math.round(Math.random() * characters.length) - 1]
                }
            )
            .join('')
        node.innerText = currentText
        if(_loading >= 100)
            _shuffles += 1
        if(_shuffles > sourceText.length * shufflesBetweenOrderings + shufflesBeforeOrderings){
            cancelAnimationFrame(_raf)
            return;
        }
        _raf = requestAnimationFrame(_shuffle)
    }
}