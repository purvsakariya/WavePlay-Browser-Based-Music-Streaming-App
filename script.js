const sidebar   = document.getElementById('sidebar'),
navItem  = document.querySelector('.nav-item'),
hamburger = document.getElementById('hamburgerBtn'),
closeSvg = document.querySelector('.sidebar-close-btn')

async function getsongs(){
  let a = await fetch('http://127.0.0.1:3000/songs/')
  let respone = await a.text()
  let div = document.createElement('div')
  div.innerHTML = respone
  let as = div.getElementsByTagName('a');
  let songs = []
  for (const song of as) {
    if(song.href.endsWith('.mp3')){
      songs.push(song.href.split('%5C').at(-1))
    }
  }
  return songs;
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

  let songs = await getsongs()
  console.log(songs);
  hamburger.addEventListener('click', openSidebar);
  navItem.addEventListener('click', closeSidebar);
  closeSvg.addEventListener('click', closeSidebar);

}

main()