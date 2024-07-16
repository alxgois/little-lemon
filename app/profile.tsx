import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaskedTextInput } from "react-native-mask-text";
import { useRouter, useNavigation, useLocalSearchParams, Redirect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function profile() {
  const router = useRouter();
  // const params = useLocalSearchParams();

  const [isLoading, setIsLoading] = React.useState(true);

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sobrenome, setSobrenome] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [ofertas, setNotifOfertas] = React.useState(false);
  const [newsletter, setNotifNews] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [inicais, setIniciais] = React.useState("");

  let profileInfo = {
    nome: nome,
    email: email,
    sobrenome: sobrenome,
    telefone: telefone,
    ofertas: ofertas,
    newsletter: newsletter,
    image: image,
    inicais: inicais
  };

  useEffect(() => {

    // if (params.nome) {
    //   setNome(String(params.nome));
    //   iniciaisNome(String(params.nome))
    // }

    // if (params.email) {
    //   setEmail(String(params.email));
    // }
    getProfile()
    
  }, []);

  useEffect(() => {
      iniciaisNome(nome)
  }, [nome])

  const iniciaisNome = (paramName: string) => {
    if (paramName !== null) {
      let count = 0
      let result = paramName.split(' ').map((eachName, index) => {
        if (index < 2) {
          return eachName.substring(0, 1).toUpperCase()
        }
      }).join('')
  
      setIniciais(result)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveAll = async () => {

    const profileObjectString = Object.entries(profileInfo).map((item): [string, string] => {
      return [item[0], String(item[1])];
    })

    console.log(profileInfo)

    try {
      await AsyncStorage.multiSet(profileObjectString)
    } catch (e) {
      Alert.alert(`Ocorreu um erro ao salvar aos dados. ${e}`);
    }

  }

  const getProfile = async () => {
    try {

      const values = await AsyncStorage.multiGet(Object.keys(profileInfo))

      const response = values.reduce((accumulator, [key, value]) => {
        accumulator[key] = value
        return accumulator
      }, {} as Record<string, any>)


      if(response.image !== null) {
        setImage(response.image);
      }
      
      if (response.nome !== null) {
        setNome(response.nome);
      }

      if (response.sobrenome !== null) {
        setSobrenome(response.sobrenome);
      }
      
      if (response.email !== null) {
        setEmail(response.email);
      }

      if (response.telefone !== null) {
        setTelefone(response.telefone);
      }
      
      setNotifNews(JSON.parse(response.newsletter));
      setNotifOfertas(JSON.parse(response.ofertas));

      console.log(response)

    } catch (e) {
      Alert.alert(`Erro ao obter dados do perfil. ${e}`)
    } finally {
      setIsLoading(false);
    }
    
  }

  const logout = async () => {
    try {
      await AsyncStorage.clear()
      router.replace('/onboarding')
    } catch(e) {
      Alert.alert(`Erro ao fazer logout. ${e}`);
    }
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-circle-sharp"
          size={40}
          color={Colors.primaryColor}
        />
        <Header small={true} />
        {image ? (
                <Image style={styles.imageProfileHeader} source={{uri: image}} />
              ) : (
                <View style={styles.imageProfileHeader}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>{inicais}</Text>
                </View>
              )}
      </View>

      <ScrollView style={styles.body}>
        <View style={{ gap: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Informações Pessoais
          </Text>

          <View>
            <Text
              style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}
            >
              Avatar
            </Text>
            <View style={styles.avatarContainer}>
              {image ? (
                <Image style={styles.imageProfile} source={{uri: image}} />
              ) : (
                <View style={styles.imageProfile}>
                  <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>{inicais}</Text>
                </View>
              )}

              <TouchableOpacity style={styles.btnAlterar} onPress={pickImage}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Alterar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRemover} onPress={() => setImage("")}>
                <Text
                  style={{ color: Colors.primaryColor, fontWeight: "bold" }}
                >
                  Remover
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 20 }}>
            <View>
              <Text
                style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}
              >
                Primeiro nome
              </Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View>
              <Text
                style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}
              >
                Sobrenome
              </Text>
              <TextInput style={styles.input} onChangeText={setSobrenome} value={sobrenome}/>
            </View>

            <View>
              <Text
                style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}
              >
                Email
              </Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text
                style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}
              >
                Telefone
              </Text>
              <MaskedTextInput
                style={styles.input}
                mask="(99) 99999-9999"
                onChangeText={(text, rawText) => setTelefone(rawText) }
                value={telefone}
              />
            </View>
          </View>

          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 25 }}
            >
              Email Notificações
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setNotifOfertas(!ofertas)}>
                <MaterialIcons
                  name={
                    ofertas ? "check-box" : "check-box-outline-blank"
                  }
                  size={35}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: Colors.blackText }}>
                Ofertas
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TouchableOpacity onPress={() => setNotifNews(!newsletter)}>
                <MaterialIcons
                  name={newsletter ? "check-box" : "check-box-outline-blank"}
                  size={35}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: Colors.blackText }}>
                Newsletter
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnLogout} onPress={logout}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity>

          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <TouchableOpacity style={styles.btnRemover} onPress={getProfile}>
                <Text
                  style={{ color: Colors.primaryColor, fontWeight: "bold" }}
                >
                  Cancelar Alterações
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAlterar} onPress={saveAll}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Salvar Alterações
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    // backgroundColor: 'gray',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  btnAlterar: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnRemover: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.secondText,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btnLogout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondColor,
    paddingVertical: 15,
    borderRadius: 5,
  },
  imageProfile: {
    width: 80,
    height: 80,
    backgroundColor: Colors.secondText,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageProfileHeader: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
