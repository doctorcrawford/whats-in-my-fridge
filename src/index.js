import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Dish from './food-rec.js';
import Recipe from './food-service.js';
import GIFY from './gif-service.js';

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

function getGif(ingredient) {
  GIFY.getGIF(ingredient)
    .then(function(gifResponse) {
      if (gifResponse instanceof Error) {
        const errorMessage = `There was an error grabbing a gif from Giphy for ${ingredient}
        ${gifResponse.message}`;
        throw new Error(errorMessage);
      }
      const gif = gifResponse.data.images.original.url;
      printGif(gif, ingredient);
    });
}





//UI Logic

function printElements(response, ingredient) {
  const urlPict = response.strMealThumb;
  const img = document.createElement("img");
  img.setAttribute("src", urlPict);
  img.setAttribute("alt", `an image of ${response.strMeal}`);
  img.setAttribute("id", "recipeImg");
  const imgDiv = document.getElementById("img");
  imgDiv.append(img);
  const p = document.createElement("p");
  p.setAttribute("id", "show-recipe");
  const recipeDiv = document.getElementById("recipe");
  recipeDiv.append(p);
  document.querySelector("#show-recipe").innerText = `Here is your recipe using ${ingredient}: Enjoy a delicious ${response.strMeal}.
    Cuisine: ${response.strArea}
    Recipe Instructions: ${response.strInstructions}`;
  const keyArray = Object.keys(response);
  const ingredientListArray = [];

  for (let i = 0; i < keyArray.length; i++) {
    let string = "";
    string = keyArray[i];
    if (string.includes("strIngredient") && response[keyArray[i]].trim() != "" && response[keyArray[i]] != null) {
      ingredientListArray.push(response[keyArray[i]]);

    }
  } 

  const measurementArray = [];
  for (let i = 0; i < keyArray.length; i++) {
    let keyString = keyArray[i];
    if (keyString.includes("strMeasure") && response[keyArray[i]].trim() != "" && response[keyArray[i]] != null) {
      measurementArray.push(response[keyArray[i]]);
    }
  } 
  const combinedArray = [];
  for (let i = 0; i < ingredientListArray.length; i++) {
    combinedArray.push(`${ingredientListArray[i]} : ${measurementArray[i]}`);
  }
  const ul = document.createElement("ul");
  ul.setAttribute("id", "ingredient-list");
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

function printGif(gif, ingredient) {
  const imgDiv = document.getElementById("img");
  const img = document.createElement("img");
  img.setAttribute("src", gif);
  img.setAttribute("alt", `gif of ${ingredient}`);
  imgDiv.append(img);
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
  document.getElementById("img").innerHTML = null;
  document.getElementById("recipe").innerHTML = null;
  getDishData(ingredient);
  getGif(ingredient);
  // Promise.all([getDishData(ingredient), getGif(ingredient)]).then((values))
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);