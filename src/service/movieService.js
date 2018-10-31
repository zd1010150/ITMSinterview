import {API_KEY, BASE_URL} from './config.js';
import {fetchData} from './fetch.js';

const getMovieId = async (moveTitle) => {
    const result = await fetchData(`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${moveTitle}`)
    if (Array.isArray(result && result.results) && result.results.length > 0) {
        return result.results[0].id;
    } else return '';

}
const fetchConfig = async () => {
    const result = await fetchData(`${BASE_URL}/3/configuration?api_key=${API_KEY}`)
    if (result.images) {
        return result.images;
    }
}
const constructImagePath = (baseUrl, posterSizes, filePath) => {
    return `${baseUrl}/${posterSizes[posterSizes.length - 1]}/${filePath}`;
}
export const fetchDetail = async (queryKeyWords) => {
    const imageConfigResult = await fetchConfig();
    const movieId = await getMovieId(queryKeyWords);
    const result = {
        title: '',
        poster: '',
        actors: [],
        crew: []
    };
    if (`${movieId}`.length > 0) {
        const infoResult = await fetchData(`${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}`);
        const castResult = await fetchData(`${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}`);
        if (imageConfigResult && infoResult && castResult) {
            return Object.assign({}, result, {
                title: infoResult.title,
                poster: constructImagePath(imageConfigResult.base_url, imageConfigResult.poster_sizes, infoResult.poster_path),
                actors: castResult.cast,
                crew: castResult.crew
            })
        }
    } else {
        return result;
    }
}







