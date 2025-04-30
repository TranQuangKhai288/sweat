import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { UserPlus, UserCheck, UserMinus, XCircle } from "lucide-react-native";

interface FriendStatusButtonProps {
  status: "Kết bạn" | "Bạn bè" | "Huỷ yêu cầu" | "Đã gửi yêu cầu";
  onPressAddfriend?: () => void;
  onCancelFriendRequest?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onUnfriend?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

const RenderFriendStatusButton: React.FC<FriendStatusButtonProps> = ({
  status,
  onPressAddfriend,
  onCancelFriendRequest,
  onAccept,
  onReject,
  onUnfriend,
}) => {
  console.log("status", status);
  switch (status) {
    case "Kết bạn":
      return (
        <TouchableOpacity
          className="rounded-full mt-4"
          activeOpacity={0.8}
          onPress={onPressAddfriend}
        >
          <LinearGradient
            colors={["#4450D8", "#617DEA"]}
            className="py-2.5 px-6 flex-row justify-center items-center gap-3"
            style={{ borderRadius: 50 }}
          >
            <UserPlus size={24} color="white" />

            <Text className="text-white text-center font-semibold">
              Kết bạn
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    case "Bạn bè":
      return (
        <TouchableOpacity
          className="rounded-full mt-4"
          activeOpacity={0.8}
          onPress={onUnfriend}
        >
          <LinearGradient
            colors={["#4450D8", "#617DEA"]}
            className="py-2.5 px-6 flex-row justify-center items-center gap-3"
            style={{ borderRadius: 50 }}
          >
            <UserCheck size={24} color="white" />

            <Text className="text-white text-center font-semibold">Bạn bè</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    case "Huỷ yêu cầu":
      return (
        <TouchableOpacity
          className="rounded-full border border-[#4450D8] mt-4 py-2.5 px-6 flex-row justify-center items-center gap-3"
          activeOpacity={0.8}
          onPress={onCancelFriendRequest}
        >
          {/* <LinearGradient
            colors={["#4450D8", "#617DEA"]}
            className=""
            style={{ borderRadius: 50 }}
          > */}
          <UserMinus size={24} color="black" />

          <Text className="text-black text-center font-semibold">
            Huỷ yêu cầu
          </Text>
          {/* </LinearGradient> */}
        </TouchableOpacity>
      );
    case "Đã gửi yêu cầu":
      return (
        <View className="flex-col items-center justify-between mt-2">
          <Text className="text-black text-base font-semibold mb-2">
            Đã gửi lời mời kết bạn
          </Text>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              className="rounded-full mr-2 gap-3"
              activeOpacity={0.8}
              onPress={onAccept}
            >
              <LinearGradient
                colors={["#4450D8", "#617DEA"]}
                className="py-2.5 px-6"
                style={{ borderRadius: 50 }}
              >
                <Text className="text-white text-center font-semibold">
                  Chấp nhận
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onReject}
              className="rounded-full border border-[#4450D8] py-2.5 px-6 flex-row justify-center items-center gap-3"
              activeOpacity={0.8}
            >
              {/* <LinearGradient
            colors={["#4450D8", "#617DEA"]}
            className=""
            style={{ borderRadius: 50 }}
          > */}

              <Text className="text-black text-center font-semibold">
                Từ chối
              </Text>
              {/* </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </View>
      );
    default:
      return null;
  }
};

export default RenderFriendStatusButton;
