var Firefly = function(color, position, size) {
  THREE.Mesh.call(this, color);
  var geometry = new THREE.CircleBufferGeometry( size, 16 );
  var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
  this.material = material;
  this.geometry = geometry;
  this.position.set(position.x, position.y, position.z);
};

Firefly.prototype = Object.create(THREE.Mesh.prototype);
Firefly.prototype.constructor = Firefly;