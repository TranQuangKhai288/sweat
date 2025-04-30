import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { useAuth } from "../contexts/AuthContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import RenderFriendButton from "../components/FriendButton"; // Import your custom button component
import { LinearGradient } from "expo-linear-gradient";
import { XCircle } from "lucide-react-native";
import SearchBar from "../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();
const friendsRecommentData = [
  {
    id: "1",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  {
    id: "2",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Kết bạn",
  },
  {
    id: "3",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Huỷ kết bạn",
  },
  {
    id: "11",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  // {
  //   id: "12",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=2",
  //   status: "Kết bạn",
  // },
  // {
  //   id: "13",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=3",
  //   status: "Huỷ kết bạn",
  // },
  // {
  //   id: "21",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=1",
  //   status: "Kết bạn",
  // },
  // {
  //   id: "22",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=2",
  //   status: "Kết bạn",
  // },
  // {
  //   id: "23",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=3",
  //   status: "Huỷ kết bạn",
  // },
  // {
  //   id: "31",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=1",
  //   status: "Kết bạn",
  // },
  // {
  //   id: "32",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=2",
  //   status: "Kết bạn",
  // },
  // {
  //   id: "33",
  //   name: "Tên User",
  //   mutualFriends: 10,
  //   avatar: "https://i.pravatar.cc/100?img=3",
  //   status: "Huỷ kết bạn",
  // },
];
// Mock data for friends and friend requests
const friendsData = [
  { id: "1", name: "Tên User", mutualFriends: 10 },
  { id: "2", name: "Tên User", mutualFriends: 10 },
  { id: "3", name: "Tên User", mutualFriends: 10 },
  { id: "4", name: "Tên User", mutualFriends: 10 },
  { id: "5", name: "Tên User", mutualFriends: 10 },
  { id: "11", name: "Tên User", mutualFriends: 10 },
  { id: "12", name: "Tên User", mutualFriends: 10 },
  { id: "13", name: "Tên User", mutualFriends: 10 },
  { id: "14", name: "Tên User", mutualFriends: 10 },
  { id: "15", name: "Tên User", mutualFriends: 10 },
  { id: "21", name: "Tên User", mutualFriends: 10 },
  { id: "22", name: "Tên User", mutualFriends: 10 },
  { id: "23", name: "Tên User", mutualFriends: 10 },
  { id: "24", name: "Tên User", mutualFriends: 10 },
  { id: "25", name: "Tên User", mutualFriends: 10 },
  { id: "31", name: "Tên User", mutualFriends: 10 },
  { id: "32", name: "Tên User", mutualFriends: 10 },
  { id: "33", name: "Tên User", mutualFriends: 10 },
  { id: "34", name: "Tên User", mutualFriends: 10 },
  { id: "35", name: "Tên User", mutualFriends: 10 },
  { id: "41", name: "Tên User", mutualFriends: 10 },
  { id: "42", name: "Tên User", mutualFriends: 10 },
  { id: "43", name: "Tên User", mutualFriends: 10 },
  { id: "44", name: "Tên User2", mutualFriends: 10 },
  { id: "45", name: "Tên User1", mutualFriends: 10 },
];

const friendRequestsData = [
  { id: "1", name: "Daisy", mutualFriends: 10 },
  { id: "2", name: "Tên User", mutualFriends: 10 },
  { id: "3", name: "Tên User", mutualFriends: 10 },
  { id: "4", name: "Tên User", mutualFriends: 10 },
  { id: "11", name: "Daisy", mutualFriends: 10 },
  { id: "12", name: "Tên User", mutualFriends: 10 },
  // { id: "13", name: "Tên User", mutualFriends: 10 },
  // { id: "14", name: "Tên User", mutualFriends: 10 },
  // { id: "21", name: "Daisy", mutualFriends: 10 },
  // { id: "22", name: "Tên User", mutualFriends: 10 },
  // { id: "23", name: "Tên User", mutualFriends: 10 },
  // { id: "24", name: "Tên User", mutualFriends: 10 },
  // { id: "31", name: "Daisy", mutualFriends: 10 },
  // { id: "32", name: "Tên User", mutualFriends: 10 },
  // { id: "33", name: "Tên User", mutualFriends: 10 },
  // { id: "34", name: "Tên User", mutualFriends: 10 },
];

// Friends list component
const FriendsList = () => {
  return (
    <ScrollView
      className="flex-1 bg-white px-4 mb-20"
      showsVerticalScrollIndicator={false}
    >
      {friendsData.map((friend, index) => (
        <View className="flex-row py-2 " key={friend.id}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            className="w-14 h-14 rounded-full mr-3 bg-slate-500"
          />
          <View className="flex-1 justify-center">
            <Text className="text-lg font-bold">{friend.name}</Text>
            <Text className="text-base text-gray-500">
              {friend.mutualFriends} bạn chung
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

// Friend requests component
const FriendRequests = () => {
  return (
    <ScrollView
      className="flex bg-white mb-20"
      showsVerticalScrollIndicator={false}
    >
      <View className=" bg-white px-4">
        {friendRequestsData.map((fq, index) => (
          <View className="flex-row py-2 bg-white" key={fq.id}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              className="w-20 h-20 rounded-full mr-3 bg-slate-500"
            />
            <View className="flex-1 justify-center">
              <Text className="text-lg font-bold">{fq.name}</Text>
              <View className="flex flex-row">
                <Image
                  source={{ uri: "https://via.placeholder.com/40" }}
                  className="w-6 h-6 rounded-full mr-2 bg-slate-500"
                />
                <Text className="text-base text-gray-500">
                  {fq.mutualFriends} bạn chung
                </Text>
              </View>
              <View className="flex-row mt-1">
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
                </View>
                <TouchableOpacity className="border border-[#4450D8] px-6 py-1 rounded-full">
                  <Text className="text-[#424242] text-base font-medium">
                    Từ chối
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text className="text-2xl font-bold text-black ml-4">Gợi ý cho bạn</Text>
      {/* <FlatList
        data={friendsRecommentData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 6 }}
        renderItem={renderRecommentItem}
        style={{ backgroundColor: "#fff" }}
      /> */}
      <View className=" bg-white px-4">
        {friendsRecommentData.map((fr, index) => (
          <View
            className="flex-row items-center justify-between mb-4"
            key={fr.id}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: fr.avatar }}
                className="w-12 h-12 rounded-full mr-3 bg-slate-500"
              />
              <View>
                <Text className="font-bold text-lg text-gray-800">
                  {fr.name}
                </Text>
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: fr.avatar }}
                    className="w-6 h-6 rounded-full mr-1 bg-slate-400"
                  />
                  <Text className="text-gray-500">
                    {fr.mutualFriends > 0
                      ? `${fr.mutualFriends} bạn chung`
                      : "Gợi ý cho bạn"}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              {RenderFriendButton(fr.status)}
              <XCircle size={20} color="#71717A" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row justify-center w-full">
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

// Friend Tab Navigator without NavigationContainer
const FriendTabNavigatorWithoutContainer = () => {
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
      <Tab.Screen name="Bạn bè" component={FriendsList} />
      <Tab.Screen name="Lời mời kết bạn" component={FriendRequests} />
    </Tab.Navigator>
  );
};

const FriendScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;

  return (
    <View className="flex-1 bg-white pt-10 h-full">
      {/* Header */}
      <View className="flex-row justify-between items-center py-2">
        <View className="flex-row justify-between items-center p-2 px-4 w-full max-h-17 min-h-12 z-1">
          <Text className="flex-1 text-center text-2xl font-bold text-black">
            Bạn bè
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <SearchBar />
      </View>

      {/* Use FriendTabNavigatorWithoutContainer instead of FriendTabNavigator */}
      <View className="flex-1">
        <FriendTabNavigatorWithoutContainer />
      </View>
    </View>
  );
};

export default FriendScreen;
