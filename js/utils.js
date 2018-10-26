var utilMakeHsvString = function(h, s, v) {
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`
}

var utilMakeColor = function(h, s, v) {
  return new THREE.Color(utilMakeHsvString(h, s, v));
}
var utilMakeColorKey = function(key) {
  return new THREE.Color(utilMakeHsvString(colorPalette[key].h, colorPalette[key].s, colorPalette[key].v));
};