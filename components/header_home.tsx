import {View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { GlobalVariable } from '@/constants/GlobalVariable';
import { useNavigation, useRouter } from 'expo-router';

export default function Header() {

  let nome = "Alexsander"

  const router = useRouter();
  const navigation = useNavigation();

  const goToProfileScreen = () => {
    router.navigate('/profile')
  }

  return (
    <View>
      <View style={styles.containerHeader}>

        <View style={styles.welcomeBox}>
          <Text style={{fontWeight: '400', color: Colors.secondText}}>Bem vindo,</Text>
          <Text style={{fontWeight: 'bold'}}>{nome}</Text>
        </View>

        <Image style={styles.logo} source={require('../assets/images/Logo.png')} />

        <TouchableOpacity onPress={goToProfileScreen} style={styles.profileBox} >
          <Ionicons name="person-circle-outline" size={30} color={Colors.blackText} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: GlobalVariable.spaceHorizontal,
    position: 'relative'
  },
  welcomeBox: {
    position: 'absolute',
    top: 15,
    left: 0
  },
  profileBox: {
    position: 'absolute',
    top: 24,
    right: 0
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 30
  },
  logo: {
    width: 60,
    height: 60
  }

})