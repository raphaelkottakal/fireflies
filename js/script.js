(function() {

var canvas = document.querySelector('#canvas');
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(
	window.innerWidth / - 2,
	window.innerWidth / 2,
	window.innerHeight / 2,
	window.innerHeight / - 2,
	1,
	1500
);
var renderer = new THREE.WebGLRenderer({ antialias: true });
var guiOptions = new ControleOptions();
var controls = new THREE.OrbitControls(camera);
stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );
controls.enabled = guiOptions.orbitControls;
camera.position.set(0, 0, 800);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
canvas.appendChild( renderer.domElement );

const amdientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(amdientLight);
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
directionalLight.position.x = guiOptions.lightX;
directionalLight.position.y = guiOptions.lightY;
directionalLight.position.z = guiOptions.lightZ;
var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, guiOptions.lightHelperSize );
// scene.add( directionalLightHelper );
scene.add( directionalLight );

var backWallGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 1, 1 );
var backWallMaterial = new THREE.MeshPhongMaterial({
	color: utilMakeColorKey('wallColor'),
	side: THREE.DoubleSide,
	// wireframe: true
});
var backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
backWall.position.setZ(-20);
// scene.add(backWall);

var firstFirefly = new Firefly(
	{ h: 350, s: 0.9, v: 0.3 },
	{ x: 0, y: 0, z: 0},
	2
	);
scene.add(firstFirefly);

// var light = new THREE.PointLight( 0x00ff00, 1, 50 , 2 );
// light.position.set( 0, 0, 20 );
// scene.add( light );
// console.log(firstFirefly);


var animate = function(time) {
	stats.begin();
	// firstFirefly.rotation.x += 0.01;
	// firstFirefly.rotation.y += 0.02;
	// light.position.x += 1;
	// firstFirefly.position.x += 1;
	firstFirefly.applyForce(new THREE.Vector3(0, -0.1, 0));
	firstFirefly.move();
	firstFirefly.bounceOffCorners();
	renderer.render(scene, camera);
	stats.end();
	requestAnimationFrame(animate);
};

animate();

var onWindowResize = function() {
	camera.left = window.innerWidth / - 2;
	camera.right = window.innerWidth / 2;
	camera.top = window.innerHeight / 2;
	camera.bottom = window.innerHeight / - 2;
	camera.updateProjectionMatrix();
	
	backWall.geometry.vertices[0].x = -window.innerWidth / 2;
	backWall.geometry.vertices[0].y = window.innerHeight / 2;
	backWall.geometry.vertices[1].x = window.innerWidth / 2;
	backWall.geometry.vertices[1].y = window.innerHeight / 2;
	backWall.geometry.vertices[2].x = -window.innerWidth / 2;
	backWall.geometry.vertices[2].y = -window.innerHeight / 2;
	backWall.geometry.vertices[3].x = window.innerWidth / 2;
	backWall.geometry.vertices[3].y = -window.innerHeight / 2;
	backWall.geometry.verticesNeedUpdate = true;
	
	renderer.setSize(window.innerWidth, window.innerHeight);
};


var setupGui = function() {
	var gui = new dat.GUI();
	// gui.addColor(colorPalette, 'wallColor').onChange(function() {
	// 	var newWallColor = utilMakeColorKey('wallColor');
	// 	backWall.material.color.set(newWallColor);
	// });
	gui.add(guiOptions, 'orbitControls').onChange(function() {
		controls.enabled = guiOptions.orbitControls;
	});
	// gui.add(guiOptions, 'lightX', -500, 500).onChange(function() {
	// 	directionalLight.position.setX(guiOptions.lightX);
	// 	directionalLight.lookAt(scene.position);
	// 	// directionalLight.matrixWorldNeedsUpdate = true;
	// 	// directionalLight.matrixWorldNeedsUpdate = true;
	// });
	// gui.add(guiOptions, 'lightY', -500, 500).onChange(function() {
	// 	directionalLight.position.setY(guiOptions.lightY)
	// 	directionalLight.lookAt(scene.position);
	// });
	// gui.add(guiOptions, 'lightZ', -500, 500).onChange(function() {
	// 	directionalLight.position.setZ(guiOptions.lightZ)
	// 	directionalLight.lookAt(scene.position);
	// });
	
};

window.addEventListener('resize', onWindowResize, true);
window.onload = setupGui;
})();