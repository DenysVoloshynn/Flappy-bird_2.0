const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

let gameIsGoing = canvas.getAttribute("started")
const startBtn = document.getElementById("btn-start")
const score = document.getElementById("score")

let bird = new Image()
const background = new Image()
const forground = new Image()
const pipeTop = new Image()
const pipeBottom = new Image()

bird.src = "img/bird.png"
background.src = "img/background.png"
forground.src = "img/forground.png"
pipeTop.src = "img/pipe-top.png"
pipeBottom.src = "img/pipe-bottom.png"

let pipeGap = 120

let xpos = 50
let ypos = 150
let gravity = 2.5

const pipe = [];
pipe[0] = {
    x: canvas.width,
    y: -120,
}




startBtn.addEventListener("click", function startGame(e) {
    canvas.setAttribute("started", "true")
    gameIsGoing = canvas.getAttribute("started")
    if (gameIsGoing === "true") {
        startBtn.classList.add("invisible")
    }
})

function moveUp(e) {
    if (gameIsGoing === "true") {
        ypos -= 35
    }
}

document.addEventListener("e", moveUp)
document.body.addEventListener("click", moveUp)

function draw() {
    context.drawImage(background, 0, 0)
    context.drawImage(forground, 0, canvas.height - forground.height)
    context.drawImage(bird, xpos, ypos)

    pipe.forEach((el) => {
        context.drawImage(pipeTop, el.x, el.y)
        context.drawImage(pipeBottom, el.x, pipeGap + pipeTop.height + el.y)
        if (gameIsGoing === "true") { el.x -= 1 }

        if (Math.round(el.x) == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            })
        }

        if (xpos + bird.width >= el.x &&
            xpos <= el.x + pipeTop.width &&
            (ypos <= el.y + pipeTop.height ||
                ypos + bird.height >= el.y + pipeTop.height + pipeGap) ||
            ypos + bird.height >= canvas.height - forground.height) {

            score.innerHTML = 0
            alert("game over");
            // location.reload()
        }

        if (el.x == 6) {
            let scoreNumber = +score.innerHTML
            score.innerHTML = scoreNumber + 1
        }

    })



    if (gameIsGoing === "true") { ypos += gravity }
    requestAnimationFrame(draw)
}



const cardsBird = document.querySelectorAll(".card-bird");
// console.log(cardsBird);

cardsBird.forEach((el) => {
    el.addEventListener("click", function changeBird (e) {
        const birdSrc = el.getAttribute("id")
        bird.src = `img/birds/${birdSrc}.png`
        const menu = document.getElementById("menu")
        menu.classList.add("menu-closed")
    })
})



bird.onload = draw
