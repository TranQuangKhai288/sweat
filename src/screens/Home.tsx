import React, { useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  View as RNView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { Search } from "lucide-react-native";
import PostCard from "../components/Post/PostCard";
import BottomSheet from "@gorhom/bottom-sheet";
// import BottomSheet from "@gorhom/bottom-sheet";

export const mockPosts = [
  {
    id: "1",
    username: "Andre Oliver",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    time: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    caption:
      "Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật...",
    imageUrls: ["https://images.unsplash.com/photo-1573497491208-6b1acb260507"],
    likes: 5844,
    comments: 166,
  },
  {
    id: "2",
    username: "Trần Văn A",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    time: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    caption: "Tối qua chill với anh em mà sáng nay vẫn chưa tỉnh 🍻",
    imageUrls: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    ],
    likes: 322,
    comments: 45,
  },
  {
    id: "3",
    username: "Lê Thu Hằng",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/168/168726.png",
    time: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    caption: "Mùa hè năm nay phải đi Đà Lạt ít nhất 2 lần ☀️🌸",
    imageUrls: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    likes: 1032,
    comments: 77,
  },
  {
    id: "4",
    username: "Nguyễn Quốc Bảo",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/924/924915.png",
    time: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    caption: "Code xuyên Tết, deadline không tha một ai 😭💻",
    imageUrls: [
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
    ],
    likes: 867,
    comments: 98,
  },
];

// ... giữ nguyên các import và mockPosts như bạn đã viết ở trên

const HomeScreen: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  //
  // BottomSheet setup
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handlePlusPress = () => {
    navigation.navigate("CreateNewPost");
  };

  const handleSearchPress = () => {
    navigation.navigate("SearchScreen");
  };
  return (
    <View className="flex-1 bg-white pt-10">
      {/* Header */}
      <View
        className="flex-row justify-between items-center py-2 border-b"
        style={{ borderBottomColor: "#E0E0E0", borderBottomWidth: 2 }}
      >
        <View className="flex-row justify-between items-center  px-4 bg-white w-full max-h-17 min-h-12 z-10">
          <Image
            source={require("../assets/images/img_sweat_logo.png")}
            style={{ width: 98, height: 48 }}
          />

          <View className="flex-row justify-between items-center">
            <TouchableOpacity activeOpacity={1} onPress={handlePlusPress}>
              <Image
                source={require("../assets/icons/img_plus_icon.png")}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              className="ml-3 bg-gray-200 rounded-full justify-center items-center w-12 h-12"
              onPress={handleSearchPress}
            >
              <Search size={22} color="black" className="mr-1 mb-2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Post list */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
          />
        ))}
      </ScrollView>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{
          zIndex: 9999, // Tăng zIndex
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="px-4 py-6">
          <Text className="text-lg font-semibold mb-2">Tạo bài viết mới</Text>
          <TouchableOpacity className="bg-blue-500 rounded-lg p-3 mt-2">
            <Text className="text-white text-center">Đăng ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 rounded-lg p-3 mt-2">
            <Text className="text-white text-center">Đăng video</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
