import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomSheet } from "../contexts/BottomSheetContext";
import { ChevronDown } from "lucide-react-native";
import { useGoogleLogin } from "../hooks/useLogin";

const languages = [
  { language: "Tiếng Việt", icon: require("../assets/icons/VNIcon.png") },
  { language: "English", icon: require("../assets/icons/ENGIcon.png") },
];

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [language, setLanguage] = useState("Tiếng Việt");
  const { promptAsync } = useGoogleLogin();

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);
    // setModalVisible(false);
  };
  return (
    <View className="flex-1 bg-[#FFF5F2] items-center justify-center">
      {/* <Loader /> */}
      <View className="w-full items-center justify-center  h-1/4">
        <Image
          source={require("../assets/images/img_sweat_logo.png")}
          resizeMode="contain"
          className="w-2/3 "
        />
      </View>

      <View className="w-full flex-col items-center justify-center px-4 z-10 ">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row px-4 py-3 border-[#F8C8A1] border-[1.2px] w-full items-center justify-center rounded-2xl mb-4 gap-[10px]"
          onPress={() => promptAsync()}
        >
          <Image
            source={require("../assets/icons/icons-google.png")}
            className="w-7 h-7"
            resizeMode="contain"
          />
          <Text className="text-black font-medium text-[16px]">
            Tiếp tục với Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row  px-4 py-3 border-[#F8C8A1] border-[1.2px] w-full items-center justify-center rounded-2xl mb-4 gap-[10px]"
          // style={{ borderWidth: , borderColor: "#FF6B00" }}
        >
          <Image
            source={require("../assets/icons/icons-facebook.png")}
            className="w-7 h-7"
            resizeMode="contain"
          />
          <Text className="text-black font-medium text-[16px]">
            Tiếp tục với Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("openBottomSheet");
            openBottomSheet(
              <View className="bg-white -mt-4">
                <View className="flex items-center justify-center">
                  <Text className="text-2xl font-bold mb-4">
                    Lựa chọn ngôn ngữ
                  </Text>
                </View>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.language}
                    className="flex-row items-center px-2 py-3 mb-2"
                    onPress={() => {
                      handleSelectLanguage(lang.language);
                      closeBottomSheet();
                    }}
                  >
                    <Image
                      source={lang.icon}
                      style={{
                        width: 32,
                        marginRight: 12,
                      }}
                      // className="bg-slate-400"
                    />
                    <Text className="text-xl font-semibold">
                      {lang.language}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>,
              ["22%"]
            );
          }}
          className="flex-row items-center gap-[14px]"
          activeOpacity={0.8}
        >
          <Image
            source={
              language === "Tiếng Việt"
                ? require("../assets/icons/VNIcon.png")
                : require("../assets/icons/ENGIcon.png")
            }
            className="w-7 h-7"
            resizeMode="contain"
          />
          <Text className="text-xl text-[#616161]">{language}</Text>
          <ChevronDown
            size={20}
            color="#616161"
            style={{
              // marginLeft: 10,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 left-0 right-0 w-full items-center justify-center">
        <Image
          source={require("../assets/images/footer.png")}
          resizeMode="contain"
          className="w-full"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
