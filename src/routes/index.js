import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import Login from "../pages/login";
import TaskList from "../pages/TaskList";
import TaskListFin from "../pages/TaskListFin";
import React, { createContext, useState } from "react";
import { StateProvider } from "../state";

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <StateProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TaskList"
          component={TaskList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TaskListFin"
          component={TaskListFin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </StateProvider>
  );
}
