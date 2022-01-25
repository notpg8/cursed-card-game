(()=>{"use strict";class e{constructor(e){this.id=e.id,this.rarity=e.rarity,this.name=e.name,this.description=e.description,this.stats={attack:this.assignRandomStatValue(this.rarity),defense:this.assignRandomStatValue(this.rarity),hp:this.assignRandomStatValue(this.rarity)}}get getCardStats(){return`⚔ ${this.stats.attack} | ♥ ${this.stats.hp} `}get getRarityIcon(){switch(this.rarity){case"common":return"●";case"uncommon":return"◆";case"rare":return"★";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getRarityColor(){switch(this.rarity){case"common":return"gray";case"uncommon":return"rgb(97 131 118)";case"rare":return"gold";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getIsWeak(){return this.stats.attack<=20||this.stats.hp<=20}get getRandomWeakText(){switch(this.randomNumber(5)){case 1:return"OOF";case 2:return"WHACK";case 3:return"SO BAD";case 4:return"OH NO";case 5:return"WEAK!"}}get getCardDescription(){return this.description}get getCardImagesUrls(){return{front:`./media/cards-pngs-optimized/medium/${this.id}`,back:"./media/cards-pngs-optimized/medium/back/originalback.png"}}get getCardDiv(){const e=`card ${"rare"===this.rarity?this.rarity+" animate-glow":this.rarity} face-down`,t=`background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png'); background-image: url('./media/cards-pngs-optimized/medium/${this.id}')${"rare"===this.rarity?", linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);":""}; background-color: ${this.getRarityColor}; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`;return{classes:e.split(" "),styles:{faceUpStyles:t,faceDownStyles:"background-image: url('./media/cards-pngs-optimized/medium/back/originalback.png'); background-color: rgb(83, 118, 131); background-size: cover;"}}}assignRandomStatValue=e=>{if(e){if("rare"===e)return Math.floor(Math.random()*Math.floor(100))+50;if("uncommon"===e)return Math.floor(Math.random()*Math.floor(60))+30;if("common"===e)return Math.floor(Math.random()*Math.floor(30))+1}};randomNumber=e=>Math.floor(Math.random()*Math.floor(e))+1}var t=io();let r=[];const a=()=>{s(r),o()};t.on("deal-cards",(e=>{r.push(...e),a()}));const i=e=>{const r=e.target.style;document.querySelectorAll(".card").forEach((e=>{e.style.scale=1,e.style.zIndex=0,e.style.position="relative"})),o(),r.transform="scale(1.6)",r.zIndex=10,e.target.firstChild.style.visibility="visible",e.target.querySelector(".notification-area")&&l(e),u(e),t.emit("chat","fuck you")},s=t=>{const r=document.querySelector(".play-area");t.map((t=>{const a=new e(t),i=document.createElement("DIV"),s=document.createElement("DIV");i.classList.add(...a.getCardDiv.classes),i.setAttribute("style",a.getCardDiv.styles.faceDownStyles),s.classList.add("card-image"),s.classList.add(`${a.rarity}-image-filter`),s.setAttribute("style",a.getCardDiv.styles.faceUpStyles),r.appendChild(i),i.appendChild(s),((e,t)=>{const r=document.createElement("P");r.classList.add("card-rarity"),r.classList.add(`${e.rarity}-card-rarity`),r.appendChild(document.createTextNode(e.getRarityIcon)),t.appendChild(r)})(a,i),a.getIsWeak&&((e,t)=>{const r=document.createElement("span");r.innerHTML=e.getRandomWeakText,r.setAttribute("style","opacity: 0;"),r.classList.add("notification-area"),t.appendChild(r)})(a,i),((e,t)=>{const r=document.createElement("P");r.classList.add("card-stats"),r.classList.add(`${e.rarity}-card-stats`),r.appendChild(document.createTextNode(e.getCardStats)),t.appendChild(r)})(a,i),i.addEventListener("click",(function(){d(a)}))})),c(),document.querySelectorAll(".card").forEach((e=>{e.addEventListener("click",i)}))},c=()=>{document.querySelector(".delete-cards").removeAttribute("disabled")},o=()=>{const e=document.querySelectorAll(".common"),t=document.querySelectorAll(".uncommon"),r=document.querySelectorAll(".rare"),a=document.querySelectorAll(".back"),i=e=>{e.forEach((e=>{const t=Math.random()<.5?-1:1,r=(Math.floor(Math.random()*Math.floor(2.5))+1)*t;e.style.transform=`rotate(${r}deg)`}))};i(e),i(t),i(r),i(a)};document.querySelector(".populate-cards").addEventListener("click",(()=>{t.emit("request-new-cards",(e=>{r=[],r.push(...e),a()}))})),document.querySelector(".delete-cards").addEventListener("click",(()=>{const e=document.querySelector(".play-area");for(;e.firstChild;)e.removeChild(e.firstChild);document.querySelector(".populate-cards").removeAttribute("disabled"),document.querySelector(".delete-cards").setAttribute("disabled","true"),n()})),document.querySelector(".reveal-all-cards").addEventListener("click",(()=>{document.querySelectorAll(".card").forEach((e=>{e.classList.remove("face-down"),e.classList.add("face-up"),e.querySelector(".card-rarity").style.visibility="visible",e.querySelector(".card-stats").style.visibility="visible",e.querySelector(".card-image").style.visibility="visible",e.querySelector(".notification-area")&&(e.querySelector(".notification-area").style.visibility="visible")}))}));const d=e=>{const t=document.querySelectorAll(".card-description");t&&t.forEach((e=>e.remove()));const r=document.querySelector(".card-details-area"),a=document.createElement("H2"),i=document.createElement("P"),s=document.createElement("P");a.classList.add("card-name","card-description"),i.classList.add("card-description"),s.classList.add("card-description"),a.appendChild(document.createTextNode(e.name.substring(0,e.name.indexOf(".")).toUpperCase())),i.appendChild(document.createTextNode(e.description)),s.appendChild(document.createTextNode(`${e.getRarityIcon} ${e.rarity.toUpperCase()} | HP: ${e.stats.hp} | ATTACK: ${e.stats.attack}`)),r.appendChild(a),r.appendChild(i),r.appendChild(s)},n=()=>{const e=document.querySelectorAll(".card-description");e&&e.forEach((e=>e.remove()))},l=e=>{e.target.querySelector(".notification-area").setAttribute("style","opacity: 1;"),setTimeout((()=>{e.target.querySelector(".notification-area").setAttribute("style","opacity: 0;")}),700)};(()=>{const e=document.querySelector(".server-status");e.innerHTML="🟢 &nbsp;",e.setAttribute("style","vertical-align: top; font-size: 0.4rem")})();const u=e=>e.target.classList.value.includes("face-down")?(e.target.classList.remove("face-down"),e.target.classList.add("face-up"),e.target.querySelector(".card-rarity").style.visibility="visible",e.target.querySelector(".card-stats").style.visibility="visible",e.target.querySelector(".notification-area").style.visibility="visible",void(e.target.querySelector(".card-image").style.visibility="visible")):null})();