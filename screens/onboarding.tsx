import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingScreen from '../screens/loading'
import Header from '../components/header'

export default function onboarding() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const isBtnEnable = nome != '' && email != '' ? true : false

    const [isLoading, setStatusLoading] = useState(false)
    const [isOnboardingCompleted, setStatusOnboarding] = useState(false)

    const handleStatusOnboarding = async () => {
        await AsyncStorage.setItem('isOnboardingCompleted', 'true');
        setStatusOnboarding(true)
        //navigate.replace(Profile)
    }

    useEffect(() => {

        (async () => {
            try {
                const value = await AsyncStorage.getItem('userStatus');
                const parsedJSON = value != null ? JSON.parse(value) : null
                console.log(parsedJSON)
            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (

        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Deixe-nos conhecermos você</Text>
                        <TextInput placeholder='Primeiro Nome' style={styles.input} onChangeText={setNome} />
                        <TextInput placeholder='Email' autoCapitalize='none' keyboardType='email-address' style={styles.input} onChangeText={setEmail} />
                        <TouchableOpacity style={[styles.btnContinuar, isBtnEnable ? { backgroundColor: Colors.primaryColor } : { backgroundColor: Colors.secondText }]} onPress={handleStatusOnboarding} disabled={!isBtnEnable}>
                            <Text style={styles.txtBtnContinuar}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        margin: 25
    },
    formContainer: {

    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 55,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.secondText,
        padding: 20,
        fontSize: 20,
        marginBottom: 21,
        borderRadius: 5
    },
    btnContinuar: {
        width: 154,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 50
    },
    txtBtnContinuar: {
        color: Colors.highlightText,
        fontSize: 20
    }
})