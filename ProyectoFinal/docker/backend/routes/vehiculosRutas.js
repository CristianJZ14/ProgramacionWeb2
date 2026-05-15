const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  res.json([
    {
      id: 1,
      unidad: "BT-001",
      estado: "Activo"
    }
  ]);

});

module.exports = router;