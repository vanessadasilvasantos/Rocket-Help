import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import Finalizacao from "../finalizacao";
import { useNavigation } from "@react-navigation/native";

export default function TaskListFin({ dataFin, dataDesc }) {
  const navigation = useNavigation();
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [desc, setDesc] = useState("");

  function handleAdd() {
    if (number === "" && desc === "") return;

    const dataFin = {
      key: number,
      numberTask: number,
      descText: desc,
    };

    setTask([...task, dataFin]);
    setOpen(false);
    setNumber("");
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.containerTask}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.taskText}>Patrimônio {dataFin.numberTask} </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={open}>
        <View style={styles.container}>
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
            <View style={styles.label}>
              <Image source={require("../../../img/equi.png")} />
              <Text style={styles.textLabel}>EQUIPAMENTO</Text>
            </View>
            <TextInput
              placeholder="Número do Patrimônio"
              placeholderTextColor={"#7C7C8A"}
              style={styles.inputText}
              value={`Patrimônio ${dataFin.numberTask}`}
              onChangeText={(texto) => Finalizacao.setNumber(texto)}
            />
          </View>
          <View style={[styles.inputContainerDesc, styles.desc]}>
            <View style={styles.label}>
              <Image source={require("../../../img/desc.png")} />
              <Text style={styles.textLabel}>DESCRIÇÃO</Text>
            </View>
            <TextInput
              multiline={true}
              style={styles.inputText}
              placeholder="Descrição do problema"
              placeholderTextColor={"#7C7C8A"}
              value={dataFin.descText}
            />
          </View>
          <View style={styles.inputContainerDesc}>
            <View style={styles.label}>
              <Image source={require("../../../img/solucao.png")} />
              <Text style={styles.textLabel}>SOLUÇÃO</Text>
            </View>
            <TextInput
              multiline={true}
              style={styles.inputText}
              placeholderTextColor={"#7C7C8A"}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("Finalizacao")}
            >
              <Text style={styles.buttonRequest}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={open}>
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
              <View>
                <TouchableOpacity
                  onPress={handleAddFin}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonRequest}>Nova solitação</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
  },
  containerTask: {
    backgroundColor: "#202024",
    marginTop: 30,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 4,
    borderLeftWidth: 8,
    borderLeftColor: "#04D361",
  },
  taskText: {
    color: "#E1E1E6",
    fontSize: 12,
    marginLeft: 30,
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
    height: "34%",
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
  inputText: {
    color: "#E1E1E6",
    margin: 10,
  },
  inputContainer: {
    backgroundColor: "#121214",
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
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
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 10,
  },
  textLabel: {
    color: "#7C7C8A",
    fontSize: 10,
  },
  desc: {
    height: "22%",
  },
});
