export default class GIFY {
  static getGIF(input) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${input}&limit=1&offset=0&rating=r&lang=en`)
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
