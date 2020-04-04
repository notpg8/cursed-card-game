const populateRandomCards = () => {
    // randomCommonCards(5)
    // randomRareCard(1)
    renderCards(startingCardsObject)
    // renderCards(1, 'rare')

}
const startingCardsObject = {
    common: 5,
    rare: 1,
}

const returnRandomNumber = () => {
    return Math.floor(Math.random() * Math.floor(5))+1
}

const randomColor = () => {
    const red = Math.floor(Math.random() * Math.floor(257))
    const green = Math.floor(Math.random() * Math.floor(257))
    const blue = Math.floor(Math.random() * Math.floor(257))
    const alpha = Math.random().toFixed(2)
    return `${red}, ${green}, ${blue}, ${alpha}`
}

const randomCommonCards = () => {
    const cards = document.querySelectorAll('.common')
    cards.forEach(c => {
        c.setAttribute('style', `background-size: 100%; background-image: url("../cards-pngs/${returnRandomNumber().toString()}.png"); background-color: rgb(${randomColor()})`)
    })
}

const randomRareCards = (numberOfCards) => {
    const cards = document.querySelectorAll('.rare')
    const goldGradientCSS = 'linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)'
    cards.forEach(c => {
        c.setAttribute('style', `background-size: 100%; background-image: url("../cards-pngs/${returnRandomNumber().toString()}.png"), ${goldGradientCSS};`)
    })
}

const zoomOnCard = (e) => {
    const cardStyle = e.target.style
    cardStyle.scale = 2
    cardStyle.position = 'absolute'
    cardStyle.left = '45%'
}

const renderCards = (cards) => {  
    
    const commonCards = cards.common 
    const rareCards = cards.rare
    
    const playArea = document.querySelector('.play-area')

    if(cards.common && commonCards>0){

        for (i=commonCards; i>0; i--){
            const card = document.createElement("DIV");
            card.classList.add('card',"common")
            playArea.appendChild(card);
            
        }
        randomCommonCards()
    } 
    
    if (cards.rare && rareCards>0) {
        for (i=rareCards; i>0; i--){
            const card = document.createElement("DIV");
            card.classList.add('card',"rare")
            playArea.appendChild(card);
            
        }
        randomRareCards()
    }
    disablePopulateButton()
}

const disablePopulateButton = () => {
    document.querySelector('.button-populate-cards').setAttribute('disabled', 'true')
    setTimeout(()=>{
        document.querySelector('.button-populate-cards').removeAttribute('disabled')
    }, 2000)
}

document.querySelectorAll('.card').forEach(c => c.addEventListener('click', zoomOnCard))