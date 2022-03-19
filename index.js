//consts
const gameArea = document.getElementById("game-area")

const player1camp = document.getElementById("player1-camp")
const player1battlefield = document.getElementById("player1-battlefield")
const player2camp = document.getElementById("player2-camp")
const player2battlefield = document.getElementById("player2-battlefield")

// buttons
const player1AttackButton = document.getElementById("player1AttackButton")
const player2AttackButton = document.getElementById("player2AttackButton")

// field characters
const player1FieldWarriorButton = document.getElementById("player1FieldWarriorButton")
const player1FieldBruteButton = document.getElementById("player1FieldBruteButton")
const player2FieldWarriorButton = document.getElementById("player2FieldWarriorButton")
const player2FieldBruteButton = document.getElementById("player2FieldBruteButton")

const player1ConstructCampfireButton = document.getElementById("player1ConstructCampfireButton")
const player2ConstructCampfireButton = document.getElementById("player2ConstructCampfireButton")



// side rosters
class Character {
    constructor(type, name, avatar, health, dice) {
        this.type = type
        this.name = name
        this.avatar = avatar
        this.health = health
        this.dice = dice
    }
}

let warrior = new Character("character-card", "Warrior", "icon-stone-spear", 6, 2)
let brute = new Character("character-card", "Brute", "icon-bone-mace", 3, 4)

class Building {
    constructor(type, name, avatar, resource1, frequency1) {
        this.type = type
        this.name = name
        this.avatar = avatar
        this.resource1 = resource1
        this.frequency1 = frequency1
    }
}

let campfire = new Building("building-card", "Campfire", "icon-campfire", "icon-rally-the-troops", 1)
let fence = new Building("building-card", "Fence", "icon-stakes-fence", "icon-rally-the-troops", 2 )


//functions

function generateArea(type, owner, size){
    //type: camp or battlefield
    //owner: player1 or player2
    let par1 = ""
    let par2 = ""
    
    //check for type and ownership
    if (type === "battlefield") {par1 = "battlefield"} else {par1 = "camp"}
    if (owner === "player1") {par2 = "player1"} else {par2 = "player2"}
    
    //generate wrapper div with propper id
    const area = document.createElement('div')
    area.id = `${par2}-${par1}`
    area.classList.add("flex", "area")
    //generate internal divs with propper id and class
    for (i=0;i<size;i++){
        const plot = document.createElement('div')
            plot.id = `${par2}-${par1}-plot${i}`
            plot.classList.add(`${par1}-plot`)
        area.appendChild(plot);
    }

    //inset generated area into relevant field - in order of function deployment
    gameArea.appendChild(area);

}

function generateCharacterCard(character){
    const {name, avatar, health, dice} = character
    
    // creating wrapper div
    const characterCardDiv = document.createElement('div')
    characterCardDiv.classList.add("character-card")

    // generating health points
    const healthBarCCDiv = document.createElement('div')
    healthBarCCDiv.classList.add("healthbar")
    
        for (let i = 0; i<health; i++){
            const healthPointCCDiv = document.createElement("div");
            healthPointCCDiv.classList.add("healthpoint")
            healthPointCCDiv.classList.add("healthpoint-filled")
            healthBarCCDiv.appendChild(healthPointCCDiv);
        }

    characterCardDiv.appendChild(healthBarCCDiv);

    // generating name
    const nameCCh4 = document.createElement("h4");
    nameCCh4.classList.add("name")
    nameCCh4.textContent = name
    characterCardDiv.appendChild(nameCCh4);

    // avatar
    const avatarCCwrapper = document.createElement("div")
    avatarCCwrapper.classList.add("avatar-wrapper")
    characterCardDiv.appendChild(avatarCCwrapper)

        const avatarCCsvg = document.createElement("svg")
        avatarCCsvg.classList.add("avatar", "icon", avatar)
        avatarCCwrapper.appendChild(avatarCCsvg)

    // generating dices
    const dicecontainerCCDiv = document.createElement("div");
    dicecontainerCCDiv.classList.add("dice-container")

        for (let i = 0; i<dice; i++){
            const diceCCDiv = document.createElement("div");
            diceCCDiv.classList.add("dice")
            diceCCDiv.textContent = "-"
            dicecontainerCCDiv.appendChild(diceCCDiv);
        }

    characterCardDiv.appendChild(dicecontainerCCDiv);

    return characterCardDiv
}

