export const toggleDuelScreen = () => {
    const duelDiv = document.querySelector('.duel-page')
    if (duelDiv.style.visibility === 'visible'){
        duelDiv.style.visibility = 'hidden'
    } else {
        duelDiv.style.visibility = 'visible'
    }
}