// components/PostDetailTabs.tsx
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommentItem } from "../CommentItem";

const Tab = createMaterialTopTabNavigator();

const likes = [
  { id: "1", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "2", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "3", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "4", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "5", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "6", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "7", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "8", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "9", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "10", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "11", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "12", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "13", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "14", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "15", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "16", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "17", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "18", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "19", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "20", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "21", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "22", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "23", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "24", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "25", username: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "26", username: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
];

const comments = [
  { id: "1", username: "Charlie", comment: "Nice post!" },
  { id: "2", username: "Dave", comment: "Awesome!" },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      //   style={{
      //     flexDirection: "row",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     width
      //   }}
      className="bg-white flex-row justify-center items-center w-full "
    >
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
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              //   paddingHorizontal: 16,
              //   paddingVertical: 8,
              //   borderRadius: 20,
              backgroundColor: isFocused ? "#FFEBE4" : "#f0f0f0", // nền cam nhạt hoặc xám nhạt
            }}
            className="px-4 py-3 rounded-3xl mx-2 w-[40%] flex items-center justify-center"
          >
            <Text
              style={{
                color: isFocused ? "#F96D40" : "#333",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              {typeof label === "string" ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const LikesScreen = () => (
  <FlatList
    data={likes}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View className="py-2 flex-row items-center bg-white">
        <Image
          source={{ uri: item.avatarUrl }}
          className="w-12 h-12 rounded-full mr-3 bg-slate-600"
        />
        <Text className="font-semibold text-lg">{item.username}</Text>
      </View>
    )}
    contentContainerStyle={{ paddingVertical: 10 }}
    style={{ backgroundColor: "#fff" }}
  />
);
const CommentsScreen = () => {
  const [text, setText] = useState("");

  return (
    <View className="flex-1 bg-white pt-3">
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          //   <View className="py-2 flex-row items-center bg-white">
          //     <Image
          //       source={{ uri: "https://i.pravatar.cc/150" }}
          //       className="w-12 h-12 rounded-full bg-slate-600"
          //     />
          //     <View className="px-2 py-2">
          //       <Text className="font-semibold">{item.username}</Text>
          //       <Text>{item.comment}</Text>
          //     </View>
          //   </View>
          <CommentItem
            avatarUrl="https://i.pravatar.cc/150"
            username={item.username}
            time={new Date()}
            content={item.comment}
            onReply={() => console.log("Reply to comment")}
          />
        )}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
      <View className="flex-row items-center bg-white absolute bottom-0 left-0 right-0">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          className="w-12 h-12 rounded-full mr-2 bg-slate-600"
        />
        <View className="flex-1">
          <TextInput
            placeholder="Viết bình luận..."
            value={text}
            onChangeText={setText}
            className="border border-gray-300 rounded-full px-4 bg-[#F5F5F5]"
          />
        </View>
      </View>
    </View>
  );
};

const PostDetailTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
        <Tab.Screen name="200 Lượt thích" component={LikesScreen} />
        <Tab.Screen name="3 Bình luận" component={CommentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PostDetailTabs;
