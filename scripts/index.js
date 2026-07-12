// variables //
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
var menuFlag = false
var menu
// variables //

// current time widget logic
let options = {
    timeZone: 'Europe/Sarajevo',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
},
    formatter = new Intl.DateTimeFormat([], options);

function startTime() {
    document.querySelector('.timeWidget').innerHTML = formatter.format(new Date())
    setTimeout(startTime, 1000)
}
window.onload = startTime()

// remove class when first animation ends
content.addEventListener('animationend', (event) => {
    if (event.target !== content) return;
    content.classList.remove('animation')
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) // delay function

// random theme logic
themes = ['rukia', 'cyberpunk', 'red', 'noelle', 'ado', 'skong']
const rand = Math.floor(Math.random() * themes.length)
    switch (rand) {
        case 0:
            content.classList.add(themes[rand])
            image.src = pfp + 'rukia.gif'
            bg.style.backgroundImage = `url(${banner}snowing.webp)`
            break;
        case 1:
            content.classList.add(themes[rand])
            var randC = "cyberpunk" + Math.floor(Math.random() * 3)
            image.src = pfp + randC + ".jpg"
            bg.style.backgroundImage = `url(${banner}cyberpunk.gif)`
            quoteLine.innerHTML = "goodbye, V, and never stop fighting."
            quoteFlag = true
            break;
        case 2:
            content.classList.add(themes[rand])
            var randRed = "red" + Math.floor(Math.random() * 3)
            image.src = pfp + randRed + ".jpg"
            bg.style.backgroundImage = `url(${banner}red.gif)`
            break;
        case 3:
            content.classList.add(themes[rand])
            image.src = pfp + 'noelle.png'
            bg.style.backgroundImage = `url(${banner}noelle.gif)`
            quoteLine.innerHTML = "pfp by @nebbeli on twitter"
            quoteFlag = true
            break;
        case 4:
            content.classList.add(themes[rand])
            image.src = pfp + 'ado.jpg'
            bg.style.backgroundImage = `url(${banner}ado.gif)`
            break;
        case 5:
            content.classList.add(themes[rand])
            image.src = pfp + 'skong.gif'
            bg.style.backgroundImage = `url(${banner}skong_banner.gif)`
            skongQuotes = ["fren.", "garana.", "adidas!", "git gud!", "shaw!"]
            quoteLine.innerHTML = skongQuotes[Math.floor(Math.random() * skongQuotes.length)]
            quoteFlag = true
            break;
    }

// apply the random class to elements
document.querySelector('.hover').classList.add(themes[rand])

widgetDelay = 4
document.querySelectorAll('.widget').forEach(widget => {
    widget.classList.add(themes[rand])
    widget.classList.add('down-reveal')
    widgetDelay = widgetDelay + 0.5
    widget.style.animationDelay = widgetDelay + 's'
})

document.querySelectorAll('.floatbox').forEach(box => {
    box.classList.add(themes[rand])
})

// random quote logic
fetch('data/quote.json')
    .then(res => res.json())
    .then(quote => {
        if (!quoteFlag) {
            const randQ = quote[Math.floor(Math.random() * quote.length)]
            quoteLine.innerHTML = randQ
        }
    })

// clipboard copy for discord button
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

// inner menu functions
document.addEventListener('click', (event) => {
    if (menuFlag && !menu.contains(event.target)) {
        menu.classList.add('hide')
        hideMenu()        
    }
})

async function showMenu(element) {
    menu = document.querySelector('.' + element.getAttribute("menu"));
    menu.style.display = 'block'
    await delay(100)
    menuFlag = true
}

async function hideMenu() {
    await delay(700)
    menu.style.display = 'none'
    menu.classList.remove('hide')
    menuFlag = false
}

// apply class for each logo 
var logoDelay = 2.8
document.querySelectorAll('.logo').forEach(logo => {
    logo.classList.add('up-reveal')
    logoDelay = logoDelay + 0.4 
    logo.style.animationDelay = logoDelay + 's'
})
