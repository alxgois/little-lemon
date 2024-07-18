import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import React from "react";
import { GlobalVariable } from "@/constants/GlobalVariable";
import { Colors } from "@/constants/Colors";

// interface => Define a tipagem das propriedades para que o TypeScript consiga identificar o tipo da variavel

interface MenuItemType {
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  categoria: string;
}

interface Props {
  item: MenuItemType;
}

export default function MenuItem({item: { nome, preco, descricao, imagem, categoria } }: Props) {
  //Isso significa que o objeto "item" deve ter exatamente as propriedades definidas na interface Props.
  //Ou seja, diz que o "item" deve ser do tipo MenuItemType, logo, ele precisa ter exatamente as propriedades definidas dentro da interface MenuItemType.

  const [productImage, setProductImage] = React.useState('');
  const [isLoadedimagem, setLoadedimagem] = React.useState(false);

    React.useEffect(() => {
        fetchimagemAPI()
    }, [])

    const fetchimagemAPI = async () => {
        try {
            const response = await fetch(`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imagem}?raw=true`);
            setProductImage(response.url)
        } catch(e) {
            Alert.alert(`${e}`);
        } finally {
            setLoadedimagem(true);
        }
    };

  
  return (
    <View style={{ marginBottom: 50 }}>
      <View style={styles.menuContainer}>
        <View
          style={{
            width: "65%",
            paddingRight: 50,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{nome}</Text>
            <Text numberOfLines={3}>{descricao}</Text>
          </View>
          <View>
            <Text
              style={{
                color: Colors.primaryColor,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              R$ {String(preco).replace(".", ",")}
            </Text>
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoadedimagem ? (
            <Image
              source={{
                uri: productImage,
              }}
              style={{
                resizeMode: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 5,
              }}
            />
          ) : (
            <ActivityIndicator size={"small"} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    marginHorizontal: GlobalVariable.spaceHorizontal,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 110,
  },
});
