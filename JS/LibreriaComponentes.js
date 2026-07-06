/**
 * Crea una notificación emergente tipo Toast en tu pantalla.
 */
class CustomToast {
    constructor(opciones = {}) {
        // Inicializa tus opciones por defecto
        this.mensaje = opciones.mensaje || "Hola, soy tu notificación";
        this.tipo = opciones.tipo || "info"; // info, success, warning, error
        this.duracion = opciones.duracion || 4000; // en milisegundos

        console.log(`[CustomToast] Inicializando notificación tipo '${this.tipo}' con mensaje: '${this.mensaje}'`);

        // Ejecuta la creación del toast
        this.crear();
    }

    crear() {
        // Busca tu contenedor de notificaciones en el documento
        let contenedor = document.getElementById('contenedor-toasts-custom');

        // Si no existe, créalo y agrégalo al cuerpo
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = 'contenedor-toasts-custom';
            document.body.appendChild(contenedor);
        }

        // Genera el elemento de tu toast
        const toast = document.createElement('div');
        toast.className = `toast-custom toast-${this.tipo}`;

        // Construye la estructura interna con el mensaje y el botón de cierre
        toast.innerHTML = `
            <div class="toast-contenido">
                <span class="toast-icono">${this.obtenerIcono()}</span>
                <p class="toast-mensaje">${this.mensaje}</p>
            </div>
            <button class="toast-cerrar">&times;</button>
            <div class="toast-progreso"></div>
        `;

        // Agrega tu toast al contenedor
        contenedor.appendChild(toast);

        // Agrega el evento para cerrar tu toast manualmente
        const botonCerrar = toast.querySelector('.toast-cerrar');
        botonCerrar.addEventListener('click', () => this.destruir(toast));

        // Ajusta la duración de la barra de progreso
        const barraProgreso = toast.querySelector('.toast-progreso');
        barraProgreso.style.animationDuration = `${this.duracion}ms`;

        // Programa la destrucción automática de tu toast
        setTimeout(() => {
            this.destruir(toast);
        }, this.duracion);
    }

    obtenerIcono() {
        // Elige el ícono que mejor se adapte al tipo de notificación que seleccionaste
        switch (this.tipo) {
            case 'success': return '✓';
            case 'error': return '✗';
            case 'warning': return '⚠';
            default: return 'ℹ';
        }
    }

    destruir(toast) {
        // Agrega una clase para activar tu animación de salida
        toast.classList.add('toast-saliendo');

        // Espera a que termine la animación para remover el elemento del DOM
        toast.addEventListener('animationend', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }
}

/**
 * Crea una ventana modal emergente e interactiva en tu página.
 */
class CustomModal {
    constructor(opciones = {}) {
        // Inicializa tus variables de configuración
        this.titulo = opciones.titulo || "Título de tu Modal";
        this.contenido = opciones.contenido || "<p>Agrega aquí tu contenido personalizado.</p>";
        this.colorTema = opciones.colorTema || "#023E7D"; // Color de la cabecera
        this.claseExtra = opciones.claseExtra || ""; // Clase CSS adicional para personalizar tu modal
        this.alCerrar = opciones.alCerrar || null; // Callback opcional al cerrar

        console.log(`[CustomModal] Inicializando modal con título: '${this.titulo}' y tema: '${this.colorTema}'`);

        // Genera la interfaz de tu modal
        this.inicializar();
    }

