// Etch-a-Sketch project for the the Odin Project.

let documentHeight = document.documentElement.clientHeight;
let gridContainerHeight = documentHeight - (documentHeight * 0.2); // Assuming the rest of the page is only 20%
let grid = 32;
let padding = 1; // // TODO: Capture this from the CSS
let totalPadding = grid * padding + padding;
let cellHeight = (gridContainerHeight-totalPadding)/grid;
let colorScheme = "BW";

setGridProperties();
generateGridElements();

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

// function to generate listeners for each div inside gridContainer

// function to capture and assign mouseover grid coordinates (determine grid cell)

function darkenCell (e) {
// function to darken cell based on color scheme
let thisDiv = e.target;
let currentRGB = thisDiv.style.backgroundColor; // BUG: currentRGB is null. Why!!!???
console.log(e);
document.getElementById("lastCellSelected").innerHTML = thisDiv.id;
document.getElementById("background-color").innerHTML = thisDiv.style.backgroundColor;

  if (colorScheme === "BW") {

    thisDiv.style.backgroundColor = "rgb(0,0,0)";
  }
  else if (colorScheme === "grayScale") {
    //thisDiv.style.backgroundColor =
  }
}

// function to update grid when ChangeGrid is clicked

// function to clear/reset the existing grid. A good would be to clear color classes or to reset all rgb for cell to default
