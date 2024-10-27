const terminal = document.getElementById("terminal");
const header = document.getElementById("header");
const handles = document.querySelectorAll(".resize-handle");

let isResizing = false;
let isDragging = false;
let currentHandle;
let startX, startY, startWidth, startHeight, startTop, startLeft;

// Resizing logic
handles.forEach((handle) => {
  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isResizing = true;
    currentHandle = handle;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = terminal.offsetWidth;
    startHeight = terminal.offsetHeight;
    startTop = terminal.offsetTop;
    startLeft = terminal.offsetLeft;

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  });
});

function resize(e) {
  if (!isResizing) return;

  let width, height, top, left;

  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  // Calculate new width and height based on the handle being dragged
  if (currentHandle.classList.contains("bottom-right")) {
    width = startWidth + (e.clientX - startX);
    height = startHeight + (e.clientY - startY);
  } else if (currentHandle.classList.contains("bottom-left")) {
    width = startWidth - (e.clientX - startX);
    height = startHeight + (e.clientY - startY);
    left = startLeft + (e.clientX - startX);
  } else if (currentHandle.classList.contains("top-right")) {
    width = startWidth + (e.clientX - startX);
    height = startHeight - (e.clientY - startY);
    top = startTop + (e.clientY - startY);
  } else if (currentHandle.classList.contains("top-left")) {
    width = startWidth - (e.clientX - startX);
    height = startHeight - (e.clientY - startY);
    left = startLeft + (e.clientX - startX);
    top = startTop + (e.clientY - startY);
  } else if (currentHandle.classList.contains("right")) {
    width = startWidth + (e.clientX - startX);
  } else if (currentHandle.classList.contains("left")) {
    width = startWidth - (e.clientX - startX);
    left = startLeft + (e.clientX - startX);
  } else if (currentHandle.classList.contains("bottom")) {
    height = startHeight + (e.clientY - startY);
  } else if (currentHandle.classList.contains("top")) {
    height = startHeight - (e.clientY - startY);
    top = startTop + (e.clientY - startY);
  }

  // Ensure the terminal doesn't exceed window size or shrink too small
  if (width && width >= 300 && width <= maxWidth) terminal.style.width = width + "px";
  if (height && height >= 200 && height <= maxHeight) terminal.style.height = height + "px";
  if (top && top >= 0) terminal.style.top = top + "px";
  if (left && left >= 0) terminal.style.left = left + "px";
}

function stopResize() {
  isResizing = false;
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

// Dragging logic
header.addEventListener("mousedown", (e) => {
  if (isResizing) return; 
  e.preventDefault();
  isDragging = true;
  startX = e.clientX - terminal.offsetLeft;
  startY = e.clientY - terminal.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
});

function drag(e) {
  if (!isDragging || isResizing) return;

  let left = e.clientX - startX;
  let top = e.clientY - startY;

  if (left >= 0 && left <= window.innerWidth - terminal.offsetWidth) {
    terminal.style.left = left + "px";
  }
  if (top >= 0 && top <= window.innerHeight - terminal.offsetHeight) {
    terminal.style.top = top + "px";
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}

// Dynamic font resizing
function resizeFont() {
  const width = terminal.offsetWidth;
  const height = terminal.offsetHeight;
  const baseFontSize = 10;
  const fontSize = Math.max(baseFontSize, Math.min(width, height) / 20);
  document.getElementById("output").style.fontSize = `${fontSize}px`;
}

resizeFont();
new ResizeObserver(() => {
  resizeFont();
}).observe(terminal);
