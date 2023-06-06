import axios from "axios";
import {apiKey} from '../src/constants'

const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndpoint = (id: number) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = (id: number) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
const searchMoviesEndpoint  = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

export const image500 = (path: string) => path ? `https://image.tmdb.org/t/p/w500${path}` : undefined
export const image342 = (path: string) => path ? `https://image.tmdb.org/t/p/w342${path}` : undefined
export const image185 = (path: string) => path ? `https://image.tmdb.org/t/p/w185${path}` : undefined

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint: any, params?: any) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = (id: number) => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = (id: number) => {
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = (id: number) => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = (id: number) => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = (id: number) => {
    return apiCall(personMoviesEndpoint(id))
}

export const fetchSearchMovies = (params: any) => {
    return apiCall(searchMoviesEndpoint, params)
}