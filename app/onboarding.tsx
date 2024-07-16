import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import { Link, useRouter } from "expo-router";

export default function onboarding() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter()
  const isBtnEnable = nome != "" && email != "" ? true : false;

  const handleStatusOnboarding = async () => {
    await AsyncStorage.setItem("isOnboardingCompleted", "true");
    await AsyncStorage.setItem("nome", `${nome}`);
    await AsyncStorage.setItem("email", `${email}`);
    console.log("gravado onboarding completo!");
    router.replace('/profile')
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header small={false} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Deixe-nos conhecermos você</Text>
              <TextInput
                placeholder="Primeiro Nome"
                style={styles.input}
                onChangeText={setNome}
                value={nome}
              />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
              />

              {/* <Link href={{
                pathname: 'profile',
                // params: {nome: nome, email: email}
              }} asChild style={[styles.btnContinuar, isBtnEnable
                      ? { backgroundColor: Colors.primaryColor }
                      : { backgroundColor: Colors.secondText }]}> */}
                <TouchableOpacity
                  onPress={handleStatusOnboarding}
                  disabled={!isBtnEnable}
                  style={[styles.btnContinuar, isBtnEnable
                    ? { backgroundColor: Colors.primaryColor }
                    : { backgroundColor: Colors.secondText }]}
                >
                  <Text style={styles.txtBtnContinuar}>Continuar</Text>
                </TouchableOpacity>
              {/* </Link> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  formContainer: {},
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 55,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondText,
    padding: 20,
    fontSize: 20,
    marginBottom: 21,
    borderRadius: 5,
  },
  btnContinuar: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 50,
  },
  txtBtnContinuar: {
    color: Colors.lightText,
    fontSize: 20
  },
});
