// --- Dynamic 3D Product Carousel ---
const prodScene = new THREE.Scene();
const prodCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const prodRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
prodRenderer.setSize(window.innerWidth * 0.8, 400);
document.getElementById('product3DCarousel').appendChild(prodRenderer.domElement);

prodCamera.position.z = 100;
const cubes = [];
const cubeSpacing = 40;

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
prodScene.add(light);

// Fetch products from Flask backend
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    products.forEach((product, i) => {
      const geometry = new THREE.BoxGeometry(30, 30, 30);
      const material = new THREE.MeshStandardMaterial({ color: product.color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i * cubeSpacing - ((products.length - 1) * cubeSpacing) / 2;
      prodScene.add(cube);
      cubes.push(cube);
    });

    // Animate cubes
    function animateProducts() {
      requestAnimationFrame(animateProducts);
      cubes.forEach(c => c.rotation.y += 0.01);
      prodRenderer.render(prodScene, prodCamera);
    }
    animateProducts();
  })
  .catch(err => console.error("Error loading products:", err));
