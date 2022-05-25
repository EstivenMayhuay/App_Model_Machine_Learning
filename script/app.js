import { formCars, formTitanic } from "./modules/formModel.js";

const d = document;

d.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.id === "titanicForm") formTitanic(e.target);
  else if (e.target.id === "carsForm") formCars(e.target);
});

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
