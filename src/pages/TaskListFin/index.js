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
import { StateContext } from "../../state";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function TaskListFin({ data }) {
  const [open, setOpen] = useState(false);
  const { solucao, setSolucao } = React.useContext(StateContext);

  return (
    <View>
      <TouchableOpacity
        style={styles.containerTask}
        onPress={() => setOpen(true)}
      >
        <View style={styles.taskContainerStyle}>
          <Text style={styles.taskText}>Patrimônio {data.numberTask} </Text>
          <Image source={require("../../../img/fin.png")} />
        </View>
        <View style={styles.taskTempoContainer}>
          <Image source={require("../../../img/relo.png")} />
          <Text style={styles.taskTextTime}>
            {moment().format("DD/MM/YY [ás] HH:mm")}
          </Text>
        </View>
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
              value={`Patrimônio ${data.numberTask}`}
              onChangeText={() => {}}
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
              value={data.descText}
            />
            <Text style={[styles.textLabel, styles.textLabelMomentDesc]}>
              {moment().format("DD/MM/YY [ás] HH:mm")}
            </Text>
          </View>
          <View style={styles.inputContainerDesc}>
            <View style={styles.label}>
              <Image source={require("../../../img/solucao.png")} />
              <Text style={styles.textLabel}>SOLUÇÃO</Text>
            </View>
            <TextInput
              multiline={true}
              placeholder="Descrição da solução"
              style={styles.inputText}
              value={solucao}
              placeholderTextColor={"#7C7C8A"}
            />
            <Text style={[styles.textLabel, styles.textLabelMoment]}>
              {moment().format("DD/MM/YY [ás] HH:mm")}
            </Text>
          </View>
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
  taskContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    alignItems: "center",
  },
  taskTempoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 30,
    marginTop: 5,
  },
  taskTextTime: {
    color: "#C4C4CC",
    fontSize: 8,
  },
  textLabelMoment: {
    marginLeft: 15,
    marginTop: "45%",
  },
  textLabelMomentDesc: {
    marginLeft: 15,
    marginTop: "20%",
  },
});
