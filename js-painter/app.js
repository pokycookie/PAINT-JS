const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const brushSize = document.querySelector("#js-range");
const mode = document.querySelector("#js-mode");
const modeInfo = document.querySelector(".js-modeInfo");
const saveBtn = document.querySelector("#js-save");
const resetBtn = document.querySelector("#js-reset");
const canvasH = document.querySelector("#js-canvasH");
const canvasW = document.querySelector("#js-canvasW");
const hideBtn = document.querySelector("#js-hideBtn");
const controls = document.querySelector(".controls");
const hideIco = document.querySelector("#js-hideIco");

const INITIAL_COLOR = "rgb(0, 0, 0)";
const INITIAL_WIDTH = 500;
const INITIAL_HEIGHT = 500;

let isPainting = false;
let currentColor = INITIAL_COLOR;
let paintMode = true; // true = paint mode, false = background fill mode

canvas.width = INITIAL_WIDTH;
canvas.height = INITIAL_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.lineCap = "round";
// ctx.lineJoin = "round";

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (paintMode === true) {
    if (isPainting === true) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }
}

function getCanvas() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", function () {
    isPainting = true;
    if (paintMode === false) {
      ctx.fillStyle = currentColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
  canvas.addEventListener("mouseup", function () {
    isPainting = false;
  });
  canvas.addEventListener("mouseleave", function () {
    isPainting = false;
  });
  canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
}

function getColor() {
  for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", function () {
      for (let j = 0; j < colors.length; j++) {
        if (colors[j].classList.contains("selected")) {
          colors[j].classList.remove("selected");
        }
      }
      colors[i].classList.add("selected");
      ctx.strokeStyle = colors[i].style.backgroundColor;
      currentColor = colors[i].style.backgroundColor;
    });
  }
}

function getBrushSize() {
  brushSize.addEventListener("input", function (event) {
    ctx.lineWidth = event.target.value;
  });
}

function setMode() {
  mode.addEventListener("click", function () {
    if (paintMode) {
      paintMode = false;
      mode.innerText = "Paint";
      modeInfo.innerText = "Fill Mode";
    } else {
      paintMode = true;
      mode.innerText = "Fill";
      modeInfo.innerText = "Paint Mode";
    }
  });
}

function reset() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.width = INITIAL_WIDTH;
  canvas.height = INITIAL_HEIGHT;
  canvasH.value = INITIAL_WIDTH;
  canvasW.value = INITIAL_HEIGHT;
}

function save() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "JS-PAINT";
  link.click();
}

function getCanvasWidth() {
  canvasW.addEventListener("input", function (event) {
    let width = event.target.value;
    if (width > 1000) {
      width = 1000;
      canvasW.value = 1000;
    } else if (width < 100) {
      width = 100;
      canvasW.value = 100;
    }
    canvas.width = width;
  });
}

function getCanvasHeight() {
  canvasH.addEventListener("input", function (event) {
    let height = event.target.value;
    if (height > 1000) {
      height = 1000;
      canvasH.value = 1000;
    } else if (height < 100) {
      height = 100;
      canvasH.value = 100;
    }
    canvas.height = height;
  });
}

function hide() {
  if (controls.classList.contains("visi")) {
    controls.classList.add("invisi");
    controls.classList.remove("visi");
    hideIco.classList.remove("fa-sort-down");
    hideIco.classList.add("fa-sort-up");
  } else if (controls.classList.contains("invisi")) {
    controls.classList.add("visi");
    controls.classList.remove("invisi");
    hideIco.classList.remove("fa-sort-up");
    hideIco.classList.add("fa-sort-down");
  }
  console.log("HIDE");
}

function init() {
  if (canvas) {
    getCanvas();
  }
  if (brushSize) {
    getBrushSize();
  }
  getColor();
  setMode();
  getCanvasWidth();
  getCanvasHeight();
  saveBtn.addEventListener("click", save);
  resetBtn.addEventListener("click", reset);
  hideBtn.addEventListener("click", hide);
}

init();
