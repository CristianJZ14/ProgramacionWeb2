var micarro = new Object();
micarro.marca='Adidas';
micarro.modelo='Mamalon';
micarro.anio=2033;

console.log(micarro);

var micarro= {
    marca: 'Adidas',
    modelo: 'Mamalon',
    anio: 2033,
    verificado: 'false',
    emplacado: 'true',
    fechaMultas:["12/05/2015, 13/05/2015"]
}
console.log(micarro);
console.log(micarro.fechaMultas[1]);

micarro.color="Azul";
console.log(micarro.color);
console.log(micarro);

micarro.modelo="Ikon Fiesta";
console.log(micarro);

delete micarro.verificado;
console.log(micarro);



