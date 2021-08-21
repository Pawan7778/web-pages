const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEL = document.getElementById('color');
const clearEL = document.getElementById('clear');
const ctx = canvas.getContext('2d');


let size = 20;
let color = 'black';
isPressed = false;

let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
    // console.log(isPressed , x, y);
})
canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})
canvas.addEventListener('mouseup', (e) => {
    isPressed = false;

    x = undefined
    y = undefined
    // console.log(isPressed , x, y);
})

function drawCircle(x, y) {

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)  //(x,y, radius, staring point(0) ,ending point(2pie))
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke()
}

function updateSizeOnScreen() {
    sizeEL.innerText = size

}

increaseBtn.addEventListener('click', () => {
    size += 3
    if (size > 30) {
        size = 30
    }

    updateSizeOnScreen()
})
decreaseBtn.addEventListener('click', () => {
    size = size - 3
    if (size < 3) {
        size = 3
    }

    updateSizeOnScreen()
})

colorEL.addEventListener('change', (e) => {
    color = e.target.value
})


clearEL.addEventListener('clear', () => {

    ctx.clearRect(0, 0, 800,600)

})

// drawCircle(100,200)
// drawLine(300,300,300,500)
