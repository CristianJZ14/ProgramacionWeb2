//OPERADOR SWITCH
let opci = prompt(`
    Elija un dia de la semana:
    1. Lunes
    2. Martes
    3. Miercoles
    4. Jueves
    5. Viernes
    6. Sabado 
    7. Domingo
    `);

switch(opci){
    case "1":
        console.log("Has elegido la opcion 1: Lunes");
        break;
    case "2":
        console.log("Has elegido la opcion 2: Martes");
        break;
    case "3":
        console.log("Has elegido la opcion 3: Miercoles");
        break;
    case "4":
        console.log("Has elegido la opcion 4: Jueves");
        break;
    case "5":
        console.log("Has elegido la opcion 5: Viernes");
        break;                 
    case "6":
        console.log("Has elegido la opcion 6: Sabado");
        break;
    case "7":
        console.log("Has elegido la opcion 7: Domingo");
        break;             
    default:
        console.log("Opcion no valida");
        break;
}