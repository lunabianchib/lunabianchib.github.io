export function validar(input){
    const tipoInput = input.dataset.tipo;

    if(validacion[tipoInput]){
        validacion[tipoInput](input);
    }


    if(input.validity.valid){
        input.parentElement.classList.remove('invalid-input');
        input.parentElement.querySelector('.error-message').innerHTML = '';
    }else{
        input.parentElement.classList.add('invalid-input');
        input.parentElement.querySelector('.error-message').innerHTML = mostrarMensajeError(tipoInput, input);
    }
}
const tipoErrores= [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]
const mensajesError = {
    nombre:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Use entre 6 y 20 caracteres"
    },
    email:{
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "Ingrese un correo electrónico válido",
    },
    asunto:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Use entre 10 y 40 caracteres"
    },
    mensaje:{
        valueMissing: "Este campo no puede estar vacío",
        customError: "Use entre 20 y 200 caracteres"
    },
}
