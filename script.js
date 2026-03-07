let songs = []
let currentsong = new Audio()

const sidebar   = document.getElementById('sidebar'),
navItem  = document.querySelector('.nav-item'),
hamburger = document.getElementById('hamburgerBtn'),
closeSvg = document.querySelector('.sidebar-close-btn'),
ul = document.querySelector('.library-list');

async function getsongs(){
  let a = await fetch('http://127.0.0.1:3000/songs/')
  let respone = await a.text()
  let div = document.createElement('div')
  div.innerHTML = respone
  let as = div.getElementsByTagName('a');
  for (const song of as) {
    if(song.href.endsWith('.mp3')){
      songs.push(song.href.split('%5C').at(-1).replace('.mp3',''))
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
    li.addEventListener("click",e=>{
      if(e.target.classList == "library-item-name")
      playMusic(e.target.innerHTML.trim() + ".mp3")
    })
  }
  return songs;
}

let playMusic = (trak) =>{
  let audio = new Audio("/songs/" + trak)
  audio.play()
  document.querySelector(".now-playing-title").innerHTML = trak
  
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

async function main(){

  await getsongs()
  hamburger.addEventListener('click', openSidebar);
  navItem.addEventListener('click', closeSidebar);
  closeSvg.addEventListener('click', closeSidebar);

}

main()