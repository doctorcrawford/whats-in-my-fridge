import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Dish from './food-rec.js';
import Recipe from './food-service.js';

// Business Logic

function getDishData(ingredient) {
  Dish.getDish(ingredient)
    .then(function (dishResponse) {
      if (dishResponse instanceof Error) {
        const errorMessage = `There was an error grabbing a dish from themealDB.com for ${ingredient}: 
          ${dishResponse.message}.`;
        throw new Error(errorMessage);
      }
      let index = Math.floor(Math.random() * dishResponse.meals.length);
      const dishID = dishResponse.meals[index].idMeal;
      return Recipe.getRecipe(dishID);
    })
    .then(function (recipeResponse) {
      if (recipeResponse instanceof Error) {
        const errorMessage = `There was an error finding a recipe from themealDB:
           ${recipeResponse.message}`;
        throw new Error(errorMessage);
      }
      printElements(recipeResponse.meals[0], ingredient);
    })
    .catch(function (error) {
      printError(error);
    });
}

//UI Logic

function printElements(response, ingredient) {
  const urlPict = response.strMealThumb;
  const img = document.getElementById("recipeImg");
  img.setAttribute("src", urlPict);
  img.setAttribute("alt", `an image of ${response.strMeal}`);
  document.querySelector("#show-recipe").innerText = `Here is your recipe using ${ingredient}: Enjoy a delicious ${response.strMeal}.
    Cuisine: ${response.strArea}
    Recipe Instructions: ${response.strInstructions}`;
  const responseArray = Object.values(response);
  const ingredientListArray = [];
  for (let i = 0; i < responseArray.length; i++) {
    if (responseArray.includes("strIngredient") && responseArray[i] != "" && responseArray[i] != null) {
      ingredientListArray.push(responseArray[i]);
    }
  }
  console.log(ingredientListArray);
  // const ingredientListArray = responseArray.filter(key => key.includes("strIngredient"))
  // for (let i = 9; i <= 28; i++) {
  //   if (responseArray[i] != "" && responseArray[i] != null) {
  //     ingredientListArray.push(responseArray[i]);
  //   }
  // }
  const measurementArray = [];
  for (let i = 29; i <= 48; i++) {
    if (responseArray[i].trim() != "" && responseArray[i] != null) {
      measurementArray.push(responseArray[i]);
    }
  }
  const combinedArray = [];
  for (let i = 0; i < ingredientListArray.length; i++) {
    combinedArray.push(`${ingredientListArray[i]} : ${measurementArray[i]}`);
  }
  const ul = document.createElement("ul");
  const ingredientsDiv = document.getElementById("ingredients-div");
  for (let i = 0; i < combinedArray.length; i++) {
    const li = document.createElement("li");
    li.innerText = combinedArray[i];
    ul.append(li);
  }
  ingredientsDiv.append(ul);
  const urlYout = response.strYoutube;
  const videoIdIndex = urlYout.indexOf("=");
  const videoId = urlYout.slice(videoIdIndex + 1);
  const videoAddress = `https://www.youtube.com/embed/${videoId}`;
  const iframe = document.createElement("iframe");
  const youtubeDiv = document.getElementById("youtube-div");
  iframe.setAttribute("width", 500);
  iframe.setAttribute("height", 400);
  iframe.setAttribute("src", videoAddress);
  youtubeDiv.append(iframe);
}

function printError(error) {
  document.querySelector("#show-recipe").innerText = error;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ingredientSpace = document.querySelector("#main-item").value;
  const ingredient = ingredientSpace.replaceAll(" ", "_");
  document.querySelector("#main-item").value = null;
  document.querySelector("#ingredients-div").innerHTML = null;
  document.getElementById("youtube-div").innerHTML = null;
  getDishData(ingredient);
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);