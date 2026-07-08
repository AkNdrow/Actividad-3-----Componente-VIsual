document.addEventListener('DOMContentLoaded', () => {

    // --- CONTROL DE TUS MODALES ---
    // En esta sección se aplican las plantillas de CustomModal a elementos específicos.
    // Existen dos formas de hacerlo: asociando un modal a una clase (para afectar múltiples botones)
    // o asociándolo a un ID (para un solo botón).

    // Función reutilizable para asignar un modal a cualquier elemento por su clase
    const configurarModalesPorClase = (nombreClase, opcionesModal) => {
        const elementos = document.getElementsByClassName(nombreClase);
        // getElementsByClassName devuelve una HTMLCollection, usamos Array.from para iterar con forEach
        Array.from(elementos).forEach(elemento => {
            elemento.addEventListener('click', () => {
                new CustomModal(opcionesModal);
            });
        });
    };

    // APLICACIÓN 1: Múltiples elementos (por clase)
    // Usamos la función para asignar el mismo modal a todos los botones con la clase 'glow-btn'.
    // Esto es ideal cuando tienes varios botones que abren el mismo tipo de ventana.
    configurarModalesPorClase('glow-btn', {
        titulo: "Modal con Estilo Glow",
        contenido: `
            <p>¡Hola! Has activado tu modal con estilo Glow.</p>
            <p>Esta ventana emergente hereda el marco de colores con brillo animado del botón que presionaste.</p>
        `,
        claseExtra: "modal-glow"
    });

    // APLICACIÓN 2: Elemento único (por ID) con estilo Neón
    // Seleccionamos un botón específico ('neon-btn') y le añadimos un evento de clic.
    // Al hacer clic, se instancia un CustomModal con la clase 'modal-neon'.
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

    // APLICACIÓN 3: Modal Simple Clásico
    // Al igual que el anterior, al dar clic en 'btn-modal-trigger' se abre un modal.
    // Esta vez no le enviamos 'claseExtra', sino que solo le cambiamos el color de la línea
    // superior usando la propiedad 'colorTema'.
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

    // APLICACIÓN 4: Modal con inyección de código HTML
    // Demuestra cómo en la propiedad 'contenido' se puede insertar toda una estructura HTML compleja
    // como un formulario funcional, e incluso conectar otras alertas (CustomToast) en el evento 'onsubmit' del mismo.
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
    // Aquí los dropdowns se instancian enviándoles el ID del botón que los abrirá.

    // APLICACIÓN 1: Dropdown Básico
    // Se ancla al botón 'btn-dropdown-1'. En el arreglo 'items', definimos el nombre
    // de la opción ('texto') y la función que se ejecutará al darle clic ('accion').
    new CustomDropdown({
        botonId: 'btn-dropdown-1',
        items: [
            { texto: 'Acción A.1', accion: () => new CustomToast({ mensaje: 'Ejecutaste la Acción A.1', tipo: 'info' }) },
            { texto: 'Acción A.2', accion: () => new CustomToast({ mensaje: 'Ejecutaste la Acción A.2', tipo: 'success' }) }
        ]
    });

    // APLICACIÓN 2: Dropdown con Tema Verde
    // Es igual al anterior, pero le agregamos la propiedad 'claseExtra: dropdown-verde'
    // que cambiará sus estilos mediante el CSS.
    new CustomDropdown({
        botonId: 'btn-dropdown-2',
        claseExtra: 'dropdown-verde',
        items: [
            { texto: 'Lanzar Alerta', accion: () => new CustomToast({ mensaje: '¡Advertencia activada!', tipo: 'warning' }) },
            { texto: 'Reportar Error', accion: () => new CustomToast({ mensaje: '¡Fallo reportado!', tipo: 'error' }) }
        ]
    });

    // APLICACIÓN 3: Dropdown con Tema Neón
    // Aplica la clase 'dropdown-neon' y en sus acciones mezcla una alerta nativa del
    // navegador (alert) con un CustomToast.
    new CustomDropdown({
        botonId: 'btn-dropdown-3',
        claseExtra: 'dropdown-neon',
        items: [
            { texto: 'Ver Alerta', accion: () => alert('Mensaje nativo de tu navegador.') },
            { texto: 'Cerrar Todo', accion: () => new CustomToast({ mensaje: 'Dropdown cerrado correctamente.', tipo: 'info' }) }
        ]
    });

    // --- CONTROL DE TUS ETIQUETAS FLOTANTES (TOOLTIPS) ---
    
    // APLICACIÓN GLOBAL:
    // Al instanciar 'new CustomTooltip()' una vez, el código escanea todo tu HTML 
    // buscando los atributos 'data-tooltip' y automáticamente les asigna los eventos 
    // de hover para mostrar el tooltip. No tienes que instanciar uno por cada botón.
    new CustomTooltip();

    // --- CONTROL DE TUS NOTIFICACIONES TOAST ---
    // Los Toasts están pensados para crearse dinámicamente cuando un evento ocurre 
    // (ej: un clic, enviar un formulario, etc). Por eso instanciamos un 'new CustomToast()' 
    // dentro de los listeners de clic (addEventListener) de cada botón de prueba.

    // APLICACIÓN 1: Alerta de Éxito (Success)
    // Lanza un Toast verde que dura 3.5 segundos.
    document.getElementById('btn-toast-success')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "¡Tu acción se realizó correctamente!",
            tipo: "success",
            duracion: 3500
        });
    });

    // APLICACIÓN 2: Alerta Informativa (Info)
    // Lanza un Toast azul que dura 4 segundos.
    document.getElementById('btn-toast-info')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Tienes una nueva notificación en tu panel.",
            tipo: "info",
            duracion: 4000
        });
    });

    // APLICACIÓN 3: Alerta de Advertencia (Warning)
    // Lanza un Toast amarillo que dura 4.5 segundos.
    document.getElementById('btn-toast-warning')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Cuidado: Revisa la configuración de tus inputs.",
            tipo: "warning",
            duracion: 4500
        });
    });

    // APLICACIÓN 4: Alerta de Error (Error)
    // Lanza un Toast rojo que dura 5 segundos.
    document.getElementById('btn-toast-error')?.addEventListener('click', () => {
        new CustomToast({
            mensaje: "Error: No se pudo conectar con tu servidor.",
            tipo: "error",
            duracion: 5000
        });
    });
});