function generateBuildingCard(building){
    const {name, avatar, resource1, frequency1} = building
    
    // creating wrapper div
    const buildingCardDiv = document.createElement('div')
    buildingCardDiv.classList.add("building-card")

    // generating name
    const nameBCh4 = document.createElement("h4")
    nameBCh4.classList.add("name")
    nameBCh4.textContent = name
    buildingCardDiv.appendChild(nameBCh4)

    // avatar
    const avatarBCwrapper = document.createElement("div")
    avatarBCwrapper.classList.add("avatar-wrapper")
    buildingCardDiv.appendChild(avatarBCwrapper)

        const avatarBCsvg = document.createElement("svg")
        avatarBCsvg.classList.add("avatar", "icon", avatar)
        avatarBCwrapper.appendChild(avatarBCsvg)

    const bottomcontainerBCDiv = document.createElement("div")
    bottomcontainerBCDiv.classList.add("bottom-container")

        const resourceBCwrapper = document.createElement("div")
        resourceBCwrapper.classList.add("resource-wrapper")
        bottomcontainerBCDiv.appendChild(resourceBCwrapper)

            const resourceBCsvg = document.createElement("svg")
            resourceBCsvg.classList.add("avatar", "icon", resource1)
            resourceBCwrapper.appendChild(resourceBCsvg)
            
            const frequencyBC = document.createElement("div")
            frequencyBC.classList.add("frequency")
            frequencyBC.textContent = `+${frequency1}`
            resourceBCwrapper.appendChild(frequencyBC)

    buildingCardDiv.appendChild(bottomcontainerBCDiv)

    return buildingCardDiv
}

function assignCard(owner, what){
    let player = ""
    let where = ""
    let cardClass = ""
    let card = ""
    
    // check for player
    if (owner === "player1") {player = "player1"} else {player = "player2"}

    // check for type of card, run apropriate functions
    if (what.type === "character-card") {
        where = "battlefield"
        cardClass = "character-card"
        const {type, name, avatar, health, dice} = what
        card = generateCharacterCard(what)
    } else {
        where = "camp"
        cardClass = "building-card"
        const {type, avatar, resource1, frequency1} = what
        card = generateBuildingCard(what)
    }

    // grab appropriate area
    const areaClass = `${player}-${where}`
    const area = document.getElementById(areaClass).children

    // find the first free plot and place card there
    let childrenArray = []
    for (plot of area) {
        if (plot.children.length === 0) {
            plot.appendChild(card)
            break
        } else {
            // put all classes of every child from one plot into an array
            childrenArray = []
            for (child of plot.children) {childrenArray.push(child.className)}
            // searches the array for the presence of "character-card" or "battlefield-card" classes
            if (!childrenArray.some(e => e == cardClass)) {
                plot.appendChild(card)
                break 
            }    
        }      
    }               
}

//  test function for object placement on battlefield areas - could be usefull later
function test(){

    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let div4 = document.createElement("div")
    div3.classList.add("character-card")
    document.getElementById("player1-battlefield-plot0").appendChild(div1)
    document.getElementById("player1-battlefield-plot4").appendChild(div2)
    document.getElementById("player1-battlefield-plot1").appendChild(div4)
    document.getElementById("player1-battlefield-plot1").appendChild(div3)  
}

function rollDice(owner){
    if (owner === "player1") {par1 = "#player1-battlefield"} else {par1 = "#player2-battlefield"}
    let plots = document.querySelector(par1).querySelectorAll("div.battlefield-plot")
    for (plot of plots){
        let dices = plot.querySelector("div.character-card").querySelectorAll("div.dice-container > div.dice")
        for (die of dices) {
            die.innerText = Math.floor(Math.random()*6)+1         
        }
    }
}

// event listeners
player1AttackButton.addEventListener('click', function(){rollDice("player1")})
player2AttackButton.addEventListener('click', function(){rollDice("player2")})

player1FieldWarriorButton.addEventListener('click', function(){assignCard("player1", warrior)})
player1FieldBruteButton.addEventListener('click', function(){assignCard("player1", brute)})

player2FieldWarriorButton.addEventListener('click', function(){assignCard("player2", warrior)})
player2FieldBruteButton.addEventListener('click', function(){assignCard("player2", brute)})

player1ConstructCampfireButton.addEventListener('click', function(){assignCard("player1", campfire)})
player2ConstructCampfireButton.addEventListener('click', function(){assignCard("player2", campfire)})

// generating basic areas - for now - hardcoded scenario
generateArea("camp", "player1", 8)
generateArea("battlefield", "player1", 8)
generateArea("battlefield", "player2", 8)
generateArea("camp", "player2", 8)