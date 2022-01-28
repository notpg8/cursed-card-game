(() => {
  "use strict";
  var e = {
    d: (t, r) => {
      for (var a in r)
        e.o(r, a) &&
          !e.o(t, a) &&
          Object.defineProperty(t, a, { enumerable: !0, get: r[a] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  e.d({}, { Nz: () => o, Wb: () => r });
  class t {
    constructor(e) {
      (this.id = e.id),
        (this.rarity = e.rarity),
        (this.name = e.name),
        (this.description = e.description),
        (this.stats = e.stats);
    }
    get getCardStats() {
      return `⚔ ${this.stats.attack} | ♥ ${this.stats.hp} `;
    }
    get getRarityIcon() {
      switch (this.rarity) {
        case "common":
          return "●";
        case "uncommon":
          return "◆";
        case "rare":
          return "★";
        default:
          console.log("RARITY ISSUE, NOT MATCHING ANY RARITY");
      }
    }
    get getRarityColor() {
      switch (this.rarity) {
        case "common":
          return "gray";
        case "uncommon":
          return "rgb(0 167 212);";
        case "rare":
          return "gold";
        default:
          console.log("RARITY ISSUE, NOT MATCHING ANY RARITY");
      }
    }
    get getIsWeak() {
      return this.stats.attack <= 20 || this.stats.hp <= 20;
    }
    get getRandomWeakText() {
      switch (this.randomNumber(5)) {
        case 1:
          return "OOF";
        case 2:
          return "WHACK";
        case 3:
          return "SO BAD";
        case 4:
          return "OH NO";
        case 5:
          return "WEAK!";
      }
    }
    get getCardDescription() {
      return this.description;
    }
    get getCardImagesUrls() {
      return {
        front: `./media/cards-pngs-optimized/medium/${this.name}`,
        back: "./media/cards-pngs-optimized/medium/back/originalback.png",
      };
    }
    get getUnparsedCard() {
      return this.buildCard();
    }
    get getUnparsedCardForDuel() {
      return this.buildCardForDuel();
    }
    randomNumber = (e) => Math.floor(Math.random() * Math.floor(e)) + 1;
    buildCss = () => {
      const e =
        ", linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);";
      return {
        cardClasses: `card ${
          "rare" === this.rarity ? this.rarity + " animate-glow" : this.rarity
        } face-down`,
        cardStyles: {
          faceUpStyles: `background-image: url('${
            this.getCardImagesUrls.back
          }'); background-image: url('${this.getCardImagesUrls.front}')${
            "rare" === this.rarity ? e : ""
          }; background-color: ${
            this.getRarityColor
          }; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`,
          faceDownStyles: `background-image: url('${this.getCardImagesUrls.back}'); background-color: rgb(83, 118, 131); background-size: cover;`,
        },
        duelCardStyles: {
          duelFaceUpStyles: `background-image: url('${
            this.getCardImagesUrls.front
          }')${"rare" === this.rarity ? e : ""}; background-color: ${
            this.getRarityColor
          }; background-size: cover; width: 100%; height:100%; pointer-events: none; position: absolute; z-index: -1;`,
          duelFaceDownStyles: "",
        },
      };
    };
    buildCardRarityP = () => ({
      rarityClasses: `card-rarity ${this.rarity}-card-rarity`,
    });
    buildCardNotificationSpan = () => ({
      notificationClasses: "notification-area",
      notificationStyles: "opacity: 0;",
    });
    buildCardStatsP = () => ({
      statsClasses: `card-stats ${this.rarity}-card-stats`,
    });
    buildCardFightButton = () => ({ fightButtonClasses: "fight-button" });
    buildCard = () => {
      const { cardClasses: e, cardStyles: t } = this.buildCss(),
        { rarityClasses: r } = this.buildCardRarityP(),
        { notificationClasses: a, notificationStyles: s } =
          this.buildCardNotificationSpan(),
        { statsClasses: i } = this.buildCardStatsP(),
        { fightButtonClasses: o } = this.buildCardFightButton();
      return `<div id="${this.id}" class="${e}" style="${
        t.faceDownStyles
      }"><div class="card-image ${this.rarity}-image-filter" style="${
        t.faceUpStyles
      }"></div>\n\t\t<p class="${r}">${
        this.getRarityIcon
      }\t</p>\n\t\t<span class="${a}" style="${s}">${
        this.getIsWeak ? this.getRandomWeakText : ""
      }</span>\n\t\t<p class="${i}">${
        this.getCardStats
      }</p>\n\t\t<button class="${o}" title="Fight!">🥊</button>\n\t\t</div>`;
    };
    buildCardForDuel = () => {
      const {
          cardClasses: e,
          cardStyles: t,
          duelCardStyles: r,
        } = this.buildCss(),
        { rarityClasses: a } = this.buildCardRarityP(),
        { notificationClasses: s, notificationStyles: i } =
          this.buildCardNotificationSpan(),
        { statsClasses: o } = this.buildCardStatsP(),
        { fightButtonClasses: n } = this.buildCardFightButton();
      return `<div id="${this.id}" class="${e}" style="${
        r.duelFaceUpStyles
      }"><div class="card-image ${this.rarity}-image-filter" style="${
        r.duelFaceUpStyles
      }"></div>\n\t\t<p class="${a}">${
        this.getRarityIcon
      }</p>\n\t\t<span class="${s}" style="${i}">${
        this.getIsWeak ? this.getRandomWeakText : ""
      }</span>\n\t\t<p class="${o}">${
        this.getCardStats
      }</p>\n\t\t<button class="${n}" title="Fight!">🥊</button>\n\t\t</div>`;
    };
    buildCardInfoTooltip = () => {};
  }
  var r = io();
  let a = [];
  const s = () => {
    n(a), c();
  };
  r.on("deal-cards", (e) => {
    a.push(...e), s();
  }),
    r.on("fight-result", (e) => {
      g(e);
    }),
    r.on("score", ({ own: e, opponent: t }) => {
      (document.querySelector(".score").innerHTML = `${e} - ${t}`), u();
    }),
    r.on("game-over", (e) => {
      setTimeout(() => {
        (document.querySelector(".game-over-wrapper").style.opacity = 1),
          (document.querySelector(".game-over-wrapper").style.pointerEvents =
            "all"),
          (document.querySelector(".game-over").innerHTML = `Winner: ${e}`);
      }, 3e3);
    }),
    r.on("start-new-game", () => {
      document.querySelector(".game-over-wrapper").style.pointerEvents = "none";
    });
  const i = (e) => {
      if (e.target.classList.contains("card")) {
        const t = e.target.style;
        document.querySelectorAll(".card").forEach((e) => {
          (e.style.transform = "scale(1)"),
            (e.style.zIndex = 0),
            (e.style.position = "relative");
        }),
          c(),
          (t.transform = "scale(1.6)"),
          (t.zIndex = 2),
          (e.target.firstChild.style.visibility = "visible"),
          e.target.querySelector(".notification-area") && y(e),
          p(e);
      }
      r.emit("chat", "fuck you");
    },
    o = (e) => {
      const t = document.createElement("DIV");
      return (t.innerHTML = e), t.firstChild;
    },
    n = (e) => {
      const r = document.querySelector(".play-area");
      e.map((e) => {
        const a = new t(e),
          s = o(a.getUnparsedCard);
        r.appendChild(s),
          s.addEventListener("click", function () {
            d(a);
          }),
          s.querySelector(".fight-button").addEventListener("click", m);
      }),
        document.querySelectorAll(".card").forEach((e) => {
          e.addEventListener("click", i);
        });
    },
    c = () => {
      const e = document.querySelectorAll(".common"),
        t = document.querySelectorAll(".uncommon"),
        r = document.querySelectorAll(".rare"),
        a = document.querySelectorAll(".back"),
        s = (e) => {
          e.forEach((e) => {
            const t = Math.random() < 0.5 ? -1 : 1,
              r = (Math.floor(Math.random() * Math.floor(2.5)) + 1) * t;
            e.style.transform = `rotate(${r}deg)`;
          });
        };
      s(e), s(t), s(r), s(a);
    },
    l = () => {
      const e = document.querySelector(".play-area");
      for (; e.firstChild; ) e.removeChild(e.firstChild);
      document.querySelector(".populate-cards").removeAttribute("disabled"),
        u();
    },
    d = (e) => {
      const t = document.querySelectorAll(".card-description");
      t && t.forEach((e) => e.remove());
      const r = document.querySelector(".card-info-tooltip"),
        a = document.createElement("H2"),
        s = document.createElement("P"),
        i = document.createElement("P");
      a.classList.add("card-name", "card-description"),
        s.classList.add("card-description"),
        i.classList.add("card-description"),
        a.appendChild(
          document.createTextNode(
            e.name.substring(0, e.name.indexOf(".")).toUpperCase()
          )
        ),
        s.appendChild(document.createTextNode(e.description)),
        i.appendChild(
          document.createTextNode(
            `${e.getRarityIcon} ${e.rarity.toUpperCase()} | ATTACK: ${
              e.stats.attack
            } | HP: ${e.stats.hp}`
          )
        ),
        r.appendChild(a),
        r.appendChild(s),
        r.appendChild(i);
    },
    u = () => {
      const e = document.querySelectorAll(".card-description");
      e && e.forEach((e) => e.remove());
    },
    y = (e) => {
      e.target
        .querySelector(".notification-area")
        .setAttribute("style", "opacity: 1;"),
        setTimeout(() => {
          e.target
            .querySelector(".notification-area")
            .setAttribute("style", "opacity: 0;");
        }, 700);
    },
    p = (e) =>
      e.target.classList.value.includes("face-down")
        ? (e.target.classList.remove("face-down"),
          e.target.classList.add("face-up"),
          (e.target.querySelector(".card-rarity").style.visibility = "visible"),
          (e.target.querySelector(".card-stats").style.visibility = "visible"),
          (e.target.querySelector(".notification-area").style.visibility =
            "visible"),
          (e.target.querySelector(".card-image").style.visibility = "visible"),
          void (e.target.querySelector(".fight-button").style.visibility =
            "visible"))
        : null,
    m = (e) => {
      const a = e.target.parentElement,
        s = a.querySelector(".card-stats").innerHTML;
      (a.style.transform = "scale(1.3)"),
        a.querySelector("button").remove(),
        (a.querySelector(".card-rarity").style.fontSize = "1rem"),
        (document.querySelector(".duel-page").style.opacity = 1),
        (document.querySelector(".board").style.pointerEvents = "none"),
        (document.querySelector("nav").style.pointerEvents = "none"),
        r.emit("request-duel", (e) => {
          const r = e[0],
            a = new t(r),
            s = o(a.getUnparsedCardForDuel),
            i = document.querySelector(".opponent-card-duel");
          i.appendChild(s),
            (i.querySelector(".card-rarity").style.visibility = "visible"),
            (i.querySelector(".card-rarity").style.fontSize = "1rem");
          const n = i.querySelector(".card-stats").innerHTML;
          i.querySelector(".atk-hp-opponent").innerHTML = n;
        });
      const i = document.querySelector(".own-card-duel"),
        n = document.querySelector(".opponent-card-duel");
      i.appendChild(a),
        a.querySelector(".card-stats").remove(),
        (document.querySelector(".atk-hp-self").innerHTML = s),
        setTimeout(() => {
          const e = i.querySelector(".card").getAttribute("id"),
            t = n.querySelector(".card").getAttribute("id");
          r.emit("fight", { ownId: e, opponentId: t });
        }, 400);
    },
    g = (e) => {
      (document.querySelector(".fight-result").style.opacity = 1),
        (document.querySelector(".fight-result").innerHTML = e.toUpperCase()),
        document
          .querySelector(".fight-result")
          .classList.add("animate-scale-up-down"),
        r.on("score", ({ own: e, opponent: t }) => {
          document.querySelector(".score").innerHTML = `${e} - ${t}`;
        }),
        setTimeout(() => {
          (document.querySelector(".duel-page").style.opacity = 0),
            (document.querySelector(".board").style.pointerEvents = "all"),
            (document.querySelector("nav").style.pointerEvents = "all"),
            document
              .querySelectorAll(".own-card-duel > div")
              .forEach((e) => e.remove()),
            document
              .querySelectorAll(".opponent-card-duel > div")
              .forEach((e) => e.remove()),
            document
              .querySelector(".fight-result")
              .classList.remove("animate-scale-up-down");
        }, 3200),
        setTimeout(() => {
          document.querySelector(".fight-result").style.opacity = 0;
        }, 800);
    };
  (() => {
    const e = ((e) => {
      const t = document.createElement("DIV");
      return (t.innerHTML = e), t.querySelector(".duel-page");
    })(
      '<div class="duel-page"><div class="duel-cards"><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="own-duel-page skewed"></div><div class="opponent-duel-page skewed"></div></div></div>'
    );
    document.querySelector(".board").appendChild(e);
  })(),
    (() => {
      const e = document.querySelector(".server-status");
      (e.innerHTML = "🟢 &nbsp;"),
        e.setAttribute("style", "vertical-align: top; font-size: 0.4rem");
    })(),
    document.querySelector(".populate-cards").addEventListener("click", () => {
      r.emit("request-new-cards", (e) => {
        (a = []), a.push(...e), s();
      });
    }),
    document.querySelector(".delete-cards").addEventListener("click", l),
    document
      .querySelector(".reveal-all-cards")
      .addEventListener("click", () => {
        document.querySelectorAll(".card").forEach((e) => {
          e.classList.remove("face-down"),
            e.classList.add("face-up"),
            (e.querySelector(".card-rarity").style.visibility = "visible"),
            (e.querySelector(".card-stats").style.visibility = "visible"),
            (e.querySelector(".card-image").style.visibility = "visible"),
            (e.querySelector(".fight-button").style.visibility = "visible"),
            e.querySelector(".notification-area") &&
              (e.querySelector(".notification-area").style.visibility =
                "visible");
        });
      }),
    document.querySelector(".play-again").addEventListener("click", () => {
      r.emit("play-again"),
        (document.querySelector(".game-over-wrapper").style.opacity = 0),
        (document.querySelector(".game-over").innerHTML = ""),
        (a = []),
        l();
    });
})();
