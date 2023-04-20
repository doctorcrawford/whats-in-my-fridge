export default class Recipe {
  static async getRecipe(dishID) {
    try {
      const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${dishID}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
          ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch (error) {
      return error;
    }
  }
}
