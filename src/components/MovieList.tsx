import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { style } from '../theme'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../../api/moviedb'

type movieListProps = {
  title: string,
  data: any
  hideSeeAll?: boolean
}

export default function MovieList({title, data, hideSeeAll}: movieListProps) {
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation()

  var { width, height } = Dimensions.get('window')

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl '>
            {title}
        </Text>
        {
            !hideSeeAll && (
              <TouchableOpacity>
                <Text style={style.text} className='text-lg'>
                  See all
                </Text>
              </TouchableOpacity>
            )
          }

      </View>
      {/* movie row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} >
        {
          data.map((item: any, index: any) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => navigation.push('MovieScreen', item)}>
                <View className='space-y-1 mr-4'>
                  <Image
                    source={{uri: image185(item?.poster_path) || fallbackMoviePoster }}
                    className='rounded-3xl' 
                    style={{
                      width: width * 0.33,
                      height: height * 0.22
                    }}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {
                      item.title?.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                    }
                  </Text>
                </View>

              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
  )
}