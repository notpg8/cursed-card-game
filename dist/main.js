(()=>{"use strict";class t{constructor(t){this.id=t.id,this.rarity=t.rarity,this.description=t.description,this.stats={attack:this.assignRandomStatValue(this.rarity),defense:this.assignRandomStatValue(this.rarity),hp:this.assignRandomStatValue(this.rarity)}}get getCardStats(){return`♥ ${this.stats.hp} | ⚔ ${this.stats.attack} | ❂ ${this.stats.defense}\n    `}get getRarityIcon(){switch(this.rarity){case"common":return"●";case"uncommon":return"◆";case"rare":return"★";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getRarityColor(){switch(this.rarity){case"common":return"gray";case"uncommon":return"#40677a";case"rare":return"gold";default:console.log("RARITY ISSUE, NOT MATCHING ANY RARITY")}}get getIsWeak(){return this.stats.hp<=20}get getRandomWeakText(){switch(this.randomNumber(5)){case 1:return"OOF";case 2:return"WHACK";case 3:return"SHIT!";case 4:return"CRAP";case 5:return"WEAK!"}}get getCardDescription(){return this.description}get getCardImagesUrls(){return{front:`./media/cards-pngs-optimized/medium/${this.id.toString()}.png`,back:"./media/cards-pngs-optimized/medium/originalback.png"}}get getCardDiv(){const t=`card ${"rare"===this.rarity?this.rarity+" animate-glow":this.rarity}`,e=`background-size: 100%; background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png'); background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png')${"rare"===this.rarity?", linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)":null}; background-color: ${this.getRarityColor}; background-size: cover;`;return{classes:t.split(" "),styles:e}}assignRandomStatValue=t=>{if(t){if("rare"===t)return Math.floor(Math.random()*Math.floor(666))+1;if("uncommon"===t)return Math.floor(Math.random()*Math.floor(120))+1;if("common"===t)return Math.floor(Math.random()*Math.floor(60))+1}};randomNumber=t=>Math.floor(Math.random()*Math.floor(t))+1}var e=io();let r=[];const a=()=>{s(r),n()};e.on("deal-cards",(t=>{r.push(...t),a()}));const o=t=>{const r=t.target.style;document.querySelectorAll(".card").forEach((t=>{t.style.scale=1,t.style.zIndex=0,t.style.position="relative"})),n(),r.transform="scale(1.9)",r.zIndex=10,t.target.firstChild.style.visibility="visible",t.target.querySelector(".notification-area")&&u(t),m(r),e.emit("chat","fuck you")},s=e=>{const r=document.querySelector(".play-area");e.map((e=>{const a=new t(e),o=document.createElement("DIV");o.classList.add(...a.getCardDiv.classes),o.setAttribute("style",a.getCardDiv.styles),console.log(o),r.appendChild(o),((t,e)=>{const r=document.createElement("P");r.classList.add("card-rarity"),r.appendChild(document.createTextNode(t.getRarityIcon)),e.appendChild(r)})(a,o),a.getIsWeak&&((t,e)=>{const r=document.createElement("span");r.innerHTML=t.getRandomWeakText,r.setAttribute("style","opacity: 0;"),r.classList.add("notification-area"),e.appendChild(r)})(a,o),((t,e)=>{const r=document.createElement("P");r.classList.add("card-stats"),r.appendChild(document.createTextNode(t.getCardStats)),e.appendChild(r),r.setAttribute("style",`${"rare"!==t.rarity&&"background-color: gold;"}`),"rare"===t.rarity&&r.setAttribute("style","color: gold; text-shadow: 0 0 2px black")})(a,o),o.addEventListener("click",(function(){d(a)}))})),i(),c(),document.querySelectorAll(".card").forEach((t=>{t.addEventListener("click",o)}))},i=()=>{document.querySelector(".populate-cards").setAttribute("disabled","true")},c=()=>{document.querySelector(".delete-cards").removeAttribute("disabled")},n=()=>{const t=document.querySelectorAll(".common"),e=document.querySelectorAll(".uncommon"),r=document.querySelectorAll(".rare"),a=document.querySelectorAll(".back"),o=t=>{t.forEach((t=>{const e=Math.random()<.5?-1:1,r=(Math.floor(Math.random()*Math.floor(2.5))+1)*e;t.style.transform=`rotate(${r}deg)`}))};o(t),o(e),o(r),o(a)};document.querySelector(".populate-cards").addEventListener("click",(()=>{e.emit("request-new-cards",(t=>{r=[],r.push(...t),a()}))})),document.querySelector(".delete-cards").addEventListener("click",(()=>{const t=document.querySelector(".play-area");for(;t.firstChild;)t.removeChild(t.firstChild);document.querySelector(".populate-cards").removeAttribute("disabled"),document.querySelector(".delete-cards").setAttribute("disabled","true"),l()}));const d=t=>{const e=document.querySelectorAll(".card-description");e&&e.forEach((t=>t.remove()));const r=document.querySelector(".card-details-area"),a=document.createElement("P"),o=document.createElement("P");a.classList.add("card-description"),o.classList.add("card-description"),a.appendChild(document.createTextNode(t.description)),o.appendChild(document.createTextNode(`${t.getRarityIcon} ${t.rarity.toUpperCase()} | HP: ${t.stats.hp} | ATTACK: ${t.stats.attack} | DEFENSE: ${t.stats.defense}`)),r.appendChild(a),r.appendChild(o)},l=()=>{const t=document.querySelectorAll(".card-description");t&&t.forEach((t=>t.remove()))},u=t=>{t.target.querySelector(".notification-area").setAttribute("style","opacity: 1;"),setTimeout((()=>{t.target.querySelector(".notification-area").setAttribute("style","opacity: 0;")}),700)};(()=>{const t=document.querySelector(".server-status");t.innerHTML="🟢 &nbsp;",t.setAttribute("style","vertical-align: top; font-size: 0.4rem")})();const m=t=>{console.log(t),t.backgroundImage="url(./media/cards-pngs-optimized/medium/originalback.png)"}})();