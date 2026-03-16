// Preloader
window.addEventListener('load',()=>document.getElementById('preloader').style.display='none');

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click',()=>document.body.classList.toggle('dark-mode'));

// Counter Animation
document.querySelectorAll('.counter').forEach(counter=>{
  const update=()=>{
    const target=+counter.getAttribute('data-target');
    let count=+counter.innerText;
    const inc=target/100;
    if(count<target){counter.innerText=Math.ceil(count+inc);setTimeout(update,20);}
    else counter.innerText=target;
  };
  update();
});

// Parallax effect
window.addEventListener('scroll',()=>{
  document.querySelectorAll('.parallax').forEach(section=>{
    let speed=0.5;
    section.style.backgroundPositionY=`${window.scrollY*speed}px`;
  });
});

// Hero 3D Particles
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById('heroCanvas'),alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
const geometry=new THREE.BufferGeometry();
const vertices=[];
for(let i=0;i<1000;i++){vertices.push((Math.random()-0.5)*200, (Math.random()-0.5)*200, (Math.random()-0.5)*200);}
geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
const material=new THREE.PointsMaterial({color:0x00f0ff,size:1.5});
const particles=new THREE.Points(geometry,material);
scene.add(particles);
camera.position.z=100;
function animate(){requestAnimationFrame(animate);particles.rotation.y+=0.002;renderer.render(scene,camera);}
animate();
window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});

// 3D Product Carousel
const prodScene=new THREE.Scene();
const prodCamera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const prodRenderer=new THREE.WebGLRenderer({antialias:true, alpha:true});
prodRenderer.setSize(window.innerWidth*0.8,400);
document.getElementById('product3DCarousel').appendChild(prodRenderer.domElement);
const prodGeometry=new THREE.BoxGeometry(30,30,30);
const prodMaterial=new THREE.MeshStandardMaterial({color:0x00f0ff});
const cubes=[];
for(let i=0;i<5;i++){
  const cube=new THREE.Mesh(prodGeometry,prodMaterial);
  cube.position.x=i*40 - 80;
  prodScene.add(cube);
  cubes.push(cube);
}
const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,1,1).normalize();
prodScene.add(light);
prodCamera.position.z=100;
function animateProducts(){
  requestAnimationFrame(animateProducts);
  cubes.forEach(c=>c.rotation.y+=0.01);
  prodRenderer.render(prodScene,prodCamera);
}
animateProducts();
