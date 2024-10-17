
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const penButton = document.getElementById('pen');
const markerButton = document.getElementById('marker');
const highlighterButton = document.getElementById('highlighter');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');

let drawing = false;
let currentTool = 'pen';
let currentColor = colorPicker.value;
let currentLineWidth = 2;
let currentAlpha = 1;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Tool Change Events
penButton.addEventListener('click', () => {
    currentTool = 'pen';
    currentLineWidth = 2;
    currentAlpha = 1;
    ctx.globalAlpha = currentAlpha;
});

markerButton.addEventListener('click', () => {
    currentTool = 'marker';
    currentLineWidth = 5;
    currentAlpha = 1;
    ctx.globalAlpha = currentAlpha;
});

highlighterButton.addEventListener('click', () => {
    currentTool = 'highlighter';
    currentLineWidth = 10;
    currentAlpha = 0.5; // For transparent highlighter effect
    ctx.globalAlpha = currentAlpha;
});

eraserButton.addEventListener('click', () => {
    currentTool = 'eraser';
    currentLineWidth = 20;
    currentColor = '#ffffff'; // Erase by drawing white lines
    ctx.globalAlpha = 1;
});

colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    if (currentTool !== 'eraser') {
        ctx.globalAlpha = currentAlpha;
    }
});

// Clear Canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Drawing Logic
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(e) {
    drawing = true;
    draw(e);  // Draw immediately on click
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();  // Reset path
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
