document.addEventListener('DOMContentLoaded', () => {

    // --- CONTROL DE TUS MODALES ---

    const triggerGlow = document.getElementById('glow-btn');
    if (triggerGlow) {
        triggerGlow.addEventListener('click', () => {
            new CustomModal({
                titulo: "Modal con Estilo Glow",
                contenido: `
                    <p>¡Hola! Has activado tu modal con estilo Glow.</p>
                    <p>Esta ventana emergente hereda el marco de colores con brillo animado del botón que presionaste.</p>
                `,
                claseExtra: "modal-glow"
            });
        });
    }

    const triggerNeon = document.getElementById('neon-btn');
    if (triggerNeon) {
        triggerNeon.addEventListener('click', () => {
            new CustomModal({
                titulo: "Modal con Estilo Neón",
                contenido: `
                    <p>¡Hola! Has activado tu modal con estilo Neón.</p>
                    <p>Esta ventana emergente tiene un borde de neón rosa y sombras difuminadas intensas que combinan con tu botón.</p>
                `,
                claseExtra: "modal-neon"
            });
        });
    }

    const triggerModalSimple = document.getElementById('btn-modal-trigger');
    if (triggerModalSimple) {
        triggerModalSimple.addEventListener('click', () => {
            new CustomModal({
                titulo: "¡Hola! Este es tu Modal",
                contenido: `
                    <p>Has abierto con éxito un componente visual de tu librería JavaScript.</p>
                    <p>Puedes cerrarlo dando clic en el botón de abajo, en la 'X' superior, presionando 'Esc' o haciendo clic fuera de la ventana.</p>
                `,
                colorTema: "#023E7D"
            });
        });
    }

    // Configura tu modal con formulario HTML
    const triggerModalHtml = document.getElementById('btn-modal-html');
    if (triggerModalHtml) {
        triggerModalHtml.addEventListener('click', () => {
            new CustomModal({
                titulo: "Formulario de tu Modal",
                colorTema: "#0353A4",
                contenido: `
                    <form style="display: flex; flex-direction: column; gap: 12px;" onsubmit="event.preventDefault(); new CustomToast({mensaje: '¡Tus datos fueron guardados!', tipo: 'success'});">
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 0.85rem; color: #fff; font-weight: 500;">Escribe tu Nombre</label>
                            <input type="text" placeholder="Tu nombre..." style="padding: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;" required>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 0.85rem; color: #fff; font-weight: 500;">Escribe tu Correo</label>
                            <input type="email" placeholder="correo@ejemplo.com" style="padding: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;" required>
                        </div>
                        <button type="submit" style="padding: 10px; background-color: #2ecc71; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; margin-top: 5px;">Enviar Datos</button>
                    </form>
                `
            });
        });
    }

    // --- CONTROL DE TUS MENÚS DESPLEGABLES (DROPDOWNS) ---

    // Inicializa tu primer menú desplegable
    new CustomDropdown({
        botonId: 'btn-dropdown-1',
        items: [
            { texto: 'Acción A.1', accion: () => new CustomToast({ mensaje: 'Ejecutaste la Acción A.1', tipo: 'info' }) },
            { texto: 'Acción A.2', accion: () => new CustomToast({ mensaje: 'Ejecutaste la Acción A.2', tipo: 'success' }) }
        ]
    });

    // Inicializa tu segundo menú desplegable aplicando tu tema verde
    new CustomDropdown({
        botonId: 'btn-dropdown-2',
        claseExtra: 'dropdown-verde',
        items: [
            { texto: 'Lanzar Alerta', accion: () => new CustomToast({ mensaje: '¡Advertencia activada!', tipo: 'warning' }) },
            { texto: 'Reportar Error', accion: () => new CustomToast({ mensaje: '¡Fallo reportado!', tipo: 'error' }) }
        ]
    });

    // Inicializa tu tercer menú desplegable aplicando tu tema de neón rosa
    new CustomDropdown({
        botonId: 'btn-dropdown-3',
        claseExtra: 'dropdown-neon',
        items: [
            { texto: 'Ver Alerta', accion: () => alert('Mensaje nativo de tu navegador.') },
            { texto: 'Cerrar Todo', accion: () => new CustomToast({ mensaje: 'Dropdown cerrado correctamente.', tipo: 'info' }) }
        ]
    });

    // --- CONTROL DE TUS ETIQUETAS FLOTANTES (TOOLTIPS) ---

    // Inicializa tus tooltips de forma automática
    new CustomTooltip();

    // --- CONTROL DE TUS NOTIFICACIONES TOAST ---

    // Envía un toast de tipo Éxito
    document.getElementById('btn-toast-success')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "¡Tu acción se realizó correctamente!",
            tipo: "success",
            duracion: 3500
        });
    });

    // Envía un toast de tipo Información
    document.getElementById('btn-toast-info')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Tienes una nueva notificación en tu panel.",
            tipo: "info",
            duracion: 4000
        });
    });

    // Envía un toast de tipo Advertencia
    document.getElementById('btn-toast-warning')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Cuidado: Revisa la configuración de tus inputs.",
            tipo: "warning",
            duracion: 4500
        });
    });

    // Envía un toast de tipo Error
    document.getElementById('btn-toast-error')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Error: No se pudo conectar con tu servidor.",
            tipo: "error",
            duracion: 5000
        });
    });
});
