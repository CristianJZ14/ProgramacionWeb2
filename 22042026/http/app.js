// Importar el modulo http que viene con node
const http = require('http');
// definir el puerto en el que se ejecutara el servidor
const PORT = 3009;
// Crear el servidor
const server = http.createServer((req, res) => {
// Configurar la respuesta
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hola Mundo!');
});
// Escuchar al servidor en el puerto definido
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});