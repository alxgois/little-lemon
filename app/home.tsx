import { View, Text, SafeAreaView, StyleSheet, Image, TouchableWithoutFeedback, FlatList, ScrollView, Platform, Alert } from 'react-native'
import React from 'react'
import GlobalStyles from "../components/globalStyles";
import Header from '@/components/header_home';
import SearchBar from '@/components/searchBar';
import { Colors } from '@/constants/Colors';
import MenuItem from '@/components/menuItem';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  deleteAllMenuItems,
  dropTable
} from '../database/database'


export default function Home() {

  const navigation = useNavigation();
  const router = useRouter();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    // deleteAllMenuItems()
    // dropTable()

    (async () => {
      try {
        // 1. Create table if it does not exist
        await createTable();

        // 2. Check if data was already stored
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          console.log('teve que fazer o fetch')

          const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
          const json = await response.json();
          menuItems = json.menu

          saveMenuItems(menuItems)
        }

        setData(menuItems)

        console.log(menuItems)

      } catch (e) {
        // Handle error
        Alert.alert(e);
      }
    })();

    
  }, [])
 

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <ScrollView style={styles.mainContainer}>
          <Header />
          <SearchBar marginTop={12} marginBottom={29}/>
          <TouchableWithoutFeedback onPress={() => console.log('clicked') }> 
            <View style={styles.bannerPrincipal}>
              <View>
                <Image source={require('../assets/images/Company.png')} style={{position: 'relative'}}/>
                <View style={styles.txtBannerPrincipalContainer}>
                  <Text style={styles.txtBannerPrincipal}>Ganhe</Text>
                  <Text style={[styles.txtBannerPrincipal, {color: Colors.secondColor, fontWeight: 'bold'}]}>25% de desconto</Text>
                  <Text style={styles.txtBannerPrincipal}>na primeira compra</Text>
                </View>
                <View style={styles.ctaBannerPrincipalContainer}>
                  {/* <TouchableWithoutFeedback> */}
                    <Text style={styles.ctaBannerPrincipal}>Compre Agora</Text>
                  {/* </TouchableWithoutFeedback> */}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <FlatList 
            data={data}
            renderItem={({item}) => <MenuItem item={item} /> }
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString() }
            style={{marginTop: 20}}
          />




        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    bannerPrincipal: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    txtBannerPrincipalContainer: {
      position: 'absolute', 
      zIndex: 10, 
      top: 23, 
      left: 26
    },
    txtBannerPrincipal: {
      color: 'white',
      fontSize: 17
    },
    ctaBannerPrincipalContainer: {
      position: 'absolute', 
      zIndex: 10, 
      left: 26,
      bottom: 30
    },
    ctaBannerPrincipal: {
      backgroundColor: Colors.secondColor,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15
    }
})