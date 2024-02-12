// Definición de la función 'validacion'
interface Validacion {
    [key: string]: (input: HTMLInputElement | HTMLTextAreaElement) => boolean | string;
}

const validacion: Validacion = {
    nombre: function (input) {
        const re = /^[a-zA-Z]{6,20}$/;
        return re.test(input.value) ? true : 'Use entre 6 y 20 caracteres';
    },
    email: function (input) {
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
        if (input.value.trim() === '') {
            return 'Este campo no puede estar vacío';
        } else if (input.value.length < 20 || input.value.length > 200) {
            return 'Use entre 20 y 200 caracteres';
        } else {
            return true;
        }
    },
};


function validar(input: HTMLInputElement | HTMLTextAreaElement) {
    const tipoInput = input.dataset.tipo;

    const funcionValidacion = tipoInput && validacion[tipoInput];

    if (funcionValidacion) {
        const resultado = funcionValidacion(input);
        input.setCustomValidity(resultado !== true ? String(resultado) : '');
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

const mensajesError: Record<string, Record<string, string>> = {
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


function mostrarMensajeError(tipoInput: string | undefined, input: HTMLInputElement | HTMLTextAreaElement) {
    for (let tipoError of tipoErrores) {
        if (input.validity[tipoError as keyof ValidityState]) {
            if (tipoInput && mensajesError[tipoInput as keyof typeof mensajesError] && mensajesError[tipoInput as keyof typeof mensajesError][tipoError]) {
                return mensajesError[tipoInput as keyof typeof mensajesError][tipoError];
            } else {
                return mensajesErrorGenerales[tipoError as keyof typeof mensajesErrorGenerales] || 'Error genérico';
            }
        }
    }
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
