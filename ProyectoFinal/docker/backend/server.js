const express = require("express");
const cors = require("cors");

const vehiculosRoutes = require("./routes/vehiculosRutas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/vehiculos", vehiculosRoutes);

app.get("/", (req, res) => {

  res.json({
    mensaje: "Backend funcionando"
  });

});

app.listen(5000, () => {

  console.log("Servidor ejecutándose en puerto 5000");

});