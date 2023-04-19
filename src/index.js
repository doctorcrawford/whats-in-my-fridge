import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Food from './food-rec.js'

// Business Logic

function getRecipe(ingredient) {
  Food.getRecipe(ingredient)
    .then(function(response) {
      if (response.main) {
        printElements(response, ingredient);
      } else {
        printError(response, ingredient);
      }
    });
}

//UI Logic

function printElements(response, ingredient) {
  document.querySelector("#show-recipe").innerText = `Here is your recipe using ${ingredient} ${response[0].strMeal}.`;
}

function printError(error, ingredient) {
  document.querySelector("#show-recipe").innerText = `There was an error accessing a recipe for ${ingredient}: ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ingredient = document.querySelector("#main-item").value;
  document.querySelector("#main-item").value = null;
  getRecipe(ingredient);
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);