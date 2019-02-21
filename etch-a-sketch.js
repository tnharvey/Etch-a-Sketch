// Etch-a-Sketch project for the the Odin Project.
// Layout in progress, finish event listeners at end and test

let documentHeight = document.documentElement.clientHeight;
let documentWidth = document.documentElement.clientWidth;
let gridContainerHeight = documentHeight - (documentHeight * 0.2); // Assuming the rest of the page is only 20%
let grid = 32;
let padding = 1;
let totalPadding = grid * padding + padding;
let cellHeight = (gridContainerHeight-totalPadding)/grid;
let colorScheme = "";

setGridProperties();
generateGridElements();
setColorScheme("dynamicColor");

function setColorScheme(scheme) {
  colorScheme = scheme;

  if (colorScheme === "BW") {
    if (document.getElementById(1).classList.contains("grayScale")) {
      changeClassOnGrid("remove","grayScale");
    }
    removeColors();
  }
  else if (colorScheme === "grayScale") {
    if (document.getElementById(1).classList.contains("grayScale")) {
      changeClassOnGrid("remove","grayScale");
    }
    removeColors();
    changeClassOnGrid("add","grayScale");
  }
  else if (colorScheme === "randomColor") {
    if (document.getElementById(1).classList.contains("grayScale")) {
      changeClassOnGrid("remove","grayScale");
    }
    assignRandomColors();
  }
  else if (colorScheme === "dynamicColor") {
    if (document.getElementById(1).classList.contains("grayScale")) {
      changeClassOnGrid("remove","grayScale");
    }
    assignRandomColors();
  }
}
function setGridProperties () {
  // set gridContainer properties
  documentHeight = document.documentElement.clientHeight;
  documentWidth = document.documentElement.clientWidth;
  gridContainerHeight = documentHeight - (documentHeight * 0.2); // Assuming the rest of the page is only 20%
  padding = 1;
  totalPadding = grid * padding + padding;
  cellHeight = (gridContainerHeight-totalPadding)/grid;

  document.getElementById("gridContainer").style.cssText = (`display: grid;
    grid-template-columns: repeat(` + grid + `,`+ cellHeight + `px);
    grid-template-rows: repeat(` + grid + `,` + cellHeight + `px);
    grid-gap: ` + padding + `px; width: ` + gridContainerHeight + `px;
    height: ` + gridContainerHeight + `px;`);
//    document.getElementById("gridRow").style.cssText = (`display: grid;
//      grid-template-columns:` +  spacerSize + `px,auto,` + spacerSize + `px;`);
}

function generateGridElements () {
  // function to generate grid elements based on given parameters.

  for (var i = 0; i < (grid * grid); i++) {
    let div = document.createElement('div');

    div.id = i;
    document.getElementById("gridContainer").appendChild(div);

    //div.addEventListener("mouseenter", darkenCell);
    div.addEventListener("touchenter", darkenCell);
  }
}

function changeClassOnGrid (action, classToChange) {
  for (var i = 0; i < (grid * grid); i++) {
    let div = document.getElementById(i);

    if (action === "add") {
      div.classList.add(classToChange);
    }
    else if (action === "remove") {
      div.classList.remove(classToChange);
    }
  }
}
function assignRandomColors () {
  // assigns random colors to existing grid and sets opacity to 0
  for (var i = 0; i < (grid * grid); i++) {
    let div = document.getElementById(i);
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    div.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    div.style.opacity = 0;
  }
}

function removeColors () {
  for (var i = 0; i < (grid * grid); i++) {
    let div = document.getElementById(i);

    div.style = "";
  }
}

function darkenCell (e) {
  // function to darken cell based on color scheme
  let thisDiv = e.target;
  let currentRGB = document.getElementById(thisDiv.id).style.backgroundColor;
  let r = 0;
  let g = 0;
  let b= 0;

  if (colorScheme === "BW") {

    thisDiv.style.backgroundColor = "rgb(0,0,0)";
  }
  else if (colorScheme === "grayScale") {
    thisDiv.style.opacity = Number(thisDiv.style.opacity) + 0.1;
  }
  else if (colorScheme === "randomColor") {
    thisDiv.style.opacity = Number(thisDiv.style.opacity) + 0.1;
  }
  else if (colorScheme === "dynamicColor") {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    thisDiv.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    thisDiv.style.opacity = Number(thisDiv.style.opacity) + 0.1;
  }
}

function clickHandler (e) {
  let div = e.target;

  if (div.id === "changeGridSizeButton"){
    grid = Number(prompt("Enter a number between 3 and 100 for the grid size:"));
  }
  else if (div.id === "selectSchemeButtonGroup") {
    toggleHiddenButtons("remove");
    return;
  }
  else if (div.id === "BW") {
    colorScheme = "BW";
    toggleHiddenButtons("add");
  }
  else if (div.id === "grayScale") {
    colorScheme = "grayScale";
    toggleHiddenButtons("add");
  }
  else if (div.id === "randomColor") {
    colorScheme = "randomColor";
    toggleHiddenButtons("add");
  }
  else if (div.id === "dynamicColor") {
    colorScheme = "dynamicColor";
    toggleHiddenButtons("add");
  }
  else if (div.id === "clearGridButton") {
  }
  resetGrid();
}

function toggleHiddenButtons(action) {
  if (action === "add"){
    document.getElementById("BW").classList.add("hidden");
    document.getElementById("grayScale").classList.add("hidden");
    document.getElementById("randomColor").classList.add("hidden");
    document.getElementById("dynamicColor").classList.add("hidden");
  }
  else if (action === "remove") {
    document.getElementById("BW").classList.remove("hidden");
    document.getElementById("grayScale").classList.remove("hidden");
    document.getElementById("randomColor").classList.remove("hidden");
    document.getElementById("dynamicColor").classList.remove("hidden");
  }
}
function resetGrid () {
  setGridProperties();
  generateGridElements();
  setColorScheme(colorScheme);
}
document.getElementById("changeGridSizeButton").addEventListener("click",clickHandler);
document.getElementById("selectSchemeButtonGroup").addEventListener("click",clickHandler);
document.getElementById("BW").addEventListener("click",clickHandler);
document.getElementById("grayScale").addEventListener("click",clickHandler);
document.getElementById("randomColor").addEventListener("click",clickHandler);
document.getElementById("dynamicColor").addEventListener("click",clickHandler);
document.getElementById("clearGridButton").addEventListener("click",clickHandler);
