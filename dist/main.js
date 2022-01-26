(()=>{"use strict";var t={d:(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{ec:()=>m,Nz:()=>d,Wb:()=>s});class e{constructor(t){this.id=t.id,this.rarity=t.rarity,this.name=t.name,this.description=t.description,this.stats={attack:this.assignRandomStatValue(this.rarity),defense:this.assignRandomStatValue(this.rarity),hp:this.assignRandomStatValue(this.rarity)}}get getCardStats(){return`⚔ ${this.stats.attack} | ♥ ${this.stats.hp} `}get getRarityIcon(){switch(this.rarity){case"common":return"●";case"uncommon":return"◆";case"rare":return"★";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getRarityColor(){switch(this.rarity){case"common":return"gray";case"uncommon":return"rgb(97 131 118)";case"rare":return"gold";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getIsWeak(){return this.stats.attack<=20||this.stats.hp<=20}get getRandomWeakText(){switch(this.randomNumber(5)){case 1:return"OOF";case 2:return"WHACK";case 3:return"SO BAD";case 4:return"OH NO";case 5:return"WEAK!"}}get getCardDescription(){return this.description}get getCardImagesUrls(){return{front:`./media/cards-pngs-optimized/medium/${this.id}`,back:"./media/cards-pngs-optimized/medium/back/originalback.png"}}get getUnparsedCard(){return this.buildCard()}get getUnparsedCardForDuel(){return this.buildCardForDuel()}assignRandomStatValue=t=>{if(t){if("rare"===t)return Math.floor(Math.random()*Math.floor(100))+50;if("uncommon"===t)return Math.floor(Math.random()*Math.floor(60))+30;if("common"===t)return Math.floor(Math.random()*Math.floor(30))+1}};randomNumber=t=>Math.floor(Math.random()*Math.floor(t))+1;buildCss=()=>{const t=", linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);";return{cardClasses:`card ${"rare"===this.rarity?this.rarity+" animate-glow":this.rarity} face-down`,cardStyles:{faceUpStyles:`background-image: url('${this.getCardImagesUrls.back}'); background-image: url('${this.getCardImagesUrls.front}')${"rare"===this.rarity?t:""}; background-color: ${this.getRarityColor}; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`,faceDownStyles:`background-image: url('${this.getCardImagesUrls.back}'); background-color: rgb(83, 118, 131); background-size: cover;`},duelCardStyles:{duelFaceUpStyles:`background-image: url('${this.getCardImagesUrls.front}')${"rare"===this.rarity?t:""}; background-color: ${this.getRarityColor}; background-size: cover; width: 100%; height:100%; pointer-events: none; position: absolute; z-index: -1;`,duelFaceDownStyles:""}}};buildCardRarityP=()=>({rarityClasses:`card-rarity ${this.rarity}-card-rarity`});buildCardNotificationSpan=()=>({notificationClasses:"notification-area",notificationStyles:"opacity: 0;"});buildCardStatsP=()=>({statsClasses:`card-stats ${this.rarity}-card-stats`});buildCardFightButton=()=>({fightButtonClasses:"fight-button"});buildCard=()=>{const{cardClasses:t,cardStyles:e}=this.buildCss(),{rarityClasses:r}=this.buildCardRarityP(),{notificationClasses:a,notificationStyles:i}=this.buildCardNotificationSpan(),{statsClasses:s}=this.buildCardStatsP(),{fightButtonClasses:o}=this.buildCardFightButton();return`<div class="${t}" style="${e.faceDownStyles}"><div class="card-image ${this.rarity}-image-filter" style="${e.faceUpStyles}"></div>\n\t\t<p class="${r}">${this.getRarityIcon}\t</p>\n\t\t<span class="${a}" style="${i}">${this.getIsWeak?this.getRandomWeakText:""}</span>\n\t\t<p class="${s}">${this.getCardStats}</p>\n\t\t<button class="${o}" title="Fight!">🥊</button>\n\t\t</div>`};buildCardForDuel=()=>{const{cardClasses:t,cardStyles:e,duelCardStyles:r}=this.buildCss(),{rarityClasses:a}=this.buildCardRarityP(),{notificationClasses:i,notificationStyles:s}=this.buildCardNotificationSpan(),{statsClasses:o}=this.buildCardStatsP(),{fightButtonClasses:l}=this.buildCardFightButton();return`<div class="${t}" style="${r.duelFaceUpStyles}"><div class="card-image ${this.rarity}-image-filter" style="${r.duelFaceUpStyles}"></div>\n\t\t<p class="${a}">${this.getRarityIcon}</p>\n\t\t<span class="${i}" style="${s}">${this.getIsWeak?this.getRandomWeakText:""}</span>\n\t\t<p class="${o}">${this.getCardStats}</p>\n\t\t<button class="${l}" title="Fight!">🥊</button>\n\t\t</div>`};buildCardInfoTooltip=()=>{}}const r=()=>{if(!document.querySelector(".duel-page")){const t=a(i);document.querySelector(".board").appendChild(t)}s.emit("request-duel",(t=>{const r=t[0],a=new e(r),i=d(a.getUnparsedCardForDuel),s=document.querySelector(".opponent-card-duel");document.querySelector(".opponent-card-duel").appendChild(i),console.log(s),s.querySelector(".card-rarity").style.visibility="visible",s.querySelector(".card-rarity").style.fontSize="1rem"}));const t=document.querySelector(".duel-page");"visible"===t.style.visibility?t.remove():t.style.visibility="visible",m()},a=t=>{const e=document.createElement("DIV");return e.innerHTML=t,e.querySelector(".duel-page")},i='<div class="duel-page"><div class="duel-cards"><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="own-duel-page skewed"></div><div class="opponent-duel-page skewed"></div></div></div>';var s=io();let o=[];const l=()=>{u(o),y()};s.on("deal-cards",(t=>{o.push(...t),l()}));const c=()=>{document.querySelectorAll(".card").forEach((t=>{t.style.transform="scale(1)",t.style.zIndex=0,t.style.position="relative"}))},n=t=>{if(console.log("inside zoom on card"),t.target.classList.contains("card")){const e=t.target.style;c(),y(),e.transform="scale(1.6)",e.zIndex=2,t.target.firstChild.style.visibility="visible",t.target.querySelector(".notification-area")&&g(t),p(t)}s.emit("chat","fuck you")},d=t=>{const e=document.createElement("DIV");return e.innerHTML=t,e.firstChild},u=t=>{const r=document.querySelector(".play-area");t.map(((t,a)=>{const i=new e(t),s=d(i.getUnparsedCard);r.appendChild(s),s.addEventListener("click",(function(){h(i)})),s.querySelector(".fight-button").addEventListener("click",b)})),document.querySelectorAll(".card").forEach((t=>{t.addEventListener("click",n)}))},y=()=>{const t=document.querySelectorAll(".common"),e=document.querySelectorAll(".uncommon"),r=document.querySelectorAll(".rare"),a=document.querySelectorAll(".back"),i=t=>{t.forEach((t=>{const e=Math.random()<.5?-1:1,r=(Math.floor(Math.random()*Math.floor(2.5))+1)*e;t.style.transform=`rotate(${r}deg)`}))};i(t),i(e),i(r),i(a)},h=t=>{const e=document.querySelectorAll(".card-description");e&&e.forEach((t=>t.remove()));const r=document.querySelector(".card-info-tooltip"),a=document.createElement("H2"),i=document.createElement("P"),s=document.createElement("P");a.classList.add("card-name","card-description"),i.classList.add("card-description"),s.classList.add("card-description"),a.appendChild(document.createTextNode(t.name.substring(0,t.name.indexOf(".")).toUpperCase())),i.appendChild(document.createTextNode(t.description)),s.appendChild(document.createTextNode(`${t.getRarityIcon} ${t.rarity.toUpperCase()} | ATTACK: ${t.stats.attack} | HP: ${t.stats.hp}`)),r.appendChild(a),r.appendChild(i),r.appendChild(s)},m=()=>{const t=document.querySelectorAll(".card-description");t&&t.forEach((t=>t.remove()))},g=t=>{t.target.querySelector(".notification-area").setAttribute("style","opacity: 1;"),setTimeout((()=>{t.target.querySelector(".notification-area").setAttribute("style","opacity: 0;")}),700)},p=t=>{const e=t.target;return console.log("inside flip card"),e.classList.value.includes("face-down")?(t.target.classList.remove("face-down"),t.target.classList.add("face-up"),t.target.querySelector(".card-rarity").style.visibility="visible",t.target.querySelector(".card-stats").style.visibility="visible",t.target.querySelector(".notification-area").style.visibility="visible",t.target.querySelector(".card-image").style.visibility="visible",void(t.target.querySelector(".fight-button").style.visibility="visible")):null},b=t=>{const e=t.target.parentElement;e.style.transform="scale(1.3)",e.querySelector("button").remove(),e.querySelector(".card-stats").remove(),e.querySelector(".card-rarity").style.fontSize="1rem",r(),document.querySelector(".own-card-duel").appendChild(e)};(()=>{const t=document.querySelector(".server-status");t.innerHTML="🟢 &nbsp;",t.setAttribute("style","vertical-align: top; font-size: 0.4rem")})(),document.querySelector(".populate-cards").addEventListener("click",(()=>{s.emit("request-new-cards",(t=>{o=[],o.push(...t),l()}))})),document.querySelector(".delete-cards").addEventListener("click",(()=>{const t=document.querySelector(".play-area");for(;t.firstChild;)t.removeChild(t.firstChild);document.querySelector(".populate-cards").removeAttribute("disabled"),m()})),document.querySelector(".reveal-all-cards").addEventListener("click",(()=>{document.querySelectorAll(".card").forEach((t=>{t.classList.remove("face-down"),t.classList.add("face-up"),t.querySelector(".card-rarity").style.visibility="visible",t.querySelector(".card-stats").style.visibility="visible",t.querySelector(".card-image").style.visibility="visible",t.querySelector(".fight-button").style.visibility="visible",t.querySelector(".notification-area")&&(t.querySelector(".notification-area").style.visibility="visible")}))})),document.querySelector(".duel-page-button").addEventListener("click",r),document.addEventListener("click",(t=>{"board"!==t.target.className&&"play-area"!==t.target.className||c()}))})();