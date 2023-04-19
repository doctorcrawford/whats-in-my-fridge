export default class Food {
  static getRecipe(ingredient) {
    return fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
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