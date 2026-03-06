const sidebar   = document.getElementById('sidebar'),
navItem  = document.querySelector('.nav-item'),
hamburger = document.getElementById('hamburgerBtn'),
closeSvg = document.querySelector('.sidebar-close-btn')

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

function main(){

  hamburger.addEventListener('click', openSidebar);
  navItem.addEventListener('click', closeSidebar);
  closeSvg.addEventListener('click', closeSidebar);

}

main()