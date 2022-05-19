const $formTitanic = document.getElementById("titanicForm");
const $formCars = document.getElementById("carsForm");
const server = "http://localhost:3000/titanic";

const renderDataSurvived = (data) => {
  const $rowResult = document.getElementById("tr-titanic");
  const $imgState = document.getElementById("imageState");

  $rowResult.innerHTML = "";

  for (let key in data) {
    console.log(data[key]);
    $rowResult.innerHTML += `<td>${data[key]}</td>`;
  }

  data.scoreProbability > 0.5
    ? ($imgState.src = "../images/survived.png")
    : ($imgState.src = "../images/dead.png");
};

if (document.getElementById("titanicForm") != null) {
  $formTitanic.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData($formTitanic);
    const data = Object.fromEntries(formData);

    // Fetching the data of the form with the method POST
    fetch("http://localhost:3000/titanic", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        renderDataSurvived(data);
      });
  });
}

if (document.getElementById("carsForm") != null) {
  $formCars.addEventListener("submit", (e) => {
    e.preventDefault();
    e.preventDefault();
    const formData = new FormData($formCars);
    const data = Object.fromEntries(formData);

    console.log(data);

    fetch("http://localhost:3000/cars", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}
