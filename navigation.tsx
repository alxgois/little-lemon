import { View, Text } from 'react-native'
import React from 'react'
import ProfileScreen from './screens/profile'
import OnboardingScreen from './screens/onboarding'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function navigation() {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}