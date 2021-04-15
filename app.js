// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
if (false) {
  var THREE = require('three');
  var TweenLite = require('tweenlite');
}
// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 4;

var camera = new THREE.PerspectiveCamera(20, 1, 1, 40);
camera.position.set(0, 0, 40);
const helper = new THREE.CameraHelper( camera );

var camera2 = new THREE.PerspectiveCamera(20, 1, 1, 400);
camera2.position.set(10, 0, 90);


scene.add( helper );

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: '#433F81' });
var cube = new THREE.Mesh(geometry, material);

var texture = THREE.ImageUtils.loadTexture('./app/public/img/texture-drop.png');

var material1 = new THREE.MeshBasicMaterial({
  map: texture,
  depthWrite: false,
  depthTest: true,
  transparent: true,
  opacity: 1,
  blending: THREE.AdditiveBlending,
  color: '#ff0000',
  side: THREE.DoubleSide,
});

var geometry = new THREE.PlaneGeometry(5, 5, 1, 1);

var plane = new THREE.Mesh(geometry, material1);
var tweens = [];
var group = new THREE.Object3D();
function loop() {
  /*jshint validthis: true */
  console.log(this);
  this.restart();
}
var getT = (p, index) => {
  var cache = { scale: 0.1, opacity: 1 };
  var scale = ((index + 1) * 2) / 6;

  return TweenLite.to(cache, 1.5, {
    scale: scale,
    opacity: 0,
    paused: false,
    delay: (index * 100) / 1000,
    onUpdate: function () {
      p.scale.x = p.scale.y = cache.scale;
      p.material.opacity = cache.opacity;
    },
    onComplete: function () {
      this.restart();
    },
  });
};
var caches = [];
for (var i = 0; i < 6; i++) {
  var planeCopy = plane.clone();
  planeCopy.material = planeCopy.material.clone();
  tweens.push(getT(planeCopy, i));
  var cache = { duration: (10 + i) / 10, z: (6 - i) * 5 };
  //   caches.push(cache);
  group.add(planeCopy);
}

 group.rotation.x = -1.2;
 group.position.y = -10;
scene.add(group);
// Add cube to Scene
// scene.add(cube);

tweens.forEach((r) => r.resume());
// Render Loop
var render = function () {
  requestAnimationFrame(render);
//   group.rotation.x = -1.2;
//   group.position.y += 0.01;

  //   planeCopy.rotation.x += 0.01;
  //   planeCopy.rotation.y += 0.01;
  //   planeCopy.material.opacity = 1

  // Render the scene
  renderer.render(scene, camera2);
};

render();
