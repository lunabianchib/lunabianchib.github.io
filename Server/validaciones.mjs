"use strict";
// Obtén el campo de nombre por su ID u otra forma de selección
// const campoNombre = document.getElementById('nombre');

// Agrega un evento de entrada para llamar a la función validar cuando el usuario escriba en el campo
// campoNombre.addEventListener('input', function() {
//    validar(campoNombre);
// });

    // Definición de la función 'validacion'
    const validacion = {
        nombre: function (input) {
            // Lógica de validación para el nombre
            const re = /^[a-zA-Z\s]{6,20}$/
            return re.test(input.value) ? true : 'Use entre 6 y 20 caracteres';
        },
        email: function (input) {
            // Lógica de validación para el correo electrónico
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(input.value) ? true : 'Ingrese un correo electrónico válido';
        },
        asunto: function (input) {
            const length = input.value.length;
            if (length < 10) {
                return 'Use al menos 10 caracteres';
            } else if (length > 40) {
                return 'Use menos de 40 caracteres';
            } else {
                return true;
            }
        },
        mensaje: function (input) {
            // Lógica de validación para el mensaje
            if (input.value.trim() === '') {
                return 'Este campo no puede estar vacío';
            } else if (input.value.length < 20 || input.value.length > 200) {
                return 'Use entre 20 y 200 caracteres';
            } else {
                return true;
            }
        },
    };

function validar(input) {
    const tipoInput = input.dataset.tipo;
    const funcionValidacion = tipoInput && validacion[tipoInput];
    if (funcionValidacion) {
        const resultado = funcionValidacion(input);
        input.setCustomValidity(resultado !== true ? resultado : '');
    }

    if (input.validity.valid) {
        const parentElement = input.parentElement;
        if (parentElement) {
            parentElement.classList.remove('invalid-input');
            const errorMessageElement = parentElement.querySelector('.error-message');
            if (errorMessageElement) {
                errorMessageElement.innerHTML = '';
            }
        }
    } else {
        const parentElement = input.parentElement;
        if (parentElement) {
            parentElement.classList.add('invalid-input');
            const errorMessageElement = parentElement.querySelector('.error-message');
            if (errorMessageElement) {
                errorMessageElement.innerHTML = mostrarMensajeError(tipoInput, input);
            }
        }
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Use entre 6 y 20 caracteres"
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "Ingrese un correo electrónico válido",
    },
    asunto: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Use entre 10 y 40 caracteres"
    },
    mensaje: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Use entre 20 y 200 caracteres"
    },
};


function mostrarMensajeError(tipoInput, input) {
    console.log('Tipo de error:', tipoInput);
    console.log('Validity:', input.validity);
    // Itera sobre cada tipo de error en 'tipoErrores'
    for (let tipoError of tipoErrores) {
        // Si el input tiene este tipo de error
        if (input.validity[tipoError]) {
            // Verifica si existe un mensaje de error específico para este tipo de error y tipo de input
            if (mensajesError[tipoInput] && mensajesError[tipoInput][tipoError]) {
                // Retorna el mensaje de error específico
                return mensajesError[tipoInput][tipoError];
            } else {
                // Si no hay un mensaje específico, retorna el mensaje de error genérico
                return mensajesErrorGenerales[tipoError] || 'Error genérico';
            }
        }
    }
    // Si no se encontró ningún error, retorna una cadena vacía
    return '';
}

const mensajesErrorGenerales = {
    valueMissing: "Campo obligatorio",
    typeMismatch: "Tipo de dato incorrecto",
    patternMismatch: "Patrón de entrada incorrecto",
    customError: "Error personalizado"
};
export {
    validar,
    tipoErrores,
    mensajesError
};

export function iniciarValidaciones() {
function validarMensaje(textarea) {
    var mensaje = textarea.value,
        errorMensaje = textarea.nextElementSibling;

    if (mensaje.length < 20 || mensaje.length > 200) {
        errorMensaje.textContent = 'El mensaje debe tener entre 20 y 200 caracteres.';
    }
}
}