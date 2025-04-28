import React, { useEffect } from "react";
import { View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      const checkToken = async () => {
        console.log("Checking for token in AsyncStorage");
        // Kiểm tra xem có token trong AsyncStorage không
        const token = await AsyncStorage.getItem("token");
        console.log("Token found: ", token);
        if (token) {
          console.log("Token found, navigating to Main screen");
          navigation.navigate("Main"); // hoặc tên màn hình chính
        } else {
          // navigation.navigate("Onboarding");
        }
      };

      checkToken();
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Loader />
    </View>
  );
};

export default SplashScreen;
