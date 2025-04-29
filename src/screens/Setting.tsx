import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Pressable,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { useAuth } from "../contexts/AuthContext";
import {
  ChevronLeft,
  Bell,
  Globe,
  LogOut,
  ChevronDown,
  Check,
} from "lucide-react-native";
import { useBottomSheet } from "../contexts/BottomSheetContext";
const languages = [
  { language: "Tiếng Việt", icon: require("../assets/icons/VNIcon.png") },
  { language: "English", icon: require("../assets/icons/ENGIcon.png") },
];

const Setting: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const { state, logout } = useAuth();
  const { user } = state;
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [language, setLanguage] = useState("Tiếng Việt");
  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);
    // setModalVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev);
  return (
    <View className="flex-1 bg-white pt-10 h-full">
      {/* Header */}
      <View className="flex-row items-center justify-center px-4 py-4">
        <TouchableOpacity
          className="ml-2 p-2 absolute left-0"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeft color="black" size={24} />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center ">
          <Text className=" text-2xl font-bold text-center">Cài đặt</Text>
        </View>
      </View>

      <View className="px-4">
        {/* Thông báo */}
        <View className=" px-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <Bell size={28} color="black" />
            <Text className="text-xl ml-4">Thông báo</Text>
            <View className="flex-1" />

            <Switch
              value={isNotificationEnabled}
              onValueChange={toggleNotification}
              thumbColor={isNotificationEnabled ? "#ffffff" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
        </View>

        {/* Ngôn ngữ */}
        <View className="px-4 py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <Globe size={28} color="black" />
            <Text className="text-xl ml-4">Ngôn ngữ</Text>
            <View className="flex-1" />
            <TouchableOpacity
              className="flex-row items-center"
              activeOpacity={0.8}
              onPress={() => {
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
                          className="bg-slate-400"
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
            >
              <Text className="text-xl text-[#616161] mr-2">{language}</Text>
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
        </View>
        {/* Đăng xuất */}
        <TouchableOpacity
          className="px-4 py-3 border-b border-gray-200"
          onPress={() => {
            logout;
            setModalVisible(true);
          }}
        >
          <View className="flex-row items-center">
            <LogOut size={28} color="red" />
            <Text className="text-xl ml-4 text-red-500">Đăng xuất</Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-[85%] ">
              <Text className="text-2xl font-bold text-center mb-4">
                Đăng xuất
              </Text>

              <View className="bg-gray-100 rounded-xl px-4 py-3 mb-6">
                <Text className="text-center text-xl  text-black">
                  Bạn có chắc chắn muốn{"\n"}đăng xuất?
                </Text>
              </View>

              <View className="flex-row justify-between gap-4">
                <TouchableOpacity
                  className="flex-1 bg-red-500 rounded-full py-3"
                  onPress={() => {
                    logout();
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-white text-xl  text-center font-semibold">
                    Đăng xuất
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 border border-gray-400 rounded-full py-3 bg-white"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-center text-xl  font-semibold text-black">
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Setting;
