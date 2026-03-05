const sidebar   = document.getElementById('sidebar'),
navItem  = document.querySelector('.nav-item'),
hamburger = document.getElementById('hamburgerBtn');

function openSidebar() {
  sidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  document.body.style.overflow = '';
}

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

function main(){

  hamburger.addEventListener('click', openSidebar);
  navItem.addEventListener('click', closeSidebar);

}

main()