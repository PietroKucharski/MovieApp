import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import TrendingMovies from '../components/TrendingMovies';
import React, { useEffect, useState } from 'react'
import { View, Text, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { style } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviedb';
import { RootDrawerParamList } from '../navigators/DrawerNavigator';
import { DrawerNavigationProp } from "@react-navigation/drawer"


export default function HomeScreen() {
    const ios = Platform.OS === 'ios'

    const [loading, setLoading] = useState(true)
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setToRated] = useState([])

    const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation()
    const drawerNavigation: DrawerNavigationProp<RootDrawerParamList> = useNavigation()

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()

        if(data && data.results) {
            setTrending(data.results)
        }
        setLoading(false)
    }
 
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()

        if(data && data.results) {
            setUpcoming(data.results)
        
        }

        setLoading(false)
    }
    
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()

        if(data && data.results) {
            setToRated(data.results)
        }

        setLoading(false)
    }

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    return (
        <View className='flex-1 bg-neutral-800'>
            {/* search bar and logo */}
            <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
                <StatusBar style='light'/>
                <View className='flex-row justify-between items-center mx-4'>
                    <Bars3CenterLeftIcon onPress={() => drawerNavigation.openDrawer()} size={30} strokeWidth={2} color='white'/>
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={style.text}> 
                            M
                        </Text>
                        ovies
                    </Text>
                    <MagnifyingGlassIcon onPress={() => navigation.navigate('SearchScreen')} size={30} strokeWidth={2} color='white'/>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading/>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>

                        {/* Trending movies carousel */}
                        { trending.length > 0 && <TrendingMovies data={trending}/> }

                        {/* Upcoming movies row */}
                        { upcoming.length > 0 && <MovieList title='Upcoming' data={upcoming}/> }

                        {/* Upcoming movies row */}
                        { topRated.length > 0 && <MovieList title='Top Rated' data={topRated}/>}
                    </ScrollView>
                )
            }
            
        </View>
    )
}