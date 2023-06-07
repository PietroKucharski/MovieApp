import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import FavoriteListScreen from '../screens/FavoriteListScreen'
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer"
import ProfileScreen from '../screens/ProfileScreen'
import SignInScreen from '../screens/SignInScreen'

export type RootDrawerParamList = {
    Principal: undefined
    Favorites: undefined
    Profile: undefined
    SignIn: undefined
}
  
const RootDrawer = createDrawerNavigator<RootDrawerParamList>()
export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> = DrawerNavigationProp<RootDrawerParamList, T>

export default function DrawerNavigator() {
  return (
    <RootDrawer.Navigator>
        <RootDrawer.Group screenOptions={{ headerShown: false }}>
            <RootDrawer.Screen name='Principal' component={HomeScreen}/>
            <RootDrawer.Screen name='Favorites' component={FavoriteListScreen}/>
            <RootDrawer.Screen name='Profile' component={ProfileScreen}/>
            <RootDrawer.Screen name='SignIn' component={SignInScreen}/>
        </RootDrawer.Group>
    </RootDrawer.Navigator>
  )
}