import axios from "axios";
import { apiKey } from '../src/constants'

const apiBaseUrl = 'https://api.themoviedb.org/3'

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint  = `${apiBaseUrl}/search/movie?api_key=${apiKey}`
const newRequestTokenEndpoint = `${apiBaseUrl}/authentication/token/new?api_key=${apiKey}`

const movieDetailsEndpoint = (id: string) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = (id: string) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = (id: string) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndpoint = (id: string) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = (id: string) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = (path: string) => path ? `https://image.tmdb.org/t/p/w500${path}` : undefined
export const image342 = (path: string) => path ? `https://image.tmdb.org/t/p/w342${path}` : undefined
export const image185 = (path: string) => path ? `https://image.tmdb.org/t/p/w185${path}` : undefined

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiGetCall = async (endpoint: any, params?: any) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

const apiPostCall = async (endpoint: any, params?: any, data?: any) => {
    const options = {
        method: 'POST',
        url: endpoint,
        params: params ? params : {},
        data: data ? data : {},
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const fetchCreateNewRequestToken = () => {
    return apiGetCall(newRequestTokenEndpoint)
}

export const fetchTrendingMovies = () => {
    return apiGetCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiGetCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiGetCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = (id: string) => {
    return apiGetCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = (id: string) => {
    return apiGetCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = (id: string) => {
    return apiGetCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = (id: string) => {
    return apiGetCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = (id: string) => {
    return apiGetCall(personMoviesEndpoint(id))
}

export const fetchSearchMovies = (params: any) => {
    return apiGetCall(searchMoviesEndpoint, params)
}