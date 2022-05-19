const $formTitanic = document.getElementById("titanicForm");
const $formCars = document.getElementById("carsForm");

const renderDataSurvived = (data, elem, label) => {
  const $rowResult = document.querySelector(elem);
  const $imgState = document.getElementById("imageState");

  $rowResult.innerHTML = "";

  for (let key in data) {
    if (key == "scoreLabel") {
      data[key] = Number(data[key]).toFixed(2);
    }
    $rowResult.innerHTML += `<td>${data[key]}</td>`;
  }

  if (label == "titanic") {
    data.scoreProbability > 0.5
      ? ($imgState.src = "../images/survived.png")
      : ($imgState.src = "../images/dead.png");
  } else if (label == "cars") {
    Number(data.scoreLabel) > Number(data.price)
      ? ($imgState.src = "../images/increase.png")
      : ($imgState.src = "../images/decrease.png");
  }
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
        renderDataSurvived(data, "#tr-titanic", "titanic");
      });
  });
}

if (document.getElementById("carsForm") != null) {
  $formCars.addEventListener("submit", (e) => {
    e.preventDefault();
    e.preventDefault();
    const formData = new FormData($formCars);
    const data = Object.fromEntries(formData);

    fetch("http://localhost:3000/cars", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        renderDataSurvived(data, "#tr-cars", "cars");
      });
  });
}
