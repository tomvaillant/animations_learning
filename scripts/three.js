import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
// import * as THREE from "./node_modules/three";
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';

import orbitControlsEs6 from "https://cdn.skypack.dev/orbit-controls-es6";

const OrbitControls = orbitControlsEs6;

console.log('OrbitControls', OrbitControls);

const drawingSurface = document.getElementById( 'canvas' );
const backgroundColor = 0x000000;


var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(0,0,25);


var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: drawingSurface } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

// var light = new THREE.AmbientLight( 0xffffcc, 20, 200 );
// light.position.set( 20, 20, 40 );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
scene.add( spotLight );

const loader = new GLTFLoader();
loader.crossOrigin = true;
loader.load( './../assets/models/ash_ninja_geo.glb', function ( data ) {
    const object = data.scene;
    object.position.set(0, 0, -0.75);

    scene.add( object );
  //, onProgress, onError );
});
