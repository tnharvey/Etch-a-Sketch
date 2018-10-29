// Etch-a-Sketch project for the the Odin Project.

let documentHeight = document.documentElement.clientHeight;
let documentWidth = document.documentElement.clientWidth;
let grid = 16;
let gridSize = documentHeight - (documentHeight * 0.2); // Assuming the rest of the page is only 20%
let gridPointSize = gridSize / grid;