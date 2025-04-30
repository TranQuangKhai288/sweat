import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostSearchItem from "./PostSearchItem";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import RenderFriendButton from "./FriendButton";
const Tab = createMaterialTopTabNavigator();

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

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="bg-white flex-row justify-center w-full">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} className="mx-2">
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.7}
              className="items-center px-2"
            >
              <Text
                className={`text-xl font-medium ${
                  isFocused ? "text-black" : "text-gray-500"
                }`}
              >
                {typeof label === "string" ? label : route.name}
              </Text>
            </TouchableOpacity>

            {/* Indicator that only appears under the focused tab */}
            {isFocused && (
              <View
                className="h-1 mt-1"
                style={{
                  backgroundColor: "#F96D40",
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const SearchResult: React.FC<SearchResultProps> = ({
  friendsData,
  postsData,
}) => {
  const SearchResulrTabNavigatorWithoutContainer = () => {
    return (
      <Tab.Navigator
        tabBar={(props: any) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: "#1877f2",
          tabBarInactiveTintColor: "#666",
          tabBarIndicatorStyle: { backgroundColor: "#1877f2" },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "500" },
        }}
      >
        <Tab.Screen
          name="Bạn bè"
          children={() => <FriendSearchResult friendsData={friendsData} />}
        />
        <Tab.Screen
          name="Bài viết"
          children={() => <PostSearchResult postsData={postsData} />}
        />
      </Tab.Navigator>
    );
  };
  return (
    <View className="flex-1 bg-white">
      {/* <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 16 },
          // tabBarIndicator: (props) => <CustomTabBarIndicator {...props} />, // Dùng custom indicator
          tabBarStyle: {
            backgroundColor: "#fff",
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Bạn bè"
          children={() => <FriendSearchResult friendsData={friendsData} />}
        />
        <Tab.Screen
          name="Bài viết"
          children={() => <PostSearchResult postsData={postsData} />}
        />
      </Tab.Navigator> */}
      <SearchResulrTabNavigatorWithoutContainer />
    </View>
  );
};

export default SearchResult;

// Friend List
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
              className="w-12 h-12 rounded-full mr-3 bg-slate-500"
            />
            <View>
              <Text className="font-bold text-lg text-gray-800">
                {item.name}
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={{ uri: item.avatar }}
                  className="w-5 h-5 rounded-full mr-1 bg-slate-400"
                />
                <Text className="text-gray-500">
                  {item.mutualFriends > 0
                    ? `${item.mutualFriends} bạn chung`
                    : "Gợi ý cho bạn"}
                </Text>
              </View>
            </View>
          </View>
          {RenderFriendButton(item.status)}
        </View>
      )}
      style={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Post List
const PostSearchResult = ({ postsData }: { postsData: any[] }) => {
  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 8,
      }}
      contentContainerStyle={{ paddingVertical: 16 }}
      renderItem={({ item }) => <PostSearchItem item={item} />}
      style={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    />
  );
};
