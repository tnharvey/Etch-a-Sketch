// Etch-a-Sketch project for the the Odin Project.
// Need to transfer darkening from Opacity to rgba Alpha
// Need to design layout, add buttons, etc.

let documentHeight = document.documentElement.clientHeight;
let gridContainerHeight = documentHeight - (documentHeight * 0.2); // Assuming the rest of the page is only 20%
let grid = 32;
let padding = 1; // // TODO: Capture this from the CSS
let totalPadding = grid * padding + padding;
let cellHeight = (gridContainerHeight-totalPadding)/grid;
let colorScheme = "";

setGridProperties();
generateGridElements();
setColorScheme("grayScale");

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
  else if (colorScheme === "color") {
    if (document.getElementById(1).classList.contains("grayScale")) {
      changeClassOnGrid("remove","grayScale");
    }
    assignRandomColors();
  }
}
function setGridProperties () {
  // set gridContainer properties
  document.getElementById("gridContainer").style.cssText = (`display: grid;
    grid-template-columns: repeat(` + grid + `,`+ cellHeight + `px);
    grid-template-rows: repeat(` + grid + `,` + cellHeight + `px);
    grid-gap: ` + padding + `px;`);

}

function generateGridElements () {
  // function to generate grid elements based on given parameters.

  for (var i = 0; i < (grid * grid); i++) {
    let div = document.createElement('div');

    div.id = i;
    document.getElementById("gridContainer").appendChild(div);

    div.addEventListener("mouseenter", darkenCell);
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
  let currentRGB = document.getElementById(thisDiv.id).style.backgroundColor; // BUG: currentRGB is null. Why!!!???
  let r = 0;
  let g = 0;
  let b= 0;

  if (colorScheme === "BW") {

    thisDiv.style.backgroundColor = "rgb(0,0,0)";
  }
  else if (colorScheme === "grayScale") {
    console.log("start: " + thisDiv.style.opacity);
    thisDiv.style.opacity = Number(thisDiv.style.opacity) + 0.1;
    console.log(thisDiv.style.opacity);
  }
  else if (colorScheme === "color") {
    thisDiv.style.opacity = Number(thisDiv.style.opacity) + 0.1;
  }

}

function getRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? {
    r: match[1],
    g: match[2],
    b: match[3]
  } : {};
}

// function to update grid when ChangeGrid is clicked

// function to clear/reset the existing grid. A good would be to clear color classes or to reset all rgb for cell to default
