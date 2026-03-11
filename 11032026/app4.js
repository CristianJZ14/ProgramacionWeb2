// funciones declarativas

function numeroAleatorio(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

console.log(numeroAleatorio(1, 15));

// Funciones expresadas

const miNumero = function(min,max){
     return Math.flo
     or(Math.random()*(max-min))+min;

}
console.log(miNumero(20,36));