import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
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
import TaskList from "../TaskList";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskListFin from "../TaskListFin";

export default function Home() {
  const navigation = useNavigation();
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [desc, setDesc] = useState("");
  const [page, setPage] = useState("andamentos");
  const [taskFin, setTaskFin] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem("@task");

      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem("@task", JSON.stringify(task));
    }

    saveTasks();
  }, [task]);

  useEffect(() => {
    async function loadTasksFin() {
      const taskStorage = await AsyncStorage.getItem("@taskFin");

      if (taskStorage) {
        setTaskFin(JSON.parse(taskStorage));
      }
    }

    loadTasksFin();
  }, []);

  useEffect(() => {
    async function saveTasksFin() {
      await AsyncStorage.setItem("@taskFin", JSON.stringify(taskFin));
    }

    saveTasksFin();
  }, [taskFin]);

  function handleAdd() {
    if (number === "" && desc === "") return;

    const data = {
      key: number,
      numberTask: number,
      descText: desc,
    };

    setTask([...task, data]);
    setOpen(false);
    setNumber("");
  }

  const condicao = page === "andamentos";
  const noCalls = task.length !== 0 && taskFin.length !== 0;
  const noCallsFin = taskFin.length !== 0;

  const handleDelete = useCallback((data) => {
    setTaskFin([...taskFin, data]);

    const find = task.filter((r) => r.key !== data.key);
    setTask(find);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../img/logo2.png")} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image source={require("../../../img/login.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Solicitações</Text>
        {condicao ? (
          <Text style={styles.textTitle}>{task.length}</Text>
        ) : (
          <Text style={styles.textTitle}>{taskFin.length}</Text>
        )}
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={[styles.buttons, condicao ? styles.buttonsActive : null]}
          onPress={() => setPage("andamentos")}
        >
          <Text
            style={[
              styles.buttonsText,
              condicao ? styles.buttonsTextActive : null,
            ]}
          >
            EM ANDAMENTO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, !condicao ? styles.buttonsActiveFin : null]}
          onPress={() => setPage("finalizados")}
        >
          <Text
            style={[
              styles.buttonsText,
              !condicao ? styles.buttonsTextActiveFin : null,
            ]}
          >
            FINALIZADOS
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonRequestContainer}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.buttonRequest}>Nova Solitação</Text>
      </TouchableOpacity>

      <View>
        {condicao ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={task}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <TaskList
                data={item}
                //currentTimeString={currentTime}
                setNumber={setNumber}
                handleDelete={handleDelete}
              />
            )}
          />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={taskFin}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <TaskListFin data={item} handleDelete={handleDelete} />
            )}
          />
        )}
      </View>
      {!noCalls && condicao ? (
        <View style={styles.msgContainer}>
          <Image
            source={require("../../../img/msg.png")}
            style={styles.imgMsg}
          />
          <Text style={styles.textMsg}>
            Você ainda não tem{"\n"} chamados criados
          </Text>
        </View>
      ) : null}

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
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleAdd}
            >
              <Text style={styles.buttonRequest}>Cadastrar</Text>
            </TouchableOpacity>
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
    marginHorizontal: 20,
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
    borderColor: "#FBA94C",
  },
  buttonsActiveFin: {
    borderWidth: 1,
    borderColor: "#04D361",
  },
  buttonsText: {
    color: "#7C7C8A",
    fontSize: 8,
    fontWeight: 600,
  },
  buttonsTextActive: {
    color: "#FBA94C",
  },
  buttonsTextActiveFin: {
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
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  msgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  textMsg: {
    color: "#7C7C8A",
    fontSize: 18,
    marginTop: 15,
  },
  imgMsg: {},
});
