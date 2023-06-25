import { React } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

//import { SafeAreaView } from "react-native-web";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#202024"} barStyle={"light-content"} />
      <Routes />
    </NavigationContainer>
  );
}
