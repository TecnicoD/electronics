/**
 * Configuración Principal
 */
const WHATSAPP_NUMBER = "5491168304104"; // Reemplazar con el número real (incluir código de país sin '+')
const PLACEHOLDER_IMAGE = "https://placehold.co/600x600/1e293b/f8fafc?text=Imagen+No+Disponible";

/**
 * Base de Datos de Productos (Mock)
 * Para agregar un nuevo producto, simplemente añade un objeto a este array.
 */
const productos = [
    {
        id: 1,
        nombre: "Reloj digital 1",
        imagen: "images/reloj1.jpeg"
        //"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        nombre: "Auriculares Inalámbricos Pro",
        imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        nombre: "Mochilas",
        imagen: "images/mochila.jpeg"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        nombre: "Reloj digital 3",
        imagen: "images/reloj2.jpeg"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        nombre: "Micros",
        imagen: "images/micro.jpeg"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        nombre: "Libros",
        imagen: "images/libros.jpeg"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 7,
        nombre: "apoya celulares",
        imagen: "images/apoyacel.jpeg"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 8,
       nombre: "Clases privadas de programacion",
        imagen: "images/clase.png"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    },
    {
       id: 9,
        nombre: "cursos en vivo de programacion",
        imagen: "images/vivo.png"
        //"https://images.unsplash.com/photo-1542037104-5fb4bf6e9eba?q=80&w=600&auto=format&fit=crop"
    }

];

// Estado de la aplicación
let currentIndex = 0;

// Elementos del DOM
const productDisplay = document.getElementById('product-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicatorsContainer = document.getElementById('indicators');

/**
 * Inicializa la aplicación
 */
function initApp() {
    createIndicators();
    renderProduct(currentIndex);
    setupEventListeners();
}

/**
 * Construye dinámicamente el HTML para el producto actual
 */
function renderProduct(index) {
    const product = productos[index];

    // Si no hay imagen, usar el placeholder
    const imageUrl = product.imagen && product.imagen.trim() !== "" ? product.imagen : PLACEHOLDER_IMAGE;

    // Codificar mensaje para WhatsApp
    const rawMessage = `Hola, vi el producto ${product.nombre} en tu página.`;
    const encodedMessage = encodeURIComponent(rawMessage);

    // Determinar URL de WhatsApp (detecta si es móvil o web)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappBaseUrl = isMobile ? 'https://wa.me/' : 'https://web.whatsapp.com/send?phone=';
    const finalWhatsAppUrl = `${whatsappBaseUrl}${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    // Construir estructura DOM
    productDisplay.innerHTML = `
        <div class="product-image-container">
            <img src="${imageUrl}" alt="${product.nombre}" class="product-image" loading="lazy">
        </div>
        <h1 class="product-name">${product.nombre}</h1>
        <a href="${finalWhatsAppUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
            Consultar Ahora
        </a>
    `;

    // Disparar animación leve
    productDisplay.classList.remove('fade-transition');
    void productDisplay.offsetWidth; // Trigger reflow
    productDisplay.classList.add('fade-transition');

    updateIndicators();
}

/**
 * Navegación Carrusel Infinito
 */
function nextProduct() {
    currentIndex = (currentIndex + 1) % productos.length;
    renderProduct(currentIndex);
}

function prevProduct() {
    currentIndex = (currentIndex - 1 + productos.length) % productos.length;
    renderProduct(currentIndex);
}

/**
 * Indicadores
 */
function createIndicators() {
    indicatorsContainer.innerHTML = '';
    productos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Ver producto ${index + 1}`);
        dot.addEventListener('click', () => {
            currentIndex = index;
            renderProduct(currentIndex);
        });
        indicatorsContainer.appendChild(dot);
    });
}

function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Configurar Eventos
 */
function setupEventListeners() {
    nextBtn.addEventListener('click', nextProduct);
    prevBtn.addEventListener('click', prevProduct);

    // Soporte para teclado (flechas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextProduct();
        if (e.key === 'ArrowLeft') prevProduct();
    });
}

// Iniciar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
