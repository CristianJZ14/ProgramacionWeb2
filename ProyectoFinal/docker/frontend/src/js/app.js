const app = document.getElementById("app");

async function obtenerVehiculos() {

  try {

    const response = await fetch("http://localhost:5050/vehiculos");

    const vehiculos = await response.json();

    renderVehiculos(vehiculos);

  } catch (error) {

    console.error("Error:", error);

  }

}

function renderVehiculos(vehiculos) {

  app.innerHTML = "";

  vehiculos.forEach(v => {

    app.innerHTML += `
      <div class="card">

        <h2>${v.unidad}</h2>

        <p>Estado: ${v.estado}</p>

      </div>
    `;

  });

}

obtenerVehiculos();