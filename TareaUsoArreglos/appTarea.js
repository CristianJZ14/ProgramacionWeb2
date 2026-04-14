const inputNumero = document.querySelector('#numeroFilas');
const botonGenerar = document.querySelector('#btnGenerar');
const lista = document.querySelector('#listaDinamica');

botonGenerar.addEventListener('click', () => {
    lista.innerHTML = '';
    
    let cantidad = parseInt(inputNumero.value);

    if (!isNaN(cantidad) && cantidad > 0) {
        for (let i = 1; i <= cantidad; i++) {
            const nuevoLi = document.createElement('li');
            nuevoLi.textContent = 'Fila generada número ' + i;
            lista.appendChild(nuevoLi);
        }
    } else {
        alert('Por favor, ingresa un número valido mayor a 0');
    }
});