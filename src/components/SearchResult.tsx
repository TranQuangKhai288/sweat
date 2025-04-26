import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import PostSearchItem from "./PostSearchItem";
import { LinearGradient } from "expo-linear-gradient";
import { XCircle } from "lucide-react-native";

const tabs = ["Bạn bè", "Bài viết"];
interface SearchResultProps {
  friendsData: {
    id: string;
    name: string;
    mutualFriends: number;
    avatar: string;
    status: string;
  }[];
  postsData: {
    id: string;
    image: string;
    content: string;
    username: string;
  }[];
}

const SearchResult: React.FC<SearchResultProps> = ({
  friendsData,
  postsData,
}) => {
  const [activeTab, setActiveTab] = useState("Bạn bè");

  return (
    <View className="flex-1 bg-white">
      {/* Tabs */}
      <View className="flex-row justify-center">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="px-6 pb-2"
          >
            <Text
              className={`text-lg font-bold  ${
                activeTab === tab ? "text-black" : "text-gray-600"
              }`}
            >
              {tab}
            </Text>
            {activeTab === tab && (
              <View className="h-1 bg-orange-500 rounded-full mt-1" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === "Bạn bè" ? (
        <FriendSearchResult friendsData={friendsData} />
      ) : (
        <PostSearchResult postsData={postsData} />
      )}
    </View>
  );
};

export default SearchResult;

// Friend List Component
const FriendSearchResult = ({ friendsData }: { friendsData: any[] }) => {
  return (
    <FlatList
      data={friendsData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingTop: 6 }}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="font-bold text-lg text-gray-800">
                {item.name}
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={{ uri: item.avatar }}
                  className="w-5 h-5 rounded-full mr-1"
                />
                <Text className="text-gray-500 ">
                  {item.mutualFriends > 0
                    ? `${item.mutualFriends} bạn chung`
                    : "Gợi ý cho bạn"}
                </Text>
              </View>
            </View>
          </View>
          {renderFriendButton(item.status)}
        </View>
      )}
    />
  );
};

// Render trạng thái bạn bè
const renderFriendButton = (status: string) => {
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

// Post List Component
const PostSearchResult = ({ postsData }: { postsData: any[] }) => {
  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
      contentContainerStyle={{ paddingVertical: 16 }}
      renderItem={({ item }) => <PostSearchItem item={item} />}
    />
  );
};
