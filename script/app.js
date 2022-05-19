const $formTitanic = document.getElementById("titanicForm");
const server = "http://localhost:3000/titanic";

const renderDataSurvived = (data) => {
  const $rowResult = document.getElementById("tr-results");
  const $imgState = document.getElementById("imageState");

  $rowResult.innerHTML = "";

  $rowResult.innerHTML = `
    <td>${data.survived}</td>
    <td>${data.pclass}</td>
    <td>${data.sex}</td>
    <td>${data.age}</td>
    <td>${data.sibsp}</td>
    <td>${data.parch}</td>
    <td>${data.fare}</td>
    <td>${data.embarked}</td>
    <td>${data.scoreLabel}</td>
    <td>${data.scoreProbability}</td>
  `;

  data.scoreProbability > 0.5
    ? ($imgState.src = "../images/survived.png")
    : ($imgState.src = "../images/dead.png");
};

$formTitanic.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData($formTitanic);
  const data = Object.fromEntries(formData);

  // Fetching the data of the form with the method POST
  fetch(server, {
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
