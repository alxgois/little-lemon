import { View, Text } from 'react-native'
import { Redirect } from 'expo-router';
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './loading'

export default function index() {

    const [isLoading, setStatusLoading] = useState(true);
    const [isOnboardingCompleted, setStatusOnboarding] = useState(false);
  
    useEffect(() => {
      (async () => {
        try {
          const value = await AsyncStorage.getItem("isOnboardingCompleted");
          const parsedJSON = value != null ? JSON.parse(value) : null;
          setStatusOnboarding(parsedJSON)
          console.log("async result: " + value);
        } catch (e) {
          console.log(e);
        } finally {
          console.log("finally");
          setStatusLoading(false);
        }
      })();
    }, []);
  
    if (isLoading) {
      return <LoadingScreen/>
    }

    if (isOnboardingCompleted) {
        return <Redirect href='/home' />
    } else {
        return <Redirect href='/onboarding' />
    }
    
}