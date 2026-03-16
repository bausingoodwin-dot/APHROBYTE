// Preloader
window.addEventListener('load', () => document.getElementById('preloader').style.display='none');

// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeToggle');
darkModeBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;
    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else counter.innerText = target;
  };
  updateCount();
});

// Carousel
const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let index = 0;
nextBtn.addEventListener('click', () => {
  index = (index+1) % track.children.length;
  track.style.transform = `translateX(${-index*270}px)`;
});
prevBtn.addEventListener('click', () => {
  index = (index-1+track.children.length) % track.children.length;
  track.style.transform = `translateX(${-index*270}px)`;
});

// Hero 3D Particles using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('heroCanvas'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for(let i=0; i<500; i++){
  vertices.push((Math.random()-0.5)*200);
  vertices.push((Math.random()-0.5)*200);
  vertices.push((Math.random()-0.5)*200);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
const material = new THREE.PointsMaterial({color: 0x00f0ff, size: 1.5});
const particles = new THREE.Points(geometry, material);
scene.add(particles);
camera.position.z = 100;

function animate(){
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
