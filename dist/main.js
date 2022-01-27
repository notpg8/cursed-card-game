(()=>{"use strict";var e={d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{ec:()=>y,Nz:()=>l,Wb:()=>a});class t{constructor(e){this.id=e.id,this.rarity=e.rarity,this.name=e.name,this.description=e.description,this.stats=e.stats}get getCardStats(){return`⚔ ${this.stats.attack} | ♥ ${this.stats.hp} `}get getRarityIcon(){switch(this.rarity){case"common":return"●";case"uncommon":return"◆";case"rare":return"★";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getRarityColor(){switch(this.rarity){case"common":return"gray";case"uncommon":return"rgb(97 131 118)";case"rare":return"gold";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getIsWeak(){return this.stats.attack<=20||this.stats.hp<=20}get getRandomWeakText(){switch(this.randomNumber(5)){case 1:return"OOF";case 2:return"WHACK";case 3:return"SO BAD";case 4:return"OH NO";case 5:return"WEAK!"}}get getCardDescription(){return this.description}get getCardImagesUrls(){return{front:`./media/cards-pngs-optimized/medium/${this.name}`,back:"./media/cards-pngs-optimized/medium/back/originalback.png"}}get getUnparsedCard(){return this.buildCard()}get getUnparsedCardForDuel(){return this.buildCardForDuel()}randomNumber=e=>Math.floor(Math.random()*Math.floor(e))+1;buildCss=()=>{const e=", linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);";return{cardClasses:`card ${"rare"===this.rarity?this.rarity+" animate-glow":this.rarity} face-down`,cardStyles:{faceUpStyles:`background-image: url('${this.getCardImagesUrls.back}'); background-image: url('${this.getCardImagesUrls.front}')${"rare"===this.rarity?e:""}; background-color: ${this.getRarityColor}; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`,faceDownStyles:`background-image: url('${this.getCardImagesUrls.back}'); background-color: rgb(83, 118, 131); background-size: cover;`},duelCardStyles:{duelFaceUpStyles:`background-image: url('${this.getCardImagesUrls.front}')${"rare"===this.rarity?e:""}; background-color: ${this.getRarityColor}; background-size: cover; width: 100%; height:100%; pointer-events: none; position: absolute; z-index: -1;`,duelFaceDownStyles:""}}};buildCardRarityP=()=>({rarityClasses:`card-rarity ${this.rarity}-card-rarity`});buildCardNotificationSpan=()=>({notificationClasses:"notification-area",notificationStyles:"opacity: 0;"});buildCardStatsP=()=>({statsClasses:`card-stats ${this.rarity}-card-stats`});buildCardFightButton=()=>({fightButtonClasses:"fight-button"});buildCard=()=>{const{cardClasses:e,cardStyles:t}=this.buildCss(),{rarityClasses:r}=this.buildCardRarityP(),{notificationClasses:a,notificationStyles:i}=this.buildCardNotificationSpan(),{statsClasses:s}=this.buildCardStatsP(),{fightButtonClasses:o}=this.buildCardFightButton();return`<div id="${this.id}" class="${e}" style="${t.faceDownStyles}"><div class="card-image ${this.rarity}-image-filter" style="${t.faceUpStyles}"></div>\n\t\t<p class="${r}">${this.getRarityIcon}\t</p>\n\t\t<span class="${a}" style="${i}">${this.getIsWeak?this.getRandomWeakText:""}</span>\n\t\t<p class="${s}">${this.getCardStats}</p>\n\t\t<button class="${o}" title="Fight!">🥊</button>\n\t\t</div>`};buildCardForDuel=()=>{const{cardClasses:e,cardStyles:t,duelCardStyles:r}=this.buildCss(),{rarityClasses:a}=this.buildCardRarityP(),{notificationClasses:i,notificationStyles:s}=this.buildCardNotificationSpan(),{statsClasses:o}=this.buildCardStatsP(),{fightButtonClasses:c}=this.buildCardFightButton();return`<div id="${this.id}" class="${e}" style="${r.duelFaceUpStyles}"><div class="card-image ${this.rarity}-image-filter" style="${r.duelFaceUpStyles}"></div>\n\t\t<p class="${a}">${this.getRarityIcon}</p>\n\t\t<span class="${i}" style="${s}">${this.getIsWeak?this.getRandomWeakText:""}</span>\n\t\t<p class="${o}">${this.getCardStats}</p>\n\t\t<button class="${c}" title="Fight!">🥊</button>\n\t\t</div>`};buildCardInfoTooltip=()=>{}}const r=()=>{document.querySelector(".duel-page").style.opacity=1,a.emit("request-duel",(e=>{const r=e[0],a=new t(r),i=l(a.getUnparsedCardForDuel),s=document.querySelector(".opponent-card-duel");s.appendChild(i),s.querySelector(".card-rarity").style.visibility="visible",s.querySelector(".card-rarity").style.fontSize="1rem";const o=s.querySelector(".card-stats").innerHTML;s.querySelector(".atk-hp-opponent").innerHTML=o})),y()};var a=io();let i=[];const s=()=>{n(i),d()};a.on("deal-cards",(e=>{i.push(...e),s()})),a.on("fight-result",(e=>{h(e)}));const o=()=>{document.querySelectorAll(".card").forEach((e=>{e.style.transform="scale(1)",e.style.zIndex=0,e.style.position="relative"}))},c=e=>{if(e.target.classList.contains("card")){const t=e.target.style;o(),d(),t.transform="scale(1.6)",t.zIndex=2,e.target.firstChild.style.visibility="visible",e.target.querySelector(".notification-area")&&p(e),m(e)}a.emit("chat","fuck you")},l=e=>{const t=document.createElement("DIV");return t.innerHTML=e,t.firstChild},n=e=>{const r=document.querySelector(".play-area");e.map(((e,a)=>{const i=new t(e),s=l(i.getUnparsedCard);r.appendChild(s),s.addEventListener("click",(function(){u(i)})),s.querySelector(".fight-button").addEventListener("click",g)})),document.querySelectorAll(".card").forEach((e=>{e.addEventListener("click",c)}))},d=()=>{const e=document.querySelectorAll(".common"),t=document.querySelectorAll(".uncommon"),r=document.querySelectorAll(".rare"),a=document.querySelectorAll(".back"),i=e=>{e.forEach((e=>{const t=Math.random()<.5?-1:1,r=(Math.floor(Math.random()*Math.floor(2.5))+1)*t;e.style.transform=`rotate(${r}deg)`}))};i(e),i(t),i(r),i(a)},u=e=>{const t=document.querySelectorAll(".card-description");t&&t.forEach((e=>e.remove()));const r=document.querySelector(".card-info-tooltip"),a=document.createElement("H2"),i=document.createElement("P"),s=document.createElement("P");a.classList.add("card-name","card-description"),i.classList.add("card-description"),s.classList.add("card-description"),a.appendChild(document.createTextNode(e.name.substring(0,e.name.indexOf(".")).toUpperCase())),i.appendChild(document.createTextNode(e.description)),s.appendChild(document.createTextNode(`${e.getRarityIcon} ${e.rarity.toUpperCase()} | ATTACK: ${e.stats.attack} | HP: ${e.stats.hp}`)),r.appendChild(a),r.appendChild(i),r.appendChild(s)},y=()=>{const e=document.querySelectorAll(".card-description");e&&e.forEach((e=>e.remove()))},p=e=>{e.target.querySelector(".notification-area").setAttribute("style","opacity: 1;"),setTimeout((()=>{e.target.querySelector(".notification-area").setAttribute("style","opacity: 0;")}),700)},m=e=>e.target.classList.value.includes("face-down")?(e.target.classList.remove("face-down"),e.target.classList.add("face-up"),e.target.querySelector(".card-rarity").style.visibility="visible",e.target.querySelector(".card-stats").style.visibility="visible",e.target.querySelector(".notification-area").style.visibility="visible",e.target.querySelector(".card-image").style.visibility="visible",void(e.target.querySelector(".fight-button").style.visibility="visible")):null,g=e=>{const t=e.target.parentElement,i=t.querySelector(".card-stats").innerHTML;t.style.transform="scale(1.3)",t.querySelector("button").remove(),t.querySelector(".card-rarity").style.fontSize="1rem",r();const s=document.querySelector(".own-card-duel"),o=document.querySelector(".opponent-card-duel");s.appendChild(t),t.querySelector(".card-stats").remove(),document.querySelector(".atk-hp-self").innerHTML=i,setTimeout((()=>{const e=s.querySelector(".card").getAttribute("id"),t=o.querySelector(".card").getAttribute("id");a.emit("fight",{ownId:e,opponentId:t})}),400)},h=e=>{document.querySelector(".fight-result").style.opacity=1,document.querySelector(".fight-result").innerHTML=e.toUpperCase(),setTimeout((()=>{document.querySelector(".fight-result").style.opacity=0,document.querySelector(".duel-page").style.opacity=0,document.querySelectorAll(".own-card-duel > div").forEach((e=>e.remove())),document.querySelectorAll(".opponent-card-duel > div").forEach((e=>e.remove()))}),3e3)};(()=>{const e=(e=>{const t=document.createElement("DIV");return t.innerHTML=e,t.querySelector(".duel-page")})('<div class="duel-page"><div class="duel-cards"><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="own-duel-page skewed"></div><div class="opponent-duel-page skewed"></div></div></div>');document.querySelector(".board").appendChild(e)})(),(()=>{const e=document.querySelector(".server-status");e.innerHTML="🟢 &nbsp;",e.setAttribute("style","vertical-align: top; font-size: 0.4rem")})(),document.querySelector(".populate-cards").addEventListener("click",(()=>{a.emit("request-new-cards",(e=>{i=[],i.push(...e),s()}))})),document.querySelector(".delete-cards").addEventListener("click",(()=>{const e=document.querySelector(".play-area");for(;e.firstChild;)e.removeChild(e.firstChild);document.querySelector(".populate-cards").removeAttribute("disabled"),y()})),document.querySelector(".reveal-all-cards").addEventListener("click",(()=>{document.querySelectorAll(".card").forEach((e=>{e.classList.remove("face-down"),e.classList.add("face-up"),e.querySelector(".card-rarity").style.visibility="visible",e.querySelector(".card-stats").style.visibility="visible",e.querySelector(".card-image").style.visibility="visible",e.querySelector(".fight-button").style.visibility="visible",e.querySelector(".notification-area")&&(e.querySelector(".notification-area").style.visibility="visible")}))})),document.querySelector(".duel-page-button").addEventListener("click",r),document.addEventListener("click",(e=>{"board"!==e.target.className&&"play-area"!==e.target.className||o()}))})();