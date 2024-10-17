// Definición de la clase Persona para almacenar los datos del solicitante
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

// Variables para el cálculo de préstamo
const TASAINTERES_ANUAL = 50;
const PLAZO_MESES = [12, 18, 24];
let historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos')) || [];
let prestamoEditadoIndex = null; // Índice del préstamo que se está editando

// Función para calcular la tasa de interés mensual
const calcularInteresMensual = (tasaAnual) => {
    return tasaAnual / 12;
};

// Función para calcular la cuota mensual según el monto, la tasa y el plazo
export const calcularCuotaMensual = (monto, tasaMensual, plazo) => {
    return (monto * tasaMensual / 100) / plazo;
};

// Función para mostrar las opciones de cuotas en el DOM
export const mostrarOpcionesCuotas = (plazos, monto, tasaMensual) => {
    return plazos.map(plazo => {
        const cuota = calcularCuotaMensual(monto, tasaMensual, plazo);
        return `<div>
                    <p>En ${plazo} meses, el valor de la cuota es de $${cuota.toFixed(2)}</p>
                    <button class="elegir-cuota" data-cuota="${cuota}" data-plazo="${plazo}">Elegir esta opción</button>
                </div>`;
    }).join('');
};

// Función para mostrar el historial de préstamos en el DOM
const mostrarHistorial = () => {
    const historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = historialPrestamos.map((prestamo, index) => `
        <div>
            <p>Préstamo de $${prestamo.montoPrestamo} en ${prestamo.plazo} meses, cuota mensual de $${prestamo.cuota.toFixed(2)}</p>
            <button class="editar-prestamo" data-index="${index}">Editar</button>
            <button class="eliminar-prestamo" data-index="${index}">Eliminar</button>
        </div>
    `).join('');
};

// Función para generar el comprobante de préstamo
export const generarComprobante = (persona, monto, plazo, cuota) => {
    const detalleDiv = document.getElementById('detallePrestamo');
    detalleDiv.innerHTML = `
        <h3>Comprobante de Préstamo</h3>
        <p>Solicitante: ${persona.nombre}</p>
        <p>Edad: ${persona.edad}</p>
        <p>Monto del Préstamo: $${monto}</p>
        <p>Plazo: ${plazo} meses</p>
        <p>Cuota Mensual: $${cuota.toFixed(2)}</p>
    `;
};

// Evento para calcular el préstamo
document.getElementById('calcular').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const sueldoNetoFamiliar = parseFloat(document.getElementById('sueldo').value);
    const montoPrestamo = parseInt(document.getElementById('montoPrestamo').value) || 10000000; // Valor predeterminado

    // Validación básica
    if (!nombre || !edad || !sueldoNetoFamiliar || sueldoNetoFamiliar < 2000000) {
        document.getElementById('resultado').innerHTML = "<p>Por favor verifique sus datos o no cumple con el sueldo requerido.</p>";
        return;
    }

    // Crear una instancia de Persona
    const persona = new Persona(nombre, edad);
    persona.saludar();

    // Cálculo de la tasa de interés mensual
    const tasaInteresMensual = calcularInteresMensual(TASAINTERES_ANUAL);

    // Mostrar resultados en el DOM
    let resultadoHTML = `<p>Bienvenido ${persona.nombre}, puede acceder a un préstamo de $${montoPrestamo}.</p>`;
    resultadoHTML += `<p>La tasa de interés mensual es de ${tasaInteresMensual.toFixed(2)}%.</p>`;
    resultadoHTML += mostrarOpcionesCuotas(PLAZO_MESES, montoPrestamo, tasaInteresMensual);
    document.getElementById('resultado').innerHTML = resultadoHTML;
});

// Evento para seleccionar una opción de cuota y mostrar el botón de confirmación
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('elegir-cuota')) {
        const cuota = parseFloat(event.target.dataset.cuota);
        const plazo = parseInt(event.target.dataset.plazo);
        const montoPrestamo = parseInt(document.getElementById('montoPrestamo').value) || 10000000; // Valor predeterminado
        const nombre = document.getElementById('nombre').value;
        const edad = parseInt(document.getElementById('edad').value);
        const persona = new Persona(nombre, edad);

        // Mostrar botón de confirmar préstamo
        document.getElementById('detallePrestamo').innerHTML = `
            <p>Usted ha seleccionado la opción de ${plazo} meses con una cuota de $${cuota.toFixed(2)}. ¿Desea confirmar el préstamo?</p>
            <button id="confirmar-prestamo">Confirmar Préstamo</button>
        `;

        // Guardar detalles en una variable temporal para confirmación
        const prestamoTemporal = { persona, montoPrestamo, plazo, cuota };

        // Evento para confirmar el préstamo
        document.getElementById('confirmar-prestamo').addEventListener('click', () => {
            // Generar comprobante y guardar en el historial
            generarComprobante(persona, montoPrestamo, plazo, cuota);
            
            if (prestamoEditadoIndex !== null) {
                // Si se está editando un préstamo existente, actualizar el historial
                historialPrestamos[prestamoEditadoIndex] = { nombre: persona.nombre, edad: persona.edad, montoPrestamo, plazo, cuota };
                prestamoEditadoIndex = null;
            } else {
                // Si no se está editando, agregar uno nuevo
                historialPrestamos.push({ nombre: persona.nombre, edad: persona.edad, montoPrestamo, plazo, cuota });
            }
            
            localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
            mostrarHistorial();
        });
    }
});

// Evento para eliminar un registro del historial
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar-prestamo')) {
        const index = parseInt(event.target.dataset.index);
        historialPrestamos.splice(index, 1);
        localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
        mostrarHistorial();
    }
});

// Evento para editar un registro del historial
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('editar-prestamo')) {
        const index = parseInt(event.target.dataset.index);
        const prestamo = historialPrestamos[index];

        // Mostrar los datos del préstamo en los campos de entrada
        document.getElementById('nombre').value = prestamo.nombre;
        document.getElementById('edad').value = prestamo.edad;
        document.getElementById('montoPrestamo').value = prestamo.montoPrestamo;

        // Guardar el índice del préstamo que se está editando
        prestamoEditadoIndex = index;
    }
});

// Evento para vaciar el historial
document.getElementById('vaciar-historial').addEventListener('click', () => {
    historialPrestamos = [];
    localStorage.removeItem('historialPrestamos');
    mostrarHistorial();
});

// Evento para resetear el formulario y el resultado
document.getElementById('resetear').addEventListener('click', () => {
    document.getElementById('formulario-prestamo').reset();
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('detallePrestamo').innerHTML = '';
    prestamoEditadoIndex = null; // Restablecer el índice de edición
});

// Mostrar historial al cargar la página
document.addEventListener('DOMContentLoaded', mostrarHistorial);

const cargarHistorial = async () => {
    const response = await fetch("historialPrestamos.json");
    historialPrestamos = await response.json();
    mostrarHistorial();
};

document.addEventListener('DOMContentLoaded', cargarHistorial);