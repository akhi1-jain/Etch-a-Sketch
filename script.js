const container = document.getElementById("container");
const gridSize = 16; // Set the initial grid size
let interactions = 0; // Track the number of interactions

function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  container.innerHTML = ""; // Clear the container before creating new cells
  for (let c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.className = "grid-item";
    container.appendChild(cell);
  }

  // Attach event listeners to the new cells
  const cells = document.querySelectorAll(".grid-item");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", function () {
      // Generate a random RGB color
      const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      cell.style.backgroundColor = randomColor;

      // Darken the color progressively
      if (interactions < 10) {
        let currentColor = window.getComputedStyle(cell).getPropertyValue("background-color");
        let rgbValues = currentColor.match(/\d+/g);
        let newColor = `rgb(${Math.max(parseInt(rgbValues[0]) - 25, 0)}, ${Math.max(
          parseInt(rgbValues[1]) - 25,
          0
        )}, ${Math.max(parseInt(rgbValues[2]) - 25, 0)})`;
        cell.style.backgroundColor = newColor;
        interactions++;
      }
    });
  });
}

makeRows(gridSize, gridSize);

const gridSizeButton = document.getElementById("grid-size-button");

gridSizeButton.addEventListener("click", function () {
  let newSize = prompt(
    "Enter the number of squares per side for the new grid (maximum 100):"
  );
  newSize = parseInt(newSize);
  if (newSize && newSize <= 100) {
    makeRows(newSize, newSize);
  } else {
    alert("Please enter a valid number (1-100).");
  }
});
