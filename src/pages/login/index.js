import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerView}>
        <Image
          style={styles.imgLogo}
          source={require("../../../img/logo.png")}
        />
        <Text style={styles.titulo}>Acesse sua conta</Text>
        <View style={styles.input}>
          <Image source={require("../../../img/email.png")} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={"#7C7C8A"}
            style={styles.inputText}
          />
        </View>
        <View style={styles.input}>
          <Image source={require("../../../img/key.png")} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={"#7C7C8A"}
            style={styles.inputText}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.button}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
  },
  containerView: {
    marginTop: 100,
    gap: 20,
    alignItems: "center",
  },
  imgLogo: {
    marginBottom: 40,
    width: 170,
    height: 90,
  },
  input: {
    color: "#7C7C8A",
    flexDirection: "row",
    backgroundColor: "#121212",
    gap: 10,
    width: "90%",
    height: 56,
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  titulo: {
    fontSize: 16,
    margin: 20,
    color: "#E1E1E6",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 10,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#00875F",
  },
  button: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
  },
  inputText: {
    color: "#7C7C8A",
  },
});
