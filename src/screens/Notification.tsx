import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { useAuth } from "../contexts/AuthContext";
import NotificationItem from "../components/NotificationItem";
import { ScrollView } from "react-native-gesture-handler";
const notifications = [
  {
    id: 1,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã thích bài viết của bạn",
    content:
      "Hôm nay nắng đẹp nên tran fjdksal vkdlsa; f daksl; fhclxvn roelkga nl vnc,xlnb relg nvdfvnel vncklx,.n",
    timeAgo: "1 phút trước",
    hasComment: false,
    highlighted: true,
    hasActions: false,
  },
  {
    id: 2,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã bình luận về bài viết của bạn",
    content: "Hôm nay nắng đẹp...",
    timeAgo: "1 phút trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 3,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã gửi lời mời kết bạn",
    content: "",
    timeAgo: "1 giờ trước",
    hasComment: true,
    highlighted: true,
    hasActions: true,
  },
  {
    id: 4,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "và 3 người khác đã nhắc đến bạn trong bình luận của họ",
    content: "",
    timeAgo: "2 ngày trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 5,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã chấp nhận lời mời kết bạn",
    content: "",
    timeAgo: "3 ngày trước",
    hasComment: true,
    highlighted: true,
    hasActions: false,
  },
  {
    id: 11,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã thích bài viết của bạn",
    content:
      "Hôm nay nắng đẹp nên tran fjdksal vkdlsa; f daksl; fhclxvn roelkga nl vnc,xlnb relg nvdfvnel vncklx,.n",
    timeAgo: "1 phút trước",
    hasComment: false,
    highlighted: true,
    hasActions: false,
  },
  {
    id: 12,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã bình luận về bài viết của bạn",
    content: "Hôm nay nắng đẹp...",
    timeAgo: "1 phút trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 13,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã gửi lời mời kết bạn",
    content: "",
    timeAgo: "1 giờ trước",
    hasComment: true,
    highlighted: true,
    hasActions: true,
  },
  {
    id: 14,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "và 3 người khác đã nhắc đến bạn trong bình luận của họ",
    content: "",
    timeAgo: "2 ngày trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 15,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã chấp nhận lời mời kết bạn",
    content: "",
    timeAgo: "3 ngày trước",
    hasComment: true,
    highlighted: true,
    hasActions: false,
  },
  {
    id: 21,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã thích bài viết của bạn",
    content:
      "Hôm nay nắng đẹp nên tran fjdksal vkdlsa; f daksl; fhclxvn roelkga nl vnc,xlnb relg nvdfvnel vncklx,.n",
    timeAgo: "1 phút trước",
    hasComment: false,
    highlighted: true,
    hasActions: false,
  },
  {
    id: 22,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã bình luận về bài viết của bạn",
    content: "Hôm nay nắng đẹp...",
    timeAgo: "1 phút trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 23,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã gửi lời mời kết bạn",
    content: "",
    timeAgo: "1 giờ trước",
    hasComment: true,
    highlighted: true,
    hasActions: true,
  },
  {
    id: 24,
    user: "ABC",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "và 3 người khác đã nhắc đến bạn trong bình luận của họ",
    content: "",
    timeAgo: "2 ngày trước",
    hasComment: true,
    highlighted: false,
    hasActions: false,
  },
  {
    id: 25,
    user: "Username",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "đã chấp nhận lời mời kết bạn",
    content: "",
    timeAgo: "3 ngày trước",
    hasComment: true,
    highlighted: true,
    hasActions: false,
  },
];
const NotificationScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("latest");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;

  return (
    <View className="flex-1 bg-white pt-10 h-full">
      {/* Header */}
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-center mb-4">Thông báo</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">Mới nhất</Text>
          <TouchableOpacity>
            <Text className="text-orange-500 text-xl font-bold">
              Đánh dấu đã đọc
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="px-4 mb-20 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
