//E J E R C I C I O                    ADIVINAR UN NUMERO ENTRE EL 1 Y EL 10, EL USUARIO TIENE
// 3 OPORTUNIDADES PARA ADIVINARLO, SI LO ADIVINA SE LE DICE QUE GANO, SI NO LO ADIVINA SE LE DICE QUE PERDIO
// MI VERSION
let numeroEntrada;
let numeroSecreto = Math.floor(Math.random() * 10) + 1;
//Math.random() genera un numero decimal entre 0 y 1, al multiplicarlo por 10 obtenemos un numero entre 0 y 10,
//y al sumarle 1 obtenemos un numero entre 1 y 10. Math.floor() redondea hacia abajo el numero generado.
let oportunidades = 3;

while(oportunidades > 0){
    numeroEntrada = parseInt(prompt("Adivina un numero entre el 1 y el 10"));

    console.log("El numero ingresado es: " + numeroEntrada);
    if(numeroEntrada === numeroSecreto){
        console.log("Ganaste");
        break;
    } else {
        oportunidades--;
        console.log("Numero incorrecto. Te quedan " + oportunidades + " oportunidades.");
    }
}

if(oportunidades === 0){
    console.log("Perdiste, el numero secreto era: " + numeroSecreto);
} else {
    console.log("Felicidades, has adivinado el numero secreto: " + numeroSecreto);
}


//VERSION DEL PROFE
console.log("---------------------------------")
console.log("       VERSION DEL PROFE")
console.log("---------------------------------")
let numeroMaquina = Math.floor(Math.random()*(10 - 1) + 1);
let numeroUser = parseInt(prompt("Ingresa un numero entre el 1 y el 10"));

let vidas = 3;

while(numeroUser !== numeroMaquina && vidas > 1){
    vidas--;
    numeroUser = parseInt(prompt("Intenta nuevamente"))
}

if(numeroUser === numeroMaquina){
    console.log("Ganaste");
} else {
    console.log("Perdiste, el numero secreto era: " + numeroMaquina);
}