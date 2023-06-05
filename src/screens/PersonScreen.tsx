import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigators/RootNavigator'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'

export default function PersonScreen() {
    const ios = Platform.OS === 'ios'
    const verticalMargin = ios ? '' : 'my-3'
    const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation()
    
    const {params: item} = useRoute()
    var { width, height } = Dimensions.get('window')

    const [isFavorite, setIsFavorite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getPersonDetails(item.id)
    }, [item])

    const getPersonDetails = async (id: number) => {

    }

    return (
        <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button */}
            <SafeAreaView className={'z-20 w-full flex-row justify-between px-4 my-4 items-center' + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-xl p-1 bg-[#eab308]'>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                    <HeartIcon size={35} color={isFavorite ? 'red' : 'white' }/>
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading/>
                ) : (
                    <View>
                        <View
                            className='flex-row justify-center'
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}
                        >
                            <View className='items-center mt-4 rounded-full overflow-hidden h-72 w-72 border border-neutral-500'>
                                <Image source={require('../assets/images/castImage2.png')} style={{ height: height * 0.43, width: width * 0.74 }}/>
                                
                            </View>
                        </View>
                        <View className='mt-6'>
                            <Text className='text-3xl text-white font-bold text-center'>
                                Keanu Reeves
                            </Text>
                            <Text className='text-3xl text-neutral-500 text-center'>
                                London, United Kingdom
                            </Text>
                        </View>
                        <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>
                                    Gender
                                </Text>
                                <Text className='text-neutral-300 text-sm'>
                                    Male
                                </Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>
                                    Birthday
                                </Text>
                                <Text className='text-neutral-300 text-sm'>
                                    1964-09-02
                                </Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>
                                    Known for
                                </Text>
                                <Text className='text-neutral-300 text-sm'>
                                    Acting
                                </Text>
                            </View>
                            <View className='px-2 items-center'>
                                <Text className='text-white font-semibold'>
                                    Poularity
                                </Text>
                                <Text className='text-neutral-300 text-sm'>
                                    64.23
                                </Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            <Text className='text-white text-lg'>
                                Biography
                            </Text>
                            <Text className='text-neutral-400 tracking-wide'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ipsa, dignissimos molestias placeat earum amet tempore impedit ad inventore quae laudantium ullam iusto distinctio illum perspiciatis dicta quia fuga aliquid.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatibus mollitia et. Reprehenderit blanditiis iure magni consectetur, ut odio nobis qui praesentium ab eos aliquam veniam laborum distinctio similique quaerat.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolorum, eos est inventore quia saepe iure autem ducimus dignissimos laborum veritatis, eveniet voluptates sapiente laudantium porro debitis! Nam, nostrum blanditiis.
                            </Text>
                        </View>
        
                        {/* movies */}
                        <MovieList title='Movies' hideSeeAll={true} data={personMovies}/>
                    </View>
                )
            }

        </ScrollView>
    )
}