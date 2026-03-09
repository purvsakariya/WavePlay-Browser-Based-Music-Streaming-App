let songs = []
let currentsong = new Audio()
let cs = false;

const sidebar = document.getElementById('sidebar'),
  navItem = document.querySelector('.nav-item'),
  hamburger = document.getElementById('hamburgerBtn'),
  closeSvg = document.querySelector('.sidebar-close-btn'),
  ul = document.querySelector('.library-list'),
  playsvg = document.querySelector('.playing').firstElementChild,
  pausesvg = document.querySelector('.playing').lastElementChild;

async function getsongs() {
  let a = await fetch('./songs/')
  let respone = await a.text()
  let div = document.createElement('div')
  div.innerHTML = respone
  let as = div.getElementsByTagName('a');
  for (const song of as) {
    if (song.href.endsWith('.mp3')) {
      songs.push(song.href.split('%5C').at(-1).replace('.mp3', ''))
    }
  }

  ul.innerHTML = ""
  for (const song of songs) {
    ul.innerHTML += `
      <li class = "library-item">
        <div class="library-item-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div class="library-item-info">
        <div class="library-item-name">${song}</div>
          <div class="library-item-sub">Purv</div>
        </div>
      </li>
    `
  }

  let songsli = ul.querySelectorAll(".library-item")
  for (const li of songsli) {
    li.addEventListener("click", e => {
      if (e.target.classList == "library-item-name")
        playMusic(e.target.innerHTML.trim() + ".mp3")
    })
  }
  return songs;
}

let playMusic = (trak) => {
  currentsong.src = "./songs/" + trak
  currentsong.play()
  document.querySelector(".now-playing-title").innerHTML = trak
  cs = true
  playsvg.classList.add('remove')
  pausesvg.classList.remove('remove')
}

function openSidebar() {
  sidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.style.display = "none"
  closeSvg.style.display = "block"
}

function closeSidebar() {
  sidebar.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.style.display = "block"
  closeSvg.style.display = "none"
}

function pausesong() {
  cs = false
  currentsong.pause()
  playsvg.classList.remove('remove')
  pausesvg.classList.add("remove")
}

function playsong() {
  cs = true
  if (currentsong.src == "") {
    playMusic(songs[0].trim() + ".mp3")
  } else {
    currentsong.play()
  }
  playsvg.classList.add('remove')
  pausesvg.classList.remove("remove")
}

function previoussong() {
  let index = songs.indexOf(currentsong.src.split('/').at(-1).replace('.mp3', ""))
  if ((index - 1) < 0) {
    playMusic(songs.at(-1).trim() + ".mp3")
  } else {
    playMusic(songs[index - 1] + ".mp3")
  }
}

function nextsong() {
  let index = songs.indexOf(currentsong.src.split('/').at(-1).replace('.mp3', ""))
  if ((index + 1) >= songs.length) {
    playMusic(songs[0].trim() + ".mp3")
  } else {
    playMusic(songs[index + 1] + ".mp3")
  }
}

function previousTenS() {
  currentsong.currentTime = currentsong.currentTime - 10
}

function nextTenS() {
  currentsong.currentTime = currentsong.currentTime + 10
}

function secondsToMinutes(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {

  await getsongs()
  document.querySelector('.now-playing-title').innerHTML = songs[0]
  hamburger.addEventListener('click', openSidebar);
  navItem.addEventListener('click', closeSidebar);
  closeSvg.addEventListener('click', closeSidebar);

  document.querySelector('.playing').addEventListener("click", () => {
    if (cs == true) {
      pausesong();
    } else {
      playsong();
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key == "s") {
      pausesong();
    } else if (e.key == "p") {
      playsong();
    } else if (e.code == "ArrowRight") {
      nextsong();
    } else if (e.code == "ArrowLeft") {
      previoussong();
    }
  })

  next.addEventListener("click", nextsong)
  previous.addEventListener("click", previoussong)

  previous10s.addEventListener("click",previousTenS)
  next10s.addEventListener("click",nextTenS)

  volume.addEventListener("change", e => {
    currentsong.volume = (e.target.value) / 100

    if (((e.target.value) / 100) > 0.6) {
      document.querySelector('#fullvolume').classList.remove('remove')
      document.querySelector('#mediumvolume').classList.add('remove')
      document.querySelector('#mutevolume').classList.add('remove')
    } else if (((e.target.value) / 100) == 0) {
      document.querySelector('#fullvolume').classList.add('remove')
      document.querySelector('#mediumvolume').classList.add('remove')
      document.querySelector('#mutevolume').classList.remove('remove')
    } else {
      document.querySelector('#fullvolume').classList.add('remove')
      document.querySelector('#mediumvolume').classList.remove('remove')
      document.querySelector('#mutevolume').classList.add('remove')
    }
  });

  currentsong.addEventListener("timeupdate", e => {
    let currentsongtime = secondsToMinutes(currentsong.currentTime)
    document.querySelector('#currentTime').innerHTML = currentsongtime

    let totalsongtime = secondsToMinutes(currentsong.duration)
    document.querySelector('#totalTime').innerHTML = totalsongtime

    let x = (currentsong.currentTime / currentsong.duration) * 100
    document.querySelector('#progressFill').style.width = x + "%"
  })

  document.querySelector('.progress-track').addEventListener("click", e => {
    let width = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    currentsong.currentTime = ((currentsong.duration) * width) / 100
    document.querySelector('#progressFill').style.width = width + "%"
  })

}

main()