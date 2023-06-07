import React, { useState } from 'react'
import { TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen() {
  return (
    <SafeAreaView>
      <TextInput className='w-full border-red-300 border-2'/>
      <TextInput className='w-full border-blue-300 border-2'/>
      <TextInput className='w-full border-yellow-300 border-2'/>
      <Button title='Login'/>
    </SafeAreaView>
  )
}