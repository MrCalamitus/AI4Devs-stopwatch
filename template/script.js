let startTime;
let elapsedTime = 0;
let timerInterval;
let animationInterval;

// Función para formatear el tiempo
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(3, '0')
    );
}

// Función para iniciar el cronómetro
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById('display').textContent = formatTime(elapsedTime);
    }, 10); // Actualización del cronómetro cada 10ms

    animationInterval = setInterval(drawClock, 300); // Actualización de la animación cada 300ms
    document.getElementById('startButton').disabled = true;
}

// Función para limpiar el cronómetro
function clearStopwatch() {
    clearInterval(timerInterval);
    clearInterval(animationInterval);
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('startButton').disabled = false;
    drawClock(); // Reiniciar el reloj analógico
}

// Event listeners para los botones
document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('clearButton').addEventListener('click', clearStopwatch);

// Reloj analógico
const canvas = document.getElementById('analogClock');
const ctx = canvas.getContext('2d');

// Función para dibujar el reloj analógico
function drawClock() {
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawFace(ctx, radius);
    drawTime(ctx, radius, elapsedTime);
    ctx.translate(-radius, -radius);
}

// Dibujar la cara del reloj
function drawFace(ctx, radius) {
    // Círculo externo
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#e6e6fa';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Números del reloj
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// Dibujar las manecillas del reloj
function drawTime(ctx, radius, elapsedTime) {
    let hours = Math.floor(elapsedTime / 3600000) % 12;
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    // Manecilla de las horas
    let hourAngle = (hours * Math.PI / 6) + (minutes * Math.PI / 360);
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);

    // Manecilla de los minutos
    let minuteAngle = (minutes * Math.PI / 30) + (seconds * Math.PI / 1800);
    drawHand(ctx, minuteAngle, radius * 0.7, radius * 0.05);

    // Manecilla de los segundos, moviéndose cada 300 ms
    let secondAngle = (seconds * Math.PI / 30) + (milliseconds * Math.PI / 30000);
    drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02);
}

// Función para dibujar cada manecilla
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// Inicializar el reloj analógico
drawClock();
