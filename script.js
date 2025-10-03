document.addEventListener("DOMContentLoaded", () => {
    const btnAcess = document.querySelector("#btn-acess");
    const boxAcess = document.querySelector("#box-acess");

    // Toggle menu acessibilidade
    btnAcess.addEventListener("click", () => {
        btnAcess.classList.toggle("rotacao-botao");
        boxAcess.classList.toggle("apresenta-lista");
    });

    const btnMais = document.querySelector("#font-plus");
    const btnMenos = document.querySelector("#font-minus");

    let fonteBase = 1; // tamanho inicial em rem

    btnMais.addEventListener("click", () => {
        fonteBase += 0.1;
        document.body.style.fontSize = fonteBase + "rem";
    });

    btnMenos.addEventListener("click", () => {
        fonteBase -= 0.1;
        document.body.style.fontSize = fonteBase + "rem";
    });
});

// Sakura petal effect
const canvas = document.getElementById("sakuraCanvas");
const ctx = canvas.getContext("2d");
let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Petal {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 12 + Math.random() * 10;
    this.speedY = 1 + Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = 0.01 + Math.random() * 0.03;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.spin;
    if (this.y > canvas.height + this.size) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgba(192, 203, 255, 0.8)";
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
    ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 50; i++) petals.push(new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
