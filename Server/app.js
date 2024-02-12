import { validar, tipoErrores, mensajesError } from "./validaciones.mjs";

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("input", (event) => {
        validar(event.target);
    });
});

// const textarea = document.getElementById("textarea-mensaje");
// textarea.addEventListener("input", (event) => {
 //   validar(event.target);
// });
