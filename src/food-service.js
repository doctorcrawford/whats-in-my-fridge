export default class Recipe {
  static getRecipe(dishID) {
    return fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${dishID}`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}