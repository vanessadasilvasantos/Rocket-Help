import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskListFin from "../TaskListFin";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Finalizacao() {
  const navigation = useNavigation();
  const [taskFin, setTaskFin] = useState([]);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem("@taskFin");

      if (taskStorage) {
        setTaskFin(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem("@taskFin", JSON.stringify(taskFin));
    }

    saveTasks();
  }, [taskFin]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../img/logo2.png")} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image source={require("../../../img/login.png")} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textTitle}>Solicitações</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonsText}>EM ANDAMENTO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons, styles.buttonsActive]}>
          <Text style={[styles.buttonsText, styles.buttonsTextActive]}>
            FINALIZADOS
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={taskFin}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => <TaskListFin dataFin={item} number />}
        />
      </View>

      <Modal animationType="slide" transparent={false} visible={open}>
        <View style={styles.containerModal}>
          <View style={styles.titleModal}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Image
                source={require("../../../img/seta.png")}
                style={styles.iconModal}
              />
            </TouchableOpacity>
            <Text style={styles.textModal}>Solitação</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Número do Patrimônio"
              placeholderTextColor={"#7C7C8A"}
              style={styles.inputText}
              value={number}
              onChangeText={(texto) => setNumber(texto)}
            />
          </View>
          <View style={styles.inputContainerDesc}>
            <TextInput
              multiline={true}
              placeholder="Descrição do problema"
              placeholderTextColor={"#7C7C8A"}
              style={styles.inputText}
              onChangeText={(texto) => setDesc(texto)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#202024",
  },
  textTitle: {
    fontSize: 15,
    color: "#E1E1E6",
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 700,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  buttons: {
    borderRadius: 4,
    backgroundColor: "#202024",
    paddingHorizontal: 40,
    paddingVertical: 8,
  },
  buttonsActive: {
    borderWidth: 1,
    borderColor: "#04D361",
  },
  buttonsText: {
    color: "#7C7C8A",
    fontSize: 8,
    fontWeight: 600,
  },
  buttonsTextActive: {
    color: "#04D361",
  },
  buttonRequestContainer: {
    position: "absolute",
    bottom: 40,
    left: "5%",
    right: "5%",
    backgroundColor: "#00875F",
    paddingHorizontal: "30%",
    padding: 15,
    borderRadius: 4,
    elevation: 2,
    zIndex: 9,
  },
  buttonRequest: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
  },
  inputText: {
    color: "#7C7C8A",
    margin: 10,
  },
  inputContainer: {
    backgroundColor: "#121214",
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
  },
  titleModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  iconModal: {
    left: -130,
  },
  containerModal: {
    flex: 2,
    backgroundColor: "#202024",
  },
  textModal: {
    color: "#E1E1E6",
  },
  inputContainerDesc: {
    height: "60%",
    backgroundColor: "#121214",
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    width: "90%",
    marginTop: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#00875F",
  },
});
