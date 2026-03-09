let nombreUsuario ="Cristian";
let estado = true;

if(estado){
    console.log(`Ganaste: ${nombreUsuario}`);
}else{
    console.log(`Perdiste: ${nombreUsuario}`);
}

console.log(`
    ${estado ? 'Ganaste: ' : 'Perdiste:' } ${nombreUsuario}
    `);