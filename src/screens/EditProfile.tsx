import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ChevronLeft, Camera, User, Edit, Trash2 } from "lucide-react-native";
//insets
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import CustomInput from "../components/CusomeInput";
import { LinearGradient } from "expo-linear-gradient";
type UserFormData = {
  name: string;
  bio: string;
  birthDate: string;
  gender: string;
};
const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<UserFormData>({
    name: "Tên User",
    bio: "Giới thiệu về bản thân",
    birthDate: "09/08/2003",
    gender: "Nữ",
  });

  // Mock data
  const user = {
    name: "Tên user",
    bio: "Giới thiệu về bản thân",
    avatar: null, // No avatar set
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        className="flex-1 bg-white"
        // contentContainerStyle={{ paddingBottom: 50 }}
        // showsVerticalScrollIndicator={true}
      >
        {/* Header */}
        <View
          className="h-60 w-full bg-blue-500
        rounded-b-3xl shadow-lg "
        >
          <View
            className="items-start"
            style={{ paddingTop: insets.top, marginRight: 4 }}
          >
            <TouchableOpacity
              className="p-2"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-4 right-4">
            <TouchableOpacity className="bg-[#424242] p-2 rounded-full">
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile section */}
        <View className="mt-12 mx-4 pb-4 items-center ">
          {/* Avatar */}
          <View className="w-32 h-32 rounded-full bg-gray-200 absolute -top-28 border-4 border-white items-center justify-center">
            {user.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <User size={40} color="#888" />
            )}
            <View className="absolute bottom-0 right-0 bg-[#424242] p-2 rounded-full">
              <Camera size={16} color="white" />
            </View>
          </View>
        </View>

        <View className="mx-4 pb-4 mt-8">
          <CustomInput
            label="Tên người dùng"
            value={formData.name}
            onChangeText={(value) => {
              handleInputChange("name", value);
            }}
            placeholder="Nhập tên của bạn"
          />

          <CustomInput
            label="Bio"
            value={formData.bio}
            onChangeText={(value) => {
              handleInputChange("bio", value);
            }}
            placeholder="Giới thiệu về bản thân"
            type="textarea"
            numberOfLines={3}
          />

          <CustomInput
            label="Ngày sinh"
            value={formData.birthDate}
            onChangeText={(value) => {
              handleInputChange("birthDate", value);
            }}
            placeholder="Chọn ngày sinh"
            type="date"
          />

          <CustomInput
            label="Giới tính"
            value={formData.gender}
            onChangeText={(value) => {
              handleInputChange("gender", value);
            }}
            placeholder="Chọn giới tính"
            type="select"
            options={[
              { label: "Nam", value: "Nam" },
              { label: "Nữ", value: "Nữ" },
              { label: "Khác", value: "Khác" },
            ]}
          />
        </View>

        <View className="absolute bottom-8 px-4 flex-row justify-center items-center w-full space-x-2 gap-3">
          <TouchableOpacity
            className="flex-1 rounded-full"
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <LinearGradient
              colors={["#F96D40", "#FF965D"]}
              style={{ borderRadius: 50, paddingVertical: 8 }}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Lưu chỉnh sửa
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 border border-[#F96D40] rounded-full"
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <View style={{ paddingVertical: 8 }}>
              <Text className="text-center text-black text-lg font-semibold">
                Huỷ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
