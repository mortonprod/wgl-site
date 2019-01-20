const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)
const variables = require('./variables');
console.debug(variables);
var renderer = new THREE.WebGLRenderer();
container = document.getElementById( 'canvas' );
container.appendChild(renderer.domElement);
console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
const WIDTH = container.clientWidth;
const HEIGHT = container.clientHeight;
console.debug(`WIDTH/HEIGHT: ${WIDTH}/${HEIGHT}`);

/**
 * The size should be a square of size the same same length as the smallest size.
 */
let diff = WIDTH < HEIGHT? WIDTH:HEIGHT;
window.onresize = (event) => {
  diff = WIDTH < HEIGHT? WIDTH:HEIGHT;
  console.debug(`--RESIZE-- diff: ${diff}`);
};
console.debug(`DIFF: ${diff}`);

process.env.CAMERA = {
  FOV: 75,
  NEAR: 0.1,
  FAR: 1000
};
process.env.RENDERER = {
  X: WIDTH,
  Y: HEIGHT
};
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(process.env.CAMERA.FOV, WIDTH/HEIGHT, process.env.CAMERA.NEAR, process.env.CAMERA.FAR);
renderer.setSize( process.env.RENDERER.X, process.env.RENDERER.Y);
camera.position.z = -50;
controls = new OrbitControls( camera );
controls.target.set( 0, 0, 0 )

const spheres = createSpheres(variables.spheres);
// var box = new THREE.BoxGeometry( variables.box.width, variables.box.height, variables.box.depth, variables.box.widthSegments, variables.box.heightSegment, variables.box.depthSegment  );
// var material = new THREE.MeshBasicMaterial( {color: variables.box.color} );
// var cube = new THREE.Mesh( box, material );
// cube.position.set(variables.box.position.x,variables.box.position.y,variables.box.position.z);
// scene.add( cube );

var animate = function () {
  requestAnimationFrame( animate );

  // spheres[0].rotation.x += 0.01;
  // spheres[0].rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();

function createSpheres(info) {
  const properties = new Map(info.properties);
  const sphereMeshs = [];
  for(let i=0; i<info.number; i++) {
    const color = properties.has(i) && properties.get(i).color ? properties.get(i).color : info.initial.color
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const sphereGeometry = new THREE.SphereGeometry(
      info.initial.radius, 
      info.initial.widthSegments, 
      info.initial.heightSegments,
      info.initial.phiStart,
      info.initial.phiLength,
      info.initial.thetaStart,
      info.initial.thetaLength
    );
    const sphereMesh = new THREE.Mesh( sphereGeometry, material)
    // sphereMesh.position.set(getRandom(),getRandom(),getRandom());
    console.debug(sphereMesh.getWorldPosition());
    scene.add(sphereMesh);
    sphereMeshs.push(sphereMesh);
  }
  sphereMeshs[0].position.set(20,0,0);
  sphereMeshs[1].position.set(0,20,0);
  sphereMeshs[2].position.set(0,0,20);
  return sphereMeshs;
}

function particleSimulation() {

}

function getRandom() {
  return Math.random() * diff/2;
}
