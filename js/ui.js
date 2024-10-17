// Importar las funciones necesarias desde app.js
import { calcularCuotaMensual, generarComprobante,} from "./app.js";

// Función para mostrar las opciones de cuotas en el DOM
export function mostrarOpcionesCuotas(plazos, monto, tasaMensual, nombre) {
    const opcionesHTML = plazos.map(plazo => {
        const cuota = calcularCuotaMensual(monto, tasaMensual, plazo);
        return `
            <div>
                <p>En ${plazo} meses, la cuota es de $${cuota.toFixed(2)}</p>
                <button class="confirmar" data-plazo="${plazo}" data-cuota="${cuota}">Confirmar Préstamo</button>
            </div>
        `;
    }).join('');

    const resultado = document.getElementById('resultado');
    resultado.innerHTML += opcionesHTML; // Agregar las opciones al DOM

    // Agregar evento para los botones de confirmación
    resultado.querySelectorAll('.confirmar').forEach(button => {
        button.addEventListener('click', () => {
            const cuotaSeleccionada = parseFloat(button.dataset.cuota);
            const plazoSeleccionado = parseInt(button.dataset.plazo);
            generarComprobante(new Persona(nombre), monto, plazoSeleccionado, cuotaSeleccionada);
        });
    });
}

// Función para mostrar un mensaje en el DOM
export function mostrarMensaje(mensaje) {
    document.getElementById('resultado').innerHTML = mensaje;
}

// Función para manejar el evento de calcular préstamo
export function agregarListenerCalcular() {
    document.getElementById('calcular').addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const edad = parseInt(document.getElementById('edad').value);
        const sueldoNetoFamiliar = parseFloat(document.getElementById('sueldo').value);
        const montoPrestamo = parseInt(document.getElementById('montoPrestamo').value);  // Validaciones usando Validator.js
        if (!validator.isAlpha(nombre.replace(/\s/g, ''))) {
            mostrarMensaje("<p>El nombre debe contener solo letras.</p>");
            return;
        }
    
        if (!validator.isInt(edad, { min: 18, max: 100 })) {
            mostrarMensaje("<p>La edad debe ser un número entre 18 y 100.</p>");
            return;
        }
    
        if (!validator.isFloat(sueldoNetoFamiliar, { min: 2000000 })) {
            mostrarMensaje("<p>El sueldo neto familiar debe ser mayor a 2.000.000.</p>");
            return;
        }
    
        if (!validator.isInt(montoPrestamo, { min: 1 })) {
            mostrarMensaje("<p>El monto del préstamo debe ser un número positivo.</p>");
            return;
        }
    
        // Si pasa las validaciones, continuar con los cálculos
        const tasaInteresMensual = calcularInteresMensual(TASAINTERES_ANUAL);
        let resultadoHTML = `<p>Bienvenido ${nombre}, puede acceder a un préstamo de $${montoPrestamo}.</p>`;
        resultadoHTML += `<p>La tasa de interés mensual es de ${tasaInteresMensual.toFixed(2)}%.</p>`;
        mostrarOpcionesCuotas(PLAZO_MESES, montoPrestamo, tasaInteresMensual, nombre);
    });
        // Cálculo de la tasa de interés mensual
        const tasaInteresMensual = calcularInteresMensual(TASAINTERES_ANUAL);
}

