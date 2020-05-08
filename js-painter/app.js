const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const brushSize = document.querySelector("#js-range");
const mode = document.querySelector("#js-mode");
const modeInfo = document.querySelector(".js-modeInfo");
const saveBtn = document.querySelector("#js-save");
const resetBtn = document.querySelector("#js-reset");

const INITIAL_COLOR = "rgb(0, 0, 0)";

let isPainting = false;
let currentColor = INITIAL_COLOR;
let paintMode = true; // true = paint mode, false = background fill mode

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);
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
      ctx.fillRect(0, 0, 500, 500);
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
      ctx.strokeStyle = colors[i].style.backgroundColor;
      currentColor = colors[i].style.backgroundColor;
    });
  }
}

function getBrushSize() {
  brushSize.addEventListener("input", function (event) {
    console.log(event.target.value);
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
  ctx.fillRect(0, 0, 500, 500);
}

function save() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "JS-PAINT";
  link.click();
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
  saveBtn.addEventListener("click", save);
  resetBtn.addEventListener("click", reset);
}

init();
