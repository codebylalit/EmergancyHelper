// NavigationContainer.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./homescreen";
import NumberScreen from "./numberscreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Number" component={NumberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
