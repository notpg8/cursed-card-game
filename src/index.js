const populateRandomCards = () => {
    // randomCommonCards(5)
    // randomRareCard(1)
    renderCards(startingCardsObject)
    rotateCards()
    // renderCards(1, 'rare')

}
const startingCardsObject = {
    common: 7,
    rare: 2,
}

const returnRandomNumber = () => {
    return Math.floor(Math.random() * Math.floor(5))+1
}

const randomColor = () => {
    const red = Math.floor(Math.random() * Math.floor(257))
    const green = Math.floor(Math.random() * Math.floor(257))
    const blue = Math.floor(Math.random() * Math.floor(257))
    // const alpha = Math.random().toFixed(2)
    const alpha = 0.2
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
    const allCards = document.querySelectorAll('.card')
    allCards.forEach(card => {
        card.style.scale = 1
        card.style.zIndex = 0
        rotateCards()
    })
    cardStyle.scale = 2
    cardStyle.zIndex = 100
    cardStyle.rotate = '0deg'
    
}

const renderCards = (cards) => {  
    
    const commonCards = cards.common 
    const rareCards = cards.rare
    
    const playArea = document.querySelector('.play-area')

    if(cards.common && commonCards>0){

        for (i=commonCards; i>0; i--){
            const card = document.createElement("DIV");
            card.classList.add('card',"common")
            card.setAttribute('draggable', 'true')
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
    document.querySelectorAll('.card').forEach(c => c.addEventListener('click', zoomOnCard))
}

const disablePopulateButton = () => {
    document.querySelector('.populate-cards').setAttribute('disabled', 'true')
}

const rotateCards = () => {
    const cardsCommon = document.querySelectorAll('.common')
    const cardsRare = document.querySelectorAll('.rare')

    const applyRotationStyle = (cardsToRotate) => {
        cardsToRotate.forEach(card => {
            const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            const degrees = (Math.floor(Math.random() * Math.floor(5))+1 )* plusOrMinus
            card.style.rotate = `${degrees}deg`
        })
    }
    applyRotationStyle(cardsCommon)
    applyRotationStyle(cardsRare)
}

const deleteCards = () => {
    const allCardsParent = document.querySelector('.play-area')
    while (allCardsParent.firstChild){
        allCardsParent.removeChild(allCardsParent.firstChild)
    }
    document.querySelector('.populate-cards').removeAttribute('disabled')
}

populateRandomCards()


