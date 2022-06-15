import { formCars, formCovid, formTitanic } from "./modules/formModel.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  const $selectDepartamento = d.getElementById("departamento");
  const $selectProvincia = d.getElementById("provincia");
  const $selectDistrito = d.getElementById("distrito");

  let departamentoNombre = "";

  const departamentos = [
    "",
    "Amazonas",
    "Ancash",
    "Apurimac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cuzco",
    "Huancavelica",
    "Huanuco",
    "Ica",
    "Junin",
    "La Libertad",
    "Lambayeque",
    "Lima Metropolitana",
    "Lima",
    "Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martin",
    "Tacna",
    "Tumbes",
    "Ucayali",
  ];

  $selectDepartamento.innerHTML = departamentos.map((dep) => {
    if (dep == "") return '<option value="" hidden></option>';
    return `<option value="${dep.toUpperCase()}">${dep}</option>`;
  });

  $selectProvincia.disabled = true;
  $selectDistrito.disabled = true;

  $selectDepartamento.addEventListener("change", (e) => {
    departamentoNombre = e.target.value;
    let url = `http://localhost:3000/peru/departamento/${departamentoNombre
      .toLowerCase()
      .split(" ")
      .join("&")}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        const provincias = body;
        $selectProvincia.disabled = false;
        $selectProvincia.innerHTML = provincias.map((pro) => {
          if (pro.nombre == "") return '<option value="" hidden></option>';
          return `<option value="${pro.nombre.toUpperCase()}">${
            pro.nombre
          }</option>`;
        });
      });
  });

  $selectProvincia.addEventListener("change", (e) => {
    let url = `http://localhost:3000/peru/provincia/${e.target.value
      .toLowerCase()
      .split(" ")
      .join("&")}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departamento: departamentoNombre,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        const distritos = body;
        $selectDistrito.disabled = false;
        $selectDistrito.innerHTML = distritos.map((dis) => {
          if (dis.nombre == "") return '<option value="" hidden></option>';
          return `<option value="${dis.nombre.toUpperCase()}">${
            dis.nombre
          }</option>`;
        });
      });
  });
});

// Send the dato to the API Machine Learning
d.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.id);
  if (e.target.id === "titanicForm") formTitanic(e.target);
  else if (e.target.id === "carsForm") formCars(e.target);
  else if (e.target.id === "covidForm") formCovid(e.targt);
});

// Close the Modal
d.addEventListener("click", (e) => {
  if (
    e.target.matches("#btnCloseModal") ||
    e.target.matches("#btnCloseModal *")
  ) {
    const $modal = e.target.parentElement.parentElement;

    // Close the modal
    $modal.style.transform = "translate(-100%, 0)";
    $modal.style.transition = "transform 0.8s ease";
  }
});
