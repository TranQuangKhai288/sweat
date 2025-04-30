import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import {
  Menu,
  Camera,
  User,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react-native";
//insets
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostCard from "../components/Post/PostCard";
import { mockPosts } from "./Home";
import PostDetailTabs from "../components/Post/PostDetailTabs";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { useBottomSheet } from "../contexts/BottomSheetContext";
import { LinearGradient } from "expo-linear-gradient";
import RenderFriendStatusButton from "../components/FriendStatusButton";

type Friend = {
  id: string;
  name: string;
  avatar: string;
};

// Mock data
const user = {
  name: "Tên user",
  bio: "Giới thiệu về bản thân",
  avatar: null, // No avatar set
};

const friends: Friend[] = [
  {
    id: "1",
    name: "Meow meow Nguyen",
    avatar: "https://placekitten.com/200/200",
  },
  {
    id: "2",
    name: "Meow meow Nguyen Ph...",
    avatar: "https://placekitten.com/201/201",
  },
  {
    id: "3",
    name: "Meow meow Nguyen",
    avatar: "https://placekitten.com/202/202",
  },
  {
    id: "4",
    name: "Meow meow Nguyen Ph...",
    avatar: "https://placekitten.com/203/203",
  },
  {
    id: "5",
    name: "Meow meow Nguyen",
    avatar: "https://placekitten.com/204/204",
  },
  {
    id: "6",
    name: "Meow meow Nguyen Ph...",
    avatar: "https://placekitten.com/205/205",
  },
];

const UserProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const [modalVisible, setModalVisible] = useState(false);

  const totalFriends = 120;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 50 }}
        // showsVerticalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="h-60 w-full bg-blue-500 rounded-b-3xl shadow-lg "></View>

        {/* Profile section */}
        <View className="mt-12 mx-4 pb-4 items-center border-b-2 border-gray-200">
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
          </View>

          {/* User info */}
          <Text className="text-xl font-bold mt-6">{user.name}</Text>
          <Text className="text-base font-normal mt-1">{user.bio}</Text>
          <RenderFriendStatusButton
            status="Bạn bè"
            onUnfriend={() => {
              setModalVisible(true);
            }}
          />
        </View>

        {/* Friends section */}
        <View className="mt-2 px-4">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-col items-start justify-center">
              <Text
                className="font-bold "
                style={{
                  fontSize: 18,
                }}
              >
                Bạn bè
              </Text>
              <Text className="text-gray-500 text-base">
                {totalFriends} bạn bè
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#F96D40] font-bold ">Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {/* Friends grid */}
          <View className="flex-row flex-wrap justify-between  border-b-2 border-gray-200">
            {friends.map((friend) => (
              <View
                key={friend.id}
                className="w-[31%] mb-4 bg-[#EEEEEE] rounded-xl"
              >
                <Image
                  source={{ uri: friend.avatar }}
                  className="w-full h-36 bg-slate-600 rounded-t-xl"
                />
                <Text
                  className="text-base px-2 py-1 font-medium"
                  numberOfLines={2}
                >
                  {friend.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-2 px-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="font-bold"
              style={{
                fontSize: 18,
              }}
            >
              Bài viết của bạn
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/1.jpg",
              }}
              className="w-16 h-16 rounded-full bg-slate-500"
            />

            <TextInput
              className="flex-1 border border-gray-300 h-12 ml-2 rounded-full px-4 py-2 bg-[#EEEEEE]"
              placeholder="Bạn có điều gì muốn chia sẻ?"
              multiline={true}
              numberOfLines={2}
            />
          </View>

          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              username={post.username}
              avatarUrl={post.avatarUrl}
              time={post.time}
              imageUrls={post.imageUrls}
              likes={post.likes}
              comments={post.comments}
              content={post.caption}
              onCommentPress={() =>
                openBottomSheet(
                  <View className="flex-1">
                    <PostDetailTabs />
                  </View>,
                  ["70%"]
                )
              }
              onEditPress={() =>
                openBottomSheet(
                  <View className="flex-1 -mt-2 gap-2">
                    <View className="flex-row items-center py-2 bg-white">
                      <Edit size={28} color="black" className="mr-1 mb-2" />
                      <Text className="text-xl ml-4">Chỉnh sửa bài viết</Text>
                    </View>
                    <TouchableOpacity
                      className="flex-row items-center py-2 bg-white"
                      onPress={() => {
                        //
                      }}
                    >
                      <Trash2 size={28} color="black" className="mr-1 mb-2" />
                      <Text className="text-xl ml-4">Xoá bài viết</Text>
                    </TouchableOpacity>
                  </View>,
                  ["15%"]
                )
              }
            />
          ))}
        </View>
      </ScrollView>
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
              Huỷ kết bạn
            </Text>

            <View className="bg-gray-100 rounded-xl px-4 py-3 mb-6">
              <Text className="text-center text-xl font-medium  text-black">
                Bạn có chắc chắn muốn{"\n"}huỷ kết bạn?
              </Text>
            </View>

            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                className="rounded-full flex-1"
                activeOpacity={0.8}
                onPress={() => {
                  // Handle unfriend action here
                  setModalVisible(false);
                }}
              >
                <LinearGradient
                  colors={["#F96D40", "#FF965D"]}
                  className="py-3 px-6"
                  style={{ borderRadius: 50 }}
                >
                  <Text className="text-white text-xl text-center font-semibold">
                    Xác nhận
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 border border-[#F96D40] rounded-full py-3 bg-white"
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
    </SafeAreaView>
  );
};

export default UserProfileScreen;
