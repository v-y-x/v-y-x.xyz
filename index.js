var content = document.querySelector(".main") 
var image = document.querySelector('.image')
var pfp = "resources/pfps/"
var banner = "resources/banners/"
var bg = document.querySelector("body")
var gamesList = document.querySelector('.gamesList')
var interestList = document.querySelector('.interestList')
var hoverDiv = document.querySelector('.hover')
var quoteLine = document.querySelector('.quote')
var quoteFlag = false

content.addEventListener('animationend', () => {
    content.classList.remove('animation')
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const rand = Math.floor(Math.random() * 6)
    switch (rand) {
        case 0:
            content.classList.add("rukia")
            image.src = pfp + 'rukia.gif'
            bg.style.backgroundImage = `url(${banner}snowing.webp)`
            break;
        case 1:
            content.classList.add("cyberpunk")
            var randC = "cyberpunk" + Math.floor(Math.random() * 3)
            image.src = pfp + randC + ".jpg"
            bg.style.backgroundImage = `url(${banner}cyberpunk.gif)`
            quoteLine.innerHTML = "goodbye, V, and never stop fighting."
            quoteFlag = true
            break;
        case 2:
            content.classList.add("red")
            var randRed = "red" + Math.floor(Math.random() * 3)
            image.src = pfp + randRed + ".jpg"
            bg.style.backgroundImage = `url(${banner}red.gif)`
            break;
        case 3:
            content.classList.add('noelle')
            image.src = pfp + 'noelle.png'
            bg.style.backgroundImage = `url(${banner}noelle.gif)`
            quoteLine.innerHTML = "pfp by @nebbeli on twitter"
            quoteFlag = true
            break;
        case 4:
            content.classList.add('ado')
            image.src = pfp + 'ado.jpg'
            bg.style.backgroundImage = `url(${banner}ado.gif)`
            break;
        case 5:
            content.classList.add('skong')
            image.src = pfp + 'skong.gif'
            bg.style.backgroundImage = `url(${banner}skong_banner.gif)`
            skongQuotes = ["fren.", "garana.", "adidas!", "git gud!"]
            quoteLine.innerHTML = skongQuotes[Math.floor(Math.random() * skongQuotes.length)]
            quoteFlag = true
            break;
    }

fetch('data/quote.json')
    .then(res => res.json())
    .then(quote => {
        if (!quoteFlag) {
            const randQ = quote[Math.floor(Math.random() * quote.length)]
            quoteLine.innerHTML = randQ
        }
    })

async function copyDiscord(text) {
    navigator.clipboard.writeText(text)
    var copyBox = document.createElement('div')
    copyBox.classList.add('hover')
    copyBox.style.display = 'block'
    copyBox.innerHTML = 'copied to clipboard!'
    content.appendChild(copyBox)
    await delay(2000)
    content.removeChild(copyBox)
}

function showGames() {
    gamesList.style.display = 'flex'
}

function showInterests() {
    interestList.style.display = 'flex'
}

// hover logic
fetch('data/notes.json')
    .then(res => res.json())
    .then(notes => {
        document.querySelectorAll('[data-icon]').forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                hoverDiv.innerHTML = notes[icon.dataset.icon]
                hoverDiv.style.display = 'block'
                hoverDiv.style.position = 'fixed'
                const rect = icon.getBoundingClientRect()
                hoverDiv.style.left = rect.left + 'px'
                hoverDiv.style.top = rect.bottom + 8 + 'px'
                const spaceRight = window.innerWidth - e.clientX;
                if (spaceRight < hoverDiv.offsetWidth) {
                    hoverDiv.style.left = (e.clientX - hoverDiv.offsetWidth) + 'px';
                }
                const spaceDown = window.innerHeight - e.clientY;
                if (spaceDown < hoverDiv.offsetHeight) {
                    hoverDiv.style.top = (hoverDiv.offsetHeight - 50) + 'px';
                }
            })
            icon.addEventListener('mouseleave', () => {
                hoverDiv.style.display = 'none'
            })
        })
    })  

document.addEventListener('click', (event) => {
    if (event.target != document.querySelector('#gameClick') && !gamesList.contains(event.target)){
        gamesList.style.display = 'none'
    }
})

document.addEventListener('click', (event) => {
    if (event.target != document.querySelector('#intClick') && !interestList.contains(event.target)){
        interestList.style.display = 'none'
    }
})
