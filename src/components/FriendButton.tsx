import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { XCircle } from "lucide-react-native";

const RenderFriendButton: React.FC<any> = (status: string) => {
  switch (status) {
    case "Kết bạn":
      return (
        <TouchableOpacity className="rounded-full">
          <LinearGradient
            colors={["#4450D8", "#617DEA"]}
            className="py-2 px-6"
            style={{ borderRadius: 50 }}
          >
            <Text className="text-white text-center font-semibold">
              Kết bạn
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    case "Bạn bè":
      return (
        <View className="px-4 py-1 rounded-full">
          <Text className="text-[#424242] text-base font-medium">Bạn bè</Text>
        </View>
      );
    case "Huỷ kết bạn":
      return (
        <TouchableOpacity className="border border-[#4450D8] px-4 py-1 rounded-full">
          <Text className="text-[#424242] text-base font-medium">
            Huỷ kết bạn
          </Text>
        </TouchableOpacity>
      );
    case "Chấp nhận":
      return (
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="rounded-full mr-2">
            <LinearGradient
              colors={["#4450D8", "#617DEA"]}
              className="py-2 px-6"
              style={{ borderRadius: 50 }}
            >
              <Text className="text-white text-center font-semibold">
                Chấp nhận
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <XCircle size={20} color="#71717A" />
        </View>
      );
    default:
      return null;
  }
};

export default RenderFriendButton;
