import React from 'react'
import MovieCard from './MovieCard'
import Carousel from 'react-native-snap-carousel'
import { View, Text, Dimensions } from 'react-native'

type trendingMoviesProps = {
    data: any
}

export default function TrendingMovies({data}: trendingMoviesProps) {
    var { width } = Dimensions.get('window')

    return (
        <View className='mb-8'>
            <Text className='text-white text-xl mx-4 mb-5'>
                TrendingMovies
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) =>  <MovieCard item={item}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center',}}
            />
        </View>
    )
}
