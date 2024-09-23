// Al hacer clic en "Calcular", se ejecuta el cálculo de préstamo
document.getElementById('calcular').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const sueldoNetoFamiliar = document.getElementById('sueldo').value;
  const montoPrestamo = parseInt(document.getElementById('montoPrestamo').value) || 10000000;  // Valor predeterminado si está vacío

  // Validación básica
  if (!nombre || !edad || !sueldoNetoFamiliar || sueldoNetoFamiliar < 2000000) {
      document.getElementById('resultado').innerHTML = "<p>Por favor verifique sus datos o no cumple con el sueldo requerido.</p>";
      return;
  }

  const persona = new Persona(nombre, edad);
  persona.saludar();

  const TASAINTERES_ANUAL = 50;
    const MONTO_PRESTAMO = 10000000;
    const PLAZO_MESES = [12, 18, 24];

  // Cálculo de la tasa de interés mensual
  const tasaInteresMensual = calcularInteresMensual(TASAINTERES_ANUAL);


  // Mostrar resultados en el DOM
  let resultadoHTML = `<p>Bienvenido ${persona.nombre}, puede acceder a un préstamo de $${montoPrestamo}.</p>`;
  resultadoHTML += `<p>La tasa de interés mensual es de ${tasaInteresMensual.toFixed(2)}%.</p>`;
  
  // Calcular cuotas según el monto ingresado
  resultadoHTML += mostrarOpcionesCuotas(PLAZO_MESES, montoPrestamo, tasaInteresMensual);
  document.getElementById('resultado').innerHTML = resultadoHTML;
});

// Función para mostrar las cuotas según el monto y el plazo
const mostrarOpcionesCuotas = (plazos, monto, tasaMensual) => {
  return plazos.map(plazo => {
      const cuota = calcularCuotaMensual(monto, tasaMensual, plazo);
      return `<p>En ${plazo} meses, el valor de la cuota es de $${cuota.toFixed(2)}</p>`;
  }).join('');
};

// Función para calcular la tasa de interés mensual
const calcularInteresMensual = (tasaAnual) => {
  return tasaAnual / 12;
};

// Función para calcular la cuota mensual
const calcularCuotaMensual = (monto, tasaMensual, plazo) => {
  return (monto * tasaMensual / 100) / plazo;
};
 
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  
  this.saludar = function () {
      console.log("Hola Soy", this.nombre);
  }
}

document.getElementById('resetear').addEventListener('click', () => {
  // Limpiar inputs
  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('sueldo').value = '';
  document.getElementById('montoPrestamo').value = '';

  // Limpiar resultados
  document.getElementById('resultado').innerHTML = '';
  // Limpiar localStorage
  localStorage.clear();
});