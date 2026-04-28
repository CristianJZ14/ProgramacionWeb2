// traer el modulo de express 
const express = require('express');
//
// crear una instancia de express
const app = express();
// puerto para el servidor
const port = 3010;  
// configurar el servidor para recibir datos en texto plano
app.get('/', (req, res) => {
    res.send('Hola Mundo desde el servidor');
    //mandar un archivo HTML al cliente
    res.sendFile(path.join(__dirname, 'index.html'));
});
// iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
