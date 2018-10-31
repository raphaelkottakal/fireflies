var Firefly = function(color, position, size) {
  THREE.Group.call(this);
  this.color = color;
  this.position = position;
  this.target = position;
  this.size = size;
  this.velocity = new THREE.Vector3(0, 0, 0);
  // this.velocity = new THREE.Vector3(5, 5, 0);
  this.acceleration = new THREE.Vector3(0, 0, 0);

  var geometry = new THREE.SphereBufferGeometry( size, 8, 8 );
  var material = new THREE.MeshPhongMaterial( {
    color: utilMakeColor(color.h, color.s, color.v),
    emissive: utilMakeColor(color.h, color.s, color.v),
  	// wireframe: true
  } );
  var mesh = new THREE.Mesh( geometry, material );
  this.add(mesh);

  var glowCanvas = document.createElement('canvas');
  var canvaSize = 256;
  glowCanvas.width = canvaSize;
  glowCanvas.height = canvaSize;
  var context = glowCanvas.getContext('2d');
  var grd = context.createRadialGradient(canvaSize / 2, canvaSize / 2, 0, canvaSize / 2, canvaSize / 2, canvaSize / 2);
  grd.addColorStop(0, utilMakeHsvString(color.h, color.s, color.v));
  grd.addColorStop(1, "black");
  context.fillStyle = grd;
  context.fillRect(0, 0, canvaSize, canvaSize);

  var glowMap = new THREE.Texture(glowCanvas);
  glowMap.needsUpdate = true;
  var glowMaterial = new THREE.SpriteMaterial({
    map: glowMap,
    // transparent: true,
    // opacity: 0.5,
    blending: THREE.AdditiveBlending,
    color: 0xffffff
  });
  var glow = new THREE.Sprite(glowMaterial);
  glow.scale.set(15 * size, 15 * size, 1);
  // glow.position.set(10, 0, 0);
  this.add(glow);

  this.position.set(position.x, position.y, position.z);
};

Firefly.prototype = Object.create(THREE.Group.prototype);
Firefly.prototype.constructor = Firefly;

Firefly.prototype.move = function() {
  // this.velocity.add(this.acceleration);
  // this.velocity.clampLength(0, 5);
  if (this.position.distanceTo(this.target) < 4) {
    this.velocity.multiplyScalar(0);
  }
  this.position.add(this.velocity);
  // this.acceleration.multiplyScalar(0);
}

Firefly.prototype.setTarget = function(x, y) {
  var targetVector = new THREE.Vector3(x, y, 0);
  this.target = targetVector.clone();
  var directionVector = targetVector.sub(this.position);
  directionVector.normalize().multiplyScalar(5);
  this.velocity = directionVector;
}

Firefly.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Firefly.prototype.bounceOffCorners = function() {
  if (this.position.x + this.size > window.innerWidth / 2) {
    this.position.setX(window.innerWidth / 2 - this.size);
    this.velocity.multiply(new THREE.Vector3(-1, 1, 1));
  } else if (this.position.x - this.size < -window.innerWidth / 2) {
    this.position.setX(-window.innerWidth / 2  + this.size);
    this.velocity.multiply(new THREE.Vector3(-1, 1, 1));
  } else if (this.position.y - this.size < -window.innerHeight / 2) {
    this.position.setY(-window.innerHeight / 2  + this.size);
    this.velocity.multiply(new THREE.Vector3(1, -1, 1));
  } else if (this.position.y + this.size > window.innerHeight / 2) {
    this.position.setY(window.innerHeight / 2 - this.size);
    this.velocity.multiply(new THREE.Vector3(1, -1, 1));
  }
}