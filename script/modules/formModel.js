const renderDataSurvived = (data, elem, label) => {
  const $rowResult = document.querySelector(elem);
  const $imgState = document.getElementById("imageState");
  const $sectionResults =
    document.querySelector(elem).parentElement.parentElement.parentElement
      .parentElement;
  const $paragraphResult = document.querySelector("#paragraphResult");

  $rowResult.innerHTML = "";

  for (let key in data) {
    if (key == "scoreLabel") {
      data[key] = Number(data[key]).toFixed(2);
    }
    $rowResult.innerHTML += `<td>${data[key]}</td>`;
  }

  if (label == "titanic") {
    if (data.scoreProbability > 0.5) {
      $imgState.src = "../images/survived.png";
      $paragraphResult.innerHTML = `Hey 😀, we're happy for you. You will survive the crash of the titanic. You have a <strong>${data.scoreProbability}</strong> chance of surviving`;
    } else {
      $imgState.src = "../images/dead.png";
      $paragraphResult.textContent = `Hey 😔, we're sad for you. You will not survive the titanic crash. You have a ${data.scoreProbability} chance of surviving`;
    }
  } else if (label == "cars") {
    if (Number(data.scoreLabel) > Number(data.price)) {
      $imgState.src = "../images/increase.png";
      $paragraphResult.innerHTML = `The real price of your car ${data.make} with a ${data.horsepower} horsepower and with the following price ${data.price} <strong>should be ${data.scoreLabel}</strong>. In short, <strong>the car has a higher price</strong>`;
    } else {
      $imgState.src = "../images/decrease.png";
      $paragraphResult.innerHTML = `The real price of your car ${data.make} with a ${data.horsepower} horsepower and the following price ${data.price} <strong>should be ${data.scoreLabel}</strong>. In short, <strong>the car has a lower price.</strong>`;
    }
  }

  // Open the modal
  $sectionResults.style.transform = "translate(0, 0)";
  $sectionResults.style.transition = "transform 0.8s ease";
};

const formTitanic = (elem) => {
  const formData = new FormData(elem);
  const data = Object.fromEntries(formData);

  // Fetching the data of the form with the method POST
  fetch("https://emcodyapiml.herokuapp.com/titanic", {
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
};

const formCars = (elem) => {
  const formData = new FormData(elem);
  const data = Object.fromEntries(formData);

  // Fetching the data of the form with the method POST
  fetch("https://emcodyapiml.herokuapp.com/cars", {
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
};

const formCovid = (elem) => {
  const formData = new FormData(elem);
  const data = Object.fromEntries(formData);

  // Fetching the data of the form with the method POST
  fetch("https://emcodyapiml.herokuapp.com/covid", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const $contentModal = document.querySelector(".contentModal");
      const $modalCovid = document.getElementById("modal-covid");

      $contentModal.style.display = "flex";
      $modalCovid.style.transform = "scale(1)";

      $modalCovid.innerHTML = `
        <button id="btnCloseModalCovid">x</button>
        <h3>Hola! ${data.nombre}</h3>
        <p>Los resultados de la prediccion es la siguiente tienes ${
          data.edad
        } anos, cuentas con ${
        data.cantidad_vacuna
      } vacuna(as). Por lo tanto, teniendo en cuenta la cantidad y marca de vacunas, asi como la edad y el lugar de residencia, podemos decir que tienes una <strong>probabilidad del ${Number.parseFloat(
        data.scoreProbability
      ).toFixed(
        2
      )}</strong> de poder contagiarte de la covid-19, encontrandote en el distrito de ${data.distrito.toLowerCase()}.</p>
      `;

      let $btnCloseModalCovid = document.querySelector("#btnCloseModalCovid");

      console.log($btnCloseModalCovid);

      $btnCloseModalCovid.addEventListener("click", () => {
        $modalCovid.style.transform = "scale(0)";
        $contentModal.style.display = "none";
      });
    });
};

export { formTitanic, formCars, formCovid };
