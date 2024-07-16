import {View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

interface Props{
  small: true | false;
}

export default function header({small}:Props) {
  return (
    <View>
      <View style={styles.containerHeader}>
        <Image style={small ? styles.logoSmall : styles.logoMedium} source={require('../assets/images/Logo.png')} />
        <Text style={small ? styles.textHeaderSmall : styles.textHeaderMedium}>
          Little Lemon
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeaderMedium: {
    fontWeight: 'bold',
    fontSize: 30
  },
  logoMedium: {
    width: 80,
    height: 80
  },
  textHeaderSmall: {
    fontWeight: 'bold',
    fontSize: 15
  },
  logoSmall: {
    width: 40,
    height: 40
  }
})