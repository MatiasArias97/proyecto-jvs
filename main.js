document.getElementById('calcular').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const sueldoNetoFamiliar = document.getElementById('sueldo').value;

  if (!nombre || !edad || !sueldoNetoFamiliar || sueldoNetoFamiliar < 2000000) {
      document.getElementById('resultado').innerHTML = 
          "<p>Por favor verifique sus datos o no cumple con el sueldo requerido.</p>";
      return;
  }

  const persona = new Persona(nombre, edad);
  persona.saludar();

  const calcularInteresMensual = tasaAnual => tasaAnual / 12;
  const calcularMontoTotal = (monto, tasaAnual) => monto * (1 + tasaAnual / 100);
  const calcularCuotaMensual = (monto, tasaMensual, plazo) => (monto * tasaMensual / 100) / plazo;

  const TASAINTERES_ANUAL = 25;
  const MONTO_PRESTAMO = 10000000;
  const PLAZO_MESES = [12, 18, 24];

  const tasaInteresMensual = calcularInteresMensual(TASAINTERES_ANUAL);
  const montoTotal = calcularMontoTotal(MONTO_PRESTAMO, TASAINTERES_ANUAL);

  let resultadoHTML = `<p>Bienvenido ${persona.nombre}, puede acceder a un préstamo de $${MONTO_PRESTAMO}.</p>`;
  resultadoHTML += `<p>La tasa de interés mensual es de ${tasaInteresMensual}%.</p>`;
  resultadoHTML += `<p>El monto total a devolver es de $${montoTotal.toFixed(2)}.</p>`;

  PLAZO_MESES.forEach(plazo => {
      const cuota = calcularCuotaMensual(MONTO_PRESTAMO, tasaInteresMensual, plazo);
      resultadoHTML += `<p>En ${plazo} meses, el valor de la cuota es de $${cuota.toFixed(2)}</p>`;
  });

  document.getElementById('resultado').innerHTML = resultadoHTML;
});

function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  
  this.saludar = function () {
      console.log("Hola Soy", this.nombre);
  }
}