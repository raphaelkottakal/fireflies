var utilMakeColor = function(key) {
  return new THREE.Color(`hsl(${colorPalette[key].h}, ${Math.round(colorPalette[key].s * 100)}%, ${Math.round(colorPalette[key].v * 100)}%)`);
}