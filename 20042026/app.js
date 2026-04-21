// variables globales
// arreglo donde se almacenan los usuarios registrados
let usuarios = [];
// obtener referencia del DOM a los elementos del HTML principales
const form = document.getElementById('forrmUsuario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const BtnDescargar = document.getElementById('descargarBtn');
function generarID(){

}
form.addEventListener('submit', 
    function(e) {
        e.preventDefault();
        const nuevoUsuario = {
            id: generarID(),
            nombre: inputNombre.value,
            email: inputEmail.value
        };
        usuarios.push(nuevoUsuario);
        mostrarUsuarios();
        form.reset();
    });
    // Funciones de visualizacion
    // mostrar todos los usuarios en la tabla
    // recorrer cada usuario dentro del Array y crear una fila en la tabla con sus
    // crear la fila con los datos para la edicion y eliminacion de cada usuario
    // agrgar botn para eliminar el usuario y asignar evento para
    function mostrarUsuarios() {
        tabla.innerHTML = '';
        usuarios.forEach((usuario, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td contenteditable onblur="editarCampo(${index}, 'nombre', this.innerText)">${usuario.nombre}</td>
                <td contenteditable onblur="editarCampo(${index}, 'email', this.innerText)">${usuario.email}</td>
                <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
            `;
            tabla.appendChild(row);
        });
    }

    // funcion de edicion
    function editarCampo(index, campo, valor) {
        usuarios[index][campo] = valor.trim(); //actualizar el campo editado en el array
    }
    // funcion de eliminacion
    function eliminarUsuario(index) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }
    // evento de importacion JSON
    inputArchivo.addEventListener('change', function(e) {
        const archivo = e.target.files[0];
        const lector = new FileReader();
        lector.onload = function(event) {
            const contenido = event.target.result;
            try {
                const datos = JSON.parse(contenido); // parsear el contenido del archivo JSON
                // validar que sea un arreglo
                if (Array.isArray(datos)) {
                    usuarios = datos;
                    mostrarUsuarios();
                } else {
                    console.error('El JSON no es un arreglo válido');
                }
            } catch (error) {
                console.error('Error al parsear JSON:', error);
            }
        };
        lector.readAsText(archivo); // leer el contenido del archivo como texto
    });