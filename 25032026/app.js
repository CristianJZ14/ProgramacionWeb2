// definir el arreglo
let tareas=[];
// funcion para mostrar el menu
function mostrarMenu(){
    return parseInt(prompt(`
        Opciones disponibles
        1.- Agregar una tarea
        2.- Ver todas las tareas
        3.- Marcar tarea como completada
        4.- Salir
        "Elige la mejor opcion:"
        `));
        
}
function agregarTarea(){
    let nombre = prompt("Ingrese el nombre de la tarea: \n");
    if(nombre){
        let tarea = {
            nombre: nombre,
            completada: false
        }
        tareas.push(tarea);
    }else{
        alert("El nombre de la tarea no puede estar vacío.");
    }
}
function verTarea(){
if(tareas.length === 0){
    alert("listas de tareas vacios");
}else{
    let mensaje = "Lista de tareas \n";
    tareas.forEach((tarea, index) => {
        mensaje += `${index + 1}.- ${tarea.nombre} [${tarea.completada ? "Completada" : "Pendiente"}]\n`;
    });
    alert(mensaje);
}


}

function marcarTareaCompletada(){
    let numero = parseInt(prompt("Ingrese el número de la tarea que desea marcar como completada:"));
    if(numero > 0 && numero <= tareas.length){
        tareas[numero - 1].completada = true;
        alert(`Tarea: "${tareas[numero - 1].nombre}" ha sido marcada como completada.`);
    }else{
        alert("Número de tarea no válido.");
    }
}

// funcion de inicio para el flujo de nuestro programa

function iniciarPrograma(){

    let bandera = true;
    while(bandera){
        let opcion = mostrarMenu();
        switch(opcion){
            case 1:
                agregarTarea();
                break;
            case 2:
                verTarea();
                console.log(tareas);
                break;
            case 3:
                marcarTareaCompletada();
                console.log(tareas);
                break;
            case 4:
                bandera = false;
                alert("Saliendo");
                break;
            default:
                alert("Opción no válida, intenta de nuevo.");
        }

    }

}

iniciarPrograma();

// poner cantidad o contador a cada prenda de ropa, a traves de esta logica que cambie el estado para que ya no pueda comprar, que ya no hay