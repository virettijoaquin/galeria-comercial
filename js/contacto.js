$(document).ready(function() {
    console.log('Contacto.js cargado');

    // Cargar el modal dinámicamente
    const modalHTML = `
        <!-- Modal Contacto -->
        <div id="modal-contacto" class="modal">
            <div class="modal-content">
                <div class="modal-icon">✓</div>
                <h3 class="modal-title">¡Mensaje Enviado!</h3>
                <p class="modal-text">Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad.</p>
                <button class="btn btn-primary" id="cerrar-modal-contacto">Aceptar</button>
            </div>
        </div>
    `;

    $('body').append(modalHTML);
    initContactModal();

    const $form = $('#contactForm');
    console.log('Form encontrado:', $form.length);

    // Función para inicializar el modal de contacto
    function initContactModal() {
        const $modal = $('#modal-contacto');
        const $cerrarModalBtn = $('#cerrar-modal-contacto');

        if ($cerrarModalBtn.length) {
            $cerrarModalBtn.on('click', function() {
                $modal.fadeOut(300);
            });
        }

        // Cerrar modal al hacer clic fuera de él
        $modal.on('click', function(e) {
            if ($(e.target).is($modal)) {
                $modal.fadeOut(300);
            }
        });
    }

    // Elementos del formulario
    const $nombre = $('#nombre');
    const $email = $('#email');
    const $telefono = $('#telefono');
    const $asunto = $('#asunto');
    const $mensaje = $('#mensaje');
    const $aceptaTerminos = $('#aceptaTerminos');

    // Elementos de error
    const $nombreError = $('#nombreError');
    const $emailError = $('#emailError');
    const $telefonoError = $('#telefonoError');
    const $asuntoError = $('#asuntoError');
    const $mensajeError = $('#mensajeError');
    const $terminosError = $('#terminosError');

    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    
    // Función para mostrar error
    function mostrarError($input, $errorElement, mensaje) {
        $errorElement.text(mensaje).addClass('active').show();
        $input.addClass('input-error').removeClass('input-success');
    }

    // Función para limpiar error
    function limpiarError($input, $errorElement) {
        $errorElement.text('').removeClass('active').hide();
        $input.removeClass('input-error').addClass('input-success');
    }

    // Función para remover estado de éxito
    function removerEstadoSuccess($input) {
        $input.removeClass('input-success');
    }
    
    // Validación en tiempo real del nombre
    $nombre.on('blur', function() {
        validarNombre();
    });

    $nombre.on('input', function() {
        if ($nombreError.text() !== '') {
            validarNombre();
        }
    });

    function validarNombre() {
        const valorNombre = $nombre.val().trim();

        if (valorNombre === '') {
            mostrarError($nombre, $nombreError, 'El nombre es obligatorio');
            return false;
        }

        if (valorNombre.length < 2) {
            mostrarError($nombre, $nombreError, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }

        if (valorNombre.length > 50) {
            mostrarError($nombre, $nombreError, 'El nombre no puede exceder 50 caracteres');
            return false;
        }

        if (!nombreRegex.test(valorNombre)) {
            mostrarError($nombre, $nombreError, 'El nombre solo puede contener letras y espacios');
            return false;
        }

        limpiarError($nombre, $nombreError);
        return true;
    }
    
    // Validación en tiempo real del email
    $email.on('blur', function() {
        validarEmail();
    });

    $email.on('input', function() {
        if ($emailError.text() !== '') {
            validarEmail();
        }
    });

    function validarEmail() {
        const valorEmail = $email.val().trim();

        if (valorEmail === '') {
            mostrarError($email, $emailError, 'El email es obligatorio');
            return false;
        }

        if (!emailRegex.test(valorEmail)) {
            mostrarError($email, $emailError, 'Por favor ingresa un email válido');
            return false;
        }

        limpiarError($email, $emailError);
        return true;
    }
    
    // Validación del teléfono (opcional)
    $telefono.on('blur', function() {
        validarTelefono();
    });

    $telefono.on('input', function() {
        if ($telefonoError.text() !== '') {
            validarTelefono();
        }
    });

    function validarTelefono() {
        const valorTelefono = $telefono.val().trim();

        // El teléfono es opcional, así que si está vacío es válido
        if (valorTelefono === '') {
            removerEstadoSuccess($telefono);
            limpiarError($telefono, $telefonoError);
            return true;
        }

        if (!telefonoRegex.test(valorTelefono)) {
            mostrarError($telefono, $telefonoError, 'Por favor ingresa un teléfono válido (7-20 dígitos)');
            return false;
        }

        limpiarError($telefono, $telefonoError);
        return true;
    }
    
    // Validación del asunto
    $asunto.on('change', function() {
        validarAsunto();
    });

    function validarAsunto() {
        if ($asunto.val() === '') {
            mostrarError($asunto, $asuntoError, 'Por favor selecciona un asunto');
            return false;
        }

        limpiarError($asunto, $asuntoError);
        return true;
    }
    
    // Validación del mensaje
    $mensaje.on('blur', function() {
        validarMensaje();
    });

    $mensaje.on('input', function() {
        if ($mensajeError.text() !== '') {
            validarMensaje();
        }
    });

    function validarMensaje() {
        const valorMensaje = $mensaje.val().trim();

        if (valorMensaje === '') {
            mostrarError($mensaje, $mensajeError, 'El mensaje es obligatorio');
            return false;
        }

        if (valorMensaje.length < 10) {
            mostrarError($mensaje, $mensajeError, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }

        if (valorMensaje.length > 500) {
            mostrarError($mensaje, $mensajeError, 'El mensaje no puede exceder 500 caracteres');
            return false;
        }

        limpiarError($mensaje, $mensajeError);
        return true;
    }
    
    // Validación de términos y condiciones
    $aceptaTerminos.on('change', function() {
        validarTerminos();
    });

    function validarTerminos() {
        if (!$aceptaTerminos.is(':checked')) {
            mostrarError($aceptaTerminos, $terminosError, 'Debes aceptar la política de privacidad');
            return false;
        }

        limpiarError($aceptaTerminos, $terminosError);
        return true;
    }
    
    // Validación completa del formulario al enviar
    $form.on('submit', function(e) {
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
            const $primerError = $('.input-error').first();
            if ($primerError.length) {
                $('html, body').animate({
                    scrollTop: $primerError.offset().top - 100
                }, 500);
                $primerError.focus();
            }
        }
    });
    
    // Función para simular el envío del formulario
    function enviarFormulario() {
        console.log('Enviando formulario...');
        // Mostrar indicador de carga (opcional)
        const $submitButton = $form.find('button[type="submit"]');
        const textoOriginal = $submitButton.text();
        $submitButton.text('Enviando...').prop('disabled', true);

        // Simular delay de envío (1.5 segundos)
        setTimeout(function() {
            console.log('Mostrando modal...');

            const $modal = $('#modal-contacto');

            if ($modal.length) {
                // Mostrar modal de éxito
                $modal.css('display', 'flex').hide().fadeIn(300);
            } else {
                console.error('Modal no encontrado');
            }

            // Limpiar el formulario
            $form[0].reset();

            // Remover todas las clases de éxito/error
            $form.find('.form-input').removeClass('input-error input-success');

            // Restaurar botón
            $submitButton.text(textoOriginal).prop('disabled', false);

        }, 1500);
    }
    
    // Prevenir pegado de espacios en blanco en campos de email
    $email.on('paste', function() {
        setTimeout(function() {
            $email.val($email.val().trim());
        }, 10);
    });

    // Formatear teléfono mientras se escribe (opcional)
    $telefono.on('input', function() {
        let valor = $telefono.val().replace(/[^\d\+\-\(\)\s]/g, '');
        $telefono.val(valor);
    });
});
