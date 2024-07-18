import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Feather } from '@expo/vector-icons';
import { GlobalVariable } from '@/constants/GlobalVariable';

export default function SearchBar({marginTop, marginBottom}) {
  return (
    <View>
        <View style={[styles.searchContainer, {marginTop: marginTop, marginBottom: marginBottom}]}>
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder='Search for food, grocery, meat, etc...' style={styles.input}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: Colors.lightText,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: GlobalVariable.spaceHorizontal
    },
    input: {
        color: 'red'
    }
})