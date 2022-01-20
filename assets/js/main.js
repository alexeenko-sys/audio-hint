const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      coverImg = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src')
// names
const songs = ['leta', 'cat', 'brooklyn']

// default
let songIndex = 0

// Init
function loadSong(song) {
    title.innerHTML = song
    audio.src = `assets/audio/${song}.mp3`
    coverImg.src = `assets/images/cover${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('play')
    coverImg.classList.add('active')
    imgSrc.src = 'assets/images/pause.png'
    audio.play()
}

// Pause
function pauseSong() {
    player.classList.remove('play')
    coverImg.classList.remove('active')
    imgSrc.src = 'assets/images/play.png'
    audio.pause()
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    }else {
        playSong()
    }
})

// Next song
function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

// Prev
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong) 

// Progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercents = (currentTime / duration) * 100
    progress.style.width = `${progressPercents}%`
}
audio.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// Auto play
audio.addEventListener('ended', nextSong)