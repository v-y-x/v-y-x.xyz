const ENDPOINT = 'https://api.v-y-x.xyz/lastfm/nowplaying'

const el = {
    widget: document.querySelector('.fmWidget'),
    cover: document.querySelector('.fmCover'),
    track: document.querySelector('.trackline'),
    artist: document.querySelector('.artistline'),
    link: document.querySelector('.fmLink')
}

async function updateNowPlaying() {
    try {
        const res = await fetch(ENDPOINT)
        const data = await res.json()

        if (!data.playing && !data.name) {
            el.widget.style.display = 'none'
            return;
        }

        el.cover.src = data.image || ''
        status = data.playing ? 'Now Listening to: ' : 'Last Listened to: '
        el.track.textContent = `${status}${data.name}`
        el.artist.textContent = `by ${data.artist} in ${data.album}`
        el.link.href = data.url
    } catch (err) {
        console.log('last.fm widget fetch failed!', err)
        el.widget.style.display = 'none'
    }
}

updateNowPlaying()
setInterval(updateNowPlaying, 15000)