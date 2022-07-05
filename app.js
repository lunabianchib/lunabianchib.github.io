import { validar } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("blur", (input)=>{
        validar(input.target);
    })
})

const textarea = document.getElementById("textarea");
textarea.addEventListener("blur", (e)=>{
    validar(e.target);
});
