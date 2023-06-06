import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigators/RootNavigator'
import { fallbackPersonImage, image500 } from '../../api/moviedb'

type movieCard = {
 item: any
}

export default function MovieCard({item}: movieCard) {
    var { width, height } = Dimensions.get('window')

    const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation()

    return (
        <TouchableWithoutFeedback  onPress={() => navigation.navigate('MovieScreen', {...item})}>
            <Image
                // source={require('../assets/images/moviePoster1.png')}
                source={{uri: image500(item.poster_path) || fallbackPersonImage }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    )
}