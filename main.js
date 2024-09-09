const boton = document.getElementById("boton")
console.log (boton)
let tasadeinteres
const tasadeinteresanual = 50;
let plazomeses = [6,12,24];
let comprobar = true;
let montoprestamo = 10000000;
let tasadeinteresmensual = 0
let cuotamensual = 0
let total = 0

  let nombre =  prompt ("Ingresa tu nombre");
  alert ("Bienvenido " + nombre);
  do{
  let sueldonetofamiliar = prompt ("ingrese su sueldo neto familiar, el mismo tiene que ser mayor o igual a 2000000");
  if ((sueldonetofamiliar == "") || (sueldonetofamiliar == null)){
    alert ("por favor verifique sus datos")
  }
  
  if (sueldonetofamiliar >=2000000){
    alert ("puede adquirir el beneficio de un prestamo");
    calculadordeintereses (tasadeinteresanual);
    calculadorcuotamensual (montoprestamo, tasadeinteresmensual);
    dineroadevolver (montoprestamo, tasadeinteresanual);
    let continuar = confirm ("Deseas continuar con el prestamo?");
  break}
    else{
      (sueldonetofamiliar<2000000)
      alert("usted no podra adquirir el beneficio")
      break
    }
}
while(comprobar)


  //* simulador de prestamo

  function dineroadevolver(montoprestamo, tasadeinteresanual){
  total = (montoprestamo * tasadeinteresanual)
  console.log ("el monto a devolver al banco, es de $" +total )
  }
  
  function calculadordeintereses (tasadeinteresanual){
tasadeinteresmensual = (tasadeinteresanual/12);
console.log ("la tasa de interes mensual es de "+tasadeinteresmensual);
  }
  function calculadorcuotamensual (montoprestamo, tasadeinteresmensual) {
    console.log ("cual de estas opciones se adapta a tu bolsillo?")
    for (let i= 0; i<plazomeses.length;i++){
    cuotamensual = (montoprestamo*tasadeinteresmensual) / plazomeses[i];
    console.log ("en " + plazomeses[i] + " cuotas el valor es de $" + cuotamensual);

  }
 }
