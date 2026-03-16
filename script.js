// Preloader
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});

// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeToggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
