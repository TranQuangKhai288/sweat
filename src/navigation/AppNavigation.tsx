// src/navigation/AppNavigator.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Đảm bảo import từ đây
import { useAuth } from "../contexts/AuthContext";
// import {useTheme} from '../contexts/ThemeContext';
import MainTabNavigator from "./BottomTab";
import CreateNewPost from "../screens/post/CreateNewPost";
import SearchScreen from "../screens/post/SearchScreen";
import EditProfile from "../screens/EditProfile";
import Setting from "../screens/Setting";
import Splash from "../screens/Splash";

import UserProfileScreen from "../screens/UserProfile";
import LoginScreen from "../screens/Login";
// import MatchScreen from '../screens/MatchScreen';
// import ChatScreen from '../screens/ChatScreen';

// Định nghĩa type cho stack navigation
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  EditProfile: undefined;
  Setting: undefined;
  CreateNewPost: undefined;
  SearchScreen: undefined;
  Splash: undefined;
  UserProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();
  if (state.isLoading) {
    console.log("Loading state is true, showing loading indicator");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  // const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Post */}
        <Stack.Screen name="CreateNewPost" component={CreateNewPost} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />

        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
