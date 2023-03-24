const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const generateGradient = (isRandom) => {
  const getRandomColor = () => {
    // Generando un color aleatorio en formato hexadecimal. Ejemplo: #5665E9.
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomHex}`;
  }
  
  if (isRandom) {
    // Si isRandom es verdadero, actualiza el valor de entrada de colores con un color aleatorio.
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  // Creando una cadena degradada utilizando el valor del menú de selección junto con los valores de entrada de color.
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  textarea.value = `background: ${gradient};`;
}

// Cada vez que se cambia el valor de un elemento de entrada de color, se actualiza la vista previa del degradado.
colorInputs.forEach(input => {
  input.addEventListener("input", () => generateGradient(false));
});

selectMenu.addEventListener("change", () => generateGradient(false));

// Cuando se hace clic en el botón "Refrescar", se generan dos nuevos colores aleatorios y se actualiza la vista previa del degradado.
refreshBtn.addEventListener("click", () => generateGradient(true));

//Cuando se activa el evento, se llama a la función navigator.clipboard.writeText() para copiar el valor del cuadro de texto textarea en el portapapeles.
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(textarea.value);
  copyBtn.innerText = "Código copiado";
  setTimeout(() => {
    copyBtn.innerText = "Copiar código";
  }, 1800);
});