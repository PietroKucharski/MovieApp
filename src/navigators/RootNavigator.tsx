import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieScreen from '../screens/MovieScreen'
import PersonScreen from '../screens/PersonScreen'
import SearchScreen from '../screens/SearchScreen'


export type RootStackParamList = {
  HomeScreen: undefined
  MovieScreen: undefined
  PersonScreen: undefined
  SearchScreen: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
        <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='HomeScreen' component={HomeScreen}/>
            <RootStack.Screen name='MovieScreen' component={MovieScreen}/>
            <RootStack.Screen name='PersonScreen' component={PersonScreen}/>
            <RootStack.Screen name='SearchScreen' component={SearchScreen}/>
        </RootStack.Group>
    </RootStack.Navigator>
  )
}