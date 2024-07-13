import {View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function header() {
  return (
    <View>
      <View style={styles.containerHeader}>
        <Image style={styles.logo} source={require('../assets/images/Logo.png')} />
        <Text style={styles.textHeader}>
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
  textHeader: {
    fontWeight: 'bold',
    fontSize: 30
  },
  logo: {
    width: 80,
    height: 80
  }
})