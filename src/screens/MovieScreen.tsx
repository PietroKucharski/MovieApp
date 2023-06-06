import Cast from '../components/Cast'
import Loading from '../components/Loading'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from 'expo-linear-gradient'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb'
import MovieList from '../components/MovieList'

type teste = {
}

export default function MovieScreen() {
    const ios = Platform.OS === 'ios'
    const topMargin = ios ? '' : 'mt-3'

    const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation()
    
    var { width, height } = Dimensions.get('window')
    const { params: item } = useRoute()
    
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async (id: number) => {
        const data = await fetchMovieDetails(id)

        if(data) {
            setMovie(data)

        }
        setLoading(false)
    }

    const getMovieCredits = async (id: number) => {
        const data = await fetchMovieCredits(id)

        if(data && data.cast) {
            setCast(data.cast)
        }
        setLoading(false)
    }
    
    const getSimilarMovies = async (id: number) => {
        const data = await fetchSimilarMovies(id)

        if(data && data.results) {
            setSimilarMovies(data.results)
        }
        
        setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
            {/* back button and movie poster */}
            <View className='w-full'>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between px-4 items-center' + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-xl p-1 bg-[#eab308]'>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={35} color={isFavorite ? 'red' : 'white' }/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View>
                            <Image
                                source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                                style={{
                                    width, 
                                    height: height * 0.80
                                }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1}}
                                className='absolute bottom-0'
                            />
                        </View>
                    )
                }
                
            </View>
            {/* movie details */}
            <View style={{ marginTop: -(height * 0.09)}} className='space-y-3'>
                <Text className='text-white text-center text-3xl font-bold tracking-wide'>
                    {
                        movie?.title 
                    }
                </Text>
                {
                    movie?.id ? (
                        <Text className='text-neutral-400 font-semibold text-base text-center'>
                            { movie?.status } * { movie?.release_date?.split('-')[0] } * {movie?.runtime} min
                        </Text>
                    ) : null
                }


                {/* genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    {
                        movie?.genres?.map((genres: any, index: any) => {
                            let showFeature = index + 1 != movie.genres.length 
                            return (
                                <Text className='text-neutral-400 font-semibold text-base text-center' key={index}>
                                    { genres?.name } { showFeature ? '-': null }
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text className='text-neutral-400 mx-4 tracking-wide '>
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/* cast */}
            <Cast cast={cast}/>

            {/* similar movies */}
            <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies}/>
        </ScrollView>
    )
}