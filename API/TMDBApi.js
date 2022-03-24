const API_TOKEN = "efcc71ae0ba89ef0cbf7cdf214aca6dd";

export function getFilms(text){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name){
    return 'https://image.tmdb.org/t/p/w300' + name
}