    inicializar() {
        // Crea el fondo oscuro para tu modal y aplica tu clase extra
        this.backdrop = document.createElement('div');
        this.backdrop.className = `modal-custom-backdrop ${this.claseExtra}`;

        // Diseña el contenedor principal de tu modal
        this.backdrop.innerHTML = `
            <div class="modal-custom-contenedor" style="border-top: 5px solid ${this.colorTema}">
                <div class="modal-custom-cabecera">
                    <h3>${this.titulo}</h3>
                    <button class="modal-custom-cerrar">&times;</button>
                </div>
                <div class="modal-custom-cuerpo">
                    ${this.contenido}
                </div>
                <div class="modal-custom-pie">
                    <button class="modal-custom-btn-cerrar">Cerrar</button>
                </div>
            </div>
        `;

        // Agrega tu modal al final del cuerpo del documento
        document.body.appendChild(this.backdrop);

        // Previene el scroll en tu página trasera mientras el modal esté activo
        document.body.style.overflow = 'hidden';

        // Escucha los eventos para cerrar tu modal
        this.backdrop.querySelector('.modal-custom-cerrar').addEventListener('click', () => this.cerrar());
        this.backdrop.querySelector('.modal-custom-btn-cerrar').addEventListener('click', () => this.cerrar());

        // Cierra tu modal si haces clic en el fondo translúcido
        this.backdrop.addEventListener('click', (e) => {
            if (e.target === this.backdrop) {
                this.cerrar();
            }
        });

        // Cierra tu modal al presionar la tecla Escape en tu teclado
        this.teclaEscapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.cerrar();
            }
        };
        document.addEventListener('keydown', this.teclaEscapeHandler);
    }

    cerrar() {
        // Activa la clase para tu animación de cierre
        this.backdrop.classList.add('modal-custom-cerrando');

        // Espera a que la animación termine antes de destruirlo del todo
        this.backdrop.addEventListener('animationend', () => {
            if (this.backdrop.parentNode) {
                this.backdrop.parentNode.removeChild(this.backdrop);
            }
            // Restaura el scroll de tu página principal
            document.body.style.overflow = '';

            // Remueve el event listener global de tu teclado
            document.removeEventListener('keydown', this.teclaEscapeHandler);

            // Si definiste una función callback al cerrar, ejecútala ahora
            if (typeof this.alCerrar === 'function') {
                this.alCerrar();
            }
        });
    }
}

/**
 * Crea un menú desplegable interactivo (Dropdown) en tu página.
 */
class CustomDropdown {
    constructor(opciones = {}) {
        // Inicializa tus opciones para el selector y elementos del menú
        this.botonId = opciones.botonId;
        this.items = opciones.items || [];
        this.claseExtra = opciones.claseExtra || ""; // Clase CSS adicional para personalizar tu menú

        console.log(`[CustomDropdown] Inicializando menú desplegable en el botón ID: '${this.botonId}' con ${this.items.length} opciones.`);

        // Ejecuta la inicialización de tu dropdown
        this.inicializar();
    }

    inicializar() {
        const boton = document.getElementById(this.botonId);
        if (!boton) return;

        // Crea el menú desplegable en el DOM aplicando tu clase extra
        const menu = document.createElement('div');
        menu.className = `dropdown-menu-custom ${this.claseExtra}`;

        // Añade cada una de tus opciones al menú
        this.items.forEach(item => {
            const enlace = document.createElement('a');
            enlace.textContent = item.texto;
            enlace.href = '#';
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                // Ejecuta la acción que definiste para esta opción
                if (typeof item.accion === 'function') {
                    item.accion();
                }
                menu.classList.remove('mostrar');
            });
            menu.appendChild(enlace);
        });

        // Inserta tu menú justo después del botón disparador
        boton.parentNode.appendChild(menu);

        // Controla la apertura de tu menú al presionar el botón
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('mostrar');
        });

        // Cierra tu menú si haces clic fuera de él
        document.addEventListener('click', () => {
            menu.classList.remove('mostrar');
        });
    }
}

/**
 * Crea y controla tooltips emergentes en tu página para dar información al usuario.
 */
class CustomTooltip {
    constructor(opciones = {}) {
        // Selecciona tus elementos por medio de un atributo data
        this.selector = opciones.selector || '[data-tooltip]';

        console.log(`[CustomTooltip] Inicializando escuchas globales para atributos '${this.selector}'.`);

        // Comienza a escuchar tus eventos de hover
        this.inicializar();
    }

    inicializar() {
        const elementos = document.querySelectorAll(this.selector);
        elementos.forEach(elemento => {
            // Escucha cuando tu cursor entra al elemento
            elemento.addEventListener('mouseenter', () => {
                const texto = elemento.getAttribute('data-tooltip') || 'Tooltip';

                // Genera tu tooltip dinámicamente y aplica tu tema si lo definiste
                const tooltip = document.createElement('div');
                const tema = elemento.getAttribute('data-tooltip-theme') || '';
                tooltip.className = `tooltip-custom ${tema}`;
                tooltip.textContent = texto;
                document.body.appendChild(tooltip);

                // Obtén la posición de tu elemento para centrar tu tooltip
                const rect = elemento.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8 + window.scrollY}px`;

                // Guarda la referencia en tu elemento para poder removerlo después
                elemento._tooltipReferencia = tooltip;
            });

            // Escucha cuando tu cursor sale del elemento
            elemento.addEventListener('mouseleave', () => {
                if (elemento._tooltipReferencia) {
                    elemento._tooltipReferencia.remove();
                    elemento._tooltipReferencia = null;
                }
            });
        });
    }
}
