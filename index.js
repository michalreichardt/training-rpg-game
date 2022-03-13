//consts
const heroSide = document.getElementById("hero")
const monsterSide = document.getElementById("monster")

const attackHeroButton = document.getElementById("attack-hero-button")
const attackMonsterButton = document.getElementById("attack-monster-button")

const reinforceHeroButton = document.getElementById("reinforce-hero-button")
const reinforceMonsterButton = document.getElementById("reinforce-monster-button")

// side rosters
let wizard = new Character(heroSide, "Wizard", "wizard", 60, 2)
let orc = new Character(monsterSide, "Orc", "orc", 10, 4)

//functions
class Character {
    constructor(side, name, avatar, health, dice) {
        this.side = side
        this.name = name
        this.avatar = avatar
        this.health = health
        this.dice = dice
    }
}

function generateCard(character){
    const {side, name, avatar, health, dice} = character
    
    const characterCardDiv = document.createElement('div')
    characterCardDiv.classList.add("character-card")

    const nameCCh4 = document.createElement("h4");
    nameCCh4.classList.add("name")
    nameCCh4.textContent = name
    characterCardDiv.appendChild(nameCCh4);

    const healthCCp = document.createElement("p");
    healthCCp.textContent = " health: " 
    healthCCp.classList.add("health")

        const healthValueCCb = document.createElement("b");
        healthValueCCb.textContent = health
        healthCCp.appendChild(healthValueCCb);

    characterCardDiv.appendChild(healthCCp);

    const avatarCCimg = document.createElement("img");
    avatarCCimg.classList.add("avatar")
    avatarCCimg.src = `images/${avatar}.png`
    characterCardDiv.appendChild(avatarCCimg);

    const dicecontainerCCDiv = document.createElement("div");
    dicecontainerCCDiv.classList.add("dice-container")

        for (let i = 0; i<dice; i++){
            const diceCCDiv = document.createElement("div");
            diceCCDiv.classList.add("dice")
            diceCCDiv.textContent = "-"
            dicecontainerCCDiv.appendChild(diceCCDiv);
        }

    characterCardDiv.appendChild(dicecontainerCCDiv);

    side.appendChild(characterCardDiv);
}

function rollDice(side){
    let characters = side.querySelectorAll("div.character-card")
    for (char of characters){
        let dices = char.querySelectorAll("div.dice-container > div.dice")
        for (die of dices) {
            die.innerText = Math.floor(Math.random()*6)+1         
        }
    }
}

// event listener
attackMonsterButton.addEventListener('click', function(){rollDice(monsterSide)})
attackHeroButton.addEventListener('click', function(){rollDice(heroSide)})

reinforceHeroButton.addEventListener('click', function(){generateCard(wizard)})
reinforceMonsterButton.addEventListener('click', function(){generateCard(orc)})