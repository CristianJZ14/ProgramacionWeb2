function saludar(){
    console.log("Hola mundo");
}

saludar();

function saludo (nombre){
    console.log("Hola como estas "+nombre);
}
saludo("Cristian");

function sumar(n1, n2){
    return n1+n2;
}
let numero1 = parseInt(prompt("Ingresa numero 1"));
let numero2 = parseInt(prompt("Ingresa numero 2"));

console.log("El resultado es: "+ sumar(numero1,numero2));

console.log(sumar(8, 9));