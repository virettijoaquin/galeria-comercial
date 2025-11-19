// ==========================================
// VALIDACIONES DEL FORMULARIO DE CONTACTO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Elementos del formulario
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    const aceptaTerminos = document.getElementById('aceptaTerminos');
    
    // Elementos de error
    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');
    const asuntoError = document.getElementById('asuntoError');
    const mensajeError = document.getElementById('mensajeError');
    const terminosError = document.getElementById('terminosError');
    
    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    
    // Función para mostrar error
    function mostrarError(input, errorElement, mensaje) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }
    
    // Función para limpiar error
    function limpiarError(input, errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }
    
    // Función para remover estado de éxito
    function removerEstadoSuccess(input) {
        input.classList.remove('input-success');
    }
    
    // Validación en tiempo real del nombre
    nombre.addEventListener('blur', function() {
        validarNombre();
    });
    
    nombre.addEventListener('input', function() {
        if (nombreError.textContent !== '') {
            validarNombre();
        }
    });
    
    function validarNombre() {
        const valorNombre = nombre.value.trim();
        
        if (valorNombre === '') {
            mostrarError(nombre, nombreError, 'El nombre es obligatorio');
            return false;
        }
        
        if (valorNombre.length < 2) {
            mostrarError(nombre, nombreError, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        if (valorNombre.length > 50) {
            mostrarError(nombre, nombreError, 'El nombre no puede exceder 50 caracteres');
            return false;
        }
        
        if (!nombreRegex.test(valorNombre)) {
            mostrarError(nombre, nombreError, 'El nombre solo puede contener letras y espacios');
            return false;
        }
        
        limpiarError(nombre, nombreError);
        return true;
    }
    
    // Validación en tiempo real del email
    email.addEventListener('blur', function() {
        validarEmail();
    });
    
    email.addEventListener('input', function() {
        if (emailError.textContent !== '') {
            validarEmail();
        }
    });
    
    function validarEmail() {
        const valorEmail = email.value.trim();
        
        if (valorEmail === '') {
            mostrarError(email, emailError, 'El email es obligatorio');
            return false;
        }
        
        if (!emailRegex.test(valorEmail)) {
            mostrarError(email, emailError, 'Por favor ingresa un email válido');
            return false;
        }
        
        limpiarError(email, emailError);
        return true;
    }
    
    // Validación del teléfono (opcional)
    telefono.addEventListener('blur', function() {
        validarTelefono();
    });
    
    telefono.addEventListener('input', function() {
        if (telefonoError.textContent !== '') {
            validarTelefono();
        }
    });
    
    function validarTelefono() {
        const valorTelefono = telefono.value.trim();
        
        // El teléfono es opcional, así que si está vacío es válido
        if (valorTelefono === '') {
            removerEstadoSuccess(telefono);
            limpiarError(telefono, telefonoError);
            return true;
        }
        
        if (!telefonoRegex.test(valorTelefono)) {
            mostrarError(telefono, telefonoError, 'Por favor ingresa un teléfono válido (7-20 dígitos)');
            return false;
        }
        
        limpiarError(telefono, telefonoError);
        return true;
    }
    
    // Validación del asunto
    asunto.addEventListener('change', function() {
        validarAsunto();
    });
    
    function validarAsunto() {
        if (asunto.value === '') {
            mostrarError(asunto, asuntoError, 'Por favor selecciona un asunto');
            return false;
        }
        
        limpiarError(asunto, asuntoError);
        return true;
    }
    
    // Validación del mensaje
    mensaje.addEventListener('blur', function() {
        validarMensaje();
    });
    
    mensaje.addEventListener('input', function() {
        if (mensajeError.textContent !== '') {
            validarMensaje();
        }
    });
    
    function validarMensaje() {
        const valorMensaje = mensaje.value.trim();
        
        if (valorMensaje === '') {
            mostrarError(mensaje, mensajeError, 'El mensaje es obligatorio');
            return false;
        }
        
        if (valorMensaje.length < 10) {
            mostrarError(mensaje, mensajeError, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        
        if (valorMensaje.length > 500) {
            mostrarError(mensaje, mensajeError, 'El mensaje no puede exceder 500 caracteres');
            return false;
        }
        
        limpiarError(mensaje, mensajeError);
        return true;
    }
    
    // Validación de términos y condiciones
    aceptaTerminos.addEventListener('change', function() {
        validarTerminos();
    });
    
    function validarTerminos() {
        if (!aceptaTerminos.checked) {
            mostrarError(aceptaTerminos, terminosError, 'Debes aceptar la política de privacidad');
            return false;
        }
        
        limpiarError(aceptaTerminos, terminosError);
        return true;
    }
    
    // Validación completa del formulario al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ejecutar todas las validaciones
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const asuntoValido = validarAsunto();
        const mensajeValido = validarMensaje();
        const terminosValidos = validarTerminos();
        
        // Si todas las validaciones pasan
        if (nombreValido && emailValido && telefonoValido && asuntoValido && mensajeValido && terminosValidos) {
            // Simular envío del formulario
            enviarFormulario();
        } else {
            // Hacer scroll al primer error
            const primerError = document.querySelector('.input-error');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
        }
    });
    
    // Función para simular el envío del formulario
    function enviarFormulario() {
        // Mostrar indicador de carga (opcional)
        const submitButton = form.querySelector('button[type="submit"]');
        const textoOriginal = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular delay de envío (1.5 segundos)
        setTimeout(function() {
            // Ocultar el formulario
            form.style.display = 'none';
            
            // Mostrar mensaje de éxito
            successMessage.style.display = 'flex';
            
            // Hacer scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Limpiar el formulario
            form.reset();
            
            // Remover todas las clases de éxito/error
            const inputs = form.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.classList.remove('input-error', 'input-success');
            });
            
            // Después de 5 segundos, ocultar el mensaje y mostrar el formulario nuevamente
            setTimeout(function() {
                successMessage.style.display = 'none';
                form.style.display = 'block';
                submitButton.textContent = textoOriginal;
                submitButton.disabled = false;
            }, 5000);
            
        }, 1500);
    }
    
    // Prevenir pegado de espacios en blanco en campos de email
    email.addEventListener('paste', function(e) {
        setTimeout(function() {
            email.value = email.value.trim();
        }, 10);
    });
    
    // Formatear teléfono mientras se escribe (opcional)
    telefono.addEventListener('input', function(e) {
        let valor = telefono.value.replace(/[^\d\+\-\(\)\s]/g, '');
        telefono.value = valor;
    });
});
