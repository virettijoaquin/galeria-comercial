$(document).ready(function() {
    let experienciaCounter = 0;
    let estudioCounter = 0;
    let puestoActual = '';

    // Cargar el modal dinámicamente
    const modalHTML = `
        <!-- Modal de Éxito -->
        <div id="modal-exito" class="modal">
            <div class="modal-content">
                <div class="modal-icon">✓</div>
                <h3 class="modal-title">¡Postulación Enviada con Éxito!</h3>
                <p class="modal-text">Gracias por tu interés en formar parte de nuestro equipo. Revisaremos tu postulación y nos pondremos en contacto contigo a la brevedad.</p>
                <button class="btn btn-primary" id="cerrar-modal">Aceptar</button>
            </div>
        </div>
    `;

    $('body').append(modalHTML);
    initTrabajoModal();

    // Función para inicializar el modal de trabajo
    function initTrabajoModal() {
        const $modalExito = $('#modal-exito');
        const $cerrarModalBtn = $('#cerrar-modal');

        if ($cerrarModalBtn.length) {
            $cerrarModalBtn.on('click', function() {
                $modalExito.removeClass('show');
                $('#formulario-postulacion')[0].reset();
                $('#formulario-section').hide();
                $('#experiencias-container').empty();
                $('#estudios-container').empty();
                experienciaCounter = 0;
                estudioCounter = 0;
                $('.error-message').text('');
                $('.form-control').removeClass('error');

                // Scroll al inicio
                $('html, body').animate({
                    scrollTop: 0
                }, 600);
            });
        }

        // Cerrar modal al hacer clic fuera
        $modalExito.on('click', function(e) {
            if ($(e.target).is($modalExito)) {
                $cerrarModalBtn.click();
            }
        });
    }

    // Establecer fecha máxima para fecha de nacimiento (18 años atrás)
    const hoy = new Date();
    const hace18Anios = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    const fechaMaxNacimiento = hace18Anios.toISOString().split('T')[0];
    const fechaHoy = hoy.toISOString().split('T')[0];
    $('#fecha-nacimiento').attr('max', fechaMaxNacimiento);

    // Establecer fecha máxima para fechas "hasta" (hoy)
    $(document).on('focus', '.exp-hasta, .est-hasta', function() {
        $(this).attr('max', fechaHoy);
    });

    // Información detallada de cada puesto
    const puestosInfo = {
        'Maestranza': {
            descripcion: 'Buscamos personal de maestranza responsable y comprometido para mantener nuestras instalaciones en perfectas condiciones.',
            responsabilidades: [
                'Mantenimiento general de las instalaciones',
                'Tareas de limpieza profunda y mantenimiento preventivo',
                'Reparaciones menores y coordinación con servicios técnicos',
                'Control de stock de materiales de limpieza',
                'Apoyo en eventos especiales del centro comercial'
            ],
            requisitos: [
                'Experiencia previa en mantenimiento (deseable)',
                'Conocimientos básicos de electricidad y plomería',
                'Disponibilidad horaria para turnos rotativos',
                'Proactividad y capacidad de resolver problemas'
            ],
            beneficios: [
                'Obra social Swiss Medical',
                'Días de vacaciones adicionales por antigüedad',
                'Descuentos en locales del centro comercial',
                'Uniformes provistos por la empresa',
                'Capacitación continua en seguridad e higiene'
            ],
            horario: 'Turnos rotativos mañana, tarde y noche',
            contrato: 'Relación de dependencia directa'
        },
        'Maestra Jardinera': {
            descripcion: 'Necesitamos maestra jardinera con título habilitante para nuestra guardería infantil, brindando un ambiente seguro y educativo para niños de 2 a 8 años.',
            responsabilidades: [
                'Planificación y ejecución de actividades educativas',
                'Cuidado y supervisión de niños de 2 a 8 años',
                'Comunicación constante con padres sobre el desarrollo de los niños',
                'Organización de eventos y actividades recreativas',
                'Mantenimiento de registros de asistencia y progreso'
            ],
            requisitos: [
                'Título de Maestra Jardinera (excluyente)',
                'Experiencia mínima de 2 años en educación inicial',
                'Certificado de antecedentes penales',
                'Conocimientos en primeros auxilios (deseable)',
                'Paciencia, creatividad y vocación de servicio'
            ],
            beneficios: [
                'Obra social Swiss Medical con cobertura familiar',
                'Aguinaldo completo',
                'Vacaciones de verano e invierno',
                'Material didáctico provisto',
                'Capacitaciones especializadas en pedagogía infantil'
            ],
            horario: 'Lunes a viernes de 10:00 a 18:00',
            contrato: 'Relación de dependencia directa con convenio docente'
        },
        'Personal de Seguridad': {
            descripcion: 'Incorporamos personal de seguridad con credencial vigente para garantizar la protección de visitantes, colaboradores e instalaciones.',
            responsabilidades: [
                'Vigilancia y control de accesos al centro comercial',
                'Prevención de situaciones de riesgo',
                'Atención de emergencias y aplicación de protocolos',
                'Rondas de seguridad por las instalaciones',
                'Elaboración de informes de novedades'
            ],
            requisitos: [
                'Credencial de vigilador vigente (excluyente)',
                'Secundario completo',
                'Experiencia en seguridad privada o pública',
                'Capacidad para trabajar bajo presión',
                'Excelente presencia y trato con el público'
            ],
            beneficios: [
                'Obra social OSDE',
                'Adicionales por turno nocturno y feriados',
                'Seguro de vida',
                'Uniformes y equipamiento provisto',
                'Capacitación en protocolos de emergencia y primeros auxilios'
            ],
            horario: 'Turnos rotativos 24/7 (incluye fines de semana y feriados)',
            contrato: 'Relación de dependencia directa'
        },
        'Personal de Limpieza': {
            descripcion: 'Buscamos personal de limpieza responsable y detallista para mantener todas las áreas del centro comercial en condiciones óptimas de higiene.',
            responsabilidades: [
                'Limpieza y sanitización de áreas comunes',
                'Mantenimiento de baños y espacios públicos',
                'Reposición de insumos de higiene',
                'Limpieza de vidrios y superficies',
                'Manejo de residuos y separación de desechos'
            ],
            requisitos: [
                'Experiencia previa en limpieza (deseable)',
                'Disponibilidad horaria flexible',
                'Capacidad para trabajar en equipo',
                'Responsabilidad y atención al detalle',
                'Buena predisposición'
            ],
            beneficios: [
                'Obra social OSECAC',
                'Ropa de trabajo provista',
                'Descuentos en locales gastronómicos',
                'Premios por presentismo',
                'Estabilidad laboral'
            ],
            horario: 'Turnos mañana (6:00-14:00), tarde (14:00-22:00) o noche (22:00-6:00)',
            contrato: 'Relación de dependencia directa'
        },
        'Centro de Atención al Cliente': {
            descripcion: 'Sumamos personas con excelente comunicación y orientación al servicio para brindar asistencia y resolver consultas de nuestros visitantes.',
            responsabilidades: [
                'Atención personalizada a visitantes',
                'Información sobre locales, promociones y servicios',
                'Gestión de reclamos y sugerencias',
                'Coordinación de servicios especiales (sillas de ruedas, cochecitos)',
                'Administración del sistema de tarjetas de regalo'
            ],
            requisitos: [
                'Secundario completo (excluyente)',
                'Excelente comunicación oral y escrita',
                'Experiencia en atención al cliente',
                'Conocimientos de informática nivel usuario',
                'Manejo de idioma inglés (deseable)',
                'Actitud proactiva y orientación al servicio'
            ],
            beneficios: [
                'Obra social Galeno',
                'Bonos por cumplimiento de objetivos',
                'Capacitación en atención al cliente',
                'Descuentos especiales en todos los locales',
                'Ambiente de trabajo dinámico y profesional'
            ],
            horario: 'Lunes a domingo con francos rotativos (10:00-22:00)',
            contrato: 'Relación de dependencia directa'
        },
        'Objetos Perdidos': {
            descripcion: 'Necesitamos personal organizado y responsable para gestionar el área de objetos perdidos, brindando un servicio eficiente a nuestros visitantes.',
            responsabilidades: [
                'Recepción y registro de objetos perdidos',
                'Atención al público para devolución de pertenencias',
                'Mantenimiento de base de datos actualizada',
                'Coordinación con seguridad para casos especiales',
                'Gestión de inventario y disposición final de objetos no reclamados'
            ],
            requisitos: [
                'Secundario completo',
                'Excelente organización y atención al detalle',
                'Manejo de sistemas informáticos',
                'Experiencia en atención al público',
                'Honestidad y discreción (excluyente)'
            ],
            beneficios: [
                'Obra social OSDE',
                'Capacitación en gestión administrativa',
                'Descuentos en locales del shopping',
                'Premios por antigüedad',
                'Horarios fijos'
            ],
            horario: 'Lunes a viernes de 10:00 a 19:00',
            contrato: 'Relación de dependencia directa'
        }
    };

    // Mostrar modal de información
    $('.info-btn').on('click', function() {
        const puesto = $(this).data('puesto');
        puestoActual = puesto;
        const info = puestosInfo[puesto];

        $('#info-titulo').text(puesto);

        let contenidoHTML = `
            <p><strong>Descripción:</strong> ${info.descripcion}</p>

            <h4>Responsabilidades</h4>
            <ul>
                ${info.responsabilidades.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <h4>Requisitos</h4>
            <ul>
                ${info.requisitos.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <h4>Beneficios</h4>
            <ul>
                ${info.beneficios.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <div style="margin-top: var(--spacing-lg);">
                <span class="info-badge">📅 ${info.horario}</span>
                <span class="info-badge">📄 ${info.contrato}</span>
            </div>
        `;

        $('#info-contenido').html(contenidoHTML);
        $('#modal-info').addClass('show');
    });

    // Cerrar modal de información
    $('#cerrar-modal-info').on('click', function() {
        $('#modal-info').removeClass('show');
    });

    // Cerrar modal al hacer clic fuera
    $('#modal-info').on('click', function(e) {
        if ($(e.target).is('#modal-info')) {
            $('#modal-info').removeClass('show');
        }
    });

    // Aplicar desde el modal de información
    $('#aplicar-desde-modal').on('click', function() {
        $('#modal-info').removeClass('show');
        $('#puesto-nombre').text(puestoActual);
        $('#formulario-section').show();

        // Scroll suave al formulario
        $('html, body').animate({
            scrollTop: $('#formulario-section').offset().top - 80
        }, 600);
    });

    // Mostrar formulario al hacer clic en "Aplicar Ahora"
    $('.aplicar-btn').on('click', function() {
        const puesto = $(this).data('puesto');
        $('#puesto-nombre').text(puesto);
        $('#formulario-section').show();

        // Scroll suave al formulario
        $('html, body').animate({
            scrollTop: $('#formulario-section').offset().top - 80
        }, 600);
    });

    // Cancelar formulario
    $('#cancelar-btn').on('click', function() {
        if (confirm('¿Estás seguro de que querés cancelar? Se perderán todos los datos ingresados.')) {
            $('#formulario-postulacion')[0].reset();
            $('#formulario-section').hide();
            $('#experiencias-container').empty();
            $('#estudios-container').empty();
            experienciaCounter = 0;
            estudioCounter = 0;
            $('.error-message').text('');
            $('.form-control').removeClass('error');

            // Scroll al inicio
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        }
    });

    // Agregar experiencia laboral
    $('#agregar-experiencia').on('click', function() {
        experienciaCounter++;
        const experienciaHTML = `
            <div class="experiencia-item" data-id="${experienciaCounter}">
                <button type="button" class="remove-item-btn remove-experiencia" data-id="${experienciaCounter}">×</button>
                <h4>Experiencia Laboral ${experienciaCounter}</h4>

                <div class="form-group">
                    <label for="exp-empresa-${experienciaCounter}">Empresa</label>
                    <input type="text" id="exp-empresa-${experienciaCounter}" name="exp-empresa-${experienciaCounter}" class="form-control exp-empresa" required>
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="exp-puesto-${experienciaCounter}">Puesto</label>
                    <input type="text" id="exp-puesto-${experienciaCounter}" name="exp-puesto-${experienciaCounter}" class="form-control exp-puesto" required>
                    <span class="error-message"></span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="exp-desde-${experienciaCounter}">Fecha Desde</label>
                        <input type="date" id="exp-desde-${experienciaCounter}" name="exp-desde-${experienciaCounter}" class="form-control exp-desde" data-id="${experienciaCounter}" required>
                        <span class="error-message"></span>
                    </div>

                    <div class="form-group">
                        <label for="exp-hasta-${experienciaCounter}">Fecha Hasta</label>
                        <input type="date" id="exp-hasta-${experienciaCounter}" name="exp-hasta-${experienciaCounter}" class="form-control exp-hasta" data-id="${experienciaCounter}" required>
                        <span class="error-message"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="exp-descripcion-${experienciaCounter}">Descripción de Tareas</label>
                    <textarea id="exp-descripcion-${experienciaCounter}" name="exp-descripcion-${experienciaCounter}" class="form-control" rows="3"></textarea>
                    <span class="error-message"></span>
                </div>
            </div>
        `;
        $('#experiencias-container').append(experienciaHTML);
    });

    // Remover experiencia laboral
    $(document).on('click', '.remove-experiencia', function() {
        const id = $(this).data('id');
        $(`.experiencia-item[data-id="${id}"]`).remove();
    });

    // Agregar estudio
    $('#agregar-estudio').on('click', function() {
        estudioCounter++;
        const estudioHTML = `
            <div class="estudio-item" data-id="${estudioCounter}">
                <button type="button" class="remove-item-btn remove-estudio" data-id="${estudioCounter}">×</button>
                <h4>Estudio ${estudioCounter}</h4>

                <div class="form-group">
                    <label for="est-institucion-${estudioCounter}">Institución</label>
                    <input type="text" id="est-institucion-${estudioCounter}" name="est-institucion-${estudioCounter}" class="form-control est-institucion" required>
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="est-titulo-${estudioCounter}">Título</label>
                    <input type="text" id="est-titulo-${estudioCounter}" name="est-titulo-${estudioCounter}" class="form-control est-titulo" required>
                    <span class="error-message"></span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="est-desde-${estudioCounter}">Fecha Desde</label>
                        <input type="date" id="est-desde-${estudioCounter}" name="est-desde-${estudioCounter}" class="form-control est-desde" data-id="${estudioCounter}" required>
                        <span class="error-message"></span>
                    </div>

                    <div class="form-group">
                        <label for="est-hasta-${estudioCounter}">Fecha Hasta</label>
                        <input type="date" id="est-hasta-${estudioCounter}" name="est-hasta-${estudioCounter}" class="form-control est-hasta" data-id="${estudioCounter}" required>
                        <span class="error-message"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="est-descripcion-${estudioCounter}">Descripción</label>
                    <textarea id="est-descripcion-${estudioCounter}" name="est-descripcion-${estudioCounter}" class="form-control" rows="3"></textarea>
                    <span class="error-message"></span>
                </div>
            </div>
        `;
        $('#estudios-container').append(estudioHTML);
    });

    // Remover estudio
    $(document).on('click', '.remove-estudio', function() {
        const id = $(this).data('id');
        $(`.estudio-item[data-id="${id}"]`).remove();
    });

    // Validación de fechas - Experiencias
    $(document).on('change', '.exp-desde, .exp-hasta', function() {
        const id = $(this).data('id');
        const desde = $(`#exp-desde-${id}`).val();
        const hasta = $(`#exp-hasta-${id}`).val();

        if (desde && hasta) {
            const fechaDesde = new Date(desde);
            const fechaHasta = new Date(hasta);

            if (fechaDesde > fechaHasta) {
                $(`#exp-hasta-${id}`).addClass('error');
                $(`#exp-hasta-${id}`).siblings('.error-message').text('La fecha hasta no puede ser anterior a la fecha desde');
            } else {
                $(`#exp-hasta-${id}`).removeClass('error');
                $(`#exp-hasta-${id}`).siblings('.error-message').text('');
            }
        }
    });

    // Validación de fechas - Estudios
    $(document).on('change', '.est-desde, .est-hasta', function() {
        const id = $(this).data('id');
        const desde = $(`#est-desde-${id}`).val();
        const hasta = $(`#est-hasta-${id}`).val();

        if (desde && hasta) {
            const fechaDesde = new Date(desde);
            const fechaHasta = new Date(hasta);

            if (fechaDesde > fechaHasta) {
                $(`#est-hasta-${id}`).addClass('error');
                $(`#est-hasta-${id}`).siblings('.error-message').text('La fecha hasta no puede ser anterior a la fecha desde');
            } else {
                $(`#est-hasta-${id}`).removeClass('error');
                $(`#est-hasta-${id}`).siblings('.error-message').text('');
            }
        }
    });

    // Validación en tiempo real para campos de texto
    $('#nombre, #apellido').on('blur focus', function() {
        const valor = $(this).val().trim();
        const campo = $(this).attr('id') === 'nombre' ? 'nombre' : 'apellido';

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text(`El ${campo} es obligatorio`);
        } else if (valor.length < 2) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text(`El ${campo} debe tener al menos 2 caracteres`);
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text(`El ${campo} solo puede contener letras`);
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de tipo de documento
    $('#tipo-documento').on('change', function() {
        if ($(this).val() === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Debes seleccionar un tipo de documento');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de número de documento
    $('#numero-documento').on('blur focus', function() {
        const valor = $(this).val().trim();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El número de documento es obligatorio');
        } else if (!/^\d{7,8}$/.test(valor)) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El número de documento debe tener 7 u 8 dígitos');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de fecha de nacimiento
    $('#fecha-nacimiento').on('change focus', function() {
        const valor = $(this).val();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('La fecha de nacimiento es obligatoria');
        } else {
            const fechaNac = new Date(valor);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            const mesActual = hoy.getMonth();
            const mesNac = fechaNac.getMonth();

            if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
                edad--;
            }

            if (edad < 18) {
                $(this).addClass('error');
                $(this).siblings('.error-message').text('Debes ser mayor de 18 años');
            } else if (edad > 100) {
                $(this).addClass('error');
                $(this).siblings('.error-message').text('Por favor, ingresa una fecha de nacimiento válida');
            } else {
                $(this).removeClass('error');
                $(this).siblings('.error-message').text('');
            }
        }
    });

    // Validación de email
    $('#email').on('blur focus', function() {
        const valor = $(this).val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El email es obligatorio');
        } else if (!emailRegex.test(valor)) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Por favor, ingresa un email válido');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de teléfono
    $('#telefono').on('blur focus', function() {
        const valor = $(this).val().trim();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El teléfono es obligatorio');
        } else if (!/^[0-9\s\-()]+$/.test(valor)) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El teléfono solo puede contener números, espacios, guiones y paréntesis');
        } else if (valor.replace(/[^0-9]/g, '').length < 10) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('El teléfono debe tener al menos 10 dígitos');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de motivación
    $('#motivacion').on('blur focus', function() {
        const valor = $(this).val().trim();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Este campo es obligatorio');
        } else if (valor.length < 50) {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Por favor, escribe al menos 50 caracteres explicando tu motivación');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de campos dinámicos de experiencia
    $(document).on('blur focus', '.exp-empresa, .exp-puesto', function() {
        const valor = $(this).val().trim();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Este campo es obligatorio');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Validación de campos dinámicos de estudio
    $(document).on('blur focus', '.est-institucion, .est-titulo', function() {
        const valor = $(this).val().trim();

        if (valor === '') {
            $(this).addClass('error');
            $(this).siblings('.error-message').text('Este campo es obligatorio');
        } else {
            $(this).removeClass('error');
            $(this).siblings('.error-message').text('');
        }
    });

    // Envío del formulario
    $('#formulario-postulacion').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validar campos obligatorios
        const nombre = $('#nombre').val().trim();
        const apellido = $('#apellido').val().trim();
        const tipoDoc = $('#tipo-documento').val();
        const numeroDoc = $('#numero-documento').val().trim();
        const fechaNac = $('#fecha-nacimiento').val();
        const email = $('#email').val().trim();
        const telefono = $('#telefono').val().trim();
        const motivacion = $('#motivacion').val().trim();

        // Nombre
        if (nombre === '' || nombre.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            $('#nombre').addClass('error');
            if (nombre === '') {
                $('#nombre').siblings('.error-message').text('El nombre es obligatorio');
            } else if (nombre.length < 2) {
                $('#nombre').siblings('.error-message').text('El nombre debe tener al menos 2 caracteres');
            } else {
                $('#nombre').siblings('.error-message').text('El nombre solo puede contener letras');
            }
            isValid = false;
        }

        // Apellido
        if (apellido === '' || apellido.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
            $('#apellido').addClass('error');
            if (apellido === '') {
                $('#apellido').siblings('.error-message').text('El apellido es obligatorio');
            } else if (apellido.length < 2) {
                $('#apellido').siblings('.error-message').text('El apellido debe tener al menos 2 caracteres');
            } else {
                $('#apellido').siblings('.error-message').text('El apellido solo puede contener letras');
            }
            isValid = false;
        }

        // Tipo de documento
        if (tipoDoc === '') {
            $('#tipo-documento').addClass('error');
            $('#tipo-documento').siblings('.error-message').text('Debes seleccionar un tipo de documento');
            isValid = false;
        }

        // Número de documento
        if (numeroDoc === '' || !/^\d{7,8}$/.test(numeroDoc)) {
            $('#numero-documento').addClass('error');
            if (numeroDoc === '') {
                $('#numero-documento').siblings('.error-message').text('El número de documento es obligatorio');
            } else {
                $('#numero-documento').siblings('.error-message').text('El número de documento debe tener 7 u 8 dígitos');
            }
            isValid = false;
        }

        // Fecha de nacimiento
        if (fechaNac === '') {
            $('#fecha-nacimiento').addClass('error');
            $('#fecha-nacimiento').siblings('.error-message').text('La fecha de nacimiento es obligatoria');
            isValid = false;
        } else {
            const fechaNacimiento = new Date(fechaNac);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mesActual = hoy.getMonth();
            const mesNac = fechaNacimiento.getMonth();

            if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }

            if (edad < 18 || edad > 100) {
                $('#fecha-nacimiento').addClass('error');
                if (edad < 18) {
                    $('#fecha-nacimiento').siblings('.error-message').text('Debes ser mayor de 18 años');
                } else {
                    $('#fecha-nacimiento').siblings('.error-message').text('Por favor, ingresa una fecha de nacimiento válida');
                }
                isValid = false;
            }
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            $('#email').addClass('error');
            if (email === '') {
                $('#email').siblings('.error-message').text('El email es obligatorio');
            } else {
                $('#email').siblings('.error-message').text('Por favor, ingresa un email válido');
            }
            isValid = false;
        }

        // Teléfono
        if (telefono === '' || !/^[0-9\s\-()]+$/.test(telefono) || telefono.replace(/[^0-9]/g, '').length < 10) {
            $('#telefono').addClass('error');
            if (telefono === '') {
                $('#telefono').siblings('.error-message').text('El teléfono es obligatorio');
            } else if (!/^[0-9\s\-()]+$/.test(telefono)) {
                $('#telefono').siblings('.error-message').text('El teléfono solo puede contener números, espacios, guiones y paréntesis');
            } else {
                $('#telefono').siblings('.error-message').text('El teléfono debe tener al menos 10 dígitos');
            }
            isValid = false;
        }

        // Motivación
        if (motivacion === '' || motivacion.length < 50) {
            $('#motivacion').addClass('error');
            if (motivacion === '') {
                $('#motivacion').siblings('.error-message').text('Este campo es obligatorio');
            } else {
                $('#motivacion').siblings('.error-message').text('Por favor, escribe al menos 50 caracteres explicando tu motivación');
            }
            isValid = false;
        }

        // Validar experiencias
        $('.experiencia-item').each(function() {
            const id = $(this).data('id');
            const empresa = $(`#exp-empresa-${id}`).val().trim();
            const puesto = $(`#exp-puesto-${id}`).val().trim();
            const desde = $(`#exp-desde-${id}`).val();
            const hasta = $(`#exp-hasta-${id}`).val();

            if (empresa === '') {
                $(`#exp-empresa-${id}`).addClass('error');
                $(`#exp-empresa-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (puesto === '') {
                $(`#exp-puesto-${id}`).addClass('error');
                $(`#exp-puesto-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (desde === '') {
                $(`#exp-desde-${id}`).addClass('error');
                $(`#exp-desde-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (hasta === '') {
                $(`#exp-hasta-${id}`).addClass('error');
                $(`#exp-hasta-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (desde && hasta) {
                const fechaDesde = new Date(desde);
                const fechaHasta = new Date(hasta);

                if (fechaDesde > fechaHasta) {
                    $(`#exp-hasta-${id}`).addClass('error');
                    $(`#exp-hasta-${id}`).siblings('.error-message').text('La fecha hasta no puede ser anterior a la fecha desde');
                    isValid = false;
                }
            }
        });

        // Validar estudios
        $('.estudio-item').each(function() {
            const id = $(this).data('id');
            const institucion = $(`#est-institucion-${id}`).val().trim();
            const titulo = $(`#est-titulo-${id}`).val().trim();
            const desde = $(`#est-desde-${id}`).val();
            const hasta = $(`#est-hasta-${id}`).val();

            if (institucion === '') {
                $(`#est-institucion-${id}`).addClass('error');
                $(`#est-institucion-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (titulo === '') {
                $(`#est-titulo-${id}`).addClass('error');
                $(`#est-titulo-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (desde === '') {
                $(`#est-desde-${id}`).addClass('error');
                $(`#est-desde-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (hasta === '') {
                $(`#est-hasta-${id}`).addClass('error');
                $(`#est-hasta-${id}`).siblings('.error-message').text('Este campo es obligatorio');
                isValid = false;
            }

            if (desde && hasta) {
                const fechaDesde = new Date(desde);
                const fechaHasta = new Date(hasta);

                if (fechaDesde > fechaHasta) {
                    $(`#est-hasta-${id}`).addClass('error');
                    $(`#est-hasta-${id}`).siblings('.error-message').text('La fecha hasta no puede ser anterior a la fecha desde');
                    isValid = false;
                }
            }
        });

        // Si todo es válido, mostrar modal de éxito
        if (isValid) {
            const $modalExito = $('#modal-exito');
            if ($modalExito.length) {
                $modalExito.addClass('show');
            } else {
                console.error('Modal de éxito no encontrado');
            }
        } else {
            // Scroll al primer error
            const primerError = $('.form-control.error').first();
            if (primerError.length) {
                $('html, body').animate({
                    scrollTop: primerError.offset().top - 100
                }, 400);
            }
        }
    });
});